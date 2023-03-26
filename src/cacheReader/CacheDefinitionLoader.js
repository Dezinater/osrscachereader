import IndexType from './cacheTypes/IndexType.js'
import ConfigType from './cacheTypes/ConfigType.js'

export default class CacheDefinitionLoader {
	constructor(indexId, archive, options = {}) {
		this.indexType = IndexType.valueOf(indexId);
		this.archive = archive;
		this.options = options;
		//this.files = files;
	}

	load(rscache) {
		return new Promise((resolve, reject) => {
			/*
			if (this.indexType == IndexType.MAPS) {
				this.loadMaps();
				resolve();
				return;
			}
			*/

			var loader;
			if (this.indexType == IndexType.CONFIGS) {
				loader = new (ConfigType.valueOf(this.archive.id).loader)();
			} else {
				loader = new this.indexType.loader();
			}

			var promises = [];
			let newFiles = [];
			//console.log(this.files.length);
			for (var i = 0; i < this.archive.files.length; i++) {
				var defId = this.archive.files.length > 1 ? this.archive.files[i].id : this.archive.id;
				//unload archive file memory to replace it with definition info
				//if (this.archive.files[i].id > 25000)
				//	console.log(this.archive.files[i], this.archive.files[i].content.length);
				let loadedValue;
				try {
					loadedValue = loader.load(this.archive.files[i].content, defId, rscache, this.options);
				} catch (error) {
					reject(error);
					throw error;
				}
				let loadPromise = Promise.resolve(loadedValue);
				loadPromise.iterator = i;
				//map it to a whole new array
				//otherwise values wil map over themselves
				//ex 11232 maps to 11253 but 11253 maps to 11293
				loadPromise.then((loadedDef) => {
					//console.log(loadedDef.id);


					if (this.archive.files.length > 1) {
						if (newFiles[loadedDef.id] == undefined)
							newFiles[loadedDef.id] = this.archive.files[loadPromise.iterator];

						newFiles[loadedDef.id].def = loadedDef;
						newFiles[loadedDef.id].content = undefined;
					} else {
						if (newFiles[0] == undefined)
							newFiles[0] = this.archive.files[0];

						newFiles[0].def = loadedDef;
						newFiles[0].content = undefined;
					}
				})
				promises.push(loadPromise);
				//this.files[i].def = loader.load(this.files[i].content, rscache);
			}
			Promise.all(promises).then(() => {
				this.archive.files = newFiles;
				resolve();
			});
			//resolve();
		});
	}

	loadMaps() {
		/*
		let MAX_REGIONS = 32768;
		for (let i = 0; i < MAX_REGIONS; ++i)
		{
			let x = i >> 8;
			let y = i & 0xFF;

			Archive map = index.findArchiveByName("m" + x + "_" + y);
			Archive land = index.findArchiveByName("l" + x + "_" + y);

			assert (map == null) == (land == null);

			if (map == null || land == null)
			{
				continue;
			}

			byte[] data = map.decompress(storage.loadArchive(map));
			MapDefinition mapDef = new MapLoader().load(x, y, data);
			LocationsDefinition locDef = null;

			int[] keys = keyManager.getKeys(i);
			if (keys != null)
			{
				try
				{
					data = land.decompress(storage.loadArchive(land), keys);
				}
				catch (IOException ex)
				{
					continue;
				}

				locDef = new LocationsLoader().load(x, y, data);
			}

			mapMap.put(mapDef, locDef);
		}

		return mapMap;
		*/
	}
}