import fs from "fs";

import { RSCache, IndexType, ConfigType, GLTFExporter } from "osrscachereader";

/*
  "id": 301,
  "models": [
    401, //  head
    456, // torso
    348, //arms 
    353, // hands
    435, // legs
    490, // steel scimitar
    481 // cape
  ],
    "id": 4776,
  "models": [
    7668, // head
    252, // beard
    294, // torso
    317, // cape
    151, // arms
    177, // hands
    518, // sword
    541, // shield
    254, // legs
    185 // boots
  ]
*/
const npcsAndAnimations = [
    {
        npcId: 397, // "guard"
        animations: [
            808, // idle
            1825 // running
        ]
    },
    /*{
        npcId: 11789, // akkha
        animations: [
            9780, // special
            9765, // walking
        ]
    },*/
    /*{
        npcId: 7706, // zuk
        animations: [
            7564, // idle
            7566, // fire
            7565, // flinch
            7562, // die
        ],
    },
    {
        npcId: 7698, // ranger
        animations: [
            7602, // idle
            7603, // walk
            7605, // fire
            7604, // melee attack
            7606, // die
            7607, // flinch
        ],
    },
    {
        npcId: 7699, // mager
        animations: [
            7609, // idle
            7608, // walk
            7610, // mage fire
            7611, // revive
            7612, // melee attack
            7613, // death
        ],
    },
    {
        npcId: 7691, // nibbler
        animations: [
            7573, // idle
            7572, // walk
            7574, // attack
            7575, // flinch
            7676, // die
        ],
    },*/
    /*{
        npcId: 7692, // bat
        animations: [
            7577, // idle and walk
            7578, // attack
            7579, // flinch
            7580, // die
        ],
    },
    {
        npcId: 7693, // blob
        animations: [
            7586, // idle
            7587, // walk
            7581, // attack (is it mage?)
            7582, // attack melee
            7583, // attack range
            7585, // flinch
            7584, // die
        ],
    },*/
    /*
    {
        npcId: 7697, // meleer
        animations: [
            7595, // idle
            7596, // walk
            7597, // attack
            7600, // dig down
            7601, // dig up
            7598, // flinch
            7599, // die
        ],
    },
    {
        npcId: 7700, // jad
        animations: [
            7589, // idle
            7588, // walk
            7592, // attack mage
            7593, // attack range
            7590, // attack melee
            7591, // flinch
            7594, // die
        ],
    },
    {
        npcId: 7707, // ancestral glyph
        animations: [
            7567, // idle
            7569, // dying
        ],
    },*/
];

const processNpc = async ({ npcId, animations }) => {
    let npc = await cache.getDef(IndexType.CONFIGS, ConfigType.NPC, npcId);

    let model = await cache.getDef(IndexType.MODELS, npc.models[0]);
    for (let i = 1; i < npc.models.length; ++i) {
        const extraModel = await cache.getDef(IndexType.MODELS, npc.models[i]);
        model.mergeWith(extraModel);

    }

    const exporter = new GLTFExporter(model);

    const loadedFrames = [];
    // note: only need to ask for frames for the first animation
    let selectedAnimation = await cache.getFile(IndexType.CONFIGS.id, ConfigType.SEQUENCE.id, animations[0]);
    let shiftedId = selectedAnimation.def.frameIDs[0] >> 16;
    let frames = await model.loadSkeletonAnims(cache, model, shiftedId, false);
    loadedFrames.push(...frames);

    let allLengths = [];
    let allMorphTargets = [];
    for (const animId of animations) {
        const appliedAnimation = await model.loadAnimation(cache, animId, false);
        const morphTargetIndices = appliedAnimation.vertexData.map((frameVertices) => exporter.addMorphTarget(frameVertices));
        allLengths.push(appliedAnimation.lengths);
        allMorphTargets.push(morphTargetIndices);
    }
    for (let i = 0; i < animations.length; ++i) {
        const lengths = allLengths[i];
        const morphTargets = allMorphTargets[i];
        exporter.addAnimation(morphTargets, lengths);
    }

    //loadedFrames.forEach((frame) => exporter.addMorphTarget(frame.vertices));
    exporter.addColors(model);

    const gltf = exporter.export();

    const path = `./out/${npc.id}.gltf`;
    fs.writeFileSync(path, gltf);
    console.log(`Wrote single file to ${path}`);
};

let cache = new RSCache("./cache");
cache.onload.then(async () => {
    console.log("Loaded");
    for (const npc of npcsAndAnimations) {
        console.log("loading npc:", npc.npcId);
        await processNpc(npc);
    }
    cache.close();
    return true;
});
