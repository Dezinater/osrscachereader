import * as gzip from 'gzip-js'
import IndexType from './cacheTypes/IndexType.js'

import Bzip2 from "@foxglove/wasm-bz2";
import WorkerPool from './WorkerPool.js';

export default class CacheRequester {
	constructor(datFile) {
		this.workerPool = new WorkerPool(8);
		this.promises = {};
		this.datData = datFile;
	}

	setXteas(xteas) {
		this.xteas = xteas;
	}

	readDataThreaded(index, size, segment, archiveId = 0) {
		let key;
		if (index.id == IndexType.MAPS.id && this.xteas != undefined) {
			if (this.xteas[archiveId] != undefined) {//if its not a mapdef then it will have a key
				key = this.xteas[archiveId].key;
			}
		}

		let compressedData = new Uint8Array(size);
		this.readSector(compressedData, segment, archiveId);
		compressedData = compressedData.buffer;

		return this.workerPool.doWork(index, segment, archiveId, compressedData, key);
	}

	readData(index, size, segment, archiveId = 0, keys) {
		let key;
		if (index.id == IndexType.MAPS.id && this.xteas != undefined) {
			if (this.xteas[archiveId] != undefined) {//if its not a mapdef then it will have a key
				key = this.xteas[archiveId].key;
			}
		}

		return new Promise(async (resolve, reject) => {
			let compressedData = new Uint8Array(size);
			this.readSector(compressedData, segment, archiveId);

			let dataview = new DataView(compressedData.buffer);
			let compressionOpcode = dataview.getUint8(0);
			let compressedLength = dataview.getUint32(1);

			let data;
			let decompressedData;
			if (compressionOpcode == 0) { //none
				data = new Uint8Array(dataview.buffer.slice(5, 9 + compressedLength));
				data = this.decrypt(data, compressedLength, key);
				decompressedData = data;
				index.revision = dataview.getUint16(data.buffer.byteLength)
			} else if (compressionOpcode == 1) { //bz2
				let decompressedLength = dataview.getInt32(5);
				data = new Uint8Array(dataview.buffer.slice(9, 9 + compressedLength));
				this.decrypt(data, compressedLength, key);
				
				let bzData = new Uint8Array(4 + data.length);
				bzData[0] = 'B'.charCodeAt(0);
				bzData[1] = 'Z'.charCodeAt(0);
				bzData[2] = 'h'.charCodeAt(0);
				bzData[3] = '1'.charCodeAt(0);
				bzData.set(data, 4)

				const bzip2 = await Bzip2.default.init();
				decompressedData = bzip2.decompress(bzData, decompressedLength, { small: false });

			} else if (compressionOpcode == 2) { //gzip
				let unencryptedData = new Uint8Array(dataview.buffer.slice(5, 9 + compressedLength));
				data = this.decrypt(unencryptedData, unencryptedData.length, key);
				let leftOver = unencryptedData.slice(data.length);

				let mergedArray = new Uint8Array(data.length + leftOver.length);
				mergedArray.set(data);
				mergedArray.set(leftOver, data.length);

				//add the end of the compressed data onto the decrypted?
				let decryptedDataview = new DataView(mergedArray.buffer);

				data = new Uint8Array(decryptedDataview.buffer.slice(4))
				let unzipped;

				try {
					unzipped = gzip.unzip(data);
				} catch {
					throw "Could not unzip with key:" + key;
				}

				decompressedData = new Uint8Array(unzipped);

			}

			resolve({ index, archiveId, decompressedData });
		});
	}

	readSector(buffer, pos, archiveId) {
		let convertedPos = pos * 520;
		let dataview = new DataView(this.datData.buffer);

		let currentArchive;
		let currentPart;
		let nextSector;
		let currentIndex;


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

		let data;
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