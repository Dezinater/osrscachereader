//import * as gzip from 'gzip-js'
const gzip = require("gzip-js");
//import Bzip2 from "@foxglove/wasm-bz2";

const Bzip2 = require("@foxglove/wasm-bz2").Bzip2;

onmessage = async function (e) {
    //let workerResult = 'Result: ' + (e.data[0]);
    //console.log(e);
    //postMessage(workerResult);

    let index = e.data.index;
    let archiveId = e.data.archiveId;
    let compressedData = e.data.compressedData;

    let dataview = new DataView(compressedData);
    let compressionOpcode = dataview.getUint8(0);
    let compressedLength = dataview.getUint32(1);

    let data;
    let decompressedData;

    if (compressionOpcode == 0) { //none
        data = new Uint8Array(dataview.buffer.slice(5, 9 + compressedLength));
        decompressedData = data;
        index.revision = dataview.getUint16(data.buffer.byteLength)
    } else if (compressionOpcode == 1) { //bz2
        let decompressedLength = dataview.getInt32(5);
        data = new Uint8Array(dataview.buffer.slice(9, 9 + compressedLength));
        data = decrypt(data, compressedLength, e?.key);
        let bzData = new Uint8Array(4 + data.length);
        const bzHeader = [66, 90, 104, 49] //BZh1
        bzData.set(bzHeader, 0);
        bzData.set(data, 4)

        const bzip2 = await Bzip2.default.init();
        decompressedData = bzip2.decompress(bzData, decompressedLength, { small: false });

    } else if (compressionOpcode == 2) { //gzip
        let unencryptedData = new Uint8Array(dataview.buffer.slice(5, 9 + compressedLength));
        data = decrypt(unencryptedData, unencryptedData.length, e?.key);
        let leftOver = unencryptedData.slice(data.length);

        var mergedArray = new Uint8Array(data.length + leftOver.length);
        mergedArray.set(data);
        mergedArray.set(leftOver, data.length);

        //add the end of the compressed data onto the decrypted?
        let decryptedDataview = new DataView(mergedArray.buffer);

        data = new Uint8Array(decryptedDataview.buffer.slice(4))

        let unzipped;
        try {
            //console.log("unzipping");
            unzipped = gzip.unzip(data);
            //console.log("unzipped");
        } catch {
            throw "Could not unzip with key:" + e?.key;
        }

        decompressedData = new Uint8Array(unzipped);
    }

    let length = decompressedData.byteLength;
    const finalBuffer = decompressedData.buffer.slice(0, length);
    postMessage({ index, archiveId, decompressedData: finalBuffer }, [finalBuffer]);
}

function decrypt(data, len, key) {
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