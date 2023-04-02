"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemDefinition = void 0;
class ItemDefinition {
}
exports.ItemDefinition = ItemDefinition;
class ItemLoader {
    load(bytes, id) {
        //console.log(id, bytes)
        let def = new ItemDefinition();
        def.id = id;
        let dataview = new DataView(bytes.buffer);
        let lastOpCode = 0;
        do {
            var opcode = dataview.readUint8();
            this.handleOpcode(def, opcode, dataview, lastOpCode);
            lastOpCode = opcode;
        } while (opcode != 0);
        if (def.stackable == 1) {
            def.weight = 0;
        }
        return def;
    }
    handleOpcode(def, opcode, dataview, lastOpCode) {
        if (opcode == 1) {
            def.inventoryModel = dataview.readUint16();
        }
        else if (opcode == 2) {
            def.name = dataview.readString();
        }
        else if (opcode == 4) {
            def.zoom2d = dataview.readUint16();
        }
        else if (opcode == 5) {
            def.xan2d = dataview.readUint16();
        }
        else if (opcode == 6) {
            def.yan2d = dataview.readUint16();
        }
        else if (opcode == 7) {
            def.xOffset2d = dataview.readUint16();
            if (def.xOffset2d > 32767) {
                def.xOffset2d -= 65536;
            }
        }
        else if (opcode == 8) {
            def.yOffset2d = dataview.readUint16();
            if (def.yOffset2d > 32767) {
                def.yOffset2d -= 65536;
            }
        }
        else if (opcode == 9) {
            def.unknown1 = dataview.readString();
        }
        else if (opcode == 11) {
            def.stackable = 1;
        }
        else if (opcode == 12) {
            def.cost = dataview.readInt32();
        }
        else if (opcode == 13) {
            def.wearPos1 = dataview.readInt8();
        }
        else if (opcode == 14) {
            def.wearPos2 = dataview.readInt8();
        }
        else if (opcode == 16) {
            def.members = true;
        }
        else if (opcode == 23) {
            def.maleModel0 = dataview.readUint16();
            def.maleOffset = dataview.readUint8();
        }
        else if (opcode == 24) {
            def.maleModel1 = dataview.readUint16();
        }
        else if (opcode == 25) {
            def.femaleModel0 = dataview.readUint16();
            def.femaleOffset = dataview.readUint8();
        }
        else if (opcode == 26) {
            def.femaleModel1 = dataview.readUint16();
        }
        else if (opcode == 27) {
            def.wearPos3 = dataview.readInt8();
        }
        else if (opcode >= 30 && opcode < 35) {
            if (def.options == undefined)
                def.options = [];
            def.options[opcode - 30] = dataview.readString();
            if (def.options[opcode - 30] == "Hidden") {
                def.options[opcode - 30] = null;
            }
        }
        else if (opcode >= 35 && opcode < 40) {
            if (def.interfaceOptions == undefined)
                def.interfaceOptions = [];
            def.interfaceOptions[opcode - 35] = dataview.readString();
        }
        else if (opcode == 40) {
            var var5 = dataview.readUint8();
            def.colorFind = [];
            def.colorReplace = [];
            for (var var4 = 0; var4 < var5; ++var4) {
                def.colorFind[var4] = dataview.readUint16();
                def.colorReplace[var4] = dataview.readUint16();
            }
        }
        else if (opcode == 41) {
            var var5 = dataview.readUint8();
            def.textureFind = [];
            def.textureReplace = [];
            for (var var4 = 0; var4 < var5; ++var4) {
                def.textureFind[var4] = dataview.readUint16();
                def.textureReplace[var4] = dataview.readUint16();
            }
        }
        else if (opcode == 42) {
            def.shiftClickDropIndex = dataview.readInt8();
        }
        else if (opcode == 65) {
            def.isTradeable = true;
        }
        else if (opcode == 75) {
            def.weight = dataview.readInt16();
        }
        else if (opcode == 78) {
            def.maleModel2 = dataview.readUint16();
        }
        else if (opcode == 79) {
            def.femaleModel2 = dataview.readUint16();
        }
        else if (opcode == 90) {
            def.maleHeadModel = dataview.readUint16();
        }
        else if (opcode == 91) {
            def.femaleHeadModel = dataview.readUint16();
        }
        else if (opcode == 92) {
            def.maleHeadModel2 = dataview.readUint16();
        }
        else if (opcode == 93) {
            def.femaleHeadModel2 = dataview.readUint16();
        }
        else if (opcode == 94) {
            def.category = dataview.readUint16();
        }
        else if (opcode == 95) {
            def.zan2d = dataview.readUint16();
        }
        else if (opcode == 97) {
            def.notedID = dataview.readUint16();
        }
        else if (opcode == 98) {
            def.notedTemplate = dataview.readUint16();
        }
        else if (opcode >= 100 && opcode < 110) {
            if (def.countObj == undefined) {
                def.countObj = [];
                def.countCo = [];
            }
            def.countObj[opcode - 100] = dataview.readUint16();
            def.countCo[opcode - 100] = dataview.readUint16();
        }
        else if (opcode == 110) {
            def.resizeX = dataview.readUint16();
        }
        else if (opcode == 111) {
            def.resizeY = dataview.readUint16();
        }
        else if (opcode == 112) {
            def.resizeZ = dataview.readUint16();
        }
        else if (opcode == 113) {
            def.ambient = dataview.readInt8();
        }
        else if (opcode == 114) {
            def.contrast = dataview.readInt8();
        }
        else if (opcode == 115) {
            def.team = dataview.readUint8();
        }
        else if (opcode == 139) {
            def.boughtId = dataview.readUint16();
        }
        else if (opcode == 140) {
            def.boughtTemplateId = dataview.readUint16();
        }
        else if (opcode == 148) {
            def.placeholderId = dataview.readUint16();
        }
        else if (opcode == 149) {
            def.placeholderTemplateId = dataview.readUint16();
        }
        else if (opcode == 249) {
            var length = dataview.readUint8();
            def.params = {};
            for (var i = 0; i < length; i++) {
                var isString = dataview.readUint8() == 1;
                var key = dataview.readInt24();
                var value;
                if (isString) {
                    value = dataview.readString();
                }
                else {
                    value = dataview.readInt32();
                }
                def.params[key] = value;
            }
        }
        else {
            //console.error("UNHANDLED OPCODE [ItemLoader]: " + opcode + " last: " + lastOpCode)
        }
    }
}
exports.default = ItemLoader;
