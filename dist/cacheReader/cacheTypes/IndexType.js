import FramemapLoader from '../loaders/FramemapLoader.js';
import FramesLoader from '../loaders/FramesLoader.js';
import MapLoader from '../loaders/MapLoader.js';
import ModelLoader from '../loaders/ModelLoader.js';
import SpriteLoader from '../loaders/SpriteLoader.js';
const IndexType = {
    FRAMES: { id: 0, loader: FramesLoader },
    FRAMEMAPS: { id: 1, loader: FramemapLoader },
    CONFIGS: { id: 2, loader: undefined },
    INTERFACES: { id: 3, loader: undefined },
    SOUNDEFFECTS: { id: 4, loader: undefined },
    MAPS: { id: 5, loader: MapLoader },
    TRACK1: { id: 6, loader: undefined },
    MODELS: { id: 7, loader: ModelLoader },
    SPRITES: { id: 8, loader: SpriteLoader },
    TEXTURES: { id: 9, loader: undefined },
    BINARY: { id: 10, loader: undefined },
    TRACK2: { id: 11, loader: undefined },
    CLIENTSCRIPT: { id: 12, loader: undefined },
    FONTS: { id: 13, loader: undefined },
    VORBIS: { id: 14, loader: undefined },
    INSTRUMENTS: { id: 15, loader: undefined },
    WORLDMAP: { id: 16, loader: undefined },
    UKNOWN1: { id: 17, loader: undefined },
    UKNOWN2: { id: 18, loader: undefined },
    UKNOWN3: { id: 19, loader: undefined },
    UKNOWN4: { id: 20, loader: undefined },
    valueOf(id) {
        var values = Object.values(IndexType);
        var keys = Object.keys(IndexType);
        for (var i = 0; i < values.length; i++) {
            if (id == values[i].id)
                return IndexType[keys[i]];
        }
        return undefined;
    }
};
Object.freeze(IndexType);
export default IndexType;
