class ObjectDefinition {
		
}
class ObjectLoader {
	
	constructor(bytes) {  // Constructor
		this.bytes = bytes;
		this.def = new ObjectDefinition();
	}
	
	load() {
		let dataview = new DataView(this.bytes.buffer);
		do {
			var opcode = dataview.readUint8();
			this.handleOpcode(opcode, dataview);
		} while(opcode != 0);
		
		return this.def;
	}
	
	handleOpcode(opcode, dataview){
		if (opcode == 1)
		{
			var length = dataview.readUint8();
			if (length > 0)
			{
				this.def.objectTypes = [];
				this.def.objectModels = [];

				for (var index = 0; index < length; ++index)
				{
					objectModels.push(dataview.readUint16());
					objectTypes.push(dataview.readUint8());
				}

			}
		}
		else if (opcode == 2)
		{
			this.def.name = dataview.readString();
		}
		else if (opcode == 5)
		{
			var length = dataview.readUint8();
			if (length > 0)
			{
				this.def.objectTypes = null;
				this.def.objectModels = [];

				for (var index = 0; index < length; ++index)
				{
					this.def.objectModels.push(dataview.readUint16());
				}
			}
		}
		else if (opcode == 14)
		{
			this.def.sizeX = dataview.readUint8();
		}
		else if (opcode == 15)
		{
			this.def.sizeY = dataview.readUint8();
		}
		else if (opcode == 17)
		{
			this.def.interactType = 0;
			this.def.blocksProjectile = false;
		}
		else if (opcode == 18)
		{
			this.def.blocksProjectile = false;
		}
		else if (opcode == 19)
		{
			this.def.wallOrDoor = dataview.readUint8();
		}
		else if (opcode == 21)
		{
			this.def.contouredGround = 0;
		}
		else if (opcode == 22)
		{
			this.def.setMergeNormals = true;
		}
		else if (opcode == 23)
		{
			this.def.aBool2111 = true;
		}
		else if (opcode == 24)
		{
			this.def.animationID = dataview.readUint16();
			if (this.def.animationID() == 0xFFFF)
			{
				this.def.animationID = -1;
			}
		}
		else if (opcode == 27)
		{
			this.def.interactType = 1;
		}
		else if (opcode == 28)
		{
			this.def.decorDisplacement = dataview.readUint8();
		}
		else if (opcode == 29)
		{
			this.def.setAmbient = dataview.readInt8();
		}
		else if (opcode == 39)
		{
			this.def.contrast = dataview.readInt8() * 25;
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
			var length = dataview.readUint8();
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
			var length = dataview.readUint8();
			this.def.retextureToFind = [];
			this.def.textureToReplace = [];

			for (index = 0; index < length; ++index)
			{
				this.def.retextureToFind.push(dataview.readUint16());
				this.def.textureToReplace.push(dataview.readUint16());
			}
		}
		else if (opcode == 62)
		{
			this.def.rotated = true;
		}
		else if (opcode == 64)
		{
			this.def.shadow = false;
		}
		else if (opcode == 65)
		{
			this.def.modelSizeX = dataview.readUint16();
		}
		else if (opcode == 66)
		{
			this.def.modelSizeHeight = dataview.readUint16();
		}
		else if (opcode == 67)
		{
			this.def.modelSizeY = dataview.readUint16();
		}
		else if (opcode == 68)
		{
			this.def.mapSceneID = dataview.readUint16();
		}
		else if (opcode == 69)
		{
			this.def.blockingMask = dataview.readInt8();
		}
		else if (opcode == 70)
		{
			this.def.offsetX = dataview.readUint16();
		}
		else if (opcode == 71)
		{
			this.def.offsetHeight = dataview.readUint16();
		}
		else if (opcode == 72)
		{
			this.def.offsetY = dataview.readUint16();
		}
		else if (opcode == 73)
		{
			this.def.obstructsGround = true;
		}
		else if (opcode == 74)
		{
			this.def.hollow = true;
		}
		else if (opcode == 75)
		{
			this.def.supportsItems = dataview.readUint8();
		}
		else if (opcode == 77)
		{
			var varpID = dataview.readUint16();
			if (varpID == 0xFFFF)
			{
				varpID = -1;
			}
			this.def.varbitID = varpID;

			var configId = dataview.readUint16();
			if (configId == 0xFFFF)
			{
				configId = -1;
			}
			this.def.varpID = configId;

			var length = dataview.readUint8();
			this.def.configChangeDest = [];

			for (var index = 0; index <= length; ++index)
			{
				this.def.configChangeDest.push(dataview.readUint16());
				if (0xFFFF == configChangeDest[index])
				{
					this.def.configChangeDest[index] = -1;
				}
			}
			this.def.configChangeDest.push(-1);
		}
		else if (opcode == 78)
		{
			def.setAmbientSoundId = dataview.readUint16();
			def.setAnInt2083 = dataview.readUint8();
		}
		else if (opcode == 79)
		{
			this.def.setAnInt2112 = dataview.readUint16();
			this.def.setAnInt2113 = dataview.readUint16();
			this.def.setAnInt2083 = dataview.readUint8();
			var length = dataview.readUint8();
			this.def.anIntArray2084 = [];

			for (var index = 0; index < length; ++index)
			{
				this.def.anIntArray2084.push(dataview.readUint16());
			}
		}
		else if (opcode == 81)
		{
			this.def.setContouredGround = dataview.readUint8() * 256;
		}
		else if (opcode == 82)
		{
			this.def.setMapAreaId = dataview.readUint16();
		}
		else if (opcode == 92)
		{
			var varpID = dataview.readUint16();
			if (varpID == 0xFFFF)
			{
				varpID = -1;
			}
			this.def.varbitID = varpID;

			var configId = dataview.readUint16();
			if (configId == 0xFFFF)
			{
				configId = -1;
			}
			this.def.varpID = configId;


			var varValue = dataview.readUint16();
			if (varValue == 0xFFFF)
			{
				varValue = -1;
			}

			var length = dataview.readUint8();
			this.def.configChangeDest = [];

			for (var index = 0; index <= length; ++index)
			{
				this.def.configChangeDest.push(dataview.readUint16());
				if (0xFFFF == configChangeDest[index])
				{
					this.def.configChangeDest[index] = -1;
				}
			}
			this.def.configChangeDest.push(varValue);
		}
		else if (opcode == 249)
		{
			var length = dataview.readUint8();
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