import IndexType from "../cacheTypes/IndexType.js";
/**
 * @class TextureDefinition
 * @category Definitions
 * @hideconstructor
 */
export class TextureDefinition {
    /**
     * The ID of this Texture
     * @type {number}
     */
    id;

    /** @type {number} */
    field1777;

    /** @type {boolean} */
    field1778;

    /**
     * The sprites that make up this texture
     * @type {Array<number>}
     */
    fileIds = [];

    /** @type {number} */
    field1780 = [];

    /** @type {number} */
    field1781 = [];

    /** @type {number} */
    field1786 = [];

    /**
     * Used for animated textures like firecape or water fountains
     * @type {number}
     */
    animationSpeed;

    /** 
     * Direction that the texture UVs will move
     * @type {number}
     * @example
     let angle = duration * (Math.PI / 2);
let vec = [Math.cos(angle) * animationSpeed, Math.sin(angle) * animationSpeed];               
     */
    animationDirection;
}

export default class TextureLoader {
    async load(bytes, id, cache, options) {
        let def = new TextureDefinition();
        def.id = id;
        let dataview = new DataView(bytes.buffer);

        def.field1777 = dataview.readUint16();
        def.field1778 = dataview.readInt8() != 0;

        let count = dataview.readUint8();
        def.fileIds = new Array(count);

        for (let i = 0; i < count; ++i) {
            def.fileIds[i] = dataview.readUint16();
        }

        if (count > 1) {
            def.field1780 = new Array(count - 1);

            for (let var3 = 0; var3 < count - 1; ++var3) {
                def.field1780[var3] = dataview.readUint8();
            }
        }

        if (count > 1) {
            def.field1781 = new Array(count - 1);

            for (let var3 = 0; var3 < count - 1; ++var3) {
                def.field1781[var3] = dataview.readUint8();
            }
        }

        def.field1786 = new Array(count);

        for (let var3 = 0; var3 < count; ++var3) {
            def.field1786[var3] = dataview.readInt32();
        }

        def.animationDirection = dataview.readUint8();
        def.animationSpeed = dataview.readUint8();

        if (options.loadSprites) {
            let sprites = def.fileIds.map((x) => cache.getFile(IndexType.SPRITES.id, x));
            def.sprites = await Promise.all(sprites);

            return def;
        } else {
            return def;
        }
    }
}
