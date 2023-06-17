import RSCache from './cacheReader/RSCache.js'
import IndexType from './cacheReader/cacheTypes/IndexType.js'
import ConfigType from './cacheReader/cacheTypes/ConfigType.js'
import Matrix from './cacheReader/cacheTypes/anim/MatrixTest.js';

import GLTFExporter from './cacheReader/exporters/GLTFExporter.js';
import OBJExporter from './cacheReader/exporters/OBJExporter.js';

import * as base64 from "./cacheReader/helpers/base64.js"

export { RSCache, IndexType, ConfigType, Matrix };



let cache = new RSCache("cache", (x) => { console.log(x) }, "./");
cache.onload.then(() => {
    /*
    let bytes = base64.base64ToBytes("AAABAAIAAQADAAIAAAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAACAPwAAgD8AAAAAAAAAAAAAgD8AAAAAAACAPwAAgD8AAAAAAAAAAAAAAAAAAAAAAACAPwAAAAAAAAAA").slice(12, 12+96);
    let vecs = new Float32Array(bytes.slice(0,48).buffer);
    let uvs = new Float32Array(bytes.slice(48, bytes.length).buffer);
    console.log(new Float32Array(bytes.buffer));
    //console.log(bytes,vecs, uvs);
    //console.log(base64.bytesToBase64(new Uint8Array(float.buffer)));
    */
    cache.getFile(IndexType.CONFIGS.id, ConfigType.ITEM.id, 2042).then(x => { console.log(x) });

    cache.getAllFiles(IndexType.MODELS.id, 14408).then(async ([{ def }]) => {
        let animation = await cache.getFile(IndexType.CONFIGS.id, ConfigType.SEQUENCE.id, 5070);
        let animation2 = await cache.getFile(IndexType.CONFIGS.id, ConfigType.SEQUENCE.id, 5071);
        let shiftedId = (animation.def.frameIDs[0] >> 16);
        let frames = await loadSkeletonAnims(def, shiftedId);

        let gltfExporter = new GLTFExporter(def);
        gltfExporter.addColors(def);
        //frames.forEach(frame => gltfExporter.addMorphTarget(frame.vertices));
        //gltfExporter.addAnimation(animation2.def);
        //gltfExporter.addAnimation(animation.def);
        let gltfFile = gltfExporter.export();

        //let objExporter = new OBJExporter();
        //let objFile = objExporter.export(def);

        console.log(gltfFile)
        
    });
});

//console.log(cache.getFile(IndexType.MODELS.id, 15981, 0, false));



async function loadSkeletonAnims(model, id) {
    let frameDefs = (await cache.getAllFiles(IndexType.FRAMES.id, id)).map(x => x.def);
    let loadedAnims = frameDefs.map(frameDef => loadFrame(model, frameDef));

    return loadedAnims;
}

function loadFrame(model, frame) {
    let verticesX = [...model.vertexPositionsX];
    let verticesY = [...model.vertexPositionsY];
    let verticesZ = [...model.vertexPositionsZ];
    let framemap = frame.framemap;
    let animOffsets = {
        x: 0,
        y: 0,
        z: 0,
    };

    for (let j = 0; j < frame.translator_x.length; ++j) {
        let type = frame.indexFrameIds[j];
        let fmType = framemap.types[type];
        let fm = framemap.frameMaps[type];
        let dx = frame.translator_x[j];
        let dy = frame.translator_y[j];
        let dz = frame.translator_z[j];

        animate(model.vertexGroups, verticesX, verticesY, verticesZ, fmType, fm, dx, dy, dz, animOffsets);
    }

    frame.vertices = [];
    for (let i = 0; i < verticesX.length; i++) {
        frame.vertices.push([verticesX[i], -verticesY[i], -verticesZ[i]]);
    }

    return frame;
}

