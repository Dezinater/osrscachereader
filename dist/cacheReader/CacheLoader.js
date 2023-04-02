"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const browser_or_node_1 = require("browser-or-node");
const axios_1 = __importDefault(require("axios"));
const fs = __importStar(require("fs"));
class CacheLoader {
    onDownloadProgress;
    datFile = "main_file_cache.dat2";
    indexFiles = new Array(22).fill(0).map((_, i) => "main_file_cache.idx" + i).concat("main_file_cache.idx255");
    promises = {
        datFile: undefined,
        indexFiles: new Array(),
        xteas: undefined,
    };
    constructor(path, onDownloadProgress) {
        this.onDownloadProgress = onDownloadProgress;
        if (this.isValidHttpUrl(path) || browser_or_node_1.isBrowser) {
            this.fetchURL(path);
        }
        else {
            this.loadFile(path);
        }
    }
    getResults() {
        return new Promise(async (resolve) => {
            const datPromiseResults = await this.promises.datFile;
            const indexPromiseResults = await Promise.all(this.promises.indexFiles);
            const xteasResults = await this.promises.xteas;
            const result = {
                datFile: datPromiseResults,
                indexFiles: indexPromiseResults,
                xteas: xteasResults,
            };
            resolve(result);
        });
    }
    isValidHttpUrl(path) {
        let url;
        try {
            url = new URL(path);
        }
        catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }
    fetchURL(url) {
        if (url.endsWith(".zip")) {
            console.log("decompress zip file " + url);
            return;
        }
        if (!url.endsWith("/")) {
            url += "/";
        }
        this.promises.datFile = axios_1.default.get(url + this.datFile, { onDownloadProgress: this.onDownloadProgress, responseType: 'arraybuffer', }).then(x => new Uint8Array(x.data));
        this.indexFiles.forEach(indexFile => {
            this.promises.indexFiles.push(axios_1.default.get(url + indexFile, { responseType: 'arraybuffer' }).then(x => new Uint8Array(x.data)));
        });
        this.promises.xteas = axios_1.default.get(url + "xteas.json", { responseType: 'json', }).then(x => this.readXteas(x.data)).catch(e => { });
    }
    loadFile(path) {
        if (!path.endsWith("/")) {
            path += "/";
        }
        this.promises.datFile = new Promise((resolve, reject) => fs.readFile(path + this.datFile, (err, data) => {
            if (err)
                throw err;
            resolve(data);
        }));
        this.indexFiles.forEach(async (indexFile) => {
            let newPromise = new Promise(resolve => fs.readFile(path + indexFile, (err, data) => resolve(data)));
            this.promises.indexFiles.push(newPromise);
        });
        this.promises.xteas = new Promise((resolve, reject) => fs.readFile(path + "xteas.json", "utf8", (err, data) => {
            if (err)
                throw err;
            resolve(this.readXteas(data));
        }));
    }
    readXteas(xteasData) {
        if (xteasData == undefined)
            return;
        let xteas = xteasData;
        let reOrderedXteas = {};
        for (var i = 0; i < xteas.length; i++) {
            reOrderedXteas[xteas[i].group] = xteas[i];
        }
        return reOrderedXteas;
    }
}
exports.default = CacheLoader;
