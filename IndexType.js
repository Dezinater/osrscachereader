const IndexType = { 
    FRAMES:{id: 0, loader: undefined},
    FRAMEMAPS:{id: 1, loader: undefined},
    CONFIGS:{id: 2, loader: undefined},
    INTERFACES:{id: 3, loader: undefined},
    SOUNDEFFECTS:{id: 4, loader: undefined},
    MAPS:{id: 5, loader: undefined},
    TRACK1:{id: 6, loader: undefined},
    MODELS:{id: 7, loader: ModelLoader},
    SPRITES:{id: 8, loader: undefined},
    TEXTURES:{id: 9, loader: undefined},
    BINARY:{id: 10, loader: undefined},
    TRACK2:{id: 11, loader: undefined},
    CLIENTSCRIPT:{id: 12, loader: undefined},
    FONTS:{id: 13, loader: undefined},
    VORBIS:{id: 14, loader: undefined},
    INSTRUMENTS:{id: 15, loader: undefined},
    WORLDMAP:{id: 16, loader: undefined},

    valueOf(id){
        var values = Object.values(this);
        var keys = Object.keys(this);
        for(var i=0;i<values.length;i++) {
            if(id == values[i].id)
                return this[keys[i]];
        }
        return undefined;
    }
};
Object.freeze(IndexType);