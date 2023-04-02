var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import IndexType from "./cacheTypes/IndexType.js";
import ConfigType from "./cacheTypes/ConfigType.js";
import { isBrowser } from "browser-or-node";
import fs from "fs";
export default class CacheDumper {
    constructor(rscache, outFolder, progressFunction = () => { }) {
        this.ignoreList = ["FRAMES", "FRAMEMAPS", "MAPS", "MODELS"];
        this.completedJobs = 0;
        this.failedJobs = 0;
        this.totalJobs = 0;
        if (isBrowser) {
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
        if (fs.existsSync(this.outFolder))
            return;
        fs.mkdirSync(this.outFolder);
    }
    dumpAll() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const [indexType, indexInfo] of Object.entries(IndexType)) {
                if (this.ignoreList.includes(indexType)) {
                    continue;
                }
                //@ts-ignore
                if (indexInfo.loader != undefined) {
                    try {
                        yield this.dumpIndex(indexInfo, indexType);
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            }
            for (const [configType, configInfo] of Object.entries(ConfigType)) {
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
        });
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
    dumpConfig(configInfo, name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fs.existsSync(this.outFolder + "CONFIGS"))
                fs.mkdirSync(this.outFolder + "CONFIGS");
            if (!fs.existsSync(this.outFolder + "CONFIGS/" + name))
                fs.mkdirSync(this.outFolder + "CONFIGS/" + name);
            let files = yield this.cache.getAllFiles(IndexType.CONFIGS.id, configInfo.id);
            files.forEach(file => {
                fs.writeFileSync(this.outFolder + "CONFIGS/" + name + "/" + file.def.id + ".json", JSON.stringify(file.def, null, 2));
            });
        });
    }
    dumpIndex(indexInfo, name) {
        return __awaiter(this, void 0, void 0, function* () {
            this.outFolderCheck();
            const archivesCount = this.cache.indicies[indexInfo.id].archivesCount;
            if (!fs.existsSync(this.outFolder + name))
                fs.mkdirSync(this.outFolder + name);
            this.dumpArchives(indexInfo, name, 3591);
            this.totalJobs += archivesCount;
        });
    }
    dumpArchives(indexInfo, name, archiveId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (archiveId < 0)
                return;
            try {
                let files = yield this.cache.getAllFiles(indexInfo.id, archiveId);
                fs.mkdir(this.outFolder + name + "/" + archiveId, () => {
                    files.forEach(file => {
                        fs.writeFile(this.outFolder + name + "/" + archiveId + "/" + file.def.id + ".json", JSON.stringify(file.def, null, 2), () => {
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
        });
    }
}
