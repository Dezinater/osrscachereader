import * as DataViewImport from "./helpers/DataView.js";

import CacheDefinitionLoader from "./CacheDefinitionLoader.js";
import CacheRequester from "./CacheRequester.js";

import Index from "./cacheTypes/Index.js";
import CacheLoader from "./CacheLoader.js";

import IndexType from "./cacheTypes/IndexType.js";
import ConfigType from "./cacheTypes/ConfigType.js";

/**
 * @typedef options
 * @property {boolean} threaded Use a Web Worker to read from the cache. Slower than non-threaded since threading overhead is big. Useful for web apps to have a responsive UI
 * @property {boolean} isAnimaya Used while loading animations. Uses a different loading method for Animaya animations. OSRSCacheReader sets this internally on it's own if using ModelDefinition's loadAnimation method
 * @property {boolean} earlyStop Used while loading Animaya animations. Stops the reader early to just get the skeleton info
 * @property {boolean} loadSprites Used while loading Texture defs. Automatically grabs the corresponding sprite file
 * @property {boolean} cacheResults Save def on archive file after decompressing contents. Useful for quicker loading if loading the same thing multiple times but also can increase memory usage
 */

/**
 * Creates a RSCache reader
 * @category Base
 * @param {string} cacheRootDir This can either be a URL, local file path, version number, Date object, or the string 'latest'. If it is a URL or file path it should point to the root of the cache folder or a zip file containing a cache folder such as from https://archive.openrs2.org/
 * @param {function(number):void} progressFunc Progress function callback. Passes 1 parameter which is the amount of progress from the last step (not total progress)
 *
 * @example <caption>Load by URL</caption>
 * let cache = new RSCache("https://runemonk.com/cache/");
 *
 * @example <caption>Load by URL Zip</caption>
 * let cache = new RSCache("https://archive.openrs2.org/caches/runescape/1718/disk.zip");
 *
 * @example <caption>Load by File Path</caption>
 * let cache = new RSCache("./cache/");
 *
 * @example <caption>Load by File Path Zip</caption>
 * let cache = new RSCache("./cache.zip");
 *
 * @example <caption>Load by Version Number</caption>
 * let cache = new RSCache(220);
 *
 * @example <caption>Load latest</caption>
 * let cache = new RSCache('latest');
 *
 * @example <caption>Load by Date</caption>
 * let cache = new RSCache(new Date("Jan 1 2024"));
 */
