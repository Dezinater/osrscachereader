class NpcDefinition {
		
}
class NpcLoader {
	
	constructor(bytes) { 
		this.bytes = bytes;
		this.def = new NpcDefinition();
		this.streamPos = 0;
	}
	
	load() {
		let dataview = new DataView(this.bytes.buffer);
		do {
			var opcode = dataview.getUint8(this.streamPos);
			this.streamPos += 1;
			this.handleOpcode(opcode, dataview);
		} while(opcode != 0);
		
		return this.def;
	}
	
	handleOpcode(opcode, dataview){
		var length;
		var index;
		if (opcode == 1)
		{
			length = dataview.getUint8(this.streamPos);
			this.streamPos += 1;
			this.def.models = [];

			for (index = 0; index < length; ++index)
			{
				this.def.models.push(dataview.getUint16(this.streamPos));
				this.streamPos += 2;
			}
		}else if (opcode == 2)
		{
			var name = dataview.getString(this.streamPos);
			this.streamPos += name.length;
			this.def.name = name;
		}
		else if (opcode == 12)
		{
			this.def.size = dataview.getUint8(this.streamPos);
		}
		else if (opcode == 13)
		{
			this.def.standingAnimation = dataview.getUint16(this.streamPos);
			this.streamPos += 2;
		}
		else if (opcode == 14)
		{
			this.def.walkingAnimation = dataview.getUint16(this.streamPos);
			this.streamPos += 2;
		}
		else if (opcode == 15)
		{
			this.def.rotateLeftAnimation = dataview.getUint16(this.streamPos);
			this.streamPos += 2;
		}
		else if (opcode == 16)
		{
			this.def.rotateRightAnimation = dataview.getUint16(this.streamPos);
			this.streamPos += 2;
		}
		else if (opcode == 17)
		{
			this.def.walkingAnimation = dataview.getUint16(this.streamPos);
			this.streamPos += 2;
			this.def.rotate180Animation = dataview.getUint16(this.streamPos);
			this.streamPos += 2;
			this.def.rotate90RightAnimation = dataview.getUint16(this.streamPos);
			this.streamPos += 2;
			this.def.rotate90LeftAnimation = dataview.getUint16(this.streamPos);
			this.streamPos += 2;
		}
		else if (opcode == 18)
		{
			this.def.category = dataview.getUint16(this.streamPos);
			this.streamPos += 2;
		}
		else if (opcode >= 30 && opcode < 35)
		{
			if(this.def.actions == undefined)
				this.def.actions = [];
			
			var readString = dataview.getString(this.streamPos);
			this.def.actions[opcode - 30] = readString;
			this.streamPos += readString.length;
			
			if (this.def.actions[opcode - 30] == "Hidden")
			{
				this.def.actions[opcode - 30] = undefined;
			}
		}
		else if (opcode == 40)
		{
			length = dataview.getUint8(this.streamPos);
			this.streamPos += 1;
			this.def.recolorToFind = [];
			this.def.recolorToReplace = [];

			for (index = 0; index < length; ++index)
			{
				this.def.recolorToFind.push(dataview.getUint16(this.streamPos));
				this.streamPos += 2;
				this.def.recolorToReplace.push(dataview.getUint16(this.streamPos));
				this.streamPos += 2;
			}

		}
		else if (opcode == 41)
		{
			length = dataview.getUint8(this.streamPos);
			this.streamPos += 1;
			this.def.retextureToFind = [];
			this.def.retextureToReplace = [];

			for (index = 0; index < length; ++index)
			{
				this.def.retextureToFind.push(dataview.getUint16(this.streamPos));
				this.streamPos += 2;
				this.def.retextureToReplace.push(dataview.getUint16(this.streamPos));
				this.streamPos += 2;
			}

		}
		else if (opcode == 60)
		{
			length = dataview.getUint8(this.streamPos);
			this.def.chatheadModels = [];

			for (index = 0; index < length; ++index)
			{
				this.def.chatheadModels.push(dataview.getUint16(this.streamPos));
				this.streamPos += 2;
			}

		}
		else if (opcode == 93)
		{
			this.def.isMinimapVisible = false;
		}
		else if (opcode == 95)
		{
			this.def.combatLevel = dataview.getUint16(this.streamPos);
			this.streamPos += 2;
		}
		else if (opcode == 97)
		{
			this.widthScale = dataview.getUint16(this.streamPos);
			this.streamPos += 2;
		}
		else if (opcode == 98)
		{
			this.def.heightScale = dataview.getUint16(this.streamPos);
			this.streamPos += 2;
		}
		else if (opcode == 99)
		{
			this.def.hasRenderPriority = true;
		}
		else if (opcode == 100)
		{
			this.def.ambient = dataview.getInt8(this.streamPos);
			this.streamPos += 1;
		}
		else if (opcode == 101)
		{
			this.def.contrast = dataview.getInt8(this.streamPos);
			this.streamPos += 1;
		}
		else if (opcode == 102)
		{
			this.def.headIcon = dataview.getUint16(this.streamPos);
			this.streamPos += 2;
		}
		else if (opcode == 103)
		{
			this.def.rotationSpeed = dataview.getUint16(this.streamPos);
			this.streamPos += 2;
		}
		else if (opcode == 106)
		{
			this.def.varbitId = dataview.getUint16(this.streamPos);
			this.streamPos += 2;
			if (this.def.varbitId == 65535)
			{
				this.def.varbitId = -1;
			}

			this.def.varpIndex = dataview.getUint16(this.streamPos);
			this.streamPos += 2;
			
			if (this.def.varpIndex == 65535)
			{
				this.def.varpIndex = -1;
			}

			length = dataview.getUint8(this.streamPos);
			this.streamPos += 1;
			
			this.def.configs = new int[length + 2];

			for (index = 0; index <= length; ++index)
			{
				this.def.configs[index] = dataview.getUint16(this.streamPos);
				this.streamPos += 2;
				
				if (this.def.configs[index] == '\uffff')
				{
					this.def.configs[index] = -1;
				}
			}

			this.def.configs[length + 1] = -1;

		}
		else if (opcode == 107)
		{
			this.def.isInteractable = false;
		}
		else if (opcode == 109)
		{
			this.def.rotationFlag = false;
		}
		else if (opcode == 111)
		{
			this.def.isPet = true;
		}
		else if (opcode == 118)
		{
			this.def.varbitId = dataview.getUint16(this.streamPos);
			this.streamPos += 2;
			
			if (this.def.varbitId == 65535)
			{
				this.def.varbitId = -1;
			}

			this.def.varpIndex = dataview.getUint16(this.streamPos);
			this.streamPos += 2;
			
			if (this.def.varpIndex == 65535)
			{
				this.def.varpIndex = -1;
			}

			var varVal = dataview.getUint16(this.streamPos);
			this.streamPos += 2;
			
			if (varVal == 0xFFFF)
			{
				varVal = -1;
			}

			length = dataview.getUint8(this.streamPos);
			this.streamPos += 1;
			this.def.configs = [];

			for (index = 0; index <= length; ++index)
			{
				var value = dataview.getUint16(this.streamPos);
				this.streamPos += 2;
				
				if (this.def.configs[index] == '\uffff') {
					this.def.configs.push(-1);
				} else {
					this.def.configs.push(value);
				}
			}

			this.def.configs.push(varVal);
		}
		else if (opcode == 249)
		{
			length = dataview.getUint8(this.streamPos);
			this.streamPos += 1;
			
			this.def.params = {};

			for (var i = 0; i < length; i++)
			{
				var isString = dataview.getUint8(this.streamPos) == 1;
				this.streamPos += 1;
				
				var key = dataview.getInt24(this.streamPos);
				this.streamPos += 3;
				var value;

				if (isString)
				{
					value = dataview.getString(this.streamPos);
					this.streamPos += value.length;
				}

				else
				{
					value = dataview.getInt32(this.streamPos)
					this.streamPos += 4;
				}

				this.def.params[key] = value;
			}
		}
	}
}