import * as Ajax from './helpers/ajax.js'
import * as DataViewImport from './helpers/DataView.js'

import CacheDefinitionLoader from './CacheDefinitionLoader.js'
import CacheRequester from './CacheRequester.js'

import Index from './cacheTypes/Index.js'
import nameHashLookup from './HashConverter.js'

export default class RSCache {
	constructor(cacheRootDir = "./", progressFunc = () => { }, nameRootDir = undefined) {
		this.indicies = {};
		this.progressFunc = progressFunc;

		this.cacheRequester = new CacheRequester(cacheRootDir);
		this.onload = this.loadCacheFiles(cacheRootDir, nameRootDir);
	}

	progress(amount) {
		this.progressFunc(amount);
	}

	async getAllFiles(indexId, archiveId, threaded = false) {
		
		return new Promise((resolve, reject) => {
			let index = this.indicies[indexId];
			if (index == undefined) {
				throw "Index " + indexId + " does not exist";
			}

			let archive = index.archives[archiveId];
			
			if (archive == undefined) {
				throw "Archive " + archiveId + " does not exist in Index " + indexId;
			}
			//files should only be loaded when they are required. need a better memory management system or something in the future
			//console.log(archive.filesLoaded);
			if (archive.filesLoaded == false) {
				//might be an error here because of index.indexSegments[archiveId]. might need to use archive keys instead of archiveId
				let data;
				//console.log(index, index.indexSegments[archiveId].size, index.indexSegments[archiveId].segment, archiveId);
				if (threaded)
					data = this.cacheRequester.readDataThreaded(index, index.indexSegments[archiveId].size, index.indexSegments[archiveId].segment, archiveId);
				else
					data = this.cacheRequester.readData(index, index.indexSegments[archiveId].size, index.indexSegments[archiveId].segment, archiveId);
				//console.log(data);
				return data.then(x => {
					archive = index.archives[x.archiveId];

					//console.log(archive);
					//console.log(x);
					//console.log(archive.filesLoaded);
					if (archive.filesLoaded) {
						resolve(archive.files);
						return;
					}
					//console.log(x);
					//console.log(index, archiveId);
					archive.loadFiles(x.decompressedData);
					//console.log(archive);
					new CacheDefinitionLoader(x.index.id, x.archiveId, archive.files).load(this).then(() => {
						archive.filesLoaded = true;
						resolve(archive.files)
					});
				});

			} else {
				resolve(archive.files);
			}

			//resolve(archive.files);

		});

	}

	//some archives only contain 1 file so a fileId is only needed in some cases
	getFile(indexId, archiveId, fileId = 0, threaded = false) {
		//console.log("Archive ID", archiveId);
		return this.getAllFiles(indexId, archiveId, threaded).then((x) => x[fileId]);
	}

	loadCacheFiles(rootDir, namesRootDir) {

		//this is basically relying on loading faster than the other stuff. probably should merge this with something
		if (namesRootDir != undefined) {
			Ajax.getFile(namesRootDir + "names.tsv").then((nameData) => {
				let splitNameData = nameData.split("\n");
				for (let i = 0; i < splitNameData.length; i++) {
					let tabSplit = splitNameData[i].split("\t");
					nameHashLookup[tabSplit[3]] = tabSplit[4]; //3 = hash, 4 = name
				}
			});
		}

		let idx255 = Ajax.getFileBytes(rootDir + "main_file_cache.idx255");
		let idxFiles = [];

		return idx255.then((idx255Data) => {
			//console.log("idx255 loaded");
			let indiciesAmount = idx255Data.length / 6; //each section is 6 bits

			for (let i = 0; i < indiciesAmount; i++) {
				idxFiles.push(Ajax.getFileBytes(rootDir + "main_file_cache.idx" + i));
			}

			//theres probably a better way of doing this
			//also not completely sure yet if this really needs to be done for index 255
			return Promise.all(idxFiles).then((idxFileData) => {
				for (let i = 0; i <= idxFileData.length; i++) {
					let dataview;
					if (i == idxFileData.length) { //ugly fix, needs to be improved
						dataview = new DataView(idx255Data.buffer);
						i = 255;
					} else {
						dataview = new DataView(idxFileData[i].buffer);
					}

					this.indicies[i] = new Index(i);
					for (let j = 0; j < dataview.byteLength; j += 6) {
						let size = dataview.readUint24();
						let segment = dataview.readUint24();
						
						this.indicies[i].indexSegments.push({ size, segment });
					}

				};

				return this.cacheRequester.datDataPromise.then((x) => {
					this.progress(40);
					return this.loadIndicies(idx255Data);
				});

			});

		});
	}

	loadIndicies(idxData) {
		let dataview = new DataView(idxData.buffer);
		//could probably use the indexSegments or remove the weird i = 255 part from loadCacheFiles
		//might look better if j++, but works for now

		let indexPromises = [];

		for (let j = 0; j < dataview.byteLength; j += 6) {
			let size = dataview.readUint24();
			let segment = dataview.readUint24();
			let index = this.indicies[j / 6];
			let data = this.cacheRequester.readData(index, size, segment);
			//since this is async now the onload is considered complete before its completed
			//this call is completed before loadIndexData is completed
			//the onload promise needs to complete when all of the loadIndexDatas have completed
			data.then(x => {
				this.indicies[x.index.id].loadIndexData(x.decompressedData);
				this.progress((60) / (dataview.byteLength / 6));
			});

			indexPromises.push(data);


			//index.loadIndexData(data);
		}
		this.indexPromises = indexPromises;
		//console.log(indexPromises);
		return Promise.all(indexPromises);
	}

}