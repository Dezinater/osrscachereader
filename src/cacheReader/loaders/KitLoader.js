/**
 * @class KitDefinition
 * @category Definitions
 * @hideconstructor
 */
export class KitDefinition {
    /**
     * The ID of this Kit
     * @type {number}
     */
    id;

    /**
     * Color values to find to be replaced for this Spot Anim
     * @type {Array}
     */
    recolorToFind = [];

    /**
     * What the color values will be replaced with
     * @type {Array}
     */
    recolorToReplace = [];

    /**
     * Textures to find to be replaced for this Object
     * @type {Array}
     */
    retextureToFind = [];

    /**
     * What the texture will be replaced with
     * @type {Array}
     */
    retextureToReplace = [];

    /**
     * What body part this kit represents
     * @type {number}
     */
    bodyPartId = -1;

    /**
     * Models that compose this kit
     * @type {Array<number>}
     */
    models = [];

    /** @type {Array<number>} */
    chatheadModels = [-1, -1, -1, -1, -1];

    /** @type {boolean} */
    nonSelectable = false;
}

export default class KitLoader {
    load(bytes, id) {
        let def = new KitDefinition();
        def.id = id;
        let dataview = new DataView(bytes.buffer);
        do {
            var opcode = dataview.readUint8();
            this.handleOpcode(def, opcode, dataview);
        } while (opcode != 0);

        return def;
    }

    handleOpcode(def, opcode, dataview) {
        switch (opcode) {
            case 0:
                break;

            case 1:
                def.bodyPartId = dataview.readUint8();
                break;

            case 2:
                var length = dataview.readUint8();
                def.models = [];

                for (var index = 0; index < length; ++index) def.models[index] = dataview.readUint16();
                break;

            case 3:
                def.nonSelectable = true;
                break;

            case 40:
                var length = dataview.readUint8();
                def.recolorToFind = [];
                def.recolorToReplace = [];

                for (var index = 0; index < length; ++index) {
                    def.recolorToFind[index] = dataview.readInt16();
                    def.recolorToReplace[index] = dataview.readInt16();
                }
                break;

            case 41:
                var length = dataview.readUint16();
                def.retextureToFind = new short[length]();
                def.retextureToReplace = new short[length]();

                for (var index = 0; index < length; ++index) {
                    def.retextureToFind[index] = dataview.readInt16();
                    def.retextureToReplace[index] = dataview.readInt16();
                }
                break;

            default:
                if (opcode >= 60 && opcode < 70) {
                    if (def.chatheadModels == undefined) def.chatheadModels = [];
                    def.chatheadModels[opcode - 60] = dataview.readUint16();
                } else {
                    throw "Unknown opcode found: " + opcode;
                }
        }
    }
}
