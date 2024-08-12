/**
 * @class NpcDefinition
 * @category Definitions
 * @hideconstructor
 */
class NpcDefinition {
    /**
     * The ID of this NPC
     * @type {number}
     */
    id;

    /**
     * The models that compose the NPC
     * @type {Array}
     */
    models = [];

    /**
     * Name of the NPC
     * @type {string}
     */
    name;

    /**
     * Tile size
     * @type {number}
     */
    size;

    /**
     * Idle animation
     * @type {number}
     */
    standingAnimation = -1;

    /**
     * Walking animation
     * @type {number}
     */
    walkingAnimation = -1;

    /** @type {number} */
    rotateLeftAnimation = -1;

    /** @type {number} */
    rotateRightAnimation = -1;

    /** @type {number} */
    rotate180Animation = -1;

    /** @type {number} */
    rotate90LeftAnimation = -1;

    /** @type {number} */
    rotate90RightAnimation = -1;

    /** @type {number} */
    category;

    /** @type {Array} */
    actions = [];

    /**
     * Color values to find to be replaced for this NPC
     * @type {Array}
     */
    recolorToFind = [];

    /**
     * What the color values will be replaced with
     * @type {Array}
     */
    recolorToReplace = [];

    /**
     * Textures to find to be replaced for this NPC
     * @type {Array}
     */
    retextureToFind = [];

    /**
     * What the texture will be replaced with
     * @type {Array}
     */
    retextureToReplace = [];

    /**
     * The models that will compose this NPC's chathead
     * @type {Array}
     */
    chatheadModels = [];

    /**
     * If this NPC will show on the minimap
     * @type {boolean}
     */
    isMinimapVisible = true;

    /**
     * This NPC's combat level
     * @type {number}
     */
    combatLevel = -1;

    /** @type {number} */
    heightScale;

    /** @type {boolean} */
    hasRenderPriority;

    /**
     * Number from 0 to 255. Overrides NPC model's ambient lighting
     * @type {Byte}
     */
    ambient;

    /**
     * Number from 0 to 255. Overrides NPC model's contrast
     * @type {Byte}
     */
    contrast;

    /** @type {Array} */
    headIconArchiveIds = [];

    /** @type {Array} */
    headIconSpriteIndex = [];

    /** @type {number} */
    rotationSpeed = 32;

    /** @type {number} */
    varbitId = -1;

    /** @type {number} */
    varpIndex = -1;

    /** @type {Array} */
    configs = [];

    /** @type {boolean} */
    isInteractable = true;

    /** @type {boolean} */
    rotationFlag = true;

    /** @type {boolean} */
    isFollower;

    /** @type {boolean} */
    lowPriorityFollowerOps;

    /** @type {number} */
    runAnimation = -1;

    /** @type {number} */
    runRotate180Animation = -1;

    /** @type {number} */
    runRotateLeftAnimation = -1;

    /** @type {number} */
    runRotateRightAnimation = -1;

    /** @type {number} */
    crawlAnimation = -1;

    /** @type {number} */
    crawlRotate180Animation = -1;

    /** @type {number} */
    crawlRotateLeftAnimation = -1;

    /** @type {number} */
    crawlRotateRightAnimation = -1;

    /** @type {Array} */
    params = [];

    /** @type {number} */
    height = -1;

    /** @type {Array} */
    stats = [1, 1, 1, 1, 1, 1];
}

export { NpcDefinition };
export default class NpcLoader {
    load(bytes, id) {
        let def = new NpcDefinition();
        def.id = id;
        let dataview = new DataView(bytes.buffer);
        do {
            var opcode = dataview.readUint8();
            this.handleOpcode(def, opcode, dataview);
        } while (opcode != 0);

        return def;
    }

