class Index {
	constructor(id) {  // Constructor
		this.id = id;
		this.protocol = 0;
		this.revision = 0;
		this.hash = 0;
		this.crc = 0;
		this.compression = 0;
		this.named = false;
		this.archives = {};
	}
	
	toString() {
		return this.id;
	}
}

class IndexSegment {
	constructor(size, segment) {  // Constructor
		this.size = size;
		this.segment = segment;
	}
}

class ArchiveData {
	constructor() {  // Constructor
		this.id = 0;
		this.name = "";
		this.hash = 0;
		this.nameHash = 0;
		this.crc = 0;
		this.revision = 0;
		this.files = [];
	}
}
class FileData {
	constructor(id) {  // Constructor
		this.id = id;
		this.nameHash = 0;
		this.name = "";
		this.size = 0;
	}
}

readCacheFiles();


var indexSegments = {};
var datData;
var archives = [];
var indicies = {};
var nameHashLookup = {};

function loadIndicies() {
	var idx255 = getFileBytes("main_file_cache.idx255");
	var nameHashes = getFile("names.tsv");
	Promise.all([idx255, nameHashes]).then((x) => {
		var idxData = x[0];
		var nameData = x[1];
		
		var splitNameData = nameData.split("\n");
		for(var i=0;i<splitNameData.length;i++) {
			var tabSplit = splitNameData[i].split("\t");
			var hash = tabSplit[3];
			var name = tabSplit[4];
			
			nameHashLookup[hash] = name;
		}
		
		var dataview = new DataView(idxData.buffer);

		for(j=0;j<dataview.byteLength;j+=6) {
			var size = (dataview.getUint16(j+0) << 8) | dataview.getUint8(j+2);
			var segment = (dataview.getUint16(j+3) << 8) | dataview.getUint8(j+5);
			
			indicies[j/6] = new Index(j/6);
			readIndex(indicies[j/6], size, segment);
		}
		
		
	});
}

