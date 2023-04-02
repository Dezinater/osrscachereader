"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IndexType_js_1 = __importDefault(require("./cacheTypes/IndexType.js"));
const ConfigType_js_1 = __importDefault(require("./cacheTypes/ConfigType.js"));
const browser_or_node_1 = require("browser-or-node");
const fs_1 = __importDefault(require("fs"));
class CacheDumper {
    ignoreList = ["FRAMES", "FRAMEMAPS", "MAPS", "MODELS"];
    cache;
    outFolder;
    progressFunction;
    completedJobs = 0;
    failedJobs = 0;
    totalJobs = 0;
    constructor(rscache, outFolder, progressFunction = () => { }) {
        if (browser_or_node_1.isBrowser) {
            console.error("Run with Node to dump Cache files, web browser dumping currently not implemented");
            return;
        }
        if (!outFolder.endsWith("/")) {
            outFolder += "/";
        }
        this.cache = rscache;
        this.outFolder = outFolder;
        this.progressFunction = progressFunction;
    }
    outFolderCheck() {
        if (fs_1.default.existsSync(this.outFolder))
            return;
        fs_1.default.mkdirSync(this.outFolder);
    }
    async dumpAll() {
        for (const [indexType, indexInfo] of Object.entries(IndexType_js_1.default)) {
            if (this.ignoreList.includes(indexType)) {
                continue;
            }
            //@ts-ignore
            if (indexInfo.loader != undefined) {
                try {
                    await this.dumpIndex(indexInfo, indexType);
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
        for (const [configType, configInfo] of Object.entries(ConfigType_js_1.default)) {
            if (this.ignoreList.includes(configType)) {
                continue;
            }
            //@ts-ignore
            if (configInfo.loader != undefined) {
                try {
                    //await this.dumpConfig(configInfo, configType);
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
    }
    updateProgress(jobSuccess) {
        if (jobSuccess) {
            this.completedJobs++;
        }
        else {
            this.failedJobs++;
        }
        const total = (this.failedJobs + this.completedJobs) / this.totalJobs;
        const errorRate = this.failedJobs / (this.failedJobs + this.completedJobs);
        this.progressFunction(total, errorRate);
    }
    async dumpConfig(configInfo, name) {
        if (!fs_1.default.existsSync(this.outFolder + "CONFIGS"))
            fs_1.default.mkdirSync(this.outFolder + "CONFIGS");
        if (!fs_1.default.existsSync(this.outFolder + "CONFIGS/" + name))
            fs_1.default.mkdirSync(this.outFolder + "CONFIGS/" + name);
        let files = await this.cache.getAllFiles(IndexType_js_1.default.CONFIGS.id, configInfo.id);
        files.forEach(file => {
            fs_1.default.writeFileSync(this.outFolder + "CONFIGS/" + name + "/" + file.def.id + ".json", JSON.stringify(file.def, null, 2));
        });
    }
    async dumpIndex(indexInfo, name) {
        this.outFolderCheck();
        const archivesCount = this.cache.indicies[indexInfo.id].archivesCount;
        if (!fs_1.default.existsSync(this.outFolder + name))
            fs_1.default.mkdirSync(this.outFolder + name);
        this.dumpArchives(indexInfo, name, 3591);
        this.totalJobs += archivesCount;
    }
    async dumpArchives(indexInfo, name, archiveId) {
        if (archiveId < 0)
            return;
        try {
            let files = await this.cache.getAllFiles(indexInfo.id, archiveId);
            fs_1.default.mkdir(this.outFolder + name + "/" + archiveId, () => {
                files.forEach(file => {
                    fs_1.default.writeFile(this.outFolder + name + "/" + archiveId + "/" + file.def.id + ".json", JSON.stringify(file.def, null, 2), () => {
                        this.updateProgress(true);
                    });
                });
            });
        }
        catch (e) {
            this.updateProgress(false);
            console.warn(`Error Loading { Index: ${indexInfo.id} Archive: ${archiveId} }`);
            console.log(e);
        }
        //this.dumpArchives(indexInfo, name, archiveId - 1);
    }
}
exports.default = CacheDumper;
