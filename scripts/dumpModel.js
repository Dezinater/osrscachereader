import fs from "fs";

import { RSCache, IndexType, ConfigType, GLTFExporter } from "osrscachereader";

const DUMP_FRAMES = false;

const npcsAndAnimations = [
    {
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
    },
    {
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
    },
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
		]
	},
	/*{
		npcId: 8636, // third age ranger. doesnt work, better luck next time
		animations: [
			808, // idle
			819, // walking
		]
	}*/
];

const processNpc = async ({ npcId, animations }) => {
    let npc = await cache.getDef(IndexType.CONFIGS, ConfigType.NPC, npcId);

    for (let i = 0; i < npc.models.length; ++i) {
        let model = await cache.getDef(IndexType.MODELS, npc.models[i]);

        const loadedFrames = [];
		// note: only need to ask for frames for the first animation
		let selectedAnimation = await cache.getFile(
			IndexType.CONFIGS.id,
			ConfigType.SEQUENCE.id,
			animations[0]
		);
		let shiftedId = selectedAnimation.def.frameIDs[0] >> 16;
		let frames = await model.loadSkeletonAnims(cache, model, shiftedId);
		loadedFrames.push(...frames);

        const loadedAnimations = [];
        for (const animId of animations) {
            const animationDef = await cache.getFile(
                IndexType.CONFIGS.id,
                ConfigType.SEQUENCE.id,
                animId
            );
            let animation = animationDef.def;
            loadedAnimations.push(animation);
        }

        const exporter = new GLTFExporter(model);
        loadedFrames.forEach((frame) =>
			exporter.addMorphTarget(frame.vertices)
        );
        exporter.addColors(model);
        loadedAnimations.forEach((animation) => {
            exporter.addAnimation(animation);
        });

        const gltf = exporter.export();

        const path = `./out/${npc.id}_${model.id}.gltf`;
        fs.writeFileSync(path, gltf);
        console.log(`Wrote single file to ${path}`);

        if (DUMP_FRAMES) {
            let initialVertexPositionsX = model.vertexPositionsX;
            let initialVertexPositionsY = model.vertexPositionsY;
            let initialVertexPositionsZ = model.vertexPositionsZ;

            let frameDefs = (
                await cache.getAllFiles(IndexType.FRAMES.id, shiftedId)
            ).map((x) => x.def);
            for (const frame of frameDefs) {
                model.vertexPositionsX = initialVertexPositionsX;
                model.vertexPositionsY = initialVertexPositionsY;
                model.vertexPositionsZ = initialVertexPositionsZ;
                const loaded = model.loadFrame(model, frame);
                model.vertexPositionsX = loaded.vertices.map((v) => v[0]);
                model.vertexPositionsY = loaded.vertices.map((v) => -v[1]);
                model.vertexPositionsZ = loaded.vertices.map((v) => -v[2]);

                const exporter = new GLTFExporter(model);
                //frames.forEach((frame) => exporter.addMorphTarget(frame.vertices));
                //exporter.addAnimation(animation);

                const gltf = exporter.export();

                const path = `./out/${npc.id}_${model.id}_${animation.id}_${frame.id}.gltf`;
                fs.writeFileSync(path, gltf);
                console.log(`Wrote file to ${path}`);
            }
        }
    }
};

let cache = new RSCache("./cache");
cache.onload.then(async () => {
    console.log("Loaded");
    for (const npc of npcsAndAnimations) {
		console.log('loading npc:', npc.npcId);
        await processNpc(npc);
    }
    cache.close();
    return true;
});
