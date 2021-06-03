//should this be a global object? its easier if it is but probably not good oop
var nameHashLookup = {};

class FileData {
	constructor(id) {
		this.id = id;
		this.nameHash = 0;
		this.name = "";
		this.size = 0;
		this.content = [];
	}
}

class ArchiveData {
	constructor() { 
		this.id = 0;
		this.name = "";
		this.hash = 0;
		this.nameHash = 0;
		this.crc = 0;
		this.revision = 0;
		this.filesLoaded = false;
		this.files = [];
	}
	
	loadFiles(data) {
		if(this.files.length == 1){
			this.files[0].content = data;
			return;
		}
		let dataview = new DataView(data.buffer);
		var chunks = dataview.getUint8(data.length - 1);

		var chunkSizes = [];
		for(var i=0;i<this.files.length;i++){
			chunkSizes[i] = [];
		}
		var fileSizes = Array(this.files.length).fill(0);
		
		var streamPosition = data.length - 1 - chunks * this.files.length * 4;

		//the following two loops can be combined in to one
		for(var i=0;i<chunks;i++){
			var chunkSize = 0;
			for(var id = 0; id < this.files.length; id++){
				var delta = dataview.getInt32(streamPosition);
				chunkSize += delta;
				streamPosition += 4;
				chunkSizes[id][i] = chunkSize;
				fileSizes[id] += chunkSize;
			}
		}
		
		var fileOffsets = Array(this.files.length).fill(0);
		
		streamPosition = 0;
		
		for(var i=0;i<chunks; i++){
			for(var id=0;id<this.files.length;id++){
				var chunkSize = chunkSizes[id][i];
				this.files[id].content = new Uint8Array(dataview.buffer.slice(streamPosition,streamPosition+chunkSize));
				streamPosition += chunkSize;
				fileOffsets[id] += chunkSize;
			}
		}
		
		this.filesLoaded = true;
	}
}


class IndexSegment {
	constructor(size, segment) {
		this.size = size;
		this.segment = segment;
	}
}

class Index {
	constructor(id) {
		this.id = id;
		this.protocol = 0;
		this.revision = -1;
		this.hash = 0;
		this.crc = 0;
		this.compression = 0;
		this.named = false;
		this.archivesCount = 0;
		this.archives = {};
		this.indexSegments = [];
	}
	
	loadIndexData(data) {
		let dataview = new DataView(data.buffer);
		var streamPos = 0;
		
		this.protocol = dataview.getUint8(streamPos);
		streamPos+=1;
		
		if(this.protocol >= 6){
			this.revision = dataview.getInt32(streamPos);
			streamPos+=4;
		}
		this.hash = dataview.getUint8(streamPos);
		streamPos+=1;
		
		this.named = (1 & this.hash) != 0;
		
		//var validArchivesCount = protocol >= 7 ? stream.readBigSmart() : stream.readUnsignedShort();
		if(this.protocol >= 7){
			console.log("Warning: Unhandled protcol 7");
			return;
		}
		
		this.archivesCount = dataview.getUint16(streamPos);
		streamPos+=2;

		var lastArchiveId = 0;
		for(var i=0;i<this.archivesCount;i++) {
			var archiveId = lastArchiveId += dataview.getInt16(streamPos);
			streamPos+=2;
			
			this.archives[archiveId] = new ArchiveData();
			this.archives[archiveId].id = archiveId;
		}
		
		var archiveKeys = Object.keys(this.archives);
		
		if(this.named){
			for(var i=0;i<this.archivesCount;i++) {
				var nameHash = dataview.getInt32(streamPos);
				streamPos+=4;
				this.archives[archiveKeys[i]].nameHash = nameHash;
				if(nameHashLookup[nameHash] != undefined)
					this.archives[archiveKeys[i]].name = nameHashLookup[nameHash];
			}
		}
		
		for(var i=0;i<this.archivesCount;i++) {
			var crc = dataview.getInt32(streamPos);
			streamPos+=4;
			this.archives[archiveKeys[i]].crc = crc;
		}
		
		for(var i=0;i<this.archivesCount;i++) {
			var revision = dataview.getInt32(streamPos);
			streamPos+=4;
			this.archives[archiveKeys[i]].revision = revision;
		}
		
		for(var i=0;i<this.archivesCount;i++) {
			var numberOfFiles = dataview.getUint16(streamPos);
			streamPos+=2;
			if(numberOfFiles <= 0)
				console.log(numberOfFiles);
			this.archives[archiveKeys[i]].files = Array(numberOfFiles).fill(undefined);
		}
		
		for(var i=0;i<this.archivesCount;i++) {
			var fileID = 0;
			for(var j=0;j<this.archives[archiveKeys[i]].files.length;j++){
				fileID += dataview.getUint16(streamPos);
				this.archives[archiveKeys[i]].files[j] = new FileData(fileID);
				streamPos+=2;
			}
		}
		
		if(this.named){
			for(var i=0;i<this.archivesCount;i++) {
				for(var j=0;j<this.archives[archiveKeys[i]].files.length;j++){
					var fileName = dataview.getUint32(streamPos);
					streamPos+=4;
					
					this.archives[archiveKeys[i]].files[j].nameHash = fileName;
					
					if(nameHashLookup[fileName] != undefined)
						this.archives[archiveKeys[i]].files[j].name = nameHashLookup[fileName];
					
				}
			}
		}
	}
	
