import IndexType from './cacheTypes/IndexType.js'
import ConfigType from './cacheTypes/ConfigType.js'

export default class CacheDefinitionLoader {
	constructor(indexId, archiveId, files){
		this.indexType = IndexType.valueOf(indexId);
		this.archiveId = archiveId;
		this.files = files;
	}

	load() {
		var loader;

		if(this.indexType == IndexType.CONFIGS){
			loader = new (ConfigType.valueOf(this.archiveId).loader)();
		}else{
			loader = new this.indexType.loader();
		}
		
		for(var i=0;i<this.files.length;i++){
			
			//unload archive file memory to replace it with definition info
			this.files[i].def = loader.load(this.files[i].content);
			this.files[i].content = undefined;
		}
	}
}