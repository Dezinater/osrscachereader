import RSCache from './cacheReader/RSCache.js';
import IndexType from './cacheReader/cacheTypes/IndexType.js';
import ConfigType from './cacheReader/cacheTypes/ConfigType.js';
import Matrix from './cacheReader/cacheTypes/anim/MatrixTest.js';
export { RSCache, IndexType, ConfigType, Matrix };
var cache = new RSCache("cache", (x) => { console.log(x); }, "./");
cache.onload.then(() => {
    console.log(cache);
    //cache.getFile(IndexType.CONFIGS.id, ConfigType.NPC.id, 2042).then(x => { console.log(x) });
    cache.getAllFiles(IndexType.CONFIGS.id, ConfigType.NPC.id).then(files => {
        let npcDefs = files.map(x => x.def).filter(x => x.varbitId != undefined);
        console.log(npcDefs);
    });
    //cache.getFile(IndexType.CONFIGS.id, ConfigType.UNDERLAY.id).then(x => { console.log(x) });
    //cache.getFile(IndexType.CONFIGS.id, ConfigType.OVERLAY.id).then(x => { console.log(x) });
    //console.log(Object.values(cache.cacheRequester.xteas).filter(x => x.name.includes("50_50")));
    /*
    for (let i = 0; i < cache.indicies[5].archivesCount; i++) {
        cache.getFile(IndexType.MAPS.id, i).then(x => {
            //console.log(x);
            //if (x.def == undefined) console.log(i, x);
            if (x.def.regionX == 50 && x.def.regionY == 53) console.log(x);
        }).catch(x => {});
    }
    */
});
//console.log(cache.getFile(IndexType.MODELS.id, 15981, 0, false));
