export class ItemDefinition {

}
export default class ItemLoader {

    load(bytes) {
        this.def = new ItemDefinition();
        let dataview = new DataView(bytes.buffer);
        do {
            var opcode = dataview.readUint8();
            this.handleOpcode(opcode, dataview);
        } while (opcode != 0);

        return this.def;
    }

    handleOpcode(opcode, dataview) {
        if (opcode == 1) {
            this.def.inventoryModel = dataview.readUint16();
        }
        else if (opcode == 2) {
            this.def.name = dataview.readString();
        }
        else if (opcode == 4) {
            this.def.zoom2d = dataview.readUint16();
        }
        else if (opcode == 5) {
            this.def.xan2d = dataview.readUint16();
        }
        else if (opcode == 6) {
            this.def.yan2d = dataview.readUint16();
        }
        else if (opcode == 7) {
            this.def.xOffset2d = dataview.readUint16();
            if (this.def.xOffset2d > 32767) {
                this.def.xOffset2d -= 65536;
            }
        }
        else if (opcode == 8) {
            this.def.yOffset2d = dataview.readUint16();
            if (this.def.yOffset2d > 32767) {
                this.def.yOffset2d -= 65536;
            }
        }
        else if (opcode == 11) {
            this.def.stackable = 1;
        }
        else if (opcode == 12) {
            this.def.cost = dataview.readInt32();
        }
        else if (opcode == 16) {
            this.def.members = true;
        }
        else if (opcode == 23) {
            this.def.maleModel0 = dataview.readUint16();
            this.def.maleOffset = dataview.readUint8();
        }
        else if (opcode == 24) {
            this.def.maleModel1 = dataview.readUint16();
        }
        else if (opcode == 25) {
            this.def.femaleModel0 = dataview.readUint16();
            this.def.femaleOffset = dataview.readUint8();
        }
        else if (opcode == 26) {
            this.def.femaleModel1 = dataview.readUint16();
        }
        else if (opcode >= 30 && opcode < 35) {
            if(this.def.options == undefined)
				this.def.options = [];

            this.def.options[opcode - 30] = dataview.readString();
            if (this.def.options[opcode - 30] == "Hidden") {
                this.def.options[opcode - 30] = null;
            }
        }
        else if (opcode >= 35 && opcode < 40) {
            if(this.def.interfaceOptions == undefined)
				this.def.interfaceOptions = [];
            this.def.interfaceOptions[opcode - 35] = dataview.readString();
        }
        else if (opcode == 40) {
            var var5 = dataview.readUint8();
            this.def.colorFind = [];
            this.def.colorReplace = [];

            for (var var4 = 0; var4 < var5; ++var4) {
                this.def.colorFind[var4] = dataview.readUint16();
                this.def.colorReplace[var4] = dataview.readUint16();
            }

        }
        else if (opcode == 41) {
            var var5 = dataview.readUint8();
            this.def.textureFind = [];
            this.def.textureReplace = [];

            for (var var4 = 0; var4 < var5; ++var4) {
                this.def.textureFind[var4] = dataview.readUint16();
                this.def.textureReplace[var4] = dataview.readUint16();
            }

        }
        else if (opcode == 42) {
            this.def.shiftClickDropIndex = dataview.readInt8();
        }
        else if (opcode == 65) {
            this.def.isTradeable = true;
        }
        else if (opcode == 78) {
            this.def.maleModel2 = dataview.readUint16();
        }
        else if (opcode == 79) {
            this.def.femaleModel2 = dataview.readUint16();
        }
        else if (opcode == 90) {
            this.def.maleHeadModel = dataview.readUint16();
        }
        else if (opcode == 91) {
            this.def.femaleHeadModel = dataview.readUint16();
        }
        else if (opcode == 92) {
            this.def.maleHeadModel2 = dataview.readUint16();
        }
        else if (opcode == 93) {
            this.def.femaleHeadModel2 = dataview.readUint16();
        }
        else if (opcode == 95) {
            this.def.zan2d = dataview.readUint16();
        }
        else if (opcode == 97) {
            this.def.notedID = dataview.readUint16();
        }
        else if (opcode == 98) {
            this.def.notedTemplate = dataview.readUint16();
        }
        else if (opcode >= 100 && opcode < 110) {
            if (this.def.countObj == undefined) {
                this.def.countObj = [];
                this.def.countCo = [];
            }

            this.def.countObj[opcode - 100] = dataview.readUint16();
            this.def.countCo[opcode - 100] = dataview.readUint16();
        }
        else if (opcode == 110) {
            this.def.resizeX = dataview.readUint16();
        }
        else if (opcode == 111) {
            this.def.resizeY = dataview.readUint16();
        }
        else if (opcode == 112) {
            this.def.resizeZ = dataview.readUint16();
        }
        else if (opcode == 113) {
            this.def.ambient = dataview.readInt8();
        }
        else if (opcode == 114) {
            this.def.contrast = dataview.readInt8();
        }
        else if (opcode == 115) {
            this.def.team = dataview.readUint8();
        }
        else if (opcode == 139) {
            this.def.boughtId = dataview.readUint16();
        }
        else if (opcode == 140) {
            this.def.boughtTemplateId = dataview.readUint16();
        }
        else if (opcode == 148) {
            this.def.placeholderId = dataview.readUint16();
        }
        else if (opcode == 149) {
            this.def.placeholderTemplateId = dataview.readUint16();
        }
        else if (opcode == 249) {
            var length = dataview.readUint8();
            this.def.params = {};

            for (var i = 0; i < length; i++) {
                var isString = dataview.readUint8() == 1;

                var key = dataview.readInt24();
                var value;

                if (isString) {
                    value = dataview.readString();
                }
                else {
                    value = dataview.readInt32()
                }

                this.def.params[key] = value;
            }
        }
    }
}