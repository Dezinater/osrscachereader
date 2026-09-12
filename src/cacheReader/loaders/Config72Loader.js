import IndexType from "../cacheTypes/IndexType.js";

/**
* @class Config72Definition
* @category Definitions
* @hideconstructor
*/
export class Config72Definition {
	/** 
	* @type {number} 
	*/
	id;
}

export default class Config72Loader {

	async load(bytes, id, cache, options) {
		let def = new Config72Definition();
		def.id = id;

		let dataview = new DataView(bytes.buffer);
		do {
			var opcode = dataview.readUint8();
			this.handleOpcode(def, opcode, dataview);
		} while (opcode != 0);

		if (options.loadSprites && def.sprite != undefined) {
			def.sprite = await cache.getDef(IndexType.SPRITES.id, def.sprite);
			return def;
		} else {
			return def;
		}
	}

	handleOpcode(def, opcode, dataview) {
		if (opcode == 2) {
			dataview.readUint8()
		} else if (opcode == 4) {
			def.field143_0xa8 = dataview.readInt16();
		} else if (opcode == 5) {
			def.field144_0xac = dataview.readInt16();
		} else if (opcode == 6) {
			def.field145_0xb0 = dataview.readInt16();
		} else if (opcode == 7) {
			def.field146_0xb4 = dataview.readInt16();
		} else if (opcode == 8) {
			def.field147_0xb8 = dataview.readUint16();
		} else if (opcode == 9) {
			def.field148_0xbc = dataview.readUint16();
		} else if (opcode == 12) {
			def.string = dataview.readString();
		} else if (opcode == 0xf || opcode == 0x10 || opcode == 0x11 || opcode == 0x12 || opcode == 0x13) {
			def.string2 = dataview.readString();
		} else if (opcode == 0xe) {
			def.field138_0xa0 = 1;
			return;
		} else if (opcode == 0x14) {
			def.field13_0x20 = dataview.readUint16();
			return;
		} else if (opcode == 0x17) {
			def.field150_0xc4 = dataview.readUint8()
			return;
		} else if (opcode == 0x18) {
			def.field151_0xc5 = dataview.readUint8()
			return;
		} else if (opcode == 0x19) {
			def.field149_0xc0 = dataview.readUint16();
			return;
		} else if (opcode == 0x1a) {
			def.sprite = dataview.readBigSmart2();
		}
	}

}