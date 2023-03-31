let gzip = require('gzip-js');
//import * as bz2 from 'bz2';
let bz2 = require('bz2');
onmessage = function (e) {
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
        index.revision = dataview.getUint16(data.buffer.byteLength);
    }
    else if (compressionOpcode == 1) { //bz2
        data = new Uint8Array(dataview.buffer.slice(9, 9 + compressedLength));
        let header = "BZh1";
        let bzData = new Uint8Array(4 + data.length);
        bzData[0] = 'B'.charCodeAt(0);
        bzData[1] = 'Z'.charCodeAt(0);
        bzData[2] = 'h'.charCodeAt(0);
        bzData[3] = '1'.charCodeAt(0);
        bzData.set(data, 4);
        decompressedData = bz2.decompress(bzData);
    }
    else if (compressionOpcode == 2) { //gzip
        data = new Uint8Array(dataview.buffer.slice(9, 9 + compressedLength));
        decompressedData = new Uint8Array(gzip.unzip(data));
    }
    let length = decompressedData.byteLength;
    postMessage({ index, archiveId, decompressedData: decompressedData.buffer.slice(0, length) }, [decompressedData.buffer.slice(0, length)]);
    decompressedData = [];
    compressedData = [];
    data = [];
    dataview = {};
};
//export {};