function animate(vertexGroups, verticesX, verticesY, verticesZ, type, frameMap, dx, dy, dz, animOffsets) {
    let var6 = frameMap.length;
    let var7;
    let var8;
    let var11;
    let var12;

    if (type == 0) //change rotation origin
    {
        var7 = 0;
        animOffsets.x = 0;
        animOffsets.y = 0;
        animOffsets.z = 0;

        for (var8 = 0; var8 < frameMap.length; ++var8) {
            let boneGroup = frameMap[var8];
            if (boneGroup < vertexGroups.length) {
                let bones = vertexGroups[boneGroup];

                for (var11 = 0; var11 < bones.length; ++var11) {
                    var12 = bones[var11];
                    animOffsets.x += verticesX[var12];
                    animOffsets.y += verticesY[var12];
                    animOffsets.z += verticesZ[var12];
                    ++var7;
                }
            }
        }

        if (var7 > 0) {
            animOffsets.x = dx + animOffsets.x / var7;
            animOffsets.y = dy + animOffsets.y / var7;
            animOffsets.z = dz + animOffsets.z / var7;
        }
        else {
            animOffsets.x = dx;
            animOffsets.y = dy;
            animOffsets.z = dz;
        }

    }
    else {
        let var18;
        let var19;
        if (type == 1) //translation
        {
            for (var7 = 0; var7 < frameMap.length; ++var7) {
                var8 = frameMap[var7];
                if (var8 < vertexGroups.length) {
                    var18 = vertexGroups[var8];

                    for (var19 = 0; var19 < var18.length; ++var19) {
                        var11 = var18[var19];
                        verticesX[var11] += dx;
                        verticesY[var11] += dy;
                        verticesZ[var11] += dz;
                    }
                }
            }

        }
        else if (type == 2) //rotation
        {

            for (var7 = 0; var7 < frameMap.length; ++var7) {
                var8 = frameMap[var7];
                if (var8 < vertexGroups.length) {
                    var18 = vertexGroups[var8];

                    for (var19 = 0; var19 < var18.length; ++var19) {
                        var11 = var18[var19];
                        verticesX[var11] -= animOffsets.x;
                        verticesY[var11] -= animOffsets.y;
                        verticesZ[var11] -= animOffsets.z;
                        var12 = (dx & 255) * 8;
                        let var13 = (dy & 255) * 8;
                        let var14 = (dz & 255) * 8;
                        let var15;
                        let var16;
                        let var17;
                        if (var14 != 0) {
                            var15 = Math.floor(65536 * Math.sin(var14 * Math.PI / 1024));
                            var16 = Math.floor(65536 * Math.cos(var14 * Math.PI / 1024));
                            var17 = var15 * verticesY[var11] + var16 * verticesX[var11] >> 16;
                            verticesY[var11] = var16 * verticesY[var11] - var15 * verticesX[var11] >> 16;
                            verticesX[var11] = var17;

                        }

                        if (var12 != 0) {
                            var15 = Math.floor(65536 * Math.sin(var12 * Math.PI / 1024));
                            var16 = Math.floor(65536 * Math.cos(var12 * Math.PI / 1024));
                            var17 = var16 * verticesY[var11] - var15 * verticesZ[var11] >> 16;
                            verticesZ[var11] = var15 * verticesY[var11] + var16 * verticesZ[var11] >> 16;
                            verticesY[var11] = var17;
                        }

                        if (var13 != 0) {
                            var15 = Math.floor(65536 * Math.sin(var13 * Math.PI / 1024));
                            var16 = Math.floor(65536 * Math.cos(var13 * Math.PI / 1024));
                            var17 = var15 * verticesZ[var11] + var16 * verticesX[var11] >> 16;
                            verticesZ[var11] = var16 * verticesZ[var11] - var15 * verticesX[var11] >> 16;
                            verticesX[var11] = var17;
                        }


                        verticesX[var11] += animOffsets.x;
                        verticesY[var11] += animOffsets.y;
                        verticesZ[var11] += animOffsets.z;
                    }
                }
            }

        }
        else if (type == 3) //scaling
        {
            for (var7 = 0; var7 < frameMap.length; ++var7) {
                var8 = frameMap[var7];
                if (var8 < vertexGroups.length) {
                    var18 = vertexGroups[var8];

                    for (var19 = 0; var19 < var18.length; ++var19) {
                        var11 = var18[var19];
                        verticesX[var11] -= animOffsets.x;
                        verticesY[var11] -= animOffsets.y;
                        verticesZ[var11] -= animOffsets.z;
                        verticesX[var11] = dx * verticesX[var11] / 128;
                        verticesY[var11] = dy * verticesY[var11] / 128;
                        verticesZ[var11] = dz * verticesZ[var11] / 128;
                        verticesX[var11] += animOffsets.x;
                        verticesY[var11] += animOffsets.y;
                        verticesZ[var11] += animOffsets.z;
                    }
                }
            }


        }
        else if (type == 5) {

        }
    }

}