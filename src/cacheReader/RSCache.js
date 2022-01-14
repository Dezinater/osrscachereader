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

		this.onload = this.loadCacheFiles(cacheRootDir, "./", nameRootDir).then(() => {
			this.cacheRequester.setXteas(this.xteas);
		});
	}

	progress(amount) {
		this.progressFunc(amount);
	}



	async getAllFiles(indexId, archiveId, threaded = false) {
		let index = this.indicies[indexId];
		if (index == undefined) {
			throw "Index " + indexId + " does not exist";
		}

		let archive = index.archives[archiveId];

		if (archive == undefined) {
			throw "Archive " + archiveId + " does not exist in Index " + indexId;
		}

		if (archive.filesLoaded) {
			return archive.files;
		}

		if (this.loadRequests == undefined) this.loadRequests = [];
		if (this.loadRequests[indexId] == undefined) this.loadRequests[indexId] = {};
		if (this.loadRequests[indexId][archiveId] == undefined) this.loadRequests[indexId][archiveId] = [];
		//this.loadRequests[indexId][archiveId]++;


		//console.log(this.loadRequests[indexId][archiveId]);
		let newPromise = new Promise((resolve, reject) => {
			this.loadRequests[indexId][archiveId].push(resolve);
		});

		//if theres already one processing then just add it to the stack
		if (this.loadRequests[indexId][archiveId].length > 1) {
			return newPromise;
		}

		let data;

		if (threaded)
			data = this.cacheRequester.readDataThreaded(index, index.indexSegments[archiveId].size, index.indexSegments[archiveId].segment, archiveId);
		else
			data = this.cacheRequester.readData(index, index.indexSegments[archiveId].size, index.indexSegments[archiveId].segment, archiveId);

		data.then(x => {
			archive = index.archives[x.archiveId];

			archive.loadFiles(x.decompressedData);
			new CacheDefinitionLoader(x.index.id, archive).load(this).then(() => {
				archive.filesLoaded = true;
				//console.log(this.loadRequests[indexId][archiveId]);
				for(let i=0;i<this.loadRequests[indexId][archiveId].length;i++){
					this.loadRequests[indexId][archiveId][i](archive.files);
				}
			});
		});

		return newPromise;
		//console.log(indexId, archiveId, archive.filesLoaded)
		/*
				return new Promise((resolve, reject) => {
					//files should only be loaded when they are required. need a better memory management system or something in the future
					//console.log(archive.filesLoaded);
					if (archive.filesLoaded == false) {
						let data;
		
						if (threaded)
							data = this.cacheRequester.readDataThreaded(index, index.indexSegments[archiveId].size, index.indexSegments[archiveId].segment, archiveId);
						else
							data = this.cacheRequester.readData(index, index.indexSegments[archiveId].size, index.indexSegments[archiveId].segment, archiveId);
		
						return data.then(x => {
							archive = index.archives[x.archiveId];
		
							if (archive.filesLoaded) {
								resolve(archive.files);
								return;
							}
							archive.loadFiles(x.decompressedData);
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
		*/
	}

	//some archives only contain 1 file so a fileId is only needed in some cases
	getFile(indexId, archiveId, fileId = 0, threaded = false) {
		//console.log("Archive ID", archiveId);
		return this.getAllFiles(indexId, archiveId, threaded).then((x) => x[fileId]);
	}

	loadCacheFiles(rootDir, xteasDir, namesRootDir) {

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

		if (xteasDir != undefined) {
			Ajax.getFile(xteasDir + "xteas.json").then((xteasData) => {
				let xteas = JSON.parse(xteasData);
				this.xteas = {};
				for (var i = 0; i < xteas.length; i++) {
					this.xteas[xteas[i].group] = xteas[i];
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