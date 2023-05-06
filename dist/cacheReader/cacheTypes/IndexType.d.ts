export default IndexType;
declare namespace IndexType {
    namespace FRAMES {
        export const id: number;
        export { FramesLoader as loader };
    }
    namespace FRAMEMAPS {
        const id_1: number;
        export { id_1 as id };
        export { FramemapLoader as loader };
    }
    namespace CONFIGS {
        const id_2: number;
        export { id_2 as id };
        export const loader: any;
    }
    namespace INTERFACES {
        const id_3: number;
        export { id_3 as id };
        const loader_1: any;
        export { loader_1 as loader };
    }
    namespace SOUNDEFFECTS {
        const id_4: number;
        export { id_4 as id };
        const loader_2: any;
        export { loader_2 as loader };
    }
    namespace MAPS {
        const id_5: number;
        export { id_5 as id };
        export { MapLoader as loader };
    }
    namespace TRACK1 {
        const id_6: number;
        export { id_6 as id };
        const loader_3: any;
        export { loader_3 as loader };
    }
    namespace MODELS {
        const id_7: number;
        export { id_7 as id };
        export { ModelLoader as loader };
    }
    namespace SPRITES {
        const id_8: number;
        export { id_8 as id };
        export { SpriteLoader as loader };
    }
    namespace TEXTURES {
        const id_9: number;
        export { id_9 as id };
        export { TextureLoader as loader };
    }
    namespace BINARY {
        const id_10: number;
        export { id_10 as id };
        const loader_4: any;
        export { loader_4 as loader };
    }
    namespace TRACK2 {
        const id_11: number;
        export { id_11 as id };
        const loader_5: any;
        export { loader_5 as loader };
    }
    namespace CLIENTSCRIPT {
        const id_12: number;
        export { id_12 as id };
        const loader_6: any;
        export { loader_6 as loader };
    }
    namespace FONTS {
        const id_13: number;
        export { id_13 as id };
        const loader_7: any;
        export { loader_7 as loader };
    }
    namespace VORBIS {
        const id_14: number;
        export { id_14 as id };
        const loader_8: any;
        export { loader_8 as loader };
    }
    namespace INSTRUMENTS {
        const id_15: number;
        export { id_15 as id };
        const loader_9: any;
        export { loader_9 as loader };
    }
    namespace WORLDMAP {
        const id_16: number;
        export { id_16 as id };
        const loader_10: any;
        export { loader_10 as loader };
    }
    namespace UKNOWN1 {
        const id_17: number;
        export { id_17 as id };
        const loader_11: any;
        export { loader_11 as loader };
    }
    namespace UKNOWN2 {
        const id_18: number;
        export { id_18 as id };
        const loader_12: any;
        export { loader_12 as loader };
    }
    namespace UKNOWN3 {
        const id_19: number;
        export { id_19 as id };
        const loader_13: any;
        export { loader_13 as loader };
    }
    namespace UKNOWN4 {
        const id_20: number;
        export { id_20 as id };
        const loader_14: any;
        export { loader_14 as loader };
    }
    function valueOf(id: any): any;
}
import FramesLoader from '../loaders/FramesLoader.js';
import FramemapLoader from '../loaders/FramemapLoader.js';
import MapLoader from '../loaders/MapLoader.js';
import ModelLoader from '../loaders/ModelLoader.js';
import SpriteLoader from '../loaders/SpriteLoader.js';
import TextureLoader from '../loaders/TextureLoader.js';