	toString() {
		return this.id;
	}
}

class CacheRequester {
	//should be used to make read requests from the cache
	//this should make it easier to multithread/async this later on
	constructor(rootDir){
		this.datDataPromise = getFileBytes(rootDir+"main_file_cache.dat2");
		this.datDataPromise.then((x) => {
			this.datData = x;
		});
	}
	
	readData(index, size, segment){
		var compressedData = new Uint8Array(size);
		this.readSector(compressedData, segment);
		
		let dataview = new DataView(compressedData.buffer);
		var compressionOpcode = dataview.getUint8(0);
		
		var data = new Uint8Array(dataview.buffer.slice(9,9+dataview.getUint32(1)));
		var decompressedData;
		
		if(compressionOpcode == 0) { //none
			decompressedData = data;
		} else if(compressionOpcode == 1) { //bz2
			var header = "BZh1";
			var bzData = new Uint8Array(4+data.length);
			bzData[0]= 'B'.charCodeAt(0);
			bzData[1]= 'Z'.charCodeAt(0);
			bzData[2]= 'h'.charCodeAt(0);
			bzData[3]= '1'.charCodeAt(0);
			bzData.set(data, 4)
			decompressedData = bz2.decompress(bzData);
		} else if(compressionOpcode == 2) { //gz
			decompressedData = new Uint8Array(gzip.unzip(data));
		}
		
		return decompressedData;
	}

	readSector(buffer, pos){
		var convertedPos = pos * 520;
		
		let dataview = new DataView(this.datData.buffer);
		var nextSector = dataview.getUint24(convertedPos+4);
		var data; 
		
		if(nextSector != 0)
			data = new Uint8Array(dataview.buffer.slice(convertedPos+8,convertedPos+520));
		else
			data = new Uint8Array(dataview.buffer.slice(convertedPos+8,convertedPos+8+(buffer.byteLength%512)));
		
		buffer.set(data, dataview.getInt16(convertedPos+2)*512);

		if(nextSector != 0)
			this.readSector(buffer, nextSector);
	}

}

class CacheDefinitionLoader {
	constructor(indexId, archiveId, files){
		this.indexType = IndexType.valueOf(indexId);
		this.files = files;
	}

	load() {
		if(this.indexType == IndexType.CONFIGS){

		}else{
			for(var i=0;i<this.files.length;i++){
				var def = new this.indexType.loader(this.files[i].content).load();

				//unload archive file memory to replace it with definition info
				this.files[i].content = undefined;
				this.files[i].def = def;
			}
		}
	}
}

class Cache {
	constructor(rootDir){
		this.indicies = {};
		
		this.cacheRequester = new CacheRequester(rootDir);
		this.loadCacheFiles(rootDir);
	}
	
