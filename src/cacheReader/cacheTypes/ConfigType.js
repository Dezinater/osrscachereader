import KitLoader from '../loaders/KitLoader.js'
import ObjectLoader from '../loaders/ObjectLoader.js'
import NpcLoader from '../loaders/NpcLoader.js'
import ItemLoader from '../loaders/ItemLoader.js'
import SequenceLoader from '../loaders/SequenceLoader.js'
import OverlayLoader from '../loaders/OverlayLoader.js'
import UnderlayLoader from '../loaders/UnderlayLoader.js'

const ConfigType = { 
    UNDERLAY: {id: 1, loader: UnderlayLoader},
	IDENTKIT: {id: 3, loader: KitLoader},
	OVERLAY: {id: 4, loader: OverlayLoader},
	INV: {id: 5, loader: undefined},
	OBJECT: {id: 6, loader: ObjectLoader},
	ENUM: {id: 8, loader: undefined},
	NPC: {id: 9, loader: NpcLoader},
	ITEM: {id: 10, loader: ItemLoader},
	PARAMS: {id: 11, loader: undefined},
	SEQUENCE: {id: 12, loader: SequenceLoader},
	SPOTANIM: {id: 13, loader: undefined},
	VARBIT: {id: 14, loader: undefined},
	VARCLIENT: {id: 19, loader: undefined},
	VARCLIENTSTRING: {id: 15, loader: undefined},
	VARPLAYER: {id: 16, loader: undefined},
	HITSPLAT: {id: 32, loader: undefined},
	HEALTHBAR: {id: 33, loader: undefined},
	STRUCT: {id: 34, loader: undefined},
	AREA: {id: 35, loader: undefined},

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