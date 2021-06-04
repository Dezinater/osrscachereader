class SequenceDefinition {
		
}
class SequenceLoader {

	load(bytes) {
		this.def = new SequenceDefinition();
		let dataview = new DataView(bytes.buffer);
		do {
			var opcode = dataview.readUint8();
			this.handleOpcode(opcode, dataview);
		} while(opcode != 0);
		
		return this.def;
	}
	
	handleOpcode(opcode, dataview){
        var var3;
		var var4;
		if (opcode == 1)
		{
			var3 = dataview.readUint16();
			this.def.frameLenghts = new int[var3];

			for (var4 = 0; var4 < var3; ++var4)
			{
				this.def.frameLenghts[var4] = dataview.readUint16();
			}

			this.def.frameIDs = new int[var3];

			for (var4 = 0; var4 < var3; ++var4)
			{
				this.def.frameIDs[var4] = dataview.readUint16();
			}

			for (var4 = 0; var4 < var3; ++var4)
			{
				this.def.frameIDs[var4] += dataview.readUint16() << 16;
			}
		}
		else if (opcode == 2)
		{
			this.def.frameStep = dataview.readUint16();
		}
		else if (opcode == 3)
		{
			var3 = dataview.readUint8();
			this.def.interleaveLeave = new int[1 + var3];

			for (var4 = 0; var4 < var3; ++var4)
			{
				this.def.interleaveLeave[var4] = dataview.readUint8();
			}

			this.def.interleaveLeave[var3] = 9999999;
		}
		else if (opcode == 4)
		{
			this.def.stretches = true;
		}
		else if (opcode == 5)
		{
			this.def.forcedPriority = dataview.readUint8();
		}
		else if (opcode == 6)
		{
			this.def.leftHandItem = dataview.readUint16();
		}
		else if (opcode == 7)
		{
			this.def.rightHandItem = dataview.readUint16();
		}
		else if (opcode == 8)
		{
			this.def.maxLoops = dataview.readUint8();
		}
		else if (opcode == 9)
		{
			this.def.precedenceAnimating = dataview.readUint8();
		}
		else if (opcode == 10)
		{
			this.def.priority = dataview.readUint8();
		}
		else if (opcode == 11)
		{
			this.def.replyMode = dataview.readUint8();
		}
		else if (opcode == 12)
		{
			var3 = dataview.readUint8();
			this.def.chatFrameIds = new int[var3];

			for (var4 = 0; var4 < var3; ++var4)
			{
				this.def.chatFrameIds[var4] = dataview.readUint16();
			}

			for (var4 = 0; var4 < var3; ++var4)
			{
				this.def.chatFrameIds[var4] += dataview.readUint16() << 16;
			}
		}
		else if (opcode == 13)
		{
			var3 = dataview.readUint8();
			this.def.frameSounds = new int[var3];

			for (var4 = 0; var4 < var3; ++var4)
			{
				this.def.frameSounds[var4] = dataview.readUint24();
			}
		}
          
	}
}