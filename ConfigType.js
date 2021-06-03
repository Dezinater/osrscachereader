const ConfigType = { 
    UNDERLAY: {id: 1, loader: undefined},
	IDENTKIT: {id: 3, loader: undefined},
	OVERLAY: {id: 4, loader: undefined},
	INV: {id: 5, loader: undefined},
	OBJECT: {id: 6, loader: ObjectLoader},
	ENUM: {id: 8, loader: undefined},
	NPC: {id: 9, loader: NpcLoader},
	ITEM: {id: 10, loader: undefined},
	PARAMS: {id: 11, loader: undefined},
	SEQUENCE: {id: 12, loader: undefined},
	SPOTANIM: {id: 13, loader: undefined},
	VARBIT: {id: 14, loader: undefined},
	VARCLIENT: {id: 19, loader: undefined},
	VARCLIENTSTRING: {id: 15, loader: undefined},
	VARPLAYER: {id: 16, loader: undefined},
	HITSPLAT: {id: 32, loader: undefined},
	HEALTHBAR: {id: 33, loader: undefined},
	STRUCT: {id: 34, loader: undefined},
	AREA: {id: 35, loader: undefined}
}
Object.freeze(ConfigType);