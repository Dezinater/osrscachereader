import RSCache from './cacheReader/RSCache.js';
import IndexType from './cacheReader/cacheTypes/IndexType.js';
import ConfigType from './cacheReader/cacheTypes/ConfigType.js';
import Matrix from './cacheReader/cacheTypes/anim/MatrixTest.js';
export { RSCache, IndexType, ConfigType, Matrix };
var cache = new RSCache("cache", (x) => { console.log(x); }, "./");
cache.onload.then(() => {
    console.log(cache);
    cache.getFile(IndexType.CONFIGS.id, ConfigType.NPC.id, 12125, { threaded: true }).then(npc => {
        cache.getFile(IndexType.MODELS.id, npc.def.models[0]).then(model => {
            console.log(model);
            playAnimation(model.def, 9577); //9572 kephri idle - 9577 kephri attack
        });
    });
});
function newAnimate(model, animayaSkeleton, var2) {
    model.verticesX = Object.assign([], model.vertexPositionsX);
    model.verticesY = Object.assign([], model.vertexPositionsY);
    model.verticesZ = Object.assign([], model.vertexPositionsZ);
    if (model.animayaGroups != null) {
        for (let vertexIndex = 0; vertexIndex < model.vertexCount; ++vertexIndex) {
            let bones = model.animayaGroups[vertexIndex];
            if (bones != null && bones.length != 0) {
                let scales = model.animayaScales[vertexIndex];
                let matrix = new Matrix();
                matrix.method2196();
                for (let i = 0; i < bones.length; ++i) {
                    let boneIndex = bones[i];
                    let bone = animayaSkeleton.getBone(boneIndex);
                    if (bone != null) {
                        let matrix2 = new Matrix();
                        let matrix3 = new Matrix();
                        matrix2.method2187(scales[i] / 255);
                        matrix3.copy(bone.method687(var2));
                        matrix3.method2189(matrix2);
                        matrix.method2199(matrix3);
                    }
                }
                method1283(model, vertexIndex, matrix);
            }
        }
        console.log(model);
    }
}
function method1283(model, var1, var2) {
    let var3 = model.verticesX[var1];
    let var4 = (-model.verticesY[var1]);
    let var5 = (-model.verticesZ[var1]);
    let var6 = 1.0;
    model.verticesX[var1] = var2.matrixVals[0] * var3 + var2.matrixVals[4] * var4 + var2.matrixVals[8] * var5 + var2.matrixVals[12] * var6;
    model.verticesY[var1] = -(var2.matrixVals[1] * var3 + var2.matrixVals[5] * var4 + var2.matrixVals[9] * var5 + var2.matrixVals[13] * var6);
    model.verticesZ[var1] = -(var2.matrixVals[2] * var3 + var2.matrixVals[6] * var4 + var2.matrixVals[10] * var5 + var2.matrixVals[14] * var6);
}
function method1175(frameDef, field1264, var2) {
    let var5 = field1264;
    let var6 = 0;
    let bones = frameDef.framemap.animayaSkeleton.getAllBones();
    for (let index = 0; index < bones.length; ++index) {
        let bone = bones[index];
        frameDef.method727(var2, bone, var6, var5);
        ++var6;
    }
}
function playAnimation(model, id) {
    return cache.getFile(IndexType.CONFIGS.id, ConfigType.SEQUENCE.id, id).then(animationInfo => {
        console.log(animationInfo);
        if (animationInfo.def.animMayaID != undefined && animationInfo.def.animMayaID >= 0) {
            let var7 = animationInfo.def.animMayaID;
            /*
            for (let i = 0; i < 2112; i++) {
              cache.getAllFiles(IndexType.FRAMEMAPS.id, i);
            }
            */
            console.log(var7);
            return cache.getAllFiles(IndexType.FRAMES.id, var7 >> 16, { isAnimaya: true }).then(framesInfo => {
                //this line is the same as making a new class133
                //var6 = Login.method425(SequenceDefinition_animationsArchive, class16.SequenceDefinition_skeletonsArchive, var7, false);
                console.log(framesInfo);
                //method1175(framesInfo[0].def, framesInfo[0].def.field1257, animationInfo.def.frameIDs[0]);
                method1175(framesInfo[0].def, framesInfo[0].def.field1257, 9);
                newAnimate(model, framesInfo[0].def.framemap.animayaSkeleton, framesInfo[0].def.field1257);
                /*
                              if (var3 == null) {
                                  return var1.toSharedSequenceModel(true);
                              } else {
                                 Model var9 = var1.toSharedSequenceModel(!var3.method720());
                                  var9.method1285(var3, var2);
                                  return var9;
                              }
                              */
            });
        }
        else { //no animMaya - old way kind of
            var shiftedId = (animationInfo.def.frameIDs[0] >> 16);
            return cache.getAllFiles(IndexType.FRAMES.id, shiftedId).then(frameInfo => {
                console.log(frameInfo);
                var frameDefs = frameInfo.map(x => {
                    x.def.id = x.id;
                    return x.def;
                });
                //renderer.scene[0].loadAnimation(animationInfo.def, frameDefs);
            });
        }
    });
}
/*

for(let i=3900;i<5934;i++){
  cache.getFile(IndexType.MAPS.id, i).then(x => {
    //console.log(x);
    //if(x.def == undefined) console.log(i, x);
    //if(x.def.regionX == 50 && x.def.regionY == 53) console.log(x);
  });
}
});
*
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
