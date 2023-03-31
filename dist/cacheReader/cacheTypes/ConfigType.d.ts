export default ConfigType;
declare namespace ConfigType {
    namespace UNDERLAY {
        export const id: number;
        export { UnderlayLoader as loader };
    }
    namespace UNKNOWN2 {
        const id_1: number;
        export { id_1 as id };
        export const loader: any;
    }
    namespace IDENTKIT {
        const id_2: number;
        export { id_2 as id };
        export { KitLoader as loader };
    }
    namespace OVERLAY {
        const id_3: number;
        export { id_3 as id };
        export { OverlayLoader as loader };
    }
    namespace INV {
        const id_4: number;
        export { id_4 as id };
        const loader_1: any;
        export { loader_1 as loader };
    }
    namespace OBJECT {
        const id_5: number;
        export { id_5 as id };
        export { ObjectLoader as loader };
    }
    namespace UNKNOWN7 {
        const id_6: number;
        export { id_6 as id };
        const loader_2: any;
        export { loader_2 as loader };
    }
    namespace ENUM {
        const id_7: number;
        export { id_7 as id };
        const loader_3: any;
        export { loader_3 as loader };
    }
    namespace NPC {
        const id_8: number;
        export { id_8 as id };
        export { NpcLoader as loader };
    }
    namespace ITEM {
        const id_9: number;
        export { id_9 as id };
        export { ItemLoader as loader };
    }
    namespace PARAMS {
        const id_10: number;
        export { id_10 as id };
        const loader_4: any;
        export { loader_4 as loader };
    }
    namespace SEQUENCE {
        const id_11: number;
        export { id_11 as id };
        export { SequenceLoader as loader };
    }
    namespace SPOTANIM {
        const id_12: number;
        export { id_12 as id };
        const loader_5: any;
        export { loader_5 as loader };
    }
    namespace VARBIT {
        const id_13: number;
        export { id_13 as id };
        const loader_6: any;
        export { loader_6 as loader };
    }
    namespace VARCLIENTSTRING {
        const id_14: number;
        export { id_14 as id };
        const loader_7: any;
        export { loader_7 as loader };
    }
    namespace VARPLAYER {
        const id_15: number;
        export { id_15 as id };
        const loader_8: any;
        export { loader_8 as loader };
    }
    namespace UNKNOWN18 {
        const id_16: number;
        export { id_16 as id };
        const loader_9: any;
        export { loader_9 as loader };
    }
    namespace VARCLIENT {
        const id_17: number;
        export { id_17 as id };
        const loader_10: any;
        export { loader_10 as loader };
    }
    namespace UNKNOWN20 {
        const id_18: number;
        export { id_18 as id };
        const loader_11: any;
        export { loader_11 as loader };
    }
    namespace UNKNOWN22 {
        const id_19: number;
        export { id_19 as id };
        const loader_12: any;
        export { loader_12 as loader };
    }
    namespace UNKNOWN24 {
        const id_20: number;
        export { id_20 as id };
        const loader_13: any;
        export { loader_13 as loader };
    }
    namespace UNKNOWN25 {
        const id_21: number;
        export { id_21 as id };
        const loader_14: any;
        export { loader_14 as loader };
    }
    namespace UNKNOWN26 {
        const id_22: number;
        export { id_22 as id };
        const loader_15: any;
        export { loader_15 as loader };
    }
    namespace UNKNOWN27 {
        const id_23: number;
        export { id_23 as id };
        const loader_16: any;
        export { loader_16 as loader };
    }
    namespace UNKNOWN28 {
        const id_24: number;
        export { id_24 as id };
        const loader_17: any;
        export { loader_17 as loader };
    }
    namespace UNKNOWN29 {
        const id_25: number;
        export { id_25 as id };
        const loader_18: any;
        export { loader_18 as loader };
    }
    namespace UNKNOWN30 {
        const id_26: number;
        export { id_26 as id };
        const loader_19: any;
        export { loader_19 as loader };
    }
    namespace UNKNOWN31 {
        const id_27: number;
        export { id_27 as id };
        const loader_20: any;
        export { loader_20 as loader };
    }
    namespace HITSPLAT {
        const id_28: number;
        export { id_28 as id };
        const loader_21: any;
        export { loader_21 as loader };
    }
    namespace HEALTHBAR {
        const id_29: number;
        export { id_29 as id };
        const loader_22: any;
        export { loader_22 as loader };
    }
    namespace STRUCT {
        const id_30: number;
        export { id_30 as id };
        const loader_23: any;
        export { loader_23 as loader };
    }
    namespace AREA {
        const id_31: number;
        export { id_31 as id };
        const loader_24: any;
        export { loader_24 as loader };
    }
    namespace UNKNOWN47 {
        const id_32: number;
        export { id_32 as id };
        const loader_25: any;
        export { loader_25 as loader };
    }
    namespace UNKNOWN54 {
        const id_33: number;
        export { id_33 as id };
        const loader_26: any;
        export { loader_26 as loader };
    }
    namespace UNKNOWN70 {
        const id_34: number;
        export { id_34 as id };
        const loader_27: any;
        export { loader_27 as loader };
    }
    function valueOf(id: any): any;
}
import UnderlayLoader from '../loaders/UnderlayLoader.js';
import KitLoader from '../loaders/KitLoader.js';
import OverlayLoader from '../loaders/OverlayLoader.js';
import ObjectLoader from '../loaders/ObjectLoader.js';
import NpcLoader from '../loaders/NpcLoader.js';
import ItemLoader from '../loaders/ItemLoader.js';
import SequenceLoader from '../loaders/SequenceLoader.js';
