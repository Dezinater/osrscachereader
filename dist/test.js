"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CacheDumper_js_1 = __importDefault(require("./cacheReader/CacheDumper.js"));
const index_js_1 = require("./index.js");
let cache = new index_js_1.RSCache("./cache");
cache.onload.then(() => {
    console.log("Loaded");
    const cacheDumper = new CacheDumper_js_1.default(cache, "dump");
    cacheDumper.dumpAll();
});