	getAllFiles(indexId, archiveId) {
		var index = this.indicies[indexId];
		if(index == undefined){
			throw "Index " + indexId + " does not exist";
		}
		
		var archive = index.archives[archiveId];
		if(archive == undefined){
			throw "Archive " + archiveId + " does not exist in Index " + indexId;
		}

		//files should only be loaded when they are required. need a better memory management system or something in the future
		if(archive.filesLoaded == false){
			//might be an error here because of index.indexSegments[archiveId]. might need to use archive keys instead of archiveId
			var data = this.cacheRequester.readData(index, index.indexSegments[archiveId].size, index.indexSegments[archiveId].segment)
			archive.loadFiles(data);
			new CacheDefinitionLoader(indexId, archiveId, archive.files).load();
		}
		
		return archive.files;
	}

	//some archives only contain 1 file so a fileId is only needed in some cases
	getFile(indexId, archiveId, fileId = 0) {
		return this.getAllFiles()[fileId];
	}
	
	loadCacheFiles(rootDir) {
		getFile(rootDir+"names.tsv").then((nameData) => {
			var splitNameData = nameData.split("\n");
			for(var i=0;i<splitNameData.length;i++) {
				var tabSplit = splitNameData[i].split("\t");
				nameHashLookup[tabSplit[3]] = tabSplit[4]; //3 = hash, 4 = name
			}
		});
		
		var idx255 = getFileBytes(rootDir+"main_file_cache.idx255");
		var idxFiles = [];

		idx255.then((idx255Data) => {
			var indiciesAmount = idx255Data.length/6; //each section is 6 bits

			for(var i=0;i<indiciesAmount;i++){
				idxFiles.push(getFileBytes(rootDir+"main_file_cache.idx"+i));
			}
			
			//theres probably a better way of doing this
			//also not completely sure yet if this really needs to be done for index 255
			Promise.all(idxFiles).then((idxFileData) => {
				for(var i=0;i<=idxFileData.length;i++){
					var dataview;
					if(i == idxFileData.length){
						dataview = new DataView(idx255Data.buffer);
						i = 255;
					}else{
						dataview = new DataView(idxFileData[i].buffer);
					}
					
					this.indicies[i] = new Index(i);
					
					for(var j=0;j<dataview.byteLength;j+=6){
						var size = (dataview.getUint16(j+0) << 8) | dataview.getUint8(j+2);
						var segment = (dataview.getUint16(j+3) << 8) | dataview.getUint8(j+5);
						//if(indexSegments[i] == undefined) indexSegments[i] = [];
						this.indicies[i].indexSegments.push(new IndexSegment(size,segment));
					}
					
				};
				this.cacheRequester.datDataPromise.then((x) => {
					this.loadIndicies(idx255Data);
				});
				
			});
			
		});
	}
	
	loadIndicies(idxData) {
		var dataview = new DataView(idxData.buffer);
		//could probably use the indexSegments or remove the weird i = 255 part from loadCacheFiles
		//might look better if j++, but works for now
		for(var j=0;j<dataview.byteLength;j+=6) {
			var size = (dataview.getUint16(j+0) << 8) | dataview.getUint8(j+2);
			var segment = (dataview.getUint16(j+3) << 8) | dataview.getUint8(j+5);
			var index = this.indicies[j/6];
			
			var data = this.cacheRequester.readData(index, size, segment);
			index.loadIndexData(data);
		}
	}

}

function getFile(file) {
  var xhttp = new XMLHttpRequest();
  return new Promise((resolve,reject) => {
	  xhttp.onreadystatechange = function() {
		if(xhttp.readyState === XMLHttpRequest.DONE) {
		  resolve(this.responseText);
		}
	  };
	  xhttp.open("GET", file, true);
	  try{
		xhttp.send();
	  }catch(e){}
  })
}

function getFileBytes(file) {
  var xhttp = new XMLHttpRequest();
  return new Promise((resolve,reject) => {
	  xhttp.onreadystatechange = function() {
		if(xhttp.readyState === XMLHttpRequest.DONE) {
		  resolve(new Uint8Array(this.response));
		}
	  };
	  xhttp.open("GET", "cache/"+file, true);
	  xhttp.responseType = "arraybuffer";
	  try{
		xhttp.send();
	  }catch(e){}
  })
}



