var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isBrowser } from "browser-or-node";
import axios from 'axios';
import * as fs from "fs";
export default class CacheLoader {
    constructor(path, onDownloadProgress) {
        this.datFile = "main_file_cache.dat2";
        this.indexFiles = new Array(22).fill(0).map((_, i) => "main_file_cache.idx" + i).concat("main_file_cache.idx255");
        this.promises = {
            datFile: undefined,
            indexFiles: new Array(),
            xteas: undefined,
        };
        this.onDownloadProgress = onDownloadProgress;
        if (this.isValidHttpUrl(path) || isBrowser) {
            this.fetchURL(path);
        }
        else {
            this.loadFile(path);
        }
    }
    getResults() {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const datPromiseResults = yield this.promises.datFile;
            const indexPromiseResults = yield Promise.all(this.promises.indexFiles);
            const xteasResults = yield this.promises.xteas;
            const result = {
                datFile: datPromiseResults,
                indexFiles: indexPromiseResults,
                xteas: xteasResults,
            };
            resolve(result);
        }));
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
        this.promises.datFile = axios.get(url + this.datFile, { onDownloadProgress: this.onDownloadProgress, responseType: 'arraybuffer', }).then(x => new Uint8Array(x.data));
        this.indexFiles.forEach(indexFile => {
            this.promises.indexFiles.push(axios.get(url + indexFile, { responseType: 'arraybuffer' }).then(x => new Uint8Array(x.data)));
        });
        this.promises.xteas = axios.get(url + "xteas.json", { responseType: 'json', }).then(x => this.readXteas(x.data)).catch(e => { });
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
        this.indexFiles.forEach((indexFile) => __awaiter(this, void 0, void 0, function* () {
            let newPromise = new Promise(resolve => fs.readFile(path + indexFile, (err, data) => resolve(data)));
            this.promises.indexFiles.push(newPromise);
        }));
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
