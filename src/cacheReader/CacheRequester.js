import * as gzip from 'gzip-js'
import * as Ajax from './helpers/ajax.js'
import Worker from "web-worker"
import IndexType from './cacheTypes/IndexType.js'

import bz2Decompress from "bz2";

export default class CacheRequester {
	constructor(datFile) {
		this.promises = {};
		this.datData = datFile;

		/*
				if ('caches' in window) { //if we are able to use cache api
					var request = rootDir + "cache/" + "main_file_cache.dat2";
					this.datDataPromise = caches.open('osrsrenderer').then((browserCache) => {
						return caches.has(request).then((cacheExists) => {
							if (!cacheExists) {
								return browserCache.add(request).then(() => {
									//needs to be retrieved after its been added otherwise will return undefined
									return browserCache.match(request)
										.then((response) => response.blob())
										.then((blob) => blob.arrayBuffer());
								});
							} else {
								return browserCache.match(request)
									.then((response) => response.blob())
									.then((blob) => blob.arrayBuffer());
							}
						});
					});
		
					this.datDataPromise.then((blobArray) => {
						this.datData = new Uint8Array(blobArray);
					});
		
				} else {
					this.datDataPromise = Ajax.getFileBytes(rootDir + "main_file_cache.dat2");
					this.datDataPromise.then((x) => {
						this.datData = x;
					});
				}
		*/


	}

	setXteas(xteas) {
		this.xteas = xteas;
	}

	readDataThreaded(index, size, segment, archiveId = 0) {
		var promiseResolve;
		var readPromise = new Promise((resolve, reject) => { promiseResolve = resolve; });

		if (this.promises[index] == undefined)
			this.promises[index] = {};

		if (this.promises[index][archiveId] == undefined) {
			this.promises[index][archiveId] = [];

			var compressedData = new Uint8Array(size);
			this.readSector(compressedData, segment, archiveId);

			compressedData = compressedData.buffer;
			//console.log(compressedData);
			var localWorker = new Worker(new URL('./worker.js', import.meta.url));

			localWorker.postMessage({ index, segment, archiveId, compressedData }, [compressedData]);
			//console.log(compressedData);
			localWorker.onmessage = (event) => {
				event.data.decompressedData = new Uint8Array(event.data.decompressedData);

				var length = this.promises[event.data.index.id][event.data.archiveId].length;
				for (var i = 0; i < length; i++) {
					this.promises[event.data.index.id][event.data.archiveId][i](event.data);
				}
				this.promises[event.data.index.id][event.data.archiveId] = undefined;
				localWorker.terminate();
				//delete localWorker;
				localWorker = undefined;
			};
		}

		this.promises[index][archiveId].push(promiseResolve);

		return readPromise;
	}

	readData(index, size, segment, archiveId = 0, keys) {
		/*
		this.worker.onmessage = function(event) {
			//event.data.decompressedData
			console.log(event);
		};
		*/
		let key;
		if (index.id == IndexType.MAPS.id && this.xteas != undefined) {
			if (this.xteas[archiveId] != undefined) {//if its not a mapdef then it will have a key
				key = this.xteas[archiveId].key;
			}
		}

		return Promise.resolve().then(() => {
			var compressedData = new Uint8Array(size);
			this.readSector(compressedData, segment, archiveId);

			let dataview = new DataView(compressedData.buffer);
			var compressionOpcode = dataview.getUint8(0);
			var compressedLength = dataview.getUint32(1);

			var data;
			var decompressedData;
			//console.log(compressionOpcode);
			if (compressionOpcode == 0) { //none
				data = new Uint8Array(dataview.buffer.slice(5, 9 + compressedLength));
				data = this.decrypt(data, compressedLength, key);
				decompressedData = data;
				index.revision = dataview.getUint16(data.buffer.byteLength)
			} else if (compressionOpcode == 1) { //bz2
				data = new Uint8Array(dataview.buffer.slice(9, 9 + compressedLength));
				this.decrypt(data, compressedLength, key);
				var header = "BZh1";
				var bzData = new Uint8Array(4 + data.length);
				bzData[0] = 'B'.charCodeAt(0);
				bzData[1] = 'Z'.charCodeAt(0);
				bzData[2] = 'h'.charCodeAt(0);
				bzData[3] = '1'.charCodeAt(0);
				bzData.set(data, 4)

				if (bz2Decompress != undefined && bz2Decompress.decompress != undefined) {
					decompressedData = bz2Decompress.decompress(bzData);
				} else {
					decompressedData = bz2.decompress(bzData);
				}
			} else if (compressionOpcode == 2) { //gzip
				//console.log(compressedData);
				//console.log(compressedLength);
				//console.log(new Int8Array(dataview.buffer).slice(5, 9 + compressedLength));
				let unencryptedData = new Uint8Array(dataview.buffer.slice(5, 9 + compressedLength));
				data = this.decrypt(unencryptedData, unencryptedData.length, key);
				let leftOver = unencryptedData.slice(data.length);

				var mergedArray = new Uint8Array(data.length + leftOver.length);
				mergedArray.set(data);
				mergedArray.set(leftOver, data.length);

				//console.log(data);
				//console.log(leftOver);
				//console.log(mergedArray);
				//add the end of the compressed data onto the decrypted?
				let decryptedDataview = new DataView(mergedArray.buffer);

				data = new Uint8Array(decryptedDataview.buffer.slice(4))
				//console.log(new Uint8Array(dataview.buffer)+"");
				let unzipped;

				try {
					//console.log("unzipping");
					unzipped = gzip.unzip(data);
					//console.log("unzipped");
				} catch {
					throw "Could not unzip with key:" + key;
				}

				decompressedData = new Uint8Array(unzipped);

			}

			return { index, archiveId, decompressedData };
		});
	}

	readSector(buffer, pos, archiveId) {
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
		if (nextSector != 0 || buffer.byteLength == 512 || buffer.byteLength % 512 == 0)
			data = new Uint8Array(dataview.buffer.slice(convertedPos + 8, convertedPos + 520));
		else
			data = new Uint8Array(dataview.buffer.slice(convertedPos + 8, convertedPos + 8 + (buffer.byteLength % 512)));

		buffer.set(data, dataview.getInt16(convertedPos + 2) * 512);

		if (nextSector != 0)
			this.readSector(buffer, nextSector);

	}

	decrypt(data, len, key) {
		if (key == undefined) {
			return data;
		}

		let GOLDEN_RATIO = 0x9E3779B9;
		let ROUNDS = 32;

		let dataview = new DataView(data.buffer);
		let out = [];

		let numBlocks = Math.floor(len / 8);
		//console.log(numBlocks);
		for (let block = 0; block < numBlocks; ++block) {
			let v0 = dataview.readInt32();
			let v1 = dataview.readInt32();
			let sum = GOLDEN_RATIO * ROUNDS;
			for (let i = 0; i < ROUNDS; ++i) {
				v1 -= (((v0 << 4) ^ (v0 >>> 5)) + v0) ^ (sum + key[(sum >>> 11) & 3]);
				sum -= GOLDEN_RATIO;
				v0 -= (((v1 << 4) ^ (v1 >>> 5)) + v1) ^ (sum + key[sum & 3]);
			}
			out.push((v0 >> 24) & 0xFF);
			out.push((v0 >> 16) & 0xFF);
			out.push((v0 >> 8) & 0xFF);
			out.push(v0 & 0xFF);

			out.push((v1 >> 24) & 0xFF);
			out.push((v1 >> 16) & 0xFF);
			out.push((v1 >> 8) & 0xFF);
			out.push(v1 & 0xFF);
		}

		return new Uint8Array(out);
	}


}