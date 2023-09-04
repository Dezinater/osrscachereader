import Archive from './Archive.js'
import File from './File.js'

/**
 * An index from the cache
 * @category Cache Types
 * @hideconstructor
 */
class Index {
	constructor(id) {
		/**
		 * The ID of this Index
		 * @type {number}
		 */
		this.id = id;

		/** @type {number} */
		this.protocol = 0;

		/** @type {number} */
		this.revision = -1;

		/** @type {number} */
		this.hash = 0;

		/** @type {number} */
		this.crc = 0;

		/** @type {boolean} */
		this.named = false;

		/** 
		 * Total amount of archives
		 * @type {number} 
		 */
		this.archivesCount = 0;

		/** 
		 * Dictionary containing archives. Key is the ID of the archive.
		 * @type {Object} 
		*/
		this.archives = {};

		/** 
		 * Used for loading files for archives
		 * @type {Array} 
		 */
		this.indexSegments = [];
	}

	loadIndexData(data) {
		let dataview = new DataView(data.buffer);

		this.protocol = dataview.readUint8();

		if (this.protocol >= 6) {
			this.revision = dataview.readInt32();
		}
		this.hash = dataview.readUint8();

		this.named = (1 & this.hash) != 0;

		if (this.protocol >= 7) {
			this.archivesCount = dataview.readBigSmart();
		} else {
			this.archivesCount = dataview.readUint16();
		}


		let lastArchiveId = 0;
		for (let i = 0; i < this.archivesCount; i++) {

			let archiveId;
			if (this.protocol >= 7) {
				archiveId = lastArchiveId += dataview.readBigSmart();
			} else {
				archiveId = lastArchiveId += dataview.readInt16();
			}

			this.archives[archiveId] = new Archive();
			this.archives[archiveId].id = archiveId;
		}

		let archiveKeys = Object.keys(this.archives);

		if (this.named) {
			for (let i = 0; i < this.archivesCount; i++) {
				let nameHash = dataview.readInt32();
				this.archives[archiveKeys[i]].nameHash = nameHash;
			}
		}

		for (let i = 0; i < this.archivesCount; i++) {
			let crc = dataview.readInt32();
			this.archives[archiveKeys[i]].crc = crc;
		}

		for (let i = 0; i < this.archivesCount; i++) {
			let revision = dataview.readInt32();
			this.archives[archiveKeys[i]].revision = revision;
		}

		for (let i = 0; i < this.archivesCount; i++) {
			let numberOfFiles;
			if (this.protocol >= 7) {
				numberOfFiles = dataview.readBigSmart();
			} else {
				numberOfFiles = dataview.readUint16();
			}
			if (numberOfFiles <= 0)
				console.log("Warning: Files <= 0 for archive " + i + ". Files amount: " + numberOfFiles);
			this.archives[archiveKeys[i]].files = Array(numberOfFiles).fill(undefined);
		}

		for (let i = 0; i < this.archivesCount; i++) {
			let fileID = 0;
			for (let j = 0; j < this.archives[archiveKeys[i]].files.length; j++) {

				if (this.protocol >= 7) {
					fileID += dataview.readBigSmart();
				} else {
					fileID += dataview.readUint16();
				}
				this.archives[archiveKeys[i]].files[j] = new File(fileID);
			}
		}

		if (this.named) {
			for (let i = 0; i < this.archivesCount; i++) {
				for (let j = 0; j < this.archives[archiveKeys[i]].files.length; j++) {
					let fileName = dataview.readUint32();

					this.archives[archiveKeys[i]].files[j].nameHash = fileName;
				}
			}
		}
	}

	/**
	 * Get an Archive from this Index
	 * @param {Number} archive A number or can be a ConfigType if the IndexType is CONFIGS
	 * @returns [Archive]{@link Archive}
	 */
	getArchive(archive) {
		let archiveId;
		if (archive.constructor.name === "Object") {
			archiveId = archive.id;
		} else if (Number.isSafeInteger(archive)) {
			archiveId = archive;
		}

		archive = this.archives[archiveId];
		if (archive == undefined) {
			throw "Archive " + archiveId + " does not exist";
		}

		return archive;
	}

	toString() {
		return this.id;
	}
}

export default Index;