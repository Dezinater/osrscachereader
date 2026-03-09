import RSCache from "./cacheReader/RSCache.js";
import IndexType from "./cacheReader/cacheTypes/IndexType.js";
import ConfigType from "./cacheReader/cacheTypes/ConfigType.js";

let cache = new RSCache("./cache/");
cache.onload.then(async () => {
    console.log(await cache.getNPC(2042));
    cache.close();
});
