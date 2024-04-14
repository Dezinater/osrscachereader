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
    const splitNames = [];

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
            splitNames.push(itemDef.name.replace(" ", "_"));
        }
    }
    return await processObject(name, customModels, _.uniq(customAnimations), split, splitNames);
};

const processObject = async (name, modelIds, animations, split, splitNames) => {
    let fullModel = await cache.getDef(IndexType.MODELS, modelIds[0]);
    let origModel = await cache.getDef(IndexType.MODELS, modelIds[0]);
    let modelVertexIndices = [0];
    let models = [origModel];
    for (let i = 1; i < modelIds.length; ++i) {
        const extraModel = await cache.getDef(IndexType.MODELS, modelIds[i]);
        fullModel.mergeWith(extraModel);
        modelVertexIndices.push(modelVertexIndices[i - 1] + models[i - 1].vertexPositionsX.length);
        models.push(extraModel);
    }
    const exporter = new GLTFExporter(fullModel);
    const exporters = models.map((m) => new GLTFExporter(m));

    let allLengths = [];
    let allMorphTargets = [];
    for (const animId of animations) {
        const appliedAnimation = await fullModel.loadAnimation(cache, animId, false);
        const morphTargetIndices = appliedAnimation.vertexData.map((frameVertices) =>
            exporter.addMorphTarget(frameVertices),
        );
        // apply subset of the animation to the partial model
        appliedAnimation.vertexData.forEach((frameVertices) => {
            for (let i = 0; i < models.length; ++i) {
                const startIdx = modelVertexIndices[i];
                const endIdx = modelVertexIndices[i] + models[i].vertexPositionsX.length;
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
    exporter.addColors(fullModel);
    exporters.forEach((e, i) => e.addColors(models[i]));

    if (!split) {
        const gltf = exporter.export();
        const path = `./out/${name}.gltf`;
        fs.writeFileSync(path, gltf);
        console.log(`Wrote single file to ${path}`);
    } else {
        for (let i = 0; i < exporters.length; ++i) {
            const gltf = exporters[i].export();
            const path = `./out/${name}_${splitNames[i]}.gltf`;
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
