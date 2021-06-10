import * as Ajax from './helpers/ajax.js'
import * as DataViewImport from './helpers/DataView.js'

import CacheDefinitionLoader from './CacheDefinitionLoader.js'
import CacheRequester from './CacheRequester.js'

import Index from './cacheTypes/Index.js'
import nameHashLookup from './HashConverter.js'

export default class RSCache {
	constructor(cacheRootDir = "./", nameRootDir = undefined) {
		this.indicies = {};

		this.cacheRequester = new CacheRequester(cacheRootDir);
		this.onload = this.loadCacheFiles(cacheRootDir, nameRootDir);
	}

	getAllFiles(indexId, archiveId) {
		var index = this.indicies[indexId];
		if (index == undefined) {
			throw "Index " + indexId + " does not exist";
		}

		var archive = index.archives[archiveId];
		if (archive == undefined) {
			throw "Archive " + archiveId + " does not exist in Index " + indexId;
		}
		//files should only be loaded when they are required. need a better memory management system or something in the future
		if (archive.filesLoaded == false) {
			//might be an error here because of index.indexSegments[archiveId]. might need to use archive keys instead of archiveId
			var data = this.cacheRequester.readData(index, index.indexSegments[archiveId].size, index.indexSegments[archiveId].segment, archiveId)
			archive.loadFiles(data);
			new CacheDefinitionLoader(indexId, archiveId, archive.files).load();
		}

		return archive.files;
	}

	//some archives only contain 1 file so a fileId is only needed in some cases
	getFile(indexId, archiveId, fileId = 0) {
		return this.getAllFiles(indexId, archiveId)[fileId];
	}

	loadCacheFiles(rootDir, namesRootDir) {

		//this is basically relying on loading faster than the other stuff. probably should merge this with something
		if (namesRootDir != undefined) {
			Ajax.getFile(namesRootDir + "names.tsv").then((nameData) => {
				var splitNameData = nameData.split("\n");
				for (var i = 0; i < splitNameData.length; i++) {
					var tabSplit = splitNameData[i].split("\t");
					nameHashLookup[tabSplit[3]] = tabSplit[4]; //3 = hash, 4 = name
				}
			});
		}

		var idx255 = Ajax.getFileBytes(rootDir + "main_file_cache.idx255");
		var idxFiles = [];

		return idx255.then((idx255Data) => {
			var indiciesAmount = idx255Data.length / 6; //each section is 6 bits

			for (var i = 0; i < indiciesAmount; i++) {
				idxFiles.push(Ajax.getFileBytes(rootDir + "main_file_cache.idx" + i));
			}

			//theres probably a better way of doing this
			//also not completely sure yet if this really needs to be done for index 255
			return Promise.all(idxFiles).then((idxFileData) => {
				for (var i = 0; i <= idxFileData.length; i++) {
					var dataview;
					if (i == idxFileData.length) { //ugly fix, needs to be improved
						dataview = new DataView(idx255Data.buffer);
						i = 255;
					} else {
						dataview = new DataView(idxFileData[i].buffer);
					}

					this.indicies[i] = new Index(i);

					for (var j = 0; j < dataview.byteLength; j += 6) {
						var size = dataview.readUint24();
						var segment = dataview.readUint24();
						//if(indexSegments[i] == undefined) indexSegments[i] = [];
						//this.indicies[i].indexSegments.push(new IndexSegment(size,segment));
						this.indicies[i].indexSegments.push({ size, segment });
					}

				};

				return this.cacheRequester.datDataPromise.then((x) => {
					this.loadIndicies(idx255Data);
				});

			});

		});
	}

	loadIndicies(idxData) {
		var dataview = new DataView(idxData.buffer);
		//could probably use the indexSegments or remove the weird i = 255 part from loadCacheFiles
		//might look better if j++, but works for now
		for (var j = 0; j < dataview.byteLength; j += 6) {
			var size = dataview.readUint24();
			var segment = dataview.readUint24();
			var index = this.indicies[j / 6];
			var data = this.cacheRequester.readData(index, size, segment);
			index.loadIndexData(data);
		}
	}

}