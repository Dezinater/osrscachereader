import fs from "fs";
import _ from "lodash";
import { IndexType, ConfigType, GLTFExporter, ModelGroup } from "osrscachereader";

let finalModel = new ModelGroup();
let name = "model";
let animations = [];

async function processCommand(cache, command, options) {
    switch (command) {
        case "item":
            await addItem(cache, options);
            break;
        case "npc":
            await addNpc(cache, options);
            break;
        case "anim":
            if (options[0] == undefined) {
                console.error("Output path undefined");
                return;
            }
            animations.push(...listToIds(options));
            break;
        case "name":
            if (options[0] == undefined) {
                console.error("Name is undefined");
                return;
            }
            name = options[0];
            break;
    }
}

function listToIds(options) {
    let ids;
    if (options[0].includes(",")) {
        ids = options[0].split(",").map(Number);
    } else {
        ids = [Number(options[0])];
    }
    return ids;
}

async function loadEntityIds(cache, options, configType, modelType) {
    let ids = listToIds(options);
    for (let i = 0; i < ids.length; i++) {
        const entityDef = await cache.getDef(IndexType.CONFIGS, configType, ids[i]);
        if (!(modelType in entityDef)) {
            console.error(`${modelType} key not found`);
            return;
        }
        let model = await cache.getDef(IndexType.MODELS, entityDef[modelType]);
        finalModel.addModel(model);
    }
}

async function exportGLTFModel(cache) {
    const exporter = new GLTFExporter(finalModel.getMergedModel());

    let allLengths = [];
    let allMorphTargets = [];
    for (const animId of animations) {
        const appliedAnimation = await finalModel.getMergedModel().loadAnimation(cache, animId, false);
        const morphTargetIndices = appliedAnimation.vertexData.map((frameVertices) =>
            exporter.addMorphTarget(frameVertices),
        );
        allLengths.push(appliedAnimation.lengths);
        allMorphTargets.push(morphTargetIndices);
    }
    for (let i = 0; i < animations.length; ++i) {
        const lengths = allLengths[i];
        const morphTargets = allMorphTargets[i];
        exporter.addAnimation(morphTargets, lengths);
    }

    exporter.addColors(finalModel.getMergedModel());
    const gltf = exporter.export();

    const path = `./out/${name}.gltf`;
    fs.writeFileSync(path, gltf);

    console.log(`Wrote single file to ${path}`);
}

async function addItem(cache, options) {
    if (options[0] == undefined) {
        console.error("Item ID undefined");
        return;
    }

    let modelType = "maleModel0"; //maleModel1, femaleModel0, femaleModel1
    if (options[1] != undefined) {
        modelType = options[1];
    }


    await loadEntityIds(cache, options, ConfigType.ITEM, modelType);
}

async function addNpc(cache, options) {
    if (options[0] == undefined) {
        console.error("Npc ID undefined");
        return;
    }

    let modelType = "models"; //chatheadModels
    if (options[1] != undefined) {
        modelType = options[1];
    }

    await loadEntityIds(cache, options, ConfigType.NPC, modelType);
}

async function addModels(cache, options) {
    console.log(options);
}

export { processCommand, exportGLTFModel };