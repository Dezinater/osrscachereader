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