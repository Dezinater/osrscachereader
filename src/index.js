import RSCache from './cacheReader/Cache.js'
import IndexType from './cacheReader/cacheTypes/IndexType.js'
import ConfigType from './cacheReader/cacheTypes/ConfigType.js'

export {RSCache, IndexType, ConfigType};

var cache = new RSCache("./");
cache.onload.then(() => {
    var zulrah = cache.getFile(IndexType.CONFIGS.id, ConfigType.NPC.id, 2042);
    console.log("Zulrah Combat Level: " + zulrah.def.combatLevel);
    
    var zulrahModel = cache.getFile(IndexType.MODELS.id, 14408);
    console.log(zulrahModel);
  });