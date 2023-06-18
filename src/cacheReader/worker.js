import * as gzip from 'gzip-js'
import Bzip2 from "@foxglove/wasm-bz2";

onmessage = async function (e) {
    //let workerResult = 'Result: ' + (e.data[0]);
    //console.log(e);
    //postMessage(workerResult);

    let index = e.data.index;
    let segment = e.data.segment;
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
        data = new Uint8Array(dataview.buffer.slice(9, 9 + compressedLength));
        let header = "BZh1";
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
        data = this.decrypt(unencryptedData, unencryptedData.length, e.key);
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
            throw "Could not unzip with key:" + e.key;
        }

        decompressedData = new Uint8Array(unzipped);
    }

    let length = decompressedData.byteLength;
    postMessage({ index, archiveId, decompressedData: decompressedData.buffer.slice(0, length) }, [decompressedData.buffer.slice(0, length)]);
    decompressedData = [];
    compressedData = [];
    data = [];
    dataview = {};
}