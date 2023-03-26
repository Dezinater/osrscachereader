import { isBrowser } from "browser-or-node";
import axios from 'axios';

interface Promises {
    datFile;
    indexFiles: Array<Promise<Uint8Array>>;
}

interface LoadedFiles {
    datFile;
    indexFiles;
}

export default class CacheLoader {

    private onDownloadProgress;
    private datFile = "main_file_cache.dat2";
    private indexFiles = new Array(22).fill(0).map((_, i) => "main_file_cache.idx" + i).concat("main_file_cache.idx255");
    private promises: Promises = {
        datFile: undefined,
        indexFiles: new Array()
    };

    constructor(path: string, onDownloadProgress) {
        console.log(path);
        this.onDownloadProgress = onDownloadProgress;

        console.log("isBrowser: " + isBrowser);

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
            const result: LoadedFiles = {
                datFile: datPromiseResults,
                indexFiles: indexPromiseResults,
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

    fetchURL(url: string) {
        if (url.endsWith(".zip")) {
            console.log("decompress zip file " + url);
            return;
        }

        if (!url.endsWith("/")) {
            url += "/";
        }

        this.promises.datFile = axios.get(url + this.datFile, { onDownloadProgress: this.onDownloadProgress, responseType: 'arraybuffer', }).then(x => new Uint8Array(x.data));
        this.indexFiles.forEach(indexFile => {
            this.promises.indexFiles.push(axios.get(url + indexFile, { responseType: 'arraybuffer'}).then(x => new Uint8Array(x.data)));
        });
    }

    loadFile(path: string) {

    }
}