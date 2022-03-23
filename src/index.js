import RSCache from './cacheReader/RSCache.js'
import IndexType from './cacheReader/cacheTypes/IndexType.js'
import ConfigType from './cacheReader/cacheTypes/ConfigType.js'

export { RSCache, IndexType, ConfigType };


/*
var cache = new RSCache("./", (x) => { console.log(x) }, "./");

cache.onload.then(() => {
  console.log(cache);
  cache.getAllFiles(IndexType.CONFIGS.id, ConfigType.OBJECT.id).then(objs => {
    console.log(objs);
  });
  cache.getFile(IndexType.CONFIGS.id, ConfigType.OBJECT.id, 2042).then(zulrah => {
    console.log(zulrah);
  });
  

  for(let i=3900;i<5934;i++){
    cache.getFile(IndexType.MAPS.id, i).then(x => {
      //console.log(x);
      //if(x.def == undefined) console.log(i, x);
			//if(x.def.regionX == 50 && x.def.regionY == 53) console.log(x);
		});
	}
});
*/
/*
  console.log(cache);
  cache.getAllFiles(IndexType.CONFIGS.id, ConfigType.NPC.id).then(zulrah => {
    console.log(zulrah);
  });
  cache.getFile(IndexType.CONFIGS.id, ConfigType.NPC.id, 2042).then(zulrah => {
    console.log(zulrah);
  });
  */
  //console.log(cache.getFile(IndexType.MODELS.id, 15981, 0, false));
  // cache.getFile(IndexType.MODELS.id, 15981, 0, false).then(x => console.log(x));
  //42852
  /*
  for(let i=0;i<10;i++){
  cache.getFile(IndexType.CONFIGS.id, ConfigType.OBJECT.id, 1300+i).then(object => {
    console.log(object);
  });
}
*/
  /*
  cache.getFile(IndexType.CONFIGS.id, ConfigType.UNDERLAY.id).then(x => {console.log(x)});
  cache.getFile(IndexType.CONFIGS.id, ConfigType.OVERLAY.id).then(x => {console.log(x)});
  cache.getFile(IndexType.MAPS.id, 4).then(x => {
    console.log(x);
    //for (let i = 0; i < x.def.models.length; i++)
    //  cache.getFile(IndexType.MODELS.id, x.def.models[i], 0, false).then(y => console.log(y))
  });
});
*/

/*
var cache;


var t0 = performance.now()
cache = new RSCache("./", (x) => { console.log(x) });

var promise1, promise2;
console.log("loading");
cache.onload.then(() => {
  console.log(cache);
  console.log(cache.getFile(IndexType.MODELS.id, 15981, 0, false));


  /*
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
  */
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