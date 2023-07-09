export class SpotAnimDefinition {

}
export default class SpotAnimLoader {

    load(bytes, id) {
        let def = new SpotAnimDefinition();
        def.id = id;
        let dataview = new DataView(bytes.buffer);
        do {
            var opcode = dataview.readUint8();
            this.handleOpcode(def, opcode, dataview);
        } while (opcode != 0);

        return def;
    }

    handleOpcode(def, opcode, dataview) {
        if (opcode == 1)
		{
			def.modelId = dataview.readUint16();
		}
		else if (opcode == 2)
		{
			def.animationId = dataview.readUint16();
		}
		else if (opcode == 4)
		{
			def.resizeX = dataview.readUint16();
		}
		else if (opcode == 5)
		{
			def.resizeY = dataview.readUint16();
		}
		else if (opcode == 6)
		{
			def.rotaton = dataview.readUint16();
		}
		else if (opcode == 7)
		{
			def.ambient = dataview.readUint8();
		}
		else if (opcode == 8)
		{
			def.contrast = dataview.readUint8();
		}
		else if (opcode == 40)
		{
			let var3 = dataview.readUint8();
			def.recolorToFind = new Array(var3);
			def.recolorToReplace = new Array(var3);

			for (let var4 = 0; var4 < var3; ++var4)
			{
				def.recolorToFind[var4] = dataview.readUint16();
				def.recolorToReplace[var4] = dataview.readUint16();
			}
		}
		else if (opcode == 41)
		{
			let var3 = dataview.readUnsignedByte();
			def.textureToFind = new Array(var3);
			def.textureToReplace = new Array(var3);

			for (let var4 = 0; var4 < var3; ++var4)
			{
				def.textureToFind[var4] = dataview.readUint16();
				def.textureToReplace[var4] = dataview.readUint16();
			}
		}
    }
}