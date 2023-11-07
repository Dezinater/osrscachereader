import FramemapLoader from '../loaders/FramemapLoader.js';
import FramesLoader from '../loaders/FramesLoader.js';
import MapLoader from '../loaders/MapLoader.js';
import ModelLoader from '../loaders/ModelLoader.js'
import SpriteLoader from '../loaders/SpriteLoader.js';
import TextureLoader from '../loaders/TextureLoader.js';
import MusicTrackLoader from '../loaders/MusicTrackLoader.js';

/**
 * @readonly
 * @enum {IndexType}
 */
const IndexType = {
    /** Animations */          
    FRAMES: { id: 0, loader: FramesLoader },
    /** Skeletons */          
    FRAMEMAPS: { id: 1, loader: FramemapLoader },
    /** Configs */          
    CONFIGS: { id: 2, loader: undefined },
    /** Interfaces */          
    INTERFACES: { id: 3, loader: undefined },
    /** Sound FX */          
    SOUNDEFFECTS: { id: 4, loader: undefined }, 
    /** Maps */          
    MAPS: { id: 5, loader: MapLoader }, 
    /** Music Tracks */          
    TRACK1: { id: 6, loader: MusicTrackLoader }, 
    /** Models */          
    MODELS: { id: 7, loader: ModelLoader }, 
    /** Sprites */          
    SPRITES: { id: 8, loader: SpriteLoader }, 
    /** Textures */          
    TEXTURES: { id: 9, loader: TextureLoader }, 
    /** Title screen & Huffman? */          
    BINARY: { id: 10, loader: undefined }, 
    /** Music Jingles */          
    TRACK2: { id: 11, loader: MusicTrackLoader }, 
    /** Interface Scripts */          
    CLIENTSCRIPT: { id: 12, loader: undefined }, 
    /** Interface Fonts */          
    FONTS: { id: 13, loader: undefined }, 
    /** Music Samples */          
    VORBIS: { id: 14, loader: undefined }, 
    /** Music Patches */          
    INSTRUMENTS: { id: 15, loader: undefined }, 
    /** World Locations */          
    WORLDMAP: { id: 16, loader: undefined }, 
    /** Sprite IDs? */          
    UKNOWN1: { id: 17, loader: undefined }, 
    /** World Map Geography? */                      
    UKNOWN2: { id: 18, loader: undefined }, 
    /**World Map? */                          
    UKNOWN3: { id: 19, loader: undefined }, 
    /** World Map Ground? */                    
    UKNOWN4: { id: 20, loader: undefined },      


};

IndexType.valueOf = (id) => {
    var values = Object.values(IndexType);
    var keys = Object.keys(IndexType);
    for (var i = 0; i < values.length; i++) {
        if (id == values[i].id)
            return IndexType[keys[i]];
    }
    return undefined;
}

Object.freeze(IndexType);

export default IndexType;