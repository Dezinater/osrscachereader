export class NpcDefinition {
		
}
export default class NpcLoader {

	load(bytes) {
		this.def = new NpcDefinition();
		let dataview = new DataView(bytes.buffer);
		do {
			var opcode = dataview.readUint8();
			this.handleOpcode(opcode, dataview);
		} while(opcode != 0);
		
		return this.def;
	}
	
	handleOpcode(opcode, dataview){
		var length;
		var index;
		if (opcode == 1)
		{
			length = dataview.readUint8();
			this.def.models = [];

			for (index = 0; index < length; ++index)
			{
				this.def.models.push(dataview.readUint16());
			}
		}else if (opcode == 2)
		{
			var name = dataview.readString();
			this.def.name = name;
		}
		else if (opcode == 12)
		{
			this.def.size = dataview.readUint8();
		}
		else if (opcode == 13)
		{
			this.def.standingAnimation = dataview.readUint16();
		}
		else if (opcode == 14)
		{
			this.def.walkingAnimation = dataview.readUint16();
		}
		else if (opcode == 15)
		{
			this.def.rotateLeftAnimation = dataview.readUint16();
		}
		else if (opcode == 16)
		{
			this.def.rotateRightAnimation = dataview.readUint16();
		}
		else if (opcode == 17)
		{
			this.def.walkingAnimation = dataview.readUint16();
			this.def.rotate180Animation = dataview.readUint16();
			this.def.rotate90RightAnimation = dataview.readUint16();
			this.def.rotate90LeftAnimation = dataview.readUint16();
		}
		else if (opcode == 18)
		{
			this.def.category = dataview.readUint16();
		}
		else if (opcode >= 30 && opcode < 35)
		{
			if(this.def.actions == undefined)
				this.def.actions = [];
			
			var readString = dataview.readString();
			this.def.actions[opcode - 30] = readString;
			
			if (this.def.actions[opcode - 30] == "Hidden")
			{
				this.def.actions[opcode - 30] = undefined;
			}
		}
		else if (opcode == 40)
		{
			length = dataview.readUint8();
			this.def.recolorToFind = [];
			this.def.recolorToReplace = [];

			for (index = 0; index < length; ++index)
			{
				this.def.recolorToFind.push(dataview.readUint16());
				this.def.recolorToReplace.push(dataview.readUint16());
			}

		}
		else if (opcode == 41)
		{
			length = dataview.readUint8();
			this.def.retextureToFind = [];
			this.def.retextureToReplace = [];

			for (index = 0; index < length; ++index)
			{
				this.def.retextureToFind.push(dataview.readUint16());
				this.def.retextureToReplace.push(dataview.readUint16());
			}

		}
		else if (opcode == 60)
		{
			length = dataview.readUint8();
			this.def.chatheadModels = [];

			for (index = 0; index < length; ++index)
			{
				this.def.chatheadModels.push(dataview.readUint16());
			}

		}
		else if (opcode == 93)
		{
			this.def.isMinimapVisible = false;
		}
		else if (opcode == 95)
		{
			this.def.combatLevel = dataview.readUint16();
		}
		else if (opcode == 97)
		{
			this.widthScale = dataview.readUint16();
		}
		else if (opcode == 98)
		{
			this.def.heightScale = dataview.readUint16();
		}
		else if (opcode == 99)
		{
			this.def.hasRenderPriority = true;
		}
		else if (opcode == 100)
		{
			this.def.ambient = dataview.readInt8();
		}
		else if (opcode == 101)
		{
			this.def.contrast = dataview.readInt8();
		}
		else if (opcode == 102)
		{
			this.def.headIcon = dataview.readUint16();
		}
		else if (opcode == 103)
		{
			this.def.rotationSpeed = dataview.readUint16();
		}
		else if (opcode == 106)
		{
			this.def.varbitId = dataview.readUint16();
			if (this.def.varbitId == 65535)
			{
				this.def.varbitId = -1;
			}

			this.def.varpIndex = dataview.readUint16();
			
			if (this.def.varpIndex == 65535)
			{
				this.def.varpIndex = -1;
			}

			length = dataview.readUint8();
			
			this.def.configs = [];

			for (index = 0; index <= length; ++index)
			{
				this.def.configs[index] = dataview.readUint16();
				
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
			this.def.varbitId = dataview.readUint16();
			
			if (this.def.varbitId == 65535)
			{
				this.def.varbitId = -1;
			}

			this.def.varpIndex = dataview.readUint16();
			
			if (this.def.varpIndex == 65535)
			{
				this.def.varpIndex = -1;
			}

			var varVal = dataview.readUint16();
			
			if (varVal == 0xFFFF)
			{
				varVal = -1;
			}

			length = dataview.readUint8();
			this.def.configs = [];

			for (index = 0; index <= length; ++index)
			{
				var value = dataview.readUint16();
				
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
			length = dataview.readUint8();
			
			this.def.params = {};

			for (var i = 0; i < length; i++)
			{
				var isString = dataview.readUint8() == 1;
				
				var key = dataview.readInt24();
				var value;

				if (isString)
				{
					value = dataview.readString();
				}

				else
				{
					value = dataview.readInt32()
				}

				this.def.params[key] = value;
			}
		}
	}
}