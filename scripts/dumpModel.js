import fs from "fs";

import { RSCache, IndexType, ConfigType, GLTFExporter } from "osrscachereader";

const DUMP_FRAMES = false;

const npcsAndAnimations = [
	{
		npcId: 7706, // zuk
		animations: [
			7564, // idle
			7566, // fire
		],
	},
	{
		npcId: 7698, // ranger
		animations: [
			7602, // idle
			7603, // walk
			7605, // fire
		]
	}
];

const processNpc = async ({npcId, animations}) => {
let npc = await cache.getDef(IndexType.CONFIGS, ConfigType.NPC, npcId);

for (let i = 0; i < npc.models.length; ++i) {
	let model = await cache.getDef(IndexType.MODELS, npc.models[i]);

	const loadedFrames = [];
	const loadedAnimations = [];
	for (const animId of animations) {
		const animationDef = await cache.getFile(
			IndexType.CONFIGS.id,
			ConfigType.SEQUENCE.id,
			animId
		);
		let animation = animationDef.def;
		loadedAnimations.push(animation);

		let selectedAnimation = await cache.getFile(
			IndexType.CONFIGS.id,
			ConfigType.SEQUENCE.id,
			animId
		);
		let shiftedId = selectedAnimation.def.frameIDs[0] >> 16;
		let frames = await model.loadSkeletonAnims(cache, model, shiftedId);
		loadedFrames.push(...frames);
	}

	const exporter = new GLTFExporter(model);
	loadedFrames.forEach((frame) => exporter.addMorphTarget(frame.vertices));
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

		let frameDefs = (await cache.getAllFiles(IndexType.FRAMES.id, shiftedId)).map(x => x.def);
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
		await processNpc(npc);
	}
	cache.close();
	return true;
});
