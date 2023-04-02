"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const KitLoader_js_1 = __importDefault(require("../loaders/KitLoader.js"));
const ObjectLoader_js_1 = __importDefault(require("../loaders/ObjectLoader.js"));
const NpcLoader_js_1 = __importDefault(require("../loaders/NpcLoader.js"));
const ItemLoader_js_1 = __importDefault(require("../loaders/ItemLoader.js"));
const SequenceLoader_js_1 = __importDefault(require("../loaders/SequenceLoader.js"));
const OverlayLoader_js_1 = __importDefault(require("../loaders/OverlayLoader.js"));
const UnderlayLoader_js_1 = __importDefault(require("../loaders/UnderlayLoader.js"));
const ConfigType = {
    UNDERLAY: { id: 1, loader: UnderlayLoader_js_1.default },
    UNKNOWN2: { id: 2, loader: undefined },
    IDENTKIT: { id: 3, loader: KitLoader_js_1.default },
    OVERLAY: { id: 4, loader: OverlayLoader_js_1.default },
    INV: { id: 5, loader: undefined },
    OBJECT: { id: 6, loader: ObjectLoader_js_1.default },
    UNKNOWN7: { id: 7, loader: undefined },
    ENUM: { id: 8, loader: undefined },
    NPC: { id: 9, loader: NpcLoader_js_1.default },
    ITEM: { id: 10, loader: ItemLoader_js_1.default },
    PARAMS: { id: 11, loader: undefined },
    SEQUENCE: { id: 12, loader: SequenceLoader_js_1.default },
    SPOTANIM: { id: 13, loader: undefined },
    VARBIT: { id: 14, loader: undefined },
    VARCLIENTSTRING: { id: 15, loader: undefined },
    VARPLAYER: { id: 16, loader: undefined },
    UNKNOWN18: { id: 18, loader: undefined },
    VARCLIENT: { id: 19, loader: undefined },
    UNKNOWN20: { id: 20, loader: undefined },
    UNKNOWN22: { id: 22, loader: undefined },
    UNKNOWN24: { id: 24, loader: undefined },
    UNKNOWN25: { id: 25, loader: undefined },
    UNKNOWN26: { id: 26, loader: undefined },
    UNKNOWN27: { id: 27, loader: undefined },
    UNKNOWN28: { id: 28, loader: undefined },
    UNKNOWN29: { id: 29, loader: undefined },
    UNKNOWN30: { id: 30, loader: undefined },
    UNKNOWN31: { id: 31, loader: undefined },
    HITSPLAT: { id: 32, loader: undefined },
    HEALTHBAR: { id: 33, loader: undefined },
    STRUCT: { id: 34, loader: undefined },
    AREA: { id: 35, loader: undefined },
    UNKNOWN47: { id: 47, loader: undefined },
    UNKNOWN54: { id: 54, loader: undefined },
    UNKNOWN70: { id: 70, loader: undefined },
    valueOf(id) {
        var values = Object.values(ConfigType);
        var keys = Object.keys(ConfigType);
        for (var i = 0; i < values.length; i++) {
            if (id == values[i].id)
                return ConfigType[keys[i]];
        }
        return undefined;
    }
};
Object.freeze(ConfigType);
exports.default = ConfigType;
