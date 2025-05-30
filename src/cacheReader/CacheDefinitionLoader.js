import IndexType from './cacheTypes/IndexType.js'
import ConfigType from './cacheTypes/ConfigType.js'
import RawBytesLoader from './loaders/RawByteLoader.js';

export default class CacheDefinitionLoader {
    constructor(indexId, archive, options = {}) {
        this.indexType = IndexType.valueOf(indexId);
        this.archive = archive;
        this.options = options;

		let loaderObject;
		if (this.indexType == IndexType.CONFIGS) {
			loaderObject = ConfigType.valueOf(this.archive.id);
		} else {
			loaderObject = this.indexType;
		}

		if (loaderObject != undefined && loaderObject.loader != undefined) {
			this.loader = new loaderObject.loader();
		} else {
			this.loader = new RawBytesLoader();
		}
	}

    loadAllFiles(rscache) {
        return new Promise(async (resolve, reject) => {
            let newFiles = [];
            for (let i = 0; i < this.archive.files.length; i++) {
                if (this.archive.files[i].content == undefined || this.archive.files[i].content.length == 0) continue;
                let loadedDef = await this.#loadDef(this.archive.files[i], rscache);

                if (this.archive.files.length > 1) {
                    newFiles[loadedDef.id] = loadedDef;
                } else {
                    newFiles[0] = loadedDef;
                }
            }

			if (this.options.cacheResults) {
				this.archive.files = newFiles;
			}

			resolve(newFiles);
		});
	}

    async loadFile(fileId, rscache) {
        const fileIndex = this.archive.files.index((x) => x.id == fileId);
        const file = this.archive.files[fileIndex];
        if (file.content.length == 0) return;

        return await this.#loadDef(this.archive.files[i], rscache);
    }

    async #loadDef(file, rscache) {
        let defId = this.archive.files.length > 1 ? file.id : this.archive.id;
        let loadedDef;
        if (this.loader.configureForRevision != undefined) {
            this.loader.configureForRevision(this.archive.revision, rscache.indicies[this.indexType.id].revision);
        }
        try {
            loadedDef = await this.loader.load(file.content, defId, rscache, this.options);
            //file.content = undefined; //unload content since it will be reloaded

            if (!this.options.cacheResults) {
                //if not saving then make a copy so the def doesnt go on the original
                let fileCopy = Object.assign({}, file);
                file = fileCopy;
            }
            file.def = loadedDef;
            return file;
        } catch (error) {
            console.log(file.id, this.archive.files.length, defId, this.options);
            throw error;
        }
    }
}
