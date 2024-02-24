class Sound {
	id;
	loops;
	location;
	retain;

	constructor(id, loops, location, retain) {
		this.id = id;
		this.loops = loops;
		this.location = location;
		this.retain = retain;
	}
}

/**
* Sequences are animations
* @class SequenceDefinition
* @category Definitions
* @hideconstructor
*/
export class SequenceDefinition {
	/** 
	* The ID of this Animation
	* @type {number} 
	*/
	id;
	/**  
	 * How long each frame will take
	 * @type {Array<number>} 
	*/
	frameLengths = [];

	/**  
	 * These IDs are used to find the corresponding Skeleton and Frame information
	 * @type {Array<number>} 
	*/
	frameIDs = [];

	/**  @type {number} */
	frameStep = -1;

	/**  @type {Array} */
	interleaveLeave = [];

	/**  @type {boolean} */
	stretches = false;

	/**  @type {number} */
	forcedPriority = 5;

	/**  @type {number} */
	leftHandItem = -1;

	/**  @type {number} */
	rightHandItem = -1;

	/**  @type {number} */
	maxLoops = 99;

	/**  @type {number} */
	precedenceAnimating = -1;

	/**  @type {number} */
	priority = -1;

	/**  @type {number} */
	replyMode = 2;

	/**  @type {Array} */
	chatFrameIds = [];

	/**  @type {Array<Sound>} */
	frameSounds = [];

	/**  
	 * If this ID is set then it uses Animaya animations. This ID works the same as a frameID
	 * @type {number} 
	*/
	animMayaID = -1;

	/**  @type {Object} */
	animMayaFrameSounds = {};

	/**  @type {number} */
	animMayaStart;

	/**  @type {number} */
	animMayaEnd;

	/**  @type {Array<boolean>} */
	animMayaMasks = [];

}
export default class SequenceLoader {
	rev220FrameSounds = true;
	configureForRevision(revision) {
		this.rev220FrameSounds = revision >= 1141;
	}

	load(bytes, id) {
		let def = new SequenceDefinition();
		def.id = id;
		let dataview = new DataView(bytes.buffer);
		do {
			var opcode = dataview.readUint8();
			this.handleOpcode(def, opcode, dataview);
		} while (opcode != 0);

		return def;
	}

	handleOpcode(def, opcode, dataview) {
		var var3;
		var var4;
		if (opcode == 1) {
			var3 = dataview.readUint16();
			def.frameLengths = [];

			for (var4 = 0; var4 < var3; ++var4) {
				def.frameLengths[var4] = dataview.readUint16();
			}

			def.frameIDs = [];

			for (var4 = 0; var4 < var3; ++var4) {
				def.frameIDs[var4] = dataview.readUint16();
			}

			for (var4 = 0; var4 < var3; ++var4) {
				def.frameIDs[var4] += dataview.readUint16() << 16;
			}
		}
		else if (opcode == 2) {
			def.frameStep = dataview.readUint16();
		}
		else if (opcode == 3) {
			var3 = dataview.readUint8();
			def.interleaveLeave = [];

			for (var4 = 0; var4 < var3; ++var4) {
				def.interleaveLeave[var4] = dataview.readUint8();
			}

			def.interleaveLeave[var3] = 9999999;
		}
		else if (opcode == 4) {
			def.stretches = true;
		}
		else if (opcode == 5) {
			def.forcedPriority = dataview.readUint8();
		}
		else if (opcode == 6) {
			def.leftHandItem = dataview.readUint16();
		}
		else if (opcode == 7) {
			def.rightHandItem = dataview.readUint16();
		}
		else if (opcode == 8) {
			def.maxLoops = dataview.readUint8();
		}
		else if (opcode == 9) {
			def.precedenceAnimating = dataview.readUint8();
		}
		else if (opcode == 10) {
			def.priority = dataview.readUint8();
		}
		else if (opcode == 11) {
			def.replyMode = dataview.readUint8();
		}
		else if (opcode == 12) {
			var3 = dataview.readUint8();
			def.chatFrameIds = [];

			for (var4 = 0; var4 < var3; ++var4) {
				def.chatFrameIds[var4] = dataview.readUint16();
			}

			for (var4 = 0; var4 < var3; ++var4) {
				def.chatFrameIds[var4] += dataview.readUint16() << 16;
			}
		}
		else if (opcode == 13) {
			var3 = dataview.readUint8();
			def.frameSounds = [];

			for (var4 = 0; var4 < var3; ++var4) {
				def.frameSounds[var4] = this.readFrameSound(dataview);
			}
		}
		else if (opcode == 14) {
			def.animMayaID = dataview.readInt32();
		}
		else if (opcode == 15) {
			var3 = dataview.readUint16();
			def.animMayaFrameSounds = {};

			for (var4 = 0; var4 < var3; ++var4) {
				let frame = dataview.readUint16();
				def.animMayaFrameSounds[frame] = this.readFrameSound(dataview);
			}
		}
		else if (opcode == 16) {
			def.animMayaStart = dataview.readUint16();
			def.animMayaEnd = dataview.readUint16();
		}
		else if (opcode == 17) {
			def.animMayaMasks = new Array(256).fill().map(x => false);

			var3 = dataview.readUint8();

			for (var4 = 0; var4 < var3; ++var4) {
				def.animMayaMasks[dataview.readUint8()] = true;
			}
		}
	}

	readFrameSound(stream) {
		let id;
		let loops;
		let location;
		let retain;

		
		if (!this.rev220FrameSounds) {
			let bits = stream.readUint24();
			location = bits & 15;
			id = bits >> 8;
			loops = bits >> 4 & 7;
			retain = 0;
		}
		else {
			id = stream.readUint16();
			loops = stream.readUint8();
			location = stream.readUint8();
			retain = stream.readUint8();
		}

		if (id >= 1 && loops >= 1 && location >= 0 && retain >= 0) {
			return new Sound(id, loops, location, retain);
		}
		else {
			return null;
		}
	}
}