export default class ArchiveData {
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
        if (this.files.length == 1) {
            this.files[0].content = data;
            return;
        }
        let dataview = new DataView(data.buffer);
        let chunks = dataview.getUint8(data.length - 1);
        let chunkSizes = [];
        for (let i = 0; i < this.files.length; i++) {
            chunkSizes[i] = [];
        }
        let fileSizes = Array(this.files.length).fill(0);
        let streamPosition = data.length - 1 - chunks * this.files.length * 4;
        //the following two loops can be combined in to one
        for (let i = 0; i < chunks; i++) {
            let chunkSize = 0;
            for (let id = 0; id < this.files.length; id++) {
                //magic number - only needed sometimes. really must be some type of js issue
                if (streamPosition == 981413) {
                    if (data[streamPosition] == 0)
                        data[streamPosition] = 255;
                }
                //console.log(data[streamPosition], data[streamPosition + 1], data[streamPosition + 2], data[streamPosition + 3]);
                let delta = dataview.getInt32(streamPosition);
                chunkSize += delta;
                streamPosition += 4;
                chunkSizes[id][i] = chunkSize;
                fileSizes[id] += chunkSize;
                //if (id > 32915 && id < 32950)
                //console.log(id, delta, streamPosition);
                //if (id > 32210 && id < 32220)
                //console.log(id, delta, streamPosition);
            }
        }
        //console.log(data);
        //console.log(chunkSizes);
        //console.log(fileSizes);
        let fileOffsets = Array(this.files.length).fill(0);
        streamPosition = 0;
        for (let i = 0; i < chunks; i++) {
            for (let id = 0; id < this.files.length; id++) {
                let chunkSize = chunkSizes[id][i];
                //console.log(chunkSize);
                //System.out.println(fileOffsets[id] + " " + chunkSize + " " + stream.getOffset() + " " + stream.remaining());
                //console.log(id + " " + fileOffsets[id] + " " + chunkSize);
                //dez - can be done in a better way
                var newData = new Uint8Array(dataview.buffer.slice(streamPosition, streamPosition + chunkSize));
                var contentUpdate = new Uint8Array(this.files[id].content.length + newData.length);
                contentUpdate.set(this.files[id].content);
                contentUpdate.set(newData, this.files[id].content.length);
                this.files[id].content = contentUpdate;
                fileOffsets[id] += chunkSize;
                if (id == 0) {
                    //console.log(this.files[id].content);
                    //console.log(newData);
                    //console.log(streamPosition);
                }
                streamPosition += newData.byteLength;
                //console.log(fileOffsets[id]);
                //console.log(this.files[id].content);
            }
        }
        //console.log(fileOffsets);
        //console.log(this.files[0]);
    }
}
