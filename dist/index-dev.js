"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = exports.ConfigType = exports.IndexType = exports.RSCache = void 0;
const RSCache_js_1 = __importDefault(require("./cacheReader/RSCache.js"));
exports.RSCache = RSCache_js_1.default;
const IndexType_js_1 = __importDefault(require("./cacheReader/cacheTypes/IndexType.js"));
exports.IndexType = IndexType_js_1.default;
const ConfigType_js_1 = __importDefault(require("./cacheReader/cacheTypes/ConfigType.js"));
exports.ConfigType = ConfigType_js_1.default;
const MatrixTest_js_1 = __importDefault(require("./cacheReader/cacheTypes/anim/MatrixTest.js"));
exports.Matrix = MatrixTest_js_1.default;
var cache = new RSCache_js_1.default("cache", (x) => { console.log(x); }, "./");
cache.onload.then(() => {
    console.log(cache);
    cache.getFile(IndexType_js_1.default.CONFIGS.id, ConfigType_js_1.default.UNDERLAY.id).then(x => { console.log(x); });
    cache.getFile(IndexType_js_1.default.CONFIGS.id, ConfigType_js_1.default.OVERLAY.id).then(x => { console.log(x); });
    console.log(Object.values(cache.cacheRequester.xteas).filter(x => x.name.includes("50_50")));
    for (let i = 0; i < cache.indicies[5].archivesCount; i++) {
        cache.getFile(IndexType_js_1.default.MAPS.id, i).then(x => {
            //console.log(x);
            //if (x.def == undefined) console.log(i, x);
            if (x.def.regionX == 50 && x.def.regionY == 53)
                console.log(x);
        }).catch(x => { });
    }
});
//console.log(cache.getFile(IndexType.MODELS.id, 15981, 0, false));
