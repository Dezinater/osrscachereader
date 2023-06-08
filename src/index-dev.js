import RSCache from './cacheReader/RSCache.js'
import IndexType from './cacheReader/cacheTypes/IndexType.js'
import ConfigType from './cacheReader/cacheTypes/ConfigType.js'
import Matrix from './cacheReader/cacheTypes/anim/MatrixTest.js';

import GLTFExporter from './cacheReader/exporters/GLTFExporter.js';
import OBJExporter from './cacheReader/exporters/OBJExporter.js';

export { RSCache, IndexType, ConfigType, Matrix };



var cache = new RSCache("cache", (x) => { console.log(x) }, "./");
cache.onload.then(() => {

    console.log(cache);
    //cache.getFile(IndexType.CONFIGS.id, ConfigType.NPC.id, 2042).then(x => { console.log(x) });

    cache.getAllFiles(IndexType.MODELS.id, 14408).then(([{ def }]) => {
        console.log(def);
        //let indicesBytes2 = new Uint8Array([0, 0, 1, 0, 2, 0]);
        //let verticies = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 63, 0, 0, 0, 0]);
        //
        let indicesBytes2 = new Uint8Array(new Uint16Array([0, 1, 2]).buffer)
        let verticiesBytes2 = new Uint8Array(new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]).buffer)

        let verticies = [];
        let max = [0,0,0];
        let min = [0,0,0];
        for (let i = 0; i < def.vertexPositionsX.length; i++) {
            max = [Math.max(max[0], def.vertexPositionsX[i]), Math.max(max[1], -def.vertexPositionsY[i]), Math.max(max[2], -def.vertexPositionsZ[i])];
            min = [Math.min(min[0], def.vertexPositionsX[i]), Math.min(min[1], -def.vertexPositionsY[i]), Math.min(min[2], -def.vertexPositionsZ[i])];
            verticies.push([def.vertexPositionsX[i], -def.vertexPositionsY[i], -def.vertexPositionsZ[i]]);
        }

        console.log(max, min);
        let indices = [];
        for (let i = 0; i < def.faceVertexIndices1.length; i++) {
            indices.push([def.faceVertexIndices1[i], def.faceVertexIndices2[i], def.faceVertexIndices3[i]]);
        }
        console.log(verticies.flat(), indices.flat())
        let indicesBytes = new Uint8Array(new Uint16Array(indices.flat()).buffer)
        let verticiesBytes = new Uint8Array(new Float32Array(verticies.flat()).buffer)
        //console.log(indices, verticies, indicesBytes, verticiesBytes)

        let gltfExporter = new GLTFExporter();
        let gltfFile = gltfExporter.export(indicesBytes, verticiesBytes, max, min);

        let objExporter = new OBJExporter();
        let objFile = objExporter.export(indices, verticies);

        console.log(gltfFile)
    });


    /*
    cache.getAllFiles(IndexType.TEXTURES.id, 0, { loadSprites:true}).then(textures => {
        console.log(textures.map(y => y.def));
    });

    cache.getAllFiles(IndexType.TEXTURES.id, 0).then(async textures => {
        let animatedTextures = textures.map(y => y.def).filter(y => y.animationSpeed > 0)
        let spriteFiles = await Promise.all(animatedTextures.map(x => cache.getFile(IndexType.SPRITES.id, x.fileIds[0])));
        let sprites = spriteFiles.map(x => x.def);
        console.log(animatedTextures, sprites);
        sprites.forEach(async sprite => {
            let dataUrl = await sprite.sprites[0].createImageUrl(256, 256);
            console.log('%c ', 'font-size:512px; background:url(' + dataUrl + ') no-repeat;')
        });
    });
*/
    //cache.getFile(IndexType.MODELS.id, 9640).then(x => { console.log(x) });

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



