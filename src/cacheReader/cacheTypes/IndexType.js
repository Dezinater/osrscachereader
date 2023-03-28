import FramemapLoader from '../loaders/FramemapLoader.js';
import FramesLoader from '../loaders/FramesLoader.js';
import MapLoader from '../loaders/MapLoader.js';
import ModelLoader from '../loaders/ModelLoader.js'
import SpriteLoader from '../loaders/SpriteLoader.js';

const IndexType = { 
    FRAMES:{id: 0, loader: FramesLoader},       // Animations
    FRAMEMAPS:{id: 1, loader: FramemapLoader},  // Skeletons
    CONFIGS:{id: 2, loader: undefined},         // Configs
    INTERFACES:{id: 3, loader: undefined},      // Interfaces
    SOUNDEFFECTS:{id: 4, loader: undefined},    // Sound FX
    MAPS:{id: 5, loader: MapLoader},            // Maps
    TRACK1:{id: 6, loader: undefined},          // Music Tracks (ex: "scape main")
    MODELS:{id: 7, loader: ModelLoader},        // Models
    SPRITES:{id: 8, loader: SpriteLoader},         // Sprites
    TEXTURES:{id: 9, loader: undefined},        // Textures
    BINARY:{id: 10, loader: undefined},         // Title screen & Huffman?
    TRACK2:{id: 11, loader: undefined},         // Music Jingles
    CLIENTSCRIPT:{id: 12, loader: undefined},   // Interface Scripts
    FONTS:{id: 13, loader: undefined},          // Interface Fonts
    VORBIS:{id: 14, loader: undefined},         // Music Samples
    INSTRUMENTS:{id: 15, loader: undefined},    // Music Patches
    WORLDMAP:{id: 16, loader: undefined},       // World Locations
    UKNOWN1:{id: 17, loader: undefined},        // Sprite IDs                       
    UKNOWN2:{id: 18, loader: undefined},        // World Map Geography                     
    UKNOWN3:{id: 19, loader: undefined},        // World Map                          
    UKNOWN4:{id: 20, loader: undefined},        // World Map Ground           

    valueOf(id){
        var values = Object.values(IndexType);
        var keys = Object.keys(IndexType);
        for(var i=0;i<values.length;i++) {
            if(id == values[i].id)
                return IndexType[keys[i]];
        }
        return undefined;
    }
};
Object.freeze(IndexType);

export default IndexType;