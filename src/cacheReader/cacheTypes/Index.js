import ArchiveData from './Archive.js'
import FileData from './File.js'

import nameHashLookup from '../HashConverter.js'

export default class Index {
	constructor(id) {
		this.id = id;
		this.protocol = 0;
		this.revision = -1;
		this.hash = 0;
		this.crc = 0;
		this.compression = 0;
		this.named = false;
		this.archivesCount = 0;
		this.archives = {};
		this.indexSegments = [];
	}

	loadIndexData(data) {
		let dataview = new DataView(data.buffer);
		var streamPos = 0;

		this.protocol = dataview.readUint8();

		if (this.protocol >= 6) {
			this.revision = dataview.readInt32();
		}
		this.hash = dataview.readUint8();

		this.named = (1 & this.hash) != 0;

		//var validArchivesCount = protocol >= 7 ? stream.readBigSmart() : stream.readUnsignedShort();
		if (this.protocol >= 7) {
			console.log(this.protocol);
			this.archivesCount = dataview.readBigSmart();
		} else {
			this.archivesCount = dataview.readUint16();
		}


		var lastArchiveId = 0;
		for (var i = 0; i < this.archivesCount; i++) {

			var archiveId;
			if(this.protocol >= 7){
				archiveId = lastArchiveId += dataview.readBigSmart();
			}else{
				archiveId = lastArchiveId += dataview.readInt16();
			}

			this.archives[archiveId] = new ArchiveData();
			this.archives[archiveId].id = archiveId;
		}

		var archiveKeys = Object.keys(this.archives);

		if (this.named) {
			for (var i = 0; i < this.archivesCount; i++) {
				var nameHash = dataview.readInt32();
				this.archives[archiveKeys[i]].nameHash = nameHash;
				if (nameHashLookup[nameHash] != undefined)
					this.archives[archiveKeys[i]].name = nameHashLookup[nameHash];
			}
		}

		for (var i = 0; i < this.archivesCount; i++) {
			var crc = dataview.readInt32();
			this.archives[archiveKeys[i]].crc = crc;
		}

		for (var i = 0; i < this.archivesCount; i++) {
			var revision = dataview.readInt32();
			this.archives[archiveKeys[i]].revision = revision;
		}

		for (var i = 0; i < this.archivesCount; i++) {
			var numberOfFiles;
			if(this.protocol >= 7){
				numberOfFiles = dataview.readBigSmart();
			}else{
				numberOfFiles = dataview.readUint16();
			}
			if (numberOfFiles <= 0)
				console.log(numberOfFiles);
			this.archives[archiveKeys[i]].files = Array(numberOfFiles).fill(undefined);
		}

		for (var i = 0; i < this.archivesCount; i++) {
			var fileID = 0;
			for (var j = 0; j < this.archives[archiveKeys[i]].files.length; j++) {

				if(this.protocol >= 7){
					fileID += dataview.readBigSmart();
				}else{
					fileID += dataview.readUint16();
				}
				this.archives[archiveKeys[i]].files[j] = new FileData(fileID);
			}
		}

		if (this.named) {
			for (var i = 0; i < this.archivesCount; i++) {
				for (var j = 0; j < this.archives[archiveKeys[i]].files.length; j++) {
					var fileName = dataview.readUint32();

					this.archives[archiveKeys[i]].files[j].nameHash = fileName;

					if (nameHashLookup[fileName] != undefined)
						this.archives[archiveKeys[i]].files[j].name = nameHashLookup[fileName];

				}
			}
		}
	}

	toString() {
		return this.id;
	}
}
