import fs from "fs";
import _ from "lodash";
import { IndexType, ConfigType, GLTFExporter, ModelGroup } from "osrscachereader";

let finalModel = new ModelGroup();
let individualModels = [];
let modelVertexIndices = [];
let individualModelNames = [];
let name = "model";
let animations = [];
let split = false;

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
        case "split":
            split = true;
            break;
    }
}

function listToIds(options) {
    let ids;
    if (options[0].includes(",")) {
        ids = options[0].split(",").map((n) => n.trim()).filter((n) => n !== "").map((n) => Number(n));
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
        const entry = entityDef[modelType];
        const modelIds = Array.isArray(entry) ? entry : [entry];
        for (const modelId of modelIds) {
            let model = await cache.getDef(IndexType.MODELS, modelId);
            individualModels.push(model);
            individualModelNames.push(entityDef.name ?? model.id.toString());
            finalModel.addModel(model);
            // save where the model vertices start for the corresponding model
            modelVertexIndices.push(i === 0 ? 0 : modelVertexIndices[i - 1] + individualModels[i - 1].vertexPositionsX.length);
        }
    }
}

async function exportGLTFModel(cache) {
    const exporter = new GLTFExporter(finalModel.getMergedModel());
    const exporters = individualModels.map((m) => new GLTFExporter(m));

    let allLengths = [];
    let allMorphTargets = [];
    for (const animId of animations) {
        const appliedAnimation = await finalModel.getMergedModel().loadAnimation(cache, animId, false);
        const morphTargetIndices = appliedAnimation.vertexData.map((frameVertices) =>
            exporter.addMorphTarget(frameVertices),
        );
        // apply subset of the animation to the partial models
        appliedAnimation.vertexData.forEach((frameVertices) => {
            for (let i = 0; i < individualModels.length; ++i) {
                const startIdx = modelVertexIndices[i];
                const endIdx = modelVertexIndices[i] + individualModels[i].vertexPositionsX.length;
                exporters[i].addMorphTarget(frameVertices.slice(startIdx, endIdx));
            }
        });
        allLengths.push(appliedAnimation.lengths);
        allMorphTargets.push(morphTargetIndices);
    }
    for (let i = 0; i < animations.length; ++i) {
        const lengths = allLengths[i];
        const morphTargets = allMorphTargets[i];
        exporter.addAnimation(morphTargets, lengths);
        exporters.forEach((e) => e.addAnimation(morphTargets, lengths));
    }

    exporter.addColors(finalModel.getMergedModel());
    exporters.forEach((e, i) => e.addColors(individualModels[i]));

    if (!split) {
        const gltf = exporter.export();
        const path = `./out/${name}.gltf`;
        fs.writeFileSync(path, gltf);
        console.log(`Wrote single file to ${path}`);
    } else {
        for (let i = 0; i < exporters.length; ++i) {
            const gltf = exporters[i].export();
            const path = `./out/${name}_${formatName(individualModelNames[i])}.gltf`;
            fs.writeFileSync(path, gltf);
            console.log(`Wrote split file to ${path}`);
        }
    }
}

function formatName(name) {
    return name.replace(/[^a-z0-9]/gi, "_").toLowerCase();
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