import { RSCache, CacheDumper } from "osrscachereader";

let cache = new RSCache("./cache");
cache.onload.then(() => {
    console.log("Loaded");
    const cacheDumper = new CacheDumper(cache, "dump", [
        "FRAMES",
        "FRAMEMAPS",
        "MAPS",
        "MODELS",
    ]);
    cacheDumper.dumpAll();
});
