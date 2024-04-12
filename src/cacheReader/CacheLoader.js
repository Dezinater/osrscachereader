import { isBrowser } from "browser-or-node";
import axios from "axios";
import * as fs from "fs";
import IndexType from "./cacheTypes/IndexType.js";
import { unzipSync } from "fflate";

export default class CacheLoader {
    onDownloadProgress;
    datFile = "main_file_cache.dat2";
    indexFiles = new Array(22)
        .fill(0)
        .map((_, i) => "main_file_cache.idx" + i)
        .concat("main_file_cache.idx255");
    promises = {
        datFile: undefined,
        indexFiles: new Array(),
        xteas: undefined,
    };

    //cache promise is complete after all promises are setup
    cachePromise;
    cachePromiseResolve;

    constructor(path, onDownloadProgress) {
        this.onDownloadProgress = onDownloadProgress;
        this.cachePromise = new Promise((resolve, reject) => {
            this.cachePromiseResolve = resolve;
        });

        //this if statement needs to stay in this order or else there will be false positives
        if (path == "latest" || path == undefined) {
            //load by current date
            this.loadByTimestamp(new Date());
        } else if (path.constructor != undefined && path.constructor.name == "Date") {
            //load by date
            this.loadByTimestamp(path);
        } else if (!isNaN(path)) {
            //load by version number
            let version = Number(path);
            this.loadByVersion(version);
        } else if (this.isValidHttpUrl(path) || isBrowser) {
            //load by url
            this.fetchURL(path);
        } else {
            //load by local file path
            this.loadFile(path);
        }
    }

    getResults() {
        return new Promise(async (resolve) => {
            await this.cachePromise;
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

    handleZip(zipBufferPromise) {
        const zip = zipBufferPromise.then((zip) => unzipSync(new Uint8Array(zip)));
        this.promises.datFile = zip.then((dir) => dir["cache/" + this.datFile]);
        this.promises.indexFiles = this.indexFiles.map((indexFile, i) => {
            return zip
                .then((dir) => dir["cache/" + indexFile])
                .catch((_) => {
                    console.warn(`${IndexType.keyOf(i)} (Index ${i}) will not load without ${indexFile}`);
                });
        });
        this.promises.xteas = zip
            .then((dir) => dir["cache/xteas.json"])
            .catch((e) => {
                console.warn("Maps (Index 5) will not load without xteas.json");
            });
    }

    loadByVersion(version) {
        axios
            .get("https://archive.openrs2.org/caches.json", {
                responseType: "json",
            })
            .then((caches) => {
                let filtered = caches.data.filter(
                    (x) => x.game == "oldschool" && x.builds.length > 0 && x.builds[0].major == version,
                );
                let sorted = filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                this.fetchURL(`https://archive.openrs2.org/caches/runescape/${sorted[0].id}/disk.zip`);
            });
    }

    loadByTimestamp(timestamp) {
        axios
            .get("https://archive.openrs2.org/caches.json", {
                responseType: "json",
            })
            .then((caches) => {
                let filtered = caches.data.filter((x) => x.game == "oldschool");
                filtered.forEach((x) => (x.score = Math.abs(new Date(x.timestamp) - timestamp))); //rank them by distance
                let sorted = filtered.sort((a, b) => a.score - b.score);
                this.fetchURL(`https://archive.openrs2.org/caches/runescape/${sorted[0].id}/disk.zip`);
            });
    }

    fetchURL(url) {
        if (url.endsWith(".zip")) {
            this.handleZip(axios.get(url, { responseType: "arraybuffer" }).then((zip) => zip.data));
        } else {
            if (!url.endsWith("/")) {
                url += "/";
            }

            this.promises.datFile = axios
                .get(url + this.datFile, {
                    onDownloadProgress: this.onDownloadProgress,
                    responseType: "arraybuffer",
                })
                .then((x) => new Uint8Array(x.data));
            this.indexFiles.forEach((indexFile, i) => {
                let indexPromise = axios
                    .get(url + indexFile, { responseType: "arraybuffer" })
                    .then((x) => new Uint8Array(x.data))
                    .catch((_) => {
                        console.warn(`${IndexType.keyOf(i)} (Index ${i}) will not load without ${indexFile}`);
                    });
                this.promises.indexFiles.push(indexPromise);
            });
            this.promises.xteas = axios
                .get(url + "xteas.json", { responseType: "json" })
                .then((x) => this.readXteas(x.data))
                .catch((e) => {
                    console.warn("Maps (Index 5) will not load without xteas.json");
                });
        }

        this.cachePromiseResolve();
    }

    loadFile(path) {
        if (path.endsWith(".zip")) {
            const zip = new Promise((resolve, reject) =>
                fs.readFile(path, (err, data) => {
                    if (err) throw err;
                    resolve(data);
                }),
            );
            this.handleZip(zip);
        } else {
            if (!path.endsWith("/")) {
                path += "/";
            }

            this.promises.datFile = new Promise((resolve, reject) =>
                fs.readFile(path + this.datFile, (err, data) => {
                    if (err) throw err;
                    resolve(data);
                }),
            );
            this.indexFiles.forEach(async (indexFile) => {
                let newPromise = new Promise((resolve) => fs.readFile(path + indexFile, (err, data) => resolve(data)));
                this.promises.indexFiles.push(newPromise);
            });

            this.promises.xteas = new Promise((resolve, reject) =>
                fs.readFile(path + "xteas.json", "utf8", (err, data) => {
                    // if (err) throw err;
                    if (err) resolve();
                    resolve(this.readXteas(data));
                }),
            );
        }

        this.cachePromiseResolve();
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
