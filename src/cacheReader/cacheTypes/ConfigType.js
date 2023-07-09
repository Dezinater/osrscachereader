import KitLoader from '../loaders/KitLoader.js'
import ObjectLoader from '../loaders/ObjectLoader.js'
import NpcLoader from '../loaders/NpcLoader.js'
import ItemLoader from '../loaders/ItemLoader.js'
import SequenceLoader from '../loaders/SequenceLoader.js'
import OverlayLoader from '../loaders/OverlayLoader.js'
import UnderlayLoader from '../loaders/UnderlayLoader.js'
import SpotAnimLoader from '../loaders/SpotAnimLoader.js'

const ConfigType = { 
    UNDERLAY: {id: 1, loader: UnderlayLoader}, 		//Underlay
	UNKNOWN2: {id: 2, loader: undefined},			//
	IDENTKIT: {id: 3, loader: KitLoader},			//Kit
	OVERLAY: {id: 4, loader: OverlayLoader},		//Overlay
	INV: {id: 5, loader: undefined},				//Inventory
	OBJECT: {id: 6, loader: ObjectLoader},			//Objects
	UNKNOWN7: {id: 7, loader: undefined},			//
	ENUM: {id: 8, loader: undefined},				//Enum
	NPC: {id: 9, loader: NpcLoader},				//NPC
	ITEM: {id: 10, loader: ItemLoader},				//Items
	PARAMS: {id: 11, loader: undefined},			//Params
	SEQUENCE: {id: 12, loader: SequenceLoader},		//Sequence
	SPOTANIM: {id: 13, loader: SpotAnimLoader},		//Spot anim
	VARBIT: {id: 14, loader: undefined}, 			//Varbit
	VARCLIENTSTRING: {id: 15, loader: undefined},
	VARPLAYER: {id: 16, loader: undefined},			//Varp
	UNKNOWN18: {id: 18, loader: undefined},			//
	VARCLIENT: {id: 19, loader: undefined},			//Varc
	UNKNOWN20: {id: 20, loader: undefined},			//
	UNKNOWN22: {id: 22, loader: undefined},			//
	UNKNOWN24: {id: 24, loader: undefined},			//
	UNKNOWN25: {id: 25, loader: undefined},			//
	UNKNOWN26: {id: 26, loader: undefined},			//
	UNKNOWN27: {id: 27, loader: undefined},			//
	UNKNOWN28: {id: 28, loader: undefined},			//
	UNKNOWN29: {id: 29, loader: undefined},			//
	UNKNOWN30: {id: 30, loader: undefined},			//
	UNKNOWN31: {id: 31, loader: undefined},			//
	HITSPLAT: {id: 32, loader: undefined},			//Hitsplat
	HEALTHBAR: {id: 33, loader: undefined},
	STRUCT: {id: 34, loader: undefined},			//Struct
	AREA: {id: 35, loader: undefined},

	UNKNOWN47: {id: 47, loader: undefined}, //Possible scripts
	UNKNOWN54: {id: 54, loader: undefined}, //Possible scripts
	UNKNOWN70: {id: 70, loader: undefined},



	valueOf(id){
        var values = Object.values(ConfigType);
        var keys = Object.keys(ConfigType);
        for(var i=0;i<values.length;i++) {
            if(id == values[i].id)
                return ConfigType[keys[i]];
        }
        return undefined;
    }
}
Object.freeze(ConfigType);

export default ConfigType;