import { RSCache, IndexType, ConfigType } from "osrscachereader";
import fs from "fs";

let cache = new RSCache("./cache");

let animationNames = {};
let spotAnimNames = {};


cache.onload.then(async () => {

    let animationInfo = await cache.getAllFiles(IndexType.CONFIGS.id, ConfigType.SEQUENCE.id);
    for (let i = 0; i < animationInfo.length; i++) {
        if (animationInfo[i] == undefined) continue;
        animationNames[i] = animationInfo[i].def.name;
    }

    let spotAnimInfo = await cache.getAllFiles(IndexType.CONFIGS.id, ConfigType.SPOTANIM.id);
    for (let i = 0; i < spotAnimInfo.length; i++) {
        if (spotAnimInfo[i] == undefined) continue;
        spotAnimNames[i] = spotAnimInfo[i].def.name;
    }

    fs.writeFileSync("animationNames.json", JSON.stringify(animationNames));
    fs.writeFileSync("spotAnimNames.json", JSON.stringify(spotAnimNames));

    cache.close();
});