function readIndex(index, size, pos){
	var data = readData(index, size, pos);
	loadIndexData(index, data);
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




function readData(index, id){
	console.log(indexSegments[index.id][id]);
	return readData(index, indexSegments[index.id][id].size, indexSegments[index.id][id].segment);
}

function readData(index, size, segment, logging = false){
	//console.log(index + " " + size + " " + segment);
	var compressedData = new Uint8Array(size);
	readAllData(compressedData, segment);
	if(logging){
		console.log(compressedData);
	}
	let dataview = new DataView(compressedData.buffer);
	//console.log("Index: " + index);
	var compressionOpcode = dataview.getUint8(0);
	if(logging){
		console.log("Compression OPcode: " + compressionOpcode);
		console.log("Compressed Size:   " + dataview.getUint32(1));
		console.log("Uncompressed Size: " +dataview.getUint32(5));
	}
	var data = new Uint8Array(dataview.buffer.slice(9,9+dataview.getUint32(1)));
	var decompressedData;
	
	index.compression = compressionOpcode;
	
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
	
	//console.log(decompressedData);
	return decompressedData;
}


function loadIndexData(index, data) {
	console.log("");
	let dataview = new DataView(data.buffer);
	var streamPos = 0;
	
	var protocol = dataview.getUint8(streamPos);
	var revision = -1;
	streamPos+=1;
	console.log("Index: " + index.id);
	console.log("Protocol: " + protocol);
	if(protocol >= 6){
		revision = dataview.getInt32(streamPos);
		console.log("Revision: " + dataview.getInt32(streamPos));
		streamPos+=4;
	}
	var hash = dataview.getUint8(streamPos);
	streamPos+=1;
	
	var named = (1 & hash) != 0;
	console.log("Hash: " + hash);
	console.log("Named: " + ((1 & hash) != 0));
	
	index.protocol = protocol;
	index.revision = revision;
	index.hash = hash;
	index.named = named;
	
	//var validArchivesCount = protocol >= 7 ? stream.readBigSmart() : stream.readUnsignedShort();
	if(protocol >= 7){
		console.log("Error: unhandled protcol 7");
		return;
	}
	
	var archivesCount = dataview.getUint16(streamPos);
	streamPos+=2;
	console.log("Archives Count: " + archivesCount);

	var lastArchiveId = 0;
	for(var i=0;i<archivesCount;i++) {
		var archiveId = lastArchiveId += dataview.getInt16(streamPos);
		streamPos+=2;
		
		index.archives[archiveId] = new ArchiveData();
		index.archives[archiveId].id = archiveId;
	}
	var archiveKeys = Object.keys(index.archives);
	
	
	if(named){
		for(var i=0;i<archivesCount;i++) {
			var nameHash = dataview.getInt32(streamPos);
			streamPos+=4;
			index.archives[archiveKeys[i]].nameHash = nameHash;
			if(nameHashLookup[nameHash] != undefined)
				index.archives[archiveKeys[i]].name = nameHashLookup[nameHash];
		}
	}
	
	for(var i=0;i<archivesCount;i++) {
		var crc = dataview.getInt32(streamPos);
		streamPos+=4;
		index.archives[archiveKeys[i]].crc = crc;
	}
	
	for(var i=0;i<archivesCount;i++) {
		var revision = dataview.getInt32(streamPos);
		streamPos+=4;
		index.archives[archiveKeys[i]].revision = revision;
	}
	
	for(var i=0;i<archivesCount;i++) {
		var numberOfFiles = dataview.getUint16(streamPos);
		streamPos+=2;
		if(numberOfFiles <= 0)
			console.log(numberOfFiles);
		index.archives[archiveKeys[i]].files = Array(numberOfFiles).fill(undefined);
	}
	
	for(var i=0;i<archivesCount;i++) {
		var fileID = 0;
		for(var j=0;j<index.archives[archiveKeys[i]].files.length;j++){
			fileID += dataview.getUint16(streamPos);
			index.archives[archiveKeys[i]].files[j] = new FileData(fileID);
			streamPos+=2;
		}
	}
	
	if(named){
		for(var i=0;i<archivesCount;i++) {
			for(var j=0;j<index.archives[archiveKeys[i]].files.length;j++){
				var fileName = dataview.getUint32(streamPos);
				streamPos+=4;
				
				index.archives[archiveKeys[i]].files[j].nameHash = fileName;
				
				if(nameHashLookup[fileName] != undefined)
					index.archives[archiveKeys[i]].files[j].name = nameHashLookup[fileName];
				
			}
		}
	}
	
	if(index.id != 2)
		return;
	for(var i=0;i<archivesCount;i++){
		
		if (i == 1077){
			//console.log(i + " " + indexSegments[index.id][i].size + " " + indexSegments[index.id][i].segment);
			
			var archiveData = new Uint8Array(indexSegments[index.id][i].size);
			readAllData(archiveData, indexSegments[index.id][i].segment);
			//console.log(archiveData);
			
			//readFiles(index.archives[i], readData(index, indexSegments[index.id][i].size, indexSegments[index.id][i].segment, true));
			//readFiles(index.archives[i], archiveData);
		}
		try{
				//var archiveData = new Uint8Array(indexSegments[index.id][i].size);
				//readAllData(archiveData, indexSegments[index.id][i].segment);
				//readFiles(index.archives[i], archiveData);
			//console.log(readData(index, indexSegments[index.id][archiveKeys[i]].size, indexSegments[index.id][archiveKeys[i]].segment));
			readFiles(index.archives[archiveKeys[i]], readData(index, indexSegments[index.id][archiveKeys[i]].size, indexSegments[index.id][archiveKeys[i]].segment));
		}catch(e){
			console.log(i);
				//console.log(archiveData);
				console.log(e);
			return;
		}
	}
	
}


function readFiles(archive, data){
	if(archive.files.length == 1){
		archive.files[0].content = data;
		return;
	}
	let dataview = new DataView(data.buffer);
	var chunks = dataview.getUint8(data.length - 1);
	//console.log("Chunks: " + chunks);
	//console.log("Size: " + (chunks * archive.files.length * 4));
	
	var chunkSizes = [];
	for(var i=0;i<archive.files.length;i++){
		chunkSizes[i] = [];
	}
	var fileSizes = Array(archive.files.length).fill(0);
	
	var streamPosition = data.length - 1 - chunks * archive.files.length * 4;
	//console.log(archive);
	//console.log(streamPosition);
	//these two loops can be combined in to one
	for(var i=0;i<chunks;i++){
		var chunkSize = 0;
		for(var id = 0; id < archive.files.length; id++){
			var delta = dataview.getInt32(streamPosition);
			chunkSize += delta;
			streamPosition += 4;
			//if (id % 1000 == 0) console.log(chunkSize);
			chunkSizes[id][i] = chunkSize;
			fileSizes[id] += chunkSize;
		}
	}
	
	//console.log(streamPosition);
	//console.log(chunkSizes);
	//console.log(fileSizes);
	var fileOffsets = Array(archive.files.length).fill(0);
	
	streamPosition = 0;
	
	for(var i=0;i<chunks; i++){
		for(var id=0;id<archive.files.length;id++){
			var chunkSize = chunkSizes[id][i];
			//if(i%1000==0) console.log(fileOffsets[id] + " " + chunkSize + " " + streamPosition + " " + (data.length-streamPosition));
			archive.files[id].content = new Uint8Array(dataview.buffer.slice(streamPosition,streamPosition+chunkSize));
			streamPosition += chunkSize;
			fileOffsets[id] += chunkSize;
		}
	}
	return;
}

function readAllData(buffer, pos){
	var convertedPos = pos * 520;
	
	let dataview = new DataView(datData.buffer);
	var nextSector = dataview.getUint24(convertedPos+4);
	var data; 
	
	if(nextSector != 0)
		data = new Uint8Array(dataview.buffer.slice(convertedPos+8,convertedPos+520));
	else
		data = new Uint8Array(dataview.buffer.slice(convertedPos+8,convertedPos+8+(buffer.byteLength%512)));
	
	//console.log("Container ID: " +dataview.getInt16(convertedPos+0));
	//console.log("Segment Position: " +dataview.getInt16(convertedPos+2));
	//console.log("Next Segement Number: " +nextSector);
	//console.log("Index File ID: " +dataview.getUint8(convertedPos+7));
	//console.log(data);
	//console.log("");
	
	buffer.set(data, dataview.getInt16(convertedPos+2)*512);

	if(nextSector != 0)
		readAllData(buffer, nextSector);
}

function readCacheFiles() {
	var datFile = getFileBytes("main_file_cache.dat2");
	var idx255 = getFileBytes("main_file_cache.idx255");
	var idxFiles = [];
	datFile.then((x) => {
		datData = x;
	});
	idx255.then((x) => {
		var indiciesAmount = x.length/6;
		console.log("255("+x.length/6+")");

		for(var i=0;i<indiciesAmount;i++){
			idxFiles.push(getFileBytes("main_file_cache.idx"+i));
		}
		
		Promise.all(idxFiles).then((idxFileData) => {
			for(var i=0;i<=idxFileData.length;i++){
				var dataview;
				if(i == idxFileData.length){
					dataview = new DataView(x.buffer);
					i = 255;
				}else{
					dataview = new DataView(idxFileData[i].buffer);
				}

				for(j=0;j<dataview.byteLength;j+=6){
					var size = (dataview.getUint16(j+0) << 8) | dataview.getUint8(j+2);
					var segment = (dataview.getUint16(j+3) << 8) | dataview.getUint8(j+5);
					if(indexSegments[i] == undefined) indexSegments[i] = [];
					indexSegments[i].push(new IndexSegment(size,segment));
				}
				
				//console.log(i+"("+idxFileData[i].length/6+"): " + size + " " + segment);
			};
		});
		
	});
}
