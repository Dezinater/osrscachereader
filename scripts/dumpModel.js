import fs from "fs";

import { RSCache, IndexType, ConfigType, GLTFExporter } from "osrscachereader";

let cache = new RSCache("./cache");
cache.onload.then(async () => {
	console.log("Loaded");
	const npcId = 7706; // zuk
	//const npcId = 7698;
	let npc = await cache.getDef(IndexType.CONFIGS, ConfigType.NPC, npcId);

	// zuk idle
	const animId = 7564;
	//const animId = 7605;
	for (let i = 0; i < npc.models.length; ++i) {
		let model = await cache.getDef(IndexType.MODELS, npc.models[i]);

		const animationDef = await cache.getFile(
			IndexType.CONFIGS.id,
			ConfigType.SEQUENCE.id,
			animId
		);
		let animation = animationDef.def;

		let selectedAnimation = await cache.getFile(
			IndexType.CONFIGS.id,
			ConfigType.SEQUENCE.id,
			animId
		);
		let shiftedId = selectedAnimation.def.frameIDs[0] >> 16;
		let frames = await model.loadSkeletonAnims(cache, model, shiftedId);

		let initialVertexPositionsX = model.vertexPositionsX;
		let initialVertexPositionsY = model.vertexPositionsY;
		let initialVertexPositionsZ = model.vertexPositionsZ;

		const exporter = new GLTFExporter(model);
		frames.forEach((frame) => exporter.addMorphTarget(frame.vertices));
		exporter.addAnimation(animation);

		const gltf = exporter.export();

		const path = `./out/${npc.id}_${model.id}_${animation.id}.gltf`;
		fs.writeFileSync(path, gltf);
		console.log(`Wrote single file to ${path}`);

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
	cache.close();
	return true;
});
