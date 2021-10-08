import RSCache from './cacheReader/RSCache.js'
import IndexType from './cacheReader/cacheTypes/IndexType.js'
import ConfigType from './cacheReader/cacheTypes/ConfigType.js'

export { RSCache, IndexType, ConfigType };


/*
var cache;


var t0 = performance.now()
cache = new RSCache("./", (x) => { console.log(x) });

var promise1, promise2;
console.log("loading");
cache.onload.then(() => {
  console.log(cache);
  cache.getFile(IndexType.CONFIGS.id, ConfigType.NPC.id, 2042).then(zulrah => {
    console.log(zulrah);
    var models = zulrah.def.models;
    var modelPromises = [];
    console.log(models);
    for (var i = 0; i < models.length; i++) {
      modelPromises.push(cache.getFile(IndexType.MODELS.id, models[i], 0, false));
    }

    Promise.all(modelPromises).then(x => {
      console.log(x);
    });
  });
  //console.log("loaded");
  //var zulrah = cache.getFile(IndexType.CONFIGS.id, ConfigType.NPC.id, 2042);
  //console.log(await cache.getFile(IndexType.CONFIGS.id, ConfigType.NPC.id, 2042));


  //cache.getFile(IndexType.CONFIGS.id, ConfigType.NPC.id, 2042).then(entityInfo => {
  /*
  cache.getFile(IndexType.CONFIGS.id, ConfigType.SEQUENCE.id, 7053).then(entityInfo2 => {
    //console.log(entityInfo.def);
    console.log(entityInfo2.def);
    var shiftedId = (entityInfo2.def.frameIDs[0] >> 16);
    console.log(shiftedId);
    cache.getAllFiles(IndexType.FRAMES.id, shiftedId).then(frameInfo => {
      console.log(frameInfo);
    });

    var t1 = performance.now()
    console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
  });
  
  //});



});
*/