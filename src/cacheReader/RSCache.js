import * as DataViewImport from './helpers/DataView.js'

import CacheDefinitionLoader from './CacheDefinitionLoader.js'
import CacheRequester from './CacheRequester.js'

import Index from './cacheTypes/Index.js'
import CacheLoader from './CacheLoader.js'

import IndexType from './cacheTypes/IndexType.js'

export default class RSCache {
	constructor(cacheRootDir = "./", progressFunc = () => { }, nameRootDir = undefined) {
		this.indicies = {};
		this.progressFunc = progressFunc;

		const cacheLoader = new CacheLoader(cacheRootDir);

		this.onload = cacheLoader.getResults().then(result => {
			this.cacheRequester = new CacheRequester(result.datFile);

			return this.#loadCacheFiles(result.indexFiles).then(() => {
				this.cacheRequester.setXteas(result.xteas);
			});

		});
	}

	#progress(amount) {
		this.progressFunc(amount);
	}

	getIndex(index) {
		let indexId;
		if (index.constructor.name === "Object") {
			indexId = index.id;
		} else if (Number.isSafeInteger(index)) {
			indexId = index;
		}

		index = this.indicies[indexId];
		if (index == undefined) {
			throw "Index " + indexId + " does not exist";
		}

		return index;
	}

	getArchive(index, archive) {
		let archiveId;
		if (archive.constructor.name === "Object") {
			archiveId = archive.id;
		} else if (Number.isSafeInteger(archive)) {
			archiveId = archive;
		}

		archive = index.archives[archiveId];
		if (archive == undefined) {
			throw "Archive " + archiveId + " does not exist";
		}

		return archive;
	}

	#checkIfCachingResults(options, indexType) {
		if (options.cacheResults == undefined) {
			if (indexType.id == IndexType.MODELS.id || indexType.id == IndexType.MAPS.id) { // dont save models and maps if cacheResults isnt set
				options.cacheResults = false;
			} else {
				options.cacheResults = true;
			}
		}
	}

	async getAllFiles(indexId, archiveId, options = {}) {
		try {
			let index = this.getIndex(indexId);
			let archive = this.getArchive(index, archiveId);
			this.#checkIfCachingResults(options, index);

			if (archive.filesLoaded) {
				return archive.files;
			}

			let data;
			if (options.threaded) {
				data = await this.cacheRequester.readDataThreaded(index, index.indexSegments[archiveId].size, index.indexSegments[archiveId].segment, archiveId);
			} else {
				data = await this.cacheRequester.readData(index, index.indexSegments[archiveId].size, index.indexSegments[archiveId].segment, archiveId);
			}
			archive = index.archives[data.archiveId];
			archive.loadFiles(data.decompressedData);

			let filePromise = new CacheDefinitionLoader(data.index.id, archive, options).loadAllFiles(this);

			if (options.cacheResults) { //it will readData again since filesLoaded will be false
				archive.filesLoaded = true;
			}

			return filePromise;
		} catch (e) {
			console.log(e)
		}
	}

	//some archives only contain 1 file so a fileId is only needed in some cases
	getFile(indexId, archiveId, fileId = 0, options = {}) {
		return this.getAllFiles(indexId, archiveId, options).then((x) => x[fileId]);
	}

	close() {
		this.cacheRequester.workerPool.finish();
	}

	#loadCacheFiles(indexFiles) {
		let idx255Data = indexFiles[indexFiles.length - 1];
		let idxFileData = indexFiles.slice(0, indexFiles.length - 1);

		//theres probably a better way of doing this
		//also not completely sure yet if this really needs to be done for index 255
		//return Promise.all(idxFiles).then((idxFileData) => {
		for (let i = 0; i <= idxFileData.length; i++) {
			let dataview;
			if (i == idxFileData.length) { //ugly fix, needs to be improved
				dataview = new DataView(idx255Data.buffer);
				i = 255;
			} else {
				if (idxFileData[i] == undefined) continue;
				dataview = new DataView(idxFileData[i].buffer);
			}
			this.indicies[i] = new Index(i);
			for (let j = 0; j < dataview.byteLength; j += 6) {
				let size = dataview.readUint24();
				let segment = dataview.readUint24();
				this.indicies[i].indexSegments.push({ size, segment });
			}

		};

		this.#progress(40);
		return this.#loadIndicies(idx255Data);
	}

	#loadIndicies(idxData) {
		let dataview = new DataView(idxData.buffer);
		//could probably use the indexSegments or remove the weird i = 255 part from loadCacheFiles
		//might look better if j++, but works for now

		let indexPromises = [];

		for (let j = 0; j < dataview.byteLength; j += 6) {
			let size = dataview.readUint24();
			let segment = dataview.readUint24();
			let index = this.indicies[j / 6];
			if (index == undefined) continue;
			let data = this.cacheRequester.readData(index, size, segment);
			//since this is async now the onload is considered complete before its completed
			//this call is completed before loadIndexData is completed
			//the onload promise needs to complete when all of the loadIndexDatas have completed
			data.then(x => {
				this.indicies[x.index.id].loadIndexData(x.decompressedData);
				this.#progress((60) / (dataview.byteLength / 6));
			});

			indexPromises.push(data);
		}

		this.indexPromises = indexPromises;
		return Promise.all(indexPromises);
	}

}