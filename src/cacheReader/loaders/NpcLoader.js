export class NpcDefinition {
		
}
export default class NpcLoader {

	load(bytes, id) {
		let def = new NpcDefinition();
		def.id = id;
		let dataview = new DataView(bytes.buffer);
		do {
			var opcode = dataview.readUint8();
			this.handleOpcode(def, opcode, dataview);
		} while(opcode != 0);
		
		return def;
	}
	
	handleOpcode(def, opcode, dataview){
		var length;
		var index;
		if (opcode == 1)
		{
			length = dataview.readUint8();
			def.models = [];

			for (index = 0; index < length; ++index)
			{
				def.models.push(dataview.readUint16());
			}
		}else if (opcode == 2)
		{
			var name = dataview.readString();
			def.name = name;
		}
		else if (opcode == 12)
		{
			def.size = dataview.readUint8();
		}
		else if (opcode == 13)
		{
			def.standingAnimation = dataview.readUint16();
		}
		else if (opcode == 14)
		{
			def.walkingAnimation = dataview.readUint16();
		}
		else if (opcode == 15)
		{
			def.rotateLeftAnimation = dataview.readUint16();
		}
		else if (opcode == 16)
		{
			def.rotateRightAnimation = dataview.readUint16();
		}
		else if (opcode == 17)
		{
			def.walkingAnimation = dataview.readUint16();
			def.rotate180Animation = dataview.readUint16();
			def.rotate90RightAnimation = dataview.readUint16();
			def.rotate90LeftAnimation = dataview.readUint16();
		}
		else if (opcode == 18)
		{
			def.category = dataview.readUint16();
		}
		else if (opcode >= 30 && opcode < 35)
		{
			if(def.actions == undefined)
				def.actions = [];
			
			var readString = dataview.readString();
			def.actions[opcode - 30] = readString;
			
			if (def.actions[opcode - 30] == "Hidden")
			{
				def.actions[opcode - 30] = undefined;
			}
		}
		else if (opcode == 40)
		{
			length = dataview.readUint8();
			def.recolorToFind = [];
			def.recolorToReplace = [];

			for (index = 0; index < length; ++index)
			{
				def.recolorToFind.push(dataview.readUint16());
				def.recolorToReplace.push(dataview.readUint16());
			}

		}
		else if (opcode == 41)
		{
			length = dataview.readUint8();
			def.retextureToFind = [];
			def.retextureToReplace = [];

			for (index = 0; index < length; ++index)
			{
				def.retextureToFind.push(dataview.readUint16());
				def.retextureToReplace.push(dataview.readUint16());
			}

		}
		else if (opcode == 60)
		{
			length = dataview.readUint8();
			def.chatheadModels = [];

			for (index = 0; index < length; ++index)
			{
				def.chatheadModels.push(dataview.readUint16());
			}

		}
		else if (opcode == 93)
		{
			def.isMinimapVisible = false;
		}
		else if (opcode == 95)
		{
			def.combatLevel = dataview.readUint16();
		}
		else if (opcode == 97)
		{
			this.widthScale = dataview.readUint16();
		}
		else if (opcode == 98)
		{
			def.heightScale = dataview.readUint16();
		}
		else if (opcode == 99)
		{
			def.hasRenderPriority = true;
		}
		else if (opcode == 100)
		{
			def.ambient = dataview.readInt8();
		}
		else if (opcode == 101)
		{
			def.contrast = dataview.readInt8();
		}
		else if (opcode == 102)
		{
			def.headIcon = dataview.readUint16();
		}
		else if (opcode == 103)
		{
			def.rotationSpeed = dataview.readUint16();
		}
		else if (opcode == 106)
		{
			def.varbitId = dataview.readUint16();
			if (def.varbitId == 65535)
			{
				def.varbitId = -1;
			}

			def.varpIndex = dataview.readUint16();
			
			if (def.varpIndex == 65535)
			{
				def.varpIndex = -1;
			}

			length = dataview.readUint8();
			
			def.configs = [];

			for (index = 0; index <= length; ++index)
			{
				def.configs[index] = dataview.readUint16();
				
				if (def.configs[index] == '\uffff')
				{
					def.configs[index] = -1;
				}
			}

			def.configs[length + 1] = -1;

		}
		else if (opcode == 107)
		{
			def.isInteractable = false;
		}
		else if (opcode == 109)
		{
			def.rotationFlag = false;
		}
		else if (opcode == 111)
		{
			def.isPet = true;
		}
		else if (opcode == 118)
		{
			def.varbitId = dataview.readUint16();
			
			if (def.varbitId == 65535)
			{
				def.varbitId = -1;
			}

			def.varpIndex = dataview.readUint16();
			
			if (def.varpIndex == 65535)
			{
				def.varpIndex = -1;
			}

			var varVal = dataview.readUint16();
			
			if (varVal == 0xFFFF)
			{
				varVal = -1;
			}

			length = dataview.readUint8();
			def.configs = [];

			for (index = 0; index <= length; ++index)
			{
				var value = dataview.readUint16();
				
				if (def.configs[index] == '\uffff') {
					def.configs.push(-1);
				} else {
					def.configs.push(value);
				}
			}

			def.configs.push(varVal);
		}
		else if (opcode == 249)
		{
			length = dataview.readUint8();
			
			def.params = {};

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

				def.params[key] = value;
			}
		}
	}
}