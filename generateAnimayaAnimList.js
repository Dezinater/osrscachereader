//var osrscachereader = require('osrscachereader');
import { RSCache, IndexType, ConfigType } from "osrscachereader"
import fs from "fs";

console.log("Loading cache");

let cache = new RSCache("./cache");
cache.onload.then(() => {
    
    console.log("Loading animations");
    cache.getAllFiles(IndexType.CONFIGS.id, ConfigType.SEQUENCE.id).then(animationInfo => {

        let anims = animationInfo.filter(x => x.def.animMayaID != undefined && x.def.animMayaID >= 0);
        let animIds = anims.map(x => x.def.id);
        let animayaIds = anims.map(x => x.def.animMayaID);
        let promises = [];

        console.log("Loading skeletons");
        animayaIds.forEach(x => {
            promises.push(cache.getAllFiles(IndexType.FRAMES.id, (x >> 16), { isAnimaya: true, earlyStop: true, threaded: true }));
        });

        let mappedAnims = {};
        Promise.all(promises).then(x => {
            console.log("Writing file")
            let skeletonIds = x.map(y => y[0].def.skeletonId);
            skeletonIds.forEach((id, index) => {
                if(!(id in mappedAnims)) {
                    mappedAnims[id] = [];
                }
                mappedAnims[id].push(animIds[index]);
            });

            fs.writeFileSync("animayaCommonAnims.json", JSON.stringify(mappedAnims));
        });

    }).catch(e => console.log(e));
});