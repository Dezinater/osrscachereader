/**
 * @class ItemDefinition
 * @category Definitions
 * @hideconstructor
 */
export class ItemDefinition {
    /**
     * The ID of this Object
     * @type {number}
     */
    id;
    name;
    unknown1;
    resizeX = 128;
    resizeY = 128;
    resizeZ = 128;

    /**
     * Used for 2d item rendering in inventories
     * @type {number}
     */
    xan2d = 0;

    /**
     * Used for 2d item rendering in inventories
     * @type {number}
     */
    yan2d = 0;

    /**
     * Used for 2d item rendering in inventories
     * @type {number}
     */
    zan2d = 0;

    cost = 1;

    /** @type {boolean} */
    isTradeable;

    /** @type {number} */
    stackable = 0;

    /** @type {number} */
    inventoryModel;

    /** @type {number} */
    wearPos1;

    /** @type {number} */
    wearPos2;

    /** @type {number} */
    wearPos3;

    /** @type {boolean} */
    members = false;

    /** @type {Array} */
    recolorToFind = [];

    /** @type {Array} */
    recolorToReplace = [];

    /** @type {Array} */
    retextureToFind = [];

    /** @type {Array} */
    retextureToReplace = [];

    /** @type {number} */
    zoom2d = 2000;

    /** @type {number} */
    xOffset2d = 0;

    /** @type {number} */
    yOffset2d = 0;

    /**
     * Number from 0 to 255. Overrides Item model's ambient lighting
     * @type {Byte}
     */
    ambient;

    /**
     * Number from 0 to 255. Overrides Item model's contrast
     * @type {Byte}
     */
    contrast;

    /** @type {Array} */
    countCo;

    /** @type {Array} */
    countObj;

    /** @type {Array<string>} */
    options = [null, null, "Take", null, null];

    /** @type {Array<string>} */
    interfaceOptions = [null, null, null, null, "Drop"];

    /** @type {number} */
    maleModel0 = -1;

    /** @type {number} */
    maleModel1 = -1;

    /** @type {number} */
    maleModel2 = -1;

    /** @type {number} */
    maleOffset;

    /** @type {number} */
    maleHeadModel = -1;

    /** @type {number} */
    maleHeadModel2 = -1;

    /** @type {number} */
    femaleModel0 = -1;

    /** @type {number} */
    femaleModel1 = -1;

    /** @type {number} */
    femaleModel2 = -1;

    /** @type {number} */
    femaleOffset;

    /** @type {number} */
    femaleHeadModel = -1;

    /** @type {number} */
    femaleHeadModel2 = -1;

    /** @type {number} */
    category;

    /** @type {number} */
    notedID = -1;

    /** @type {number} */
    notedTemplate = -1;

    /** @type {number} */
    team;

    /** @type {number} */
    weight;

    /** @type {number} */
    shiftClickDropIndex = -2;

    /** @type {number} */
    boughtId = -1;

    /** @type {number} */
    boughtTemplateId = -1;

    /** @type {number} */
    placeholderId = -1;

    /** @type {number} */
    placeholderTemplateId = -1;

    /** @type {Object} */
    params;

    /** @type {String} */
    examineText;
}

export default class ItemLoader {
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
        if (opcode == 0) {
            return;
        } else if (opcode == 1) {
            def.inventoryModel = dataview.readUint16();
        } else if (opcode == 2) {
            def.name = dataview.readString();
        } else if (opcode == 3) {
            def.examineText = dataview.readString();
        } else if (opcode == 4) {
            def.zoom2d = dataview.readUint16();
        } else if (opcode == 5) {
            def.xan2d = dataview.readUint16();
        } else if (opcode == 6) {
            def.yan2d = dataview.readUint16();
        } else if (opcode == 7) {
            def.xOffset2d = dataview.readUint16();
            if (def.xOffset2d > 32767) {
                def.xOffset2d -= 65536;
            }
        } else if (opcode == 8) {
            def.yOffset2d = dataview.readUint16();
            if (def.yOffset2d > 32767) {
                def.yOffset2d -= 65536;
            }
        } else if (opcode == 9) {
            def.unknown1 = dataview.readString();
        } else if (opcode == 11) {
            def.stackable = 1;
        } else if (opcode == 12) {
            def.cost = dataview.readInt32();
        } else if (opcode == 13) {
            def.wearPos1 = dataview.readInt8();
        } else if (opcode == 14) {
            def.wearPos2 = dataview.readInt8();
        } else if (opcode == 16) {
            def.members = true;
        } else if (opcode == 23) {
            def.maleModel0 = dataview.readUint16();
            def.maleOffset = dataview.readUint8();
        } else if (opcode == 24) {
            def.maleModel1 = dataview.readUint16();
        } else if (opcode == 25) {
            def.femaleModel0 = dataview.readUint16();
            def.femaleOffset = dataview.readUint8();
        } else if (opcode == 26) {
            def.femaleModel1 = dataview.readUint16();
        } else if (opcode == 27) {
            def.wearPos3 = dataview.readInt8();
        } else if (opcode >= 30 && opcode < 35) {
            if (def.options == undefined) def.options = [];

            def.options[opcode - 30] = dataview.readString();
            if (def.options[opcode - 30] == "Hidden") {
                def.options[opcode - 30] = null;
            }
        } else if (opcode >= 35 && opcode < 40) {
            if (def.interfaceOptions == undefined) def.interfaceOptions = [];
            def.interfaceOptions[opcode - 35] = dataview.readString();
        } else if (opcode == 40) {
            var var5 = dataview.readUint8();
            def.recolorToFind = [];
            def.recolorToReplace = [];

            for (var var4 = 0; var4 < var5; ++var4) {
                def.recolorToFind[var4] = dataview.readUint16();
                def.recolorToReplace[var4] = dataview.readUint16();
            }
        } else if (opcode == 41) {
            var var5 = dataview.readUint8();
            def.retextureToFind = [];
            def.retextureToReplace = [];

            for (var var4 = 0; var4 < var5; ++var4) {
                def.retextureToFind[var4] = dataview.readUint16();
                def.retextureToReplace[var4] = dataview.readUint16();
            }
        } else if (opcode == 42) {
            def.shiftClickDropIndex = dataview.readInt8();
        } else if (opcode == 43) {
            let opId = dataview.readUint8();
            if (def.subops == null) {
                def.subops = new Array(5).fill(new Array);
            }
            let valid = opId >= 0 && opId < 5;
            if (valid && def.subops[opId] == null) {
                def.subops[opId] = new Array(20);
            }
            while (true) {
                let subopId = dataview.readUint8() - 1;
                if (subopId == -1) {
                    break;
                }
                let op = dataview.readString();
                if (valid && subopId >= 0 && subopId < 20) {
                    def.subops[opId][subopId] = op;
                }
            }
        } else if (opcode == 65) {
            def.isTradeable = true;
        } else if (opcode == 75) {
            def.weight = dataview.readInt16();
        } else if (opcode == 78) {
            def.maleModel2 = dataview.readUint16();
        } else if (opcode == 79) {
            def.femaleModel2 = dataview.readUint16();
        } else if (opcode == 90) {
            def.maleHeadModel = dataview.readUint16();
        } else if (opcode == 91) {
            def.femaleHeadModel = dataview.readUint16();
        } else if (opcode == 92) {
            def.maleHeadModel2 = dataview.readUint16();
        } else if (opcode == 93) {
            def.femaleHeadModel2 = dataview.readUint16();
        } else if (opcode == 94) {
            def.category = dataview.readUint16();
        } else if (opcode == 95) {
            def.zan2d = dataview.readUint16();
        } else if (opcode == 97) {
            def.notedID = dataview.readUint16();
        } else if (opcode == 98) {
            def.notedTemplate = dataview.readUint16();
        } else if (opcode >= 100 && opcode < 110) {
            if (def.countObj == undefined) {
                def.countObj = [];
                def.countCo = [];
            }

            def.countObj[opcode - 100] = dataview.readUint16();
            def.countCo[opcode - 100] = dataview.readUint16();
        } else if (opcode == 110) {
            def.resizeX = dataview.readUint16();
        } else if (opcode == 111) {
            def.resizeY = dataview.readUint16();
        } else if (opcode == 112) {
            def.resizeZ = dataview.readUint16();
        } else if (opcode == 113) {
            def.ambient = dataview.readInt8();
        } else if (opcode == 114) {
            def.contrast = dataview.readInt8();
        } else if (opcode == 115) {
            def.team = dataview.readUint8();
        } else if (opcode == 139) {
            def.boughtId = dataview.readUint16();
        } else if (opcode == 140) {
            def.boughtTemplateId = dataview.readUint16();
        } else if (opcode == 148) {
            def.placeholderId = dataview.readUint16();
        } else if (opcode == 149) {
            def.placeholderTemplateId = dataview.readUint16();
        } else if (opcode == 249) {
            var length = dataview.readUint8();
            def.params = {};

            for (var i = 0; i < length; i++) {
                var isString = dataview.readUint8() == 1;

                var key = dataview.readInt24();
                var value;

                if (isString) {
                    value = dataview.readString();
                } else {
                    value = dataview.readInt32();
                }

                def.params[key] = value;
            }
        } else {
            console.error("UNHANDLED OPCODE [ItemLoader]: " + opcode + " last: " + lastOpCode);
        }
    }
}
