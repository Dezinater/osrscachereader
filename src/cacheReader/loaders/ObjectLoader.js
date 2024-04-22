import { ModelDefinition } from "./ModelLoader.js";
import ModelGroup from "../helpers/ModelGroup.js";
import IndexType from "../cacheTypes/IndexType.js";

/**
 * @class ObjectDefinition
 * @category Definitions
 * @hideconstructor
 */
export class ObjectDefinition {
    /**
     * The ID of this Object
     * @type {number}
     */
    id;

    /**
     * Object types
     * @type {Array}
     */
    objectTypes = [];

    /**
     * The models that compose the NPC
     * @type {Array}
     */
    objectModels = [];

    /**
     * Name of the Object
     * @type {string}
     */
    name;

    /**
     * Tile size X
     * @type {number}
     */
    sizeX = 1;

    /**
     * Tile size Y
     * @type {number}
     */
    sizeY = 1;

    /**
     * Interact Type. Loader only ever sets it to 0 or 1. Defaults value is 2
     * @type {number}
     */
    interactType = 2;

    /**
     * Blocks projectiles such as arrows and spells
     * @type {boolean}
     */
    blocksProjectile = true;

    /**
     * I think this allows other objects to be placed on the same tile
     * @type {number}
     */
    wallOrDoor = -1;

    /** @type {number} */
    contouredGround;

    /**
     * Merge normals with objects nearby
     * @type {boolean}
     */
    mergeNormals = false;

    /** @type {boolean} */
    aBool2111 = false;

    /**
     * Default animation
     * @type {number}
     */
    animationID = -1;

    /** @type {number} */
    decorDisplacement = 16;

    /**
     * Number from 0 to 255. Overrides Object model's ambient lighting
     * @type {Byte}
     */
    ambient = 0;

    /**
     * Number from 0 to 255. Overrides Object model's contrast
     * @type {Byte}
     */
    contrast = 0;

    /** @type {Array} */
    actions = [];

    /**
     * Color values to find to be replaced for this Object
     * @type {Array}
     */
    recolorToFind = [];

    /**
     * What the color values will be replaced with
     * @type {Array}
     */
    recolorToReplace;

    /**
     * Textures to find to be replaced for this Object
     * @type {Array}
     */
    retextureToFind;

    /**
     * What the texture will be replaced with
     * @type {Array}
     */
    textureToReplace;

    /** @type {number} */
    category;

    /** @type {boolean} */
    rotated = false;

    /** @type {boolean} */
    shadow = true;

    /**
     * Model size X
     * @type {number}
     */
    modelSizeX = 128;

    /**
     * Model size height
     * @type {number}
     */
    modelSizeHeight = 128;

    /**
     * Model size Y
     * @type {number}
     */
    modelSizeY = 128;

    /** @type {number} */
    mapSceneID = -1;

    /** @type {number} */
    blockingMask = 0;

    /** @type {number} */
    offsetX = 0;

    /** @type {number} */
    offsetHeight = 0;

    /** @type {number} */
    offsetY = 0;

    /** @type {boolean} */
    obstructsGround = false;

    /** @type {number} */
    hollow = false;

    /** @type {number} */
    supportsItems = -1;

    /** @type {number} */
    varbitID = -1;

    /** @type {number} */
    varpID = -1;

    /** @type {Array} */
    configChangeDest = [];

    /** @type {number} */
    ambientSoundId = -1;

    /** @type {number} */
    ambientSoundDistance = 0;

    /** @type {number} */
    ambientSoundChangeTicksMin = 0;

    /** @type {number} */
    ambientSoundChangeTicksMax = 0;

    /** @type {Array<number>} */
    ambientSoundIds = [];

    /** @type {number} */
    ambientSoundRetain = 0;

    /** @type {number} */
    mapAreaId = -1;

    /** @type {boolean} */
    randomizeAnimStart;

    /** @type {Object} */
    params;

    constructor() {}

    async getModel(cache, modelType, rotation) {
        let modelData = null;
        let isRotated;
        if (this.objectTypes == null) {
            // if it has no types then merge
            if (modelType != 10) {
                return null;
            }

            if (this.objectModels == null) {
                return null;
            }

            isRotated = this.rotated;
            if (modelType == 2 && rotation > 3) {
                isRotated = !isRotated;
            }

            let models = [];
            for (let i = 0; i < this.objectModels.length; ++i) {
                modelData = await cache.getDef(IndexType.MODELS.id, this.objectModels[i]);

                if (this.objectModels.length > 1) {
                    models[i] = modelData;
                }
            }

            if (this.objectModels.length > 1) {
                modelData = new ModelGroup(models).getMergedModel();
            }
        } else {
            let var9 = -1;

            for (let i = 0; i < this.objectTypes.length; ++i) {
                if (this.objectTypes[i] == modelType) {
                    var9 = i;
                    break;
                }
            }

            if (var9 == -1) {
                return null;
            }

            let modelId = this.objectModels[var9];
            let var10 = this.rotated ^ (rotation > 3);

            modelData = await cache.getDef(IndexType.MODELS.id, modelId);
            if (var10) {
                modelData.method1194();
            }
        }

        if (this.modelSizeX == 128 && this.modelSizeHeight == 128 && this.modelSizeY == 128) {
            isRotated = false;
        } else {
            isRotated = true;
        }

        let var11;
        if (this.offsetX == 0 && this.offsetHeight == 0 && this.offsetY == 0) {
            var11 = false;
        } else {
            var11 = true;
        }

        if (modelType == 4 && rotation > 3) {
            modelData.method1206(256);
            modelData.changeOffset(45, 0, -45);
        }

        rotation &= 3;
        if (rotation == 1) {
            modelData.method1188();
        } else if (rotation == 2) {
            modelData.method1190();
        } else if (rotation == 3) {
            modelData.method1189();
        }

        if (this.recolorFrom != null) {
            for (let var7 = 0; var7 < this.recolorFrom.length; ++var7) {
                modelData.recolor(this.recolorFrom[var7], this.recolorTo[var7]);
            }
        }

        if (this.retextureFrom != null) {
            for (let var7 = 0; var7 < this.retextureFrom.length; ++var7) {
                modelData.retexture(this.retextureFrom[var7], this.retextureTo[var7]);
            }
        }

        if (isRotated) {
            modelData.resize(this.modelSizeX, this.modelSizeHeight, this.modelSizeY);
        }

        if (var11) {
            modelData.changeOffset(this.offsetX, this.offsetHeight, this.offsetY);
        }

        return modelData;
    }
}
export default class ObjectLoader {
    rev220SoundData = true;
    configureForRevision(revision) {
        this.rev220SoundData = revision >= 1673;
    }

    load(bytes, id) {
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
        if (opcode == 0) return;

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
        } else if (opcode == 2) {
            def.name = dataview.readString();
        } else if (opcode == 5) {
            var length = dataview.readUint8();
            if (length > 0) {
                def.objectTypes = null;
                def.objectModels = [];

                for (var index = 0; index < length; ++index) {
                    def.objectModels.push(dataview.readUint16());
                }
            }
        } else if (opcode == 14) {
            def.sizeX = dataview.readUint8();
        } else if (opcode == 15) {
            def.sizeY = dataview.readUint8();
        } else if (opcode == 17) {
            def.interactType = 0;
            def.blocksProjectile = false;
        } else if (opcode == 18) {
            def.blocksProjectile = false;
        } else if (opcode == 19) {
            def.wallOrDoor = dataview.readUint8();
        } else if (opcode == 21) {
            def.contouredGround = 0;
        } else if (opcode == 22) {
            def.mergeNormals = true;
        } else if (opcode == 23) {
            def.aBool2111 = true;
        } else if (opcode == 24) {
            def.animationID = dataview.readUint16();
            if (def.animationID == 0xffff) {
                def.animationID = -1;
            }
        } else if (opcode == 27) {
            def.interactType = 1;
        } else if (opcode == 28) {
            def.decorDisplacement = dataview.readUint8();
        } else if (opcode == 29) {
            def.ambient = dataview.readInt8();
        } else if (opcode == 39) {
            def.contrast = dataview.readInt8() * 25;
        }
        //30-34, 40, 41 are similar to NPCLoader, maybe make parent class for similar opcode loaders
        else if (opcode >= 30 && opcode < 35) {
            if (def.actions == undefined) def.actions = [];

            var readString = dataview.readString();
            def.actions[opcode - 30] = readString;

            //might be better to leave it as hidden (?)
            if (def.actions[opcode - 30] == "Hidden") {
                def.actions[opcode - 30] = undefined;
            }
        } else if (opcode == 40) {
            var length = dataview.readUint8();
            def.recolorToFind = [];
            def.recolorToReplace = [];

            for (index = 0; index < length; ++index) {
                def.recolorToFind.push(dataview.readUint16());
                def.recolorToReplace.push(dataview.readUint16());
            }
        } else if (opcode == 41) {
            var length = dataview.readUint8();
            def.retextureToFind = [];
            def.textureToReplace = [];

            for (index = 0; index < length; ++index) {
                def.retextureToFind.push(dataview.readUint16());
                def.textureToReplace.push(dataview.readUint16());
            }
        } else if (opcode == 61) {
            def.category = dataview.readUint16();
        } else if (opcode == 62) {
            def.rotated = true;
        } else if (opcode == 64) {
            def.shadow = false;
        } else if (opcode == 65) {
            def.modelSizeX = dataview.readUint16();
        } else if (opcode == 66) {
            def.modelSizeHeight = dataview.readUint16();
        } else if (opcode == 67) {
            def.modelSizeY = dataview.readUint16();
        } else if (opcode == 68) {
            def.mapSceneID = dataview.readUint16();
        } else if (opcode == 69) {
            def.blockingMask = dataview.readInt8();
        } else if (opcode == 70) {
            def.offsetX = dataview.readInt16();
        } else if (opcode == 71) {
            def.offsetHeight = dataview.readInt16();
        } else if (opcode == 72) {
            def.offsetY = dataview.readInt16();
        } else if (opcode == 73) {
            def.obstructsGround = true;
        } else if (opcode == 74) {
            def.hollow = true;
        } else if (opcode == 75) {
            def.supportsItems = dataview.readUint8();
        } else if (opcode == 77) {
            var varpID = dataview.readUint16();
            if (varpID == 0xffff) {
                varpID = -1;
            }
            def.varbitID = varpID;

            var configId = dataview.readUint16();
            if (configId == 0xffff) {
                configId = -1;
            }
            def.varpID = configId;

            var length = dataview.readUint8();
            def.configChangeDest = [];

            for (var index = 0; index <= length; ++index) {
                def.configChangeDest.push(dataview.readUint16());
                if (0xffff == def.configChangeDest[index]) {
                    def.configChangeDest[index] = -1;
                }
            }
            def.configChangeDest.push(-1);
        } else if (opcode == 78) {
            def.ambientSoundId = dataview.readUint16();
            def.ambientSoundDistance = dataview.readUint8();
            if (this.rev220SoundData) {
                def.ambientSoundRetain = dataview.readUint8();
            }
        } else if (opcode == 79) {
            def.ambientSoundChangeTicksMin = dataview.readUint16();
            def.ambientSoundChangeTicksMax = dataview.readUint16();
            def.ambientSoundDistance = dataview.readUint8();
            if (this.rev220SoundData) {
                def.ambientSoundRetain = dataview.readUint8();
            }

            var length = dataview.readUint8();
            let ambientSoundIds = [];

            for (var index = 0; index < length; ++index) {
                ambientSoundIds.push(dataview.readUint16());
            }

            def.ambientSoundIds = ambientSoundIds;
        } else if (opcode == 81) {
            def.contouredGround = dataview.readUint8() * 256;
        } else if (opcode == 82) {
            def.mapAreaId = dataview.readUint16();
        } else if (opcode == 89) {
            def.randomizeAnimStart = true;
        } else if (opcode == 92) {
            var varpID = dataview.readUint16();
            if (varpID == 0xffff) {
                varpID = -1;
            }
            def.varbitID = varpID;

            var configId = dataview.readUint16();
            if (configId == 0xffff) {
                configId = -1;
            }
            def.varpID = configId;

            var varValue = dataview.readUint16();
            if (varValue == 0xffff) {
                varValue = -1;
            }

            var length = dataview.readUint8();
            def.configChangeDest = [];

            for (var index = 0; index <= length; ++index) {
                def.configChangeDest.push(dataview.readUint16());
                if (0xffff == def.configChangeDest[index]) {
                    def.configChangeDest[index] = -1;
                }
            }
            def.configChangeDest.push(varValue);
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
        }
    }
}
