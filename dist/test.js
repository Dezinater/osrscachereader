import CacheDumper from "./cacheReader/CacheDumper.js";
import { RSCache } from "./index.js";
let cache = new RSCache("./cache");
cache.onload.then(() => {
    console.log("Loaded");
    const cacheDumper = new CacheDumper(cache, "dump");
    cacheDumper.dumpAll();
});