    handleOpcode(def, opcode, dataview) {
        var length;
        var index;
        if (opcode == 1) {
            length = dataview.readUint8();
            def.models = [];

            for (index = 0; index < length; ++index) {
                def.models.push(dataview.readUint16());
            }
        } else if (opcode == 2) {
            var name = dataview.readString();
            def.name = name;
        } else if (opcode == 12) {
            def.size = dataview.readUint8();
        } else if (opcode == 13) {
            def.standingAnimation = dataview.readUint16();
        } else if (opcode == 14) {
            def.walkingAnimation = dataview.readUint16();
        } else if (opcode == 15) {
            def.rotateLeftAnimation = dataview.readUint16();
        } else if (opcode == 16) {
            def.rotateRightAnimation = dataview.readUint16();
        } else if (opcode == 17) {
            def.walkingAnimation = dataview.readUint16();
            def.rotate180Animation = dataview.readUint16();
            def.rotate90RightAnimation = dataview.readUint16();
            def.rotate90LeftAnimation = dataview.readUint16();
        } else if (opcode == 18) {
            def.category = dataview.readUint16();
        } else if (opcode >= 30 && opcode < 35) {
            if (def.actions == undefined) def.actions = [];

            var readString = dataview.readString();
            def.actions[opcode - 30] = readString;

            if (def.actions[opcode - 30] == "Hidden") {
                def.actions[opcode - 30] = undefined;
            }
        } else if (opcode == 40) {
            length = dataview.readUint8();
            def.recolorToFind = [];
            def.recolorToReplace = [];

            for (index = 0; index < length; ++index) {
                def.recolorToFind.push(dataview.readUint16());
                def.recolorToReplace.push(dataview.readUint16());
            }
        } else if (opcode == 41) {
            length = dataview.readUint8();
            def.retextureToFind = [];
            def.retextureToReplace = [];

            for (index = 0; index < length; ++index) {
                def.retextureToFind.push(dataview.readUint16());
                def.retextureToReplace.push(dataview.readUint16());
            }
        } else if (opcode == 60) {
            length = dataview.readUint8();
            def.chatheadModels = [];

            for (index = 0; index < length; ++index) {
                def.chatheadModels.push(dataview.readUint16());
            }
        } else if (opcode == 74) {
            def.stats[0] = dataview.readUint16();
        } else if (opcode == 75) {
            def.stats[1] = dataview.readUint16();
        } else if (opcode == 76) {
            def.stats[2] = dataview.readUint16();
        } else if (opcode == 77) {
            def.stats[3] = dataview.readUint16();
        } else if (opcode == 78) {
            def.stats[4] = dataview.readUint16();
        } else if (opcode == 79) {
            def.stats[5] = dataview.readUint16();
        } else if (opcode == 93) {
            def.isMinimapVisible = false;
        } else if (opcode == 95) {
            def.combatLevel = dataview.readUint16();
        } else if (opcode == 97) {
            this.widthScale = dataview.readUint16();
        } else if (opcode == 98) {
            def.heightScale = dataview.readUint16();
        } else if (opcode == 99) {
            def.hasRenderPriority = true;
        } else if (opcode == 100) {
            def.ambient = dataview.readInt8();
        } else if (opcode == 101) {
            def.contrast = dataview.readInt8();
        } else if (opcode == 102) {
            //def.headIcon = dataview.readUint16(); //before rev210
            let bitfield = dataview.readUint8();
            let len = 0;
            for (let var5 = bitfield; var5 != 0; var5 >>= 1) {
                ++len;
            }

            def.headIconArchiveIds = [];
            def.headIconSpriteIndex = [];

            for (let i = 0; i < len; i++) {
                if ((bitfield & (1 << i)) == 0) {
                    def.headIconArchiveIds.push(-1);
                    def.headIconSpriteIndex.push(1);
                } else {
                    def.headIconArchiveIds.push(dataview.readBigSmart2());
                    def.headIconSpriteIndex.push(dataview.readUnsignedShortSmartMinusOne());
                }
            }
        } else if (opcode == 103) {
            def.rotationSpeed = dataview.readUint16();
        } else if (opcode == 106) {
            def.varbitId = dataview.readUint16();
            if (def.varbitId == 65535) {
                def.varbitId = -1;
            }

            def.varpIndex = dataview.readUint16();

            if (def.varpIndex == 65535) {
                def.varpIndex = -1;
            }

            length = dataview.readUint8();

            def.configs = [];

            for (index = 0; index <= length; ++index) {
                def.configs[index] = dataview.readUint16();

                if (def.configs[index] == "\uffff") {
                    def.configs[index] = -1;
                }
            }

            def.configs[length + 1] = -1;
        } else if (opcode == 107) {
            def.isInteractable = false;
        } else if (opcode == 109) {
            def.rotationFlag = false;
        } else if (opcode == 111) {
            def.isFollower = true;
            def.lowPriorityFollowerOps = true;
        } else if (opcode == 114) {
            def.runAnimation = dataview.readUint16();
        } else if (opcode == 115) {
            def.runAnimation = dataview.readUint16();
            def.runRotate180Animation = dataview.readUint16();
            def.runRotateLeftAnimation = dataview.readUint16();
            def.runRotateRightAnimation = dataview.readUint16();
        } else if (opcode == 116) {
            def.crawlAnimation = dataview.readUint16();
        } else if (opcode == 117) {
            def.crawlAnimation = dataview.readUint16();
            def.crawlRotate180Animation = dataview.readUint16();
            def.crawlRotateLeftAnimation = dataview.readUint16();
            def.crawlRotateRightAnimation = dataview.readUint16();
        } else if (opcode == 118) {
            def.varbitId = dataview.readUint16();

            if (def.varbitId == 65535) {
                def.varbitId = -1;
            }

            def.varpIndex = dataview.readUint16();

            if (def.varpIndex == 65535) {
                def.varpIndex = -1;
            }

            var varVal = dataview.readUint16();

            if (varVal == 0xffff) {
                varVal = -1;
            }

            length = dataview.readUint8();
            def.configs = [];

            for (index = 0; index <= length; ++index) {
                var value = dataview.readUint16();

                if (def.configs[index] == "\uffff") {
                    def.configs.push(-1);
                } else {
                    def.configs.push(value);
                }
            }

            def.configs.push(varVal);
        } else if (opcode == 122) {
            def.isFollower = true;
        } else if (opcode == 123) {
            def.lowPriorityFollowerOps = true;
        } else if (opcode == 124) {
            def.height = dataview.readUint16();
        } else if (opcode == 249) {
            length = dataview.readUint8();

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
