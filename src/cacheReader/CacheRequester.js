import * as Ajax from './helpers/ajax.js'

export default class CacheRequester {
	//should be used to make read requests from the cache
	//this should make it easier to multithread/async this later on
	constructor(rootDir){
		this.datDataPromise = Ajax.getFileBytes(rootDir+"main_file_cache.dat2");
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