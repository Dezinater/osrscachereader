import { RSCache, IndexType, ConfigType } from "osrscachereader";
import fs from "fs";

console.log("Loading cache");

let cache = new RSCache("./cache");
cache.onload.then(() => {
    let commonAnims = {};

    console.log("Loading animations");
    cache
        .getAllFiles(IndexType.CONFIGS.id, ConfigType.SEQUENCE.id)
        .then(async (animationInfo) => {
            for (let i = 0; i < animationInfo.length; i++) {
                let shiftedId = animationInfo[i].def.frameIDs[0] >> 16;
                let frames = Object.values(
                    await cache.getAllFiles(IndexType.FRAMES.id, shiftedId),
                );
                if (frames[0] == undefined) debugger;
                let animSkeletonId = frames[0].def.framemap.id;
                if (!(animSkeletonId in commonAnims)) {
                    commonAnims[animSkeletonId] = {};
                }

                if (!(shiftedId in commonAnims[animSkeletonId])) {
                    commonAnims[animSkeletonId][shiftedId] = [];
                }
                commonAnims[animSkeletonId][shiftedId].push(
                    animationInfo[i].def.id,
                );
            }
            fs.writeFileSync("commonAnims.json", JSON.stringify(commonAnims));

            cache.close();
            /*
        for (let i = 0; i < cache.indicies[IndexType.FRAMES.id].archivesCount && i < 2; i++) {
            let frames = await cache.getAllFiles(IndexType.FRAMES.id, i);
            let frameSkeletonId = frames[0].def.framemap.id;
            console.log(frames);
            if(frameSkeletonId == animSkeletonId) {
                
            }
        }
        */
        });
});
