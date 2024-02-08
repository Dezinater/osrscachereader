import { isBrowser } from "browser-or-node";
import axios from 'axios';
import * as fs from "fs";
import IndexType from "./cacheTypes/IndexType.js";
import { unzipSync } from 'fflate';


export default class CacheLoader {

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

        if (this.isValidHttpUrl(path) || isBrowser) {
            this.fetchURL(path);
        } else {
            this.loadFile(path);
        }

    }

    getResults() {
        return new Promise(async resolve => {
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
        } catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }

    fetchURL(url) {
        if (url.endsWith(".zip")) {
            console.log("decompress zip file " + url);
            const zip = axios.get(url, { responseType: 'arraybuffer' }).then(zip => {
                return unzipSync(new Uint8Array(zip.data));
            });
            this.promises.datFile = zip.then(dir => dir['cache/' + this.datFile]);
            this.promises.indexFiles = this.indexFiles.map((indexFile, i) => {
                return zip.then(dir => dir['cache/' + indexFile]).catch(_ => { console.warn(`${IndexType.keyOf(i)} (Index ${i}) will not load without ${indexFile}`)});
            });
            this.promises.xteas = zip.then(dir => dir['cache/xteas.json']).catch(e => { console.warn("Maps (Index 5) will not load without xteas.json") });
        } else {
            if (!url.endsWith("/")) {
                url += "/";
            }

            this.promises.datFile = axios.get(url + this.datFile, { onDownloadProgress: this.onDownloadProgress, responseType: 'arraybuffer', }).then(x => new Uint8Array(x.data));
            this.indexFiles.forEach((indexFile, i) => {
                let indexPromise = axios.get(url + indexFile, { responseType: 'arraybuffer' }).then(x => new Uint8Array(x.data)).catch(_ => { console.warn(`${IndexType.keyOf(i)} (Index ${i}) will not load without ${indexFile}`)});
                this.promises.indexFiles.push(indexPromise);
            });
            this.promises.xteas = axios.get(url + "xteas.json", { responseType: 'json', }).then(x => this.readXteas(x.data)).catch(e => { console.warn("Maps (Index 5) will not load without xteas.json") });
        }
    }

    loadFile(path) {
        if (!path.endsWith("/")) {
            path += "/";
        }

        this.promises.datFile = new Promise((resolve, reject) => fs.readFile(path + this.datFile, (err, data) => {
            if (err) throw err;
            resolve(data)
        }));
        this.indexFiles.forEach(async indexFile => {
            let newPromise = new Promise(resolve => fs.readFile(path + indexFile, (err, data) => resolve(data)));
            this.promises.indexFiles.push(newPromise);
        });

        this.promises.xteas = new Promise((resolve, reject) => fs.readFile(path + "xteas.json", "utf8", (err, data) => {
            // if (err) throw err;
            if (err) resolve()
            resolve(this.readXteas(data));
        }));
    }

    readXteas(xteasData) {
        if (xteasData == undefined) return;
        let xteas = xteasData;
        let reOrderedXteas = {};
        for (var i = 0; i < xteas.length; i++) {
            reOrderedXteas[xteas[i].group] = xteas[i];
        }
        return reOrderedXteas;
    }
}