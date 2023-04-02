"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectDefinition = void 0;
class ObjectDefinition {
    constructor() {
        this.shadow = true;
    }
}
exports.ObjectDefinition = ObjectDefinition;
class ObjectLoader {
    load(bytes, id) {
        //console.log(id, bytes.length);
        let def = new ObjectDefinition();
        def.id = id;
        let dataview = new DataView(bytes.buffer);
        do {
            var opcode = dataview.readUint8();
            this.handleOpcode(def, opcode, dataview);
        } while (opcode != 0);
        return def;
    }
    handleOpcode(def, opcode, dataview) {
        //console.log(opcode);
        if (opcode == 0)
            return;
        if (opcode == 1) {
            var length = dataview.readUint8();
            if (length > 0) {
                def.objectTypes = [];
                def.objectModels = [];
                for (var index = 0; index < length; ++index) {
                    def.objectModels.push(dataview.readUint16());
                    def.objectTypes.push(dataview.readUint8());
                }
            }
        }
        else if (opcode == 2) {
            def.name = dataview.readString();
        }
        else if (opcode == 5) {
            var length = dataview.readUint8();
            if (length > 0) {
                def.objectTypes = null;
                def.objectModels = [];
                for (var index = 0; index < length; ++index) {
                    def.objectModels.push(dataview.readUint16());
                }
            }
        }
        else if (opcode == 14) {
            def.sizeX = dataview.readUint8();
        }
        else if (opcode == 15) {
            def.sizeY = dataview.readUint8();
        }
        else if (opcode == 17) {
            def.interactType = 0;
            def.blocksProjectile = false;
        }
        else if (opcode == 18) {
            def.blocksProjectile = false;
        }
        else if (opcode == 19) {
            def.wallOrDoor = dataview.readUint8();
        }
        else if (opcode == 21) {
            def.contouredGround = 0;
        }
        else if (opcode == 22) {
            def.setMergeNormals = true;
        }
        else if (opcode == 23) {
            def.aBool2111 = true;
        }
        else if (opcode == 24) {
            def.animationID = dataview.readUint16();
            if (def.animationID == 0xFFFF) {
                def.animationID = -1;
            }
        }
        else if (opcode == 27) {
            def.interactType = 1;
        }
        else if (opcode == 28) {
            def.decorDisplacement = dataview.readUint8();
        }
        else if (opcode == 29) {
            def.setAmbient = dataview.readInt8();
        }
        else if (opcode == 39) {
            def.contrast = dataview.readInt8() * 25;
        }
        //30-34, 40, 41 are similar to NPCLoader, maybe make parent class for similar opcode loaders
        else if (opcode >= 30 && opcode < 35) {
            if (def.actions == undefined)
                def.actions = [];
            var readString = dataview.readString();
            def.actions[opcode - 30] = readString;
            //might be better to leave it as hidden (?)
            if (def.actions[opcode - 30] == "Hidden") {
                def.actions[opcode - 30] = undefined;
            }
        }
        else if (opcode == 40) {
            var length = dataview.readUint8();
            def.recolorToFind = [];
            def.recolorToReplace = [];
            for (index = 0; index < length; ++index) {
                def.recolorToFind.push(dataview.readUint16());
                def.recolorToReplace.push(dataview.readUint16());
            }
        }
        else if (opcode == 41) {
            var length = dataview.readUint8();
            def.retextureToFind = [];
            def.textureToReplace = [];
            for (index = 0; index < length; ++index) {
                def.retextureToFind.push(dataview.readUint16());
                def.textureToReplace.push(dataview.readUint16());
            }
        }
        else if (opcode == 61) {
            def.category = dataview.readUint16();
        }
        else if (opcode == 62) {
            def.rotated = true;
        }
        else if (opcode == 64) { //needs to be declared as true in constructor if toggling to false
            def.shadow = false;
        }
        else if (opcode == 65) {
            def.modelSizeX = dataview.readUint16();
        }
        else if (opcode == 66) {
            def.modelSizeHeight = dataview.readUint16();
        }
        else if (opcode == 67) {
            def.modelSizeY = dataview.readUint16();
        }
        else if (opcode == 68) {
            def.mapSceneID = dataview.readUint16();
        }
        else if (opcode == 69) {
            def.blockingMask = dataview.readInt8();
        }
        else if (opcode == 70) {
            def.offsetX = dataview.readUint16();
        }
        else if (opcode == 71) {
            def.offsetHeight = dataview.readUint16();
        }
        else if (opcode == 72) {
            def.offsetY = dataview.readUint16();
        }
        else if (opcode == 73) {
            def.obstructsGround = true;
        }
        else if (opcode == 74) {
            def.hollow = true;
        }
        else if (opcode == 75) {
            def.supportsItems = dataview.readUint8();
        }
        else if (opcode == 77) {
            var varpID = dataview.readUint16();
            if (varpID == 0xFFFF) {
                varpID = -1;
            }
            def.varbitID = varpID;
            var configId = dataview.readUint16();
            if (configId == 0xFFFF) {
                configId = -1;
            }
            def.varpID = configId;
            var length = dataview.readUint8();
            def.configChangeDest = [];
            for (var index = 0; index <= length; ++index) {
                def.configChangeDest.push(dataview.readUint16());
                if (0xFFFF == def.configChangeDest[index]) {
                    def.configChangeDest[index] = -1;
                }
            }
            def.configChangeDest.push(-1);
        }
        else if (opcode == 78) {
            def.setAmbientSoundId = dataview.readUint16();
            def.setAnInt2083 = dataview.readUint8();
        }
        else if (opcode == 79) {
            def.setAnInt2112 = dataview.readUint16();
            def.setAnInt2113 = dataview.readUint16();
            def.setAnInt2083 = dataview.readUint8();
            var length = dataview.readUint8();
            let anIntArray2084 = [];
            for (var index = 0; index < length; ++index) {
                anIntArray2084.push(dataview.readUint16());
            }
            def.ambientSoundIds = anIntArray2084;
        }
        else if (opcode == 81) {
            def.setContouredGround = dataview.readUint8() * 256;
        }
        else if (opcode == 82) {
            def.setMapAreaId = dataview.readUint16();
        }
        else if (opcode == 89) {
            def.randomizeAnimStart = true;
        }
        else if (opcode == 92) {
            var varpID = dataview.readUint16();
            if (varpID == 0xFFFF) {
                varpID = -1;
            }
            def.varbitID = varpID;
            var configId = dataview.readUint16();
            if (configId == 0xFFFF) {
                configId = -1;
            }
            def.varpID = configId;
            var varValue = dataview.readUint16();
            if (varValue == 0xFFFF) {
                varValue = -1;
            }
            var length = dataview.readUint8();
            def.configChangeDest = [];
            for (var index = 0; index <= length; ++index) {
                def.configChangeDest.push(dataview.readUint16());
                if (0xFFFF == def.configChangeDest[index]) {
                    def.configChangeDest[index] = -1;
                }
            }
            def.configChangeDest.push(varValue);
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
    }
}
exports.default = ObjectLoader;
