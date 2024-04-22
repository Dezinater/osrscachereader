import KitLoader from "../loaders/KitLoader.js";
import ObjectLoader from "../loaders/ObjectLoader.js";
import NpcLoader from "../loaders/NpcLoader.js";
import ItemLoader from "../loaders/ItemLoader.js";
import SequenceLoader from "../loaders/SequenceLoader.js";
import OverlayLoader from "../loaders/OverlayLoader.js";
import UnderlayLoader from "../loaders/UnderlayLoader.js";
import SpotAnimLoader from "../loaders/SpotAnimLoader.js";

/**
 * @readonly
 * @enum {ConfigType}
 */
const ConfigType = {
    /** Underlay */
    UNDERLAY: { id: 1, loader: UnderlayLoader },
    /** */
    UNKNOWN2: { id: 2, loader: undefined },
    /** Kit */
    IDENTKIT: { id: 3, loader: KitLoader },
    /** Overlay */
    OVERLAY: { id: 4, loader: OverlayLoader },
    /** Inventory */
    INV: { id: 5, loader: undefined },
    /** Objects */
    OBJECT: { id: 6, loader: ObjectLoader },
    /** */
    UNKNOWN7: { id: 7, loader: undefined },
    /** Enum */
    ENUM: { id: 8, loader: undefined },
    /** NPC */
    NPC: { id: 9, loader: NpcLoader },
    /** Items */
    ITEM: { id: 10, loader: ItemLoader },
    /** Params */
    PARAMS: { id: 11, loader: undefined },
    /** Sequence */
    SEQUENCE: { id: 12, loader: SequenceLoader },
    /** Spot anim */
    SPOTANIM: { id: 13, loader: SpotAnimLoader },
    /** Varbit */
    VARBIT: { id: 14, loader: undefined },
    /** */
    VARCLIENTSTRING: { id: 15, loader: undefined },
    /** Varp */
    VARPLAYER: { id: 16, loader: undefined },
    UNKNOWN18: { id: 18, loader: undefined },
    /** Varc */
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
    /** Hitsplats */
    HITSPLAT: { id: 32, loader: undefined },
    /** Healthbars */
    HEALTHBAR: { id: 33, loader: undefined },
    /** Struct */
    STRUCT: { id: 34, loader: undefined },
    /** Area */
    AREA: { id: 35, loader: undefined },

    /** Possible scripts? */
    UNKNOWN47: { id: 47, loader: undefined },
    /** Possible scripts? */
    UNKNOWN54: { id: 54, loader: undefined },
    UNKNOWN70: { id: 70, loader: undefined },
};
ConfigType.valueOf = (id) => {
    var values = Object.values(ConfigType);
    var keys = Object.keys(ConfigType);
    for (var i = 0; i < values.length; i++) {
        if (id == values[i].id) return ConfigType[keys[i]];
    }
    return undefined;
};

Object.freeze(ConfigType);

export default ConfigType;
