"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FramemapLoader_js_1 = __importDefault(require("../loaders/FramemapLoader.js"));
const FramesLoader_js_1 = __importDefault(require("../loaders/FramesLoader.js"));
const MapLoader_js_1 = __importDefault(require("../loaders/MapLoader.js"));
const ModelLoader_js_1 = __importDefault(require("../loaders/ModelLoader.js"));
const SpriteLoader_js_1 = __importDefault(require("../loaders/SpriteLoader.js"));
const IndexType = {
    FRAMES: { id: 0, loader: FramesLoader_js_1.default },
    FRAMEMAPS: { id: 1, loader: FramemapLoader_js_1.default },
    CONFIGS: { id: 2, loader: undefined },
    INTERFACES: { id: 3, loader: undefined },
    SOUNDEFFECTS: { id: 4, loader: undefined },
    MAPS: { id: 5, loader: MapLoader_js_1.default },
    TRACK1: { id: 6, loader: undefined },
    MODELS: { id: 7, loader: ModelLoader_js_1.default },
    SPRITES: { id: 8, loader: SpriteLoader_js_1.default },
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
exports.default = IndexType;
