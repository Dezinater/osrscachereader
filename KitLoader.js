class KitDefinition {
		
}
class KitLoader {
	
	constructor(bytes) {
		this.bytes = bytes;
		this.def = new KitDefinition();
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
        switch(opcode) {
            case 1:
                this.def.bodyPartId = dataview.readUint8();
                break;
            
            case 2:
                var length = dataview.readUint8();
				this.def.models = [];

				for (var index = 0; index < length; ++index)
					this.def.models[index] = dataview.readUint16();
                break;

            case 3:
                this.def.nonSelectable = true;
                break;
            
            case 40:
                var length = dataview.readUint8();
				this.def.recolorToFind = [];
				this.def.recolorToReplace = [];

				for (var index = 0; index < length; ++index)
				{
					this.def.recolorToFind[index] = dataview.readInt16();
					this.def.recolorToReplace[index] = dataview.readInt16();
				}
                break;
            
            case 41:
                var length = dataview.readUint16();
				this.def.retextureToFind = new short[length];
				this.def.retextureToReplace = new short[length];

				for (var index = 0; index < length; ++index)
				{
					this.def.retextureToFind[index] = dataview.readInt16();
					this.def.retextureToReplace[index] = dataview.readInt16();
				}
                break;

            default:
                if(opcode >= 60 && opcode < 70)
                    this.def.chatheadModels[opcode - 60] = dataview.readUint16();
                else
                    throw 'Unknown opcode found';
          }
	}
}