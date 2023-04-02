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
const Ajax = __importStar(require("./helpers/ajax.js"));
const DataViewImport = __importStar(require("./helpers/DataView.js"));
const CacheDefinitionLoader_js_1 = __importDefault(require("./CacheDefinitionLoader.js"));
const CacheRequester_js_1 = __importDefault(require("./CacheRequester.js"));
const Index_js_1 = __importDefault(require("./cacheTypes/Index.js"));
const HashConverter_js_1 = __importDefault(require("./HashConverter.js"));
const CacheLoader_ts_1 = __importDefault(require("./CacheLoader.ts"));
class RSCache {
    constructor(cacheRootDir = "./", progressFunc = () => { }, nameRootDir = undefined) {
        this.indicies = {};
        this.progressFunc = progressFunc;
        const cacheLoader = new CacheLoader_ts_1.default(cacheRootDir);
        this.onload = cacheLoader.getResults().then(result => {
            this.cacheRequester = new CacheRequester_js_1.default(result.datFile);
            return this.loadCacheFiles(result.indexFiles, "./", nameRootDir).then(() => {
                this.cacheRequester.setXteas(result.xteas);
            });
        });
    }
    progress(amount) {
        this.progressFunc(amount);
    }
    async getAllFiles(indexId, archiveId, options = {}) {
        let index = this.indicies[indexId];
        if (index == undefined) {
            throw "Index " + indexId + " does not exist";
        }
        let archive = index.archives[archiveId];
        if (archive == undefined) {
            throw "Archive " + archiveId + " does not exist in Index " + indexId;
        }
        if (archive.filesLoaded) {
            return archive.files;
        }
        if (this.loadRequests == undefined)
            this.loadRequests = [];
        if (this.loadRequests[indexId] == undefined)
            this.loadRequests[indexId] = {};
        if (this.loadRequests[indexId][archiveId] == undefined)
            this.loadRequests[indexId][archiveId] = [];
        //this.loadRequests[indexId][archiveId]++;
        //console.log(this.loadRequests[indexId][archiveId]);
        let newPromise = new Promise((resolve, reject) => {
            this.loadRequests[indexId][archiveId].push({ resolve, reject });
        });
        //if theres already one processing then just add it to the stack
        if (this.loadRequests[indexId][archiveId].length > 1) {
            return newPromise;
        }
        let data;
        if (options.threaded)
            data = this.cacheRequester.readDataThreaded(index, index.indexSegments[archiveId].size, index.indexSegments[archiveId].segment, archiveId);
        else
            data = this.cacheRequester.readData(index, index.indexSegments[archiveId].size, index.indexSegments[archiveId].segment, archiveId);
        data.then(x => {
            archive = index.archives[x.archiveId];
            archive.loadFiles(x.decompressedData);
            new CacheDefinitionLoader_js_1.default(x.index.id, archive, options).load(this).then(() => {
                archive.filesLoaded = true;
                //console.log(this.loadRequests[indexId][archiveId]);
                for (let i = 0; i < this.loadRequests[indexId][archiveId].length; i++) {
                    this.loadRequests[indexId][archiveId][i].resolve(archive.files);
                }
            }).catch((error) => {
                for (let i = 0; i < this.loadRequests[indexId][archiveId].length; i++) {
                    this.loadRequests[indexId][archiveId][i].reject(error);
                }
            });
        }).catch(err => {
            for (let i = 0; i < this.loadRequests[indexId][archiveId].length; i++) {
                this.loadRequests[indexId][archiveId][i].reject(err);
            }
        });
        return newPromise;
    }
    //some archives only contain 1 file so a fileId is only needed in some cases
    getFile(indexId, archiveId, fileId = 0, options) {
        //console.log("Archive ID", archiveId);
        return this.getAllFiles(indexId, archiveId, options).then((x) => x[fileId]);
    }
    loadCacheFiles(indexFiles, xteas, namesRootDir) {
        //this is basically relying on loading faster than the other stuff. probably should merge this with something
        /*
        if (namesRootDir != undefined) {
            Ajax.getFile(namesRootDir + "names.tsv").then((nameData) => {
                let splitNameData = nameData.split("\n");
                for (let i = 0; i < splitNameData.length; i++) {
                    let tabSplit = splitNameData[i].split("\t");
                    nameHashLookup[tabSplit[3]] = tabSplit[4]; //3 = hash, 4 = name
                }
            });
        }
        */
        /*
                if (xteasDir != undefined) {
                    Ajax.getFile(xteasDir + "xteas.json").then((xteasData) => {
                        let xteas = JSON.parse(xteasData);
                        this.xteas = {};
                        for (var i = 0; i < xteas.length; i++) {
                            this.xteas[xteas[i].group] = xteas[i];
                        }
        
                    });
                }
        */
        //console.log(indexFiles);
        let idx255Data = indexFiles[indexFiles.length - 1];
        let idxFileData = indexFiles.slice(0, indexFiles.length - 1);
        //theres probably a better way of doing this
        //also not completely sure yet if this really needs to be done for index 255
        //return Promise.all(idxFiles).then((idxFileData) => {
        for (let i = 0; i <= idxFileData.length; i++) {
            let dataview;
            if (i == idxFileData.length) { //ugly fix, needs to be improved
                dataview = new DataView(idx255Data.buffer);
                i = 255;
            }
            else {
                dataview = new DataView(idxFileData[i].buffer);
            }
            this.indicies[i] = new Index_js_1.default(i);
            for (let j = 0; j < dataview.byteLength; j += 6) {
                let size = dataview.readUint24();
                let segment = dataview.readUint24();
                //console.log(size, segment);
                this.indicies[i].indexSegments.push({ size, segment });
            }
        }
        ;
        this.progress(40);
        return this.loadIndicies(idx255Data);
    }
    loadIndicies(idxData) {
        let dataview = new DataView(idxData.buffer);
        //could probably use the indexSegments or remove the weird i = 255 part from loadCacheFiles
        //might look better if j++, but works for now
        let indexPromises = [];
        for (let j = 0; j < dataview.byteLength; j += 6) {
            let size = dataview.readUint24();
            let segment = dataview.readUint24();
            let index = this.indicies[j / 6];
            let data = this.cacheRequester.readData(index, size, segment);
            //since this is async now the onload is considered complete before its completed
            //this call is completed before loadIndexData is completed
            //the onload promise needs to complete when all of the loadIndexDatas have completed
            data.then(x => {
                this.indicies[x.index.id].loadIndexData(x.decompressedData);
                this.progress((60) / (dataview.byteLength / 6));
            });
            indexPromises.push(data);
            //index.loadIndexData(data);
        }
        this.indexPromises = indexPromises;
        //console.log(indexPromises);
        return Promise.all(indexPromises);
    }
}
exports.default = RSCache;