class RSCache {
    constructor(cacheRootDir, progressFunc = () => {}) {
        this.indicies = {};
        this.progressFunc = progressFunc;

        const cacheLoader = new CacheLoader(cacheRootDir);

        this.onload = cacheLoader.getResults().then((result) => {
            this.cacheRequester = new CacheRequester(result.datFile);

            return this.#loadCacheFiles(result.indexFiles).then(() => {
                this.cacheRequester.setXteas(result.xteas);
            });
        });
    }

    #progress(amount) {
        this.progressFunc(amount);
    }

    /**
     * Get a cache Index file.
     * @method
     * @param {(Number | IndexType)} index
     * @returns [Index]{@link Index}
     */
    getIndex(index) {
        let indexId;
        if (index.constructor.name === "Object") {
            indexId = index.id;
        } else if (!isNaN(index)) {
            indexId = Number(index);
        }

        index = this.indicies[indexId];
        if (index == undefined) {
            throw "Index " + indexId + " does not exist";
        }

        return index;
    }

    #checkIfCachingResults(options, indexType) {
        if (options.cacheResults == undefined) {
            if (indexType.id == IndexType.MODELS.id || indexType.id == IndexType.MAPS.id) {
                // dont save models and maps if cacheResults isnt set
                options.cacheResults = false;
            } else {
                options.cacheResults = true;
            }
        }
    }

    readPromises = {};

    /**
     * Gets all of the files from an archive and loads their definitions if possible.
     * @param {(Number | IndexType)} indexId Can be a number or IndexType
     * @param {(Number)} archiveId Can be a number but also can be a ConfigType if IndexType is CONFIG
     * @param {options} options
     * @returns Array<[File]{@link File}>
     */
    async getAllFiles(indexId, archiveId, options = {}) {
        try {
            let index = this.getIndex(indexId);
            let archive = index.getArchive(archiveId);
            this.#checkIfCachingResults(options, index);

            if (archive.filesLoaded) {
                return archive.files;
            }

            if (this.readPromises[index.id] == undefined || !options.cacheResults) this.readPromises[index.id] = {};

            if (this.readPromises[index.id][archive.id] == undefined) {
                let promise = new Promise(async (resolve, reject) => {
                    let data;
                    if (options.threaded) {
                        data = await this.cacheRequester.readDataThreaded(
                            index,
                            index.indexSegments[archive.id].size,
                            index.indexSegments[archive.id].segment,
                            archive.id,
                        );
                    } else {
                        data = await this.cacheRequester.readData(
                            index,
                            index.indexSegments[archive.id].size,
                            index.indexSegments[archive.id].segment,
                            archive.id,
                        );
                    }
                    archive = index.archives[data.archiveId];
                    archive.loadFiles(data.decompressedData);

                    let filePromise = new CacheDefinitionLoader(data.index.id, archive, options).loadAllFiles(this);

                    if (options.cacheResults) {
                        //it will readData again since filesLoaded will be false
                        archive.filesLoaded = true;
                    }

                    resolve(await filePromise);
                });
                this.readPromises[index.id][archive.id] = promise;
                return promise;
            } else {
                //if its already being loaded
                return this.readPromises[index.id][archive.id];
            }
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Gets a single file from an archive and load its definition if possible.
     * @param {(Number | IndexType)} indexId Can be a number or IndexType
     * @param {(Number)} archiveId Can be a number but also can be a ConfigType if IndexType is CONFIG
     * @param {Number} fileId Id of the file to get from the archive
     * @param {options} options
     * @returns [File]{@link File}
     */
    async getFile(indexId, archiveId, fileId = 0, options = {}) {
        return this.getAllFiles(indexId, archiveId, options).then((x) => x[fileId]);
    }

    /**
     * Helper method to map getAllFiles results to definitions
     * @param {(Number | IndexType)} indexId Can be a number or IndexType
     * @param {(Number)} archiveId Can be a number but also can be a ConfigType if IndexType is CONFIG
     * @param {options} options
     * @returns Definition
     */
    async getAllDefs(indexId, archiveId, options = {}) {
        try {
            let files = await this.getAllFiles(indexId, archiveId, options);
            return files.map((x) => x.def);
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Helper method to map getFile results to its definition
     * @param {(Number | IndexType)} indexId Can be a number or IndexType
     * @param {(Number)} archiveId Can be a number but also can be a ConfigType if IndexType is CONFIG
     * @param {Number} fileId Id of the definition to get from the archive
     * @param {options} options
     * @returns Definition
     */
    async getDef(indexId, archiveId, fileId = 0, options = {}) {
        return this.getAllDefs(indexId, archiveId, options).then((x) => x[fileId]);
    }

    /**
     * Helper method to get a NPC definition
     * @param {Number} id NPC Id
     * @param {options} options
     * @returns [NpcDefinition]{@link NpcDefinition}
     */
    async getNPC(id, options = {}) {
        return this.getDef(IndexType.CONFIGS, ConfigType.NPC, id, options);
    }

    /**
     * Helper method to get an Item definition
     * @param {Number} id Item Id
     * @param {options} options
     * @returns ItemDefinition
     */
    async getItem(id, options = {}) {
        return this.getDef(IndexType.CONFIGS, ConfigType.ITEM, id, options);
    }

    /**
     * Helper method to get an Object definition
     * @param {Number} id Object Id
     * @param {options} options
     * @returns ObjectDefinition
     */
    async getObject(id, options = {}) {
        return this.getDef(IndexType.CONFIGS, ConfigType.OBJECT, id, options);
    }

    /** Closes the cache and cleans up the web worker pool */
    close() {
        this.cacheRequester.workerPool.finish();
    }

    #loadCacheFiles(indexFiles) {
        let idx255Data = indexFiles[indexFiles.length - 1];
        let idxFileData = indexFiles.slice(0, indexFiles.length - 1);

        //theres probably a better way of doing this
        //also not completely sure yet if this really needs to be done for index 255
        //return Promise.all(idxFiles).then((idxFileData) => {
        for (let i = 0; i <= idxFileData.length; i++) {
            let dataview;
            if (i == idxFileData.length) {
                //ugly fix, needs to be improved
                dataview = new DataView(idx255Data.buffer);
                i = 255;
            } else {
                if (idxFileData[i] == undefined) continue;
                dataview = new DataView(idxFileData[i].buffer);
            }
            this.indicies[i] = new Index(i);
            for (let j = 0; j < dataview.byteLength; j += 6) {
                let size = dataview.readUint24();
                let segment = dataview.readUint24();
                this.indicies[i].indexSegments.push({ size, segment });
            }
        }

        this.#progress(40);
        return this.#loadIndicies(idx255Data);
    }

    #loadIndicies(idxData) {
        let dataview = new DataView(idxData.buffer);
        //could probably use the indexSegments or remove the weird i = 255 part from loadCacheFiles
        //might look better if j++, but works for now

        let indexPromises = [];

        for (let j = 0; j < dataview.byteLength; j += 6) {
            let size = dataview.readUint24();
            let segment = dataview.readUint24();
            let index = this.indicies[j / 6];
            if (index == undefined) continue;
            let data = this.cacheRequester.readData(index, size, segment);
            //since this is async now the onload is considered complete before its completed
            //this call is completed before loadIndexData is completed
            //the onload promise needs to complete when all of the loadIndexDatas have completed
            data.then((x) => {
                this.indicies[x.index.id].loadIndexData(x.decompressedData);
                this.#progress(60 / (dataview.byteLength / 6));
            });

            indexPromises.push(data);
        }

        this.indexPromises = indexPromises;
        return Promise.all(indexPromises);
    }
}

export default RSCache;
