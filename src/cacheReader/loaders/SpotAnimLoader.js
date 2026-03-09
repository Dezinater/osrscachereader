/**
 * Spot Anims are GFX effects such as teleporting spells
 * @class SpotAnimDefinition
 * @category Definitions
 * @hideconstructor
 */
export class SpotAnimDefinition {
    /**
     * The ID of this Spot Anim
     * @type {number}
     */
    id;

    /**
     * Name of the Spot Animation
     * @type {string}
     */
    name;

    /** @type {number} */
    rotation = 0;

    /**
     * Textures to find to be replaced for this Spot Anim
     * @type {Array}
     */
    textureToFind = [];

    /**
     * What the texture will be replaced with
     * @type {Array}
     */
    textureToReplace = [];

    /**
     * Default animation
     * @type {number}
     */
    animationId = -1;

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

    /** @type {number} */
    resizeX = 128;

    /** @type {number} */
    resizeY = 128;

    /**
     * Model to use for this Spot Anim
     * @type {number}
     */
    modelId;

    /**
     * Number from 0 to 255. Modifies the Spot Anim model's ambient lighting
     * @type {Byte}
     */
    ambient = 0;

    /**
     * Number from 0 to 255. Modifies the Spot Anim model's contrast
     * @type {Byte}
     */
    contrast = 0;
}
export default class SpotAnimLoader {
    load(bytes, id) {
        let def = new SpotAnimDefinition();
        def.id = id;
        let dataview = new DataView(bytes.buffer);
        do {
            var opcode = dataview.readUint8();
            this.handleOpcode(def, opcode, dataview);
        } while (opcode != 0);

        return def;
    }

    handleOpcode(def, opcode, dataview) {
        if (opcode == 1) {
            def.modelId = dataview.readUint16();
        } else if (opcode == 2) {
            def.animationId = dataview.readUint16();
        } else if (opcode == 4) {
            def.resizeX = dataview.readUint16();
        } else if (opcode == 5) {
            def.resizeY = dataview.readUint16();
        } else if (opcode == 6) {
            def.rotation = dataview.readUint16();
        } else if (opcode == 7) {
            def.ambient = dataview.readUint8();
        } else if (opcode == 8) {
            def.contrast = dataview.readUint8();
        } else if (opcode == 9) {
            def.name = dataview.readString();
        } else if (opcode == 40) {
            let var3 = dataview.readUint8();
            def.recolorToFind = new Array(var3);
            def.recolorToReplace = new Array(var3);

            for (let var4 = 0; var4 < var3; ++var4) {
                def.recolorToFind[var4] = dataview.readUint16();
                def.recolorToReplace[var4] = dataview.readUint16();
            }
        } else if (opcode == 41) {
            let var3 = dataview.readUnsignedByte();
            def.textureToFind = new Array(var3);
            def.textureToReplace = new Array(var3);

            for (let var4 = 0; var4 < var3; ++var4) {
                def.textureToFind[var4] = dataview.readUint16();
                def.textureToReplace[var4] = dataview.readUint16();
            }
        }
    }
}
