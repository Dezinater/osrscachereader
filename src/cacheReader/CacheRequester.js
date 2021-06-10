var gzip = require('gzip-js');
import * as Ajax from './helpers/ajax.js'
import { decompress } from 'bz2';


export default class CacheRequester {
	//should be used to make read requests from the cache
	//this should make it easier to multithread/async this later on
	constructor(rootDir){
		this.datDataPromise = Ajax.getFileBytes(rootDir+"main_file_cache.dat2");
		this.datDataPromise.then((x) => {
			this.datData = x;
		});
	}
	
	readData(index, size, segment, archiveId = 0){
		var compressedData = new Uint8Array(size);
		
		this.readSector(compressedData, segment, archiveId);
		
		let dataview = new DataView(compressedData.buffer);
		var compressionOpcode = dataview.getUint8(0);
		var compressedLength = dataview.getUint32(1);

		var data;
		var decompressedData;
		
		if(compressionOpcode == 0) { //none
			data = new Uint8Array(dataview.buffer.slice(5,9+compressedLength));
			decompressedData = data;
			index.revision = dataview.getUint16(data.buffer.byteLength)
		} else if(compressionOpcode == 1) { //bz2
			data = new Uint8Array(dataview.buffer.slice(9,9+compressedLength));
			var header = "BZh1";
			var bzData = new Uint8Array(4+data.length);
			bzData[0]= 'B'.charCodeAt(0);
			bzData[1]= 'Z'.charCodeAt(0);
			bzData[2]= 'h'.charCodeAt(0);
			bzData[3]= '1'.charCodeAt(0);
			bzData.set(data, 4)
			decompressedData = bz2.decompress(bzData);
		} else if(compressionOpcode == 2) { //gzip
			data = new Uint8Array(dataview.buffer.slice(9,9+compressedLength));
			decompressedData = new Uint8Array(gzip.unzip(data));
		}
		
		return decompressedData;
	}

	readSector(buffer, pos, archiveId){
		var convertedPos = pos * 520;
		
		let dataview = new DataView(this.datData.buffer);

		var currentArchive;
		var currentPart;
		var nextSector;
		var currentIndex;


		if (archiveId > 0xFFFF) {
			currentArchive = dataview.getUint32(convertedPos + 0);
			currentPart = dataview.getUint16(convertedPos + 4);
			nextSector = dataview.getUint24(convertedPos + 6);
			currentIndex = dataview.getUint8(convertedPos + 4);
		} else {
			currentArchive = dataview.getUint16(convertedPos + 0);
			currentPart = dataview.getUint16(convertedPos + 2);
			nextSector = dataview.getUint24(convertedPos + 4);
			currentIndex = dataview.getUint8(convertedPos + 7);
		}

		var data; 
		if(nextSector != 0 || buffer.byteLength == 512)
			data = new Uint8Array(dataview.buffer.slice(convertedPos+8,convertedPos+520));
		else
			data = new Uint8Array(dataview.buffer.slice(convertedPos+8,convertedPos+8+(buffer.byteLength%512)));
		
		buffer.set(data, dataview.getInt16(convertedPos+2)*512);

		if(nextSector != 0)
			this.readSector(buffer, nextSector);
	}

}