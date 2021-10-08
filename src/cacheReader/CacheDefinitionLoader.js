import IndexType from './cacheTypes/IndexType.js'
import ConfigType from './cacheTypes/ConfigType.js'

export default class CacheDefinitionLoader {
	constructor(indexId, archiveId, files) {
		this.indexType = IndexType.valueOf(indexId);
		this.archiveId = archiveId;
		this.files = files;
	}

	load(rscache) {
		return new Promise((resolve, reject) => {
			var loader;

			if (this.indexType == IndexType.CONFIGS) {
				loader = new (ConfigType.valueOf(this.archiveId).loader)();
			} else {
				loader = new this.indexType.loader();
			}

			var promises = [];
			//console.log(this.files.length);
			for (var i = 0; i < this.files.length; i++) {
				var defId = this.files.length > 1 ? i : this.archiveId;
				//unload archive file memory to replace it with definition info
				//console.log(defId);
				let loadPromise = Promise.resolve(loader.load(this.files[i].content, defId, rscache));

				loadPromise.then((loadedDef) => {
					//console.log(loadedDef.id);
					if (this.files.length > 1) {
						this.files[loadedDef.id].def = loadedDef;
						this.files[loadedDef.id].content = undefined;
					}else{
						this.files[0].def = loadedDef;
						this.files[0].content = undefined;
					}
				})
				promises.push(loadPromise);
				//this.files[i].def = loader.load(this.files[i].content, rscache);
			}
			Promise.all(promises).then(() => resolve());
			//resolve();
		});
	}
}