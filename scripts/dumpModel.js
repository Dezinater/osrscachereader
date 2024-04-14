import fs from "fs";
import _ from "lodash";
import YAML from "yaml";

import { RSCache, IndexType, ConfigType, GLTFExporter } from "osrscachereader";

const processNpc = async ({ npcId, animations }) => {
    let npc = await cache.getDef(IndexType.CONFIGS, ConfigType.NPC, npcId);
    return await processObject(npcId, npc.models, animations);
};

const processCustom = async ({ name, models, items, gender, animations, split = false }) => {
    const customModels = [...(models || [])];
    const customAnimations = [...animations];

    if (items) {
        for (const item of items) {
            const itemDef = await cache.getDef(IndexType.CONFIGS, ConfigType.ITEM, item);
            if (!itemDef) {
                throw new Error(`Item ${item} not found`);
            }
            if (gender === "male") {
                if (itemDef.maleModel0 < 0) {
                    throw new Error(`Item ${item} has no male model`);
                }
                customModels.push(itemDef.maleModel0);
            }
            if (gender === "female") {
                if (itemDef.femaleModel0 < 0) {
                    throw new Error(`Item ${item} has no female model`);
                }
                customModels.push(itemDef.femaleModel0);
            }
        }
    }
    return await processObject(name, customModels, _.uniq(customAnimations), split);
};

const processObject = async (name, modelIds, animations, split) => {
    let model = await cache.getDef(IndexType.MODELS, modelIds[0]);
    let modelVertexIndices = [0];
    for (let i = 1; i < modelIds.length; ++i) {
        const extraModel = await cache.getDef(IndexType.MODELS, modelIds[i]);
        model.mergeWith(extraModel);
        modelVertexIndices.push(modelVertexIndices[i - 1] + extraModel.vertexPositionsX.length);
    }
    const exporter = new GLTFExporter(model);

    let allLengths = [];
    let allMorphTargets = [];
    for (const animId of animations) {
        const appliedAnimation = await model.loadAnimation(cache, animId, false);
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
    exporter.addColors(model);

    if (!split) {
        const gltf = exporter.export();
        const path = `./out/${name}.gltf`;
        fs.writeFileSync(path, gltf);
        console.log(`Wrote single file to ${path}`);
    } else {
        for (let i = 0; i < modelIds.length; ++i) {
            const startIndex = modelVertexIndices[i];
            const endIndex = i < modelIds.length - 1 ? modelVertexIndices[i + 1] : model.vertexPositionsX.length;
            const gltf = exporter.exportVerticesRange(startIndex, endIndex);
            const path = `./out/${name}_${modelIds[i]}.gltf`;
            fs.writeFileSync(path, gltf);
            console.log(`Wrote split file to ${path}`);
        }
    }
};

// load export spec from yaml files
const loadExportSpecs = (files) => {
    if (files.length === 0) {
        throw new Error("must pass an array of export spec files (yaml)");
    }
    return files.map((file) => {
        return YAML.parse(fs.readFileSync(file, "utf8"));
    });
};

const exportSpecs = loadExportSpecs(process.argv.slice(2));

let cache = new RSCache("./cache");
cache.onload.then(async () => {
    console.log("Loaded");
    for (const { targets, base_animations } of exportSpecs) {
        for (const object of targets) {
            object.animations.push(...(base_animations || []));
            if ("npcId" in object) {
                console.log("loading npc:", object.npcId);
                await processNpc(object);
            } else if ("models" in object) {
                console.log("loading custom: " + object.name, object);
                await processCustom(object);
            }
        }
    }
    cache.close();
    return true;
});
