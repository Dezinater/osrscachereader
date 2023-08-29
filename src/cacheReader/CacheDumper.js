import IndexType from "./cacheTypes/IndexType.js"
import ConfigType from "./cacheTypes/ConfigType.js"
import { isBrowser } from "browser-or-node";
import fs from "fs";

export default class CacheDumper {

    ignoreList = [];

    cache;
    outFolder;
    progressFunction;

    completedJobs = 0;
    failedJobs = 0;
    totalJobs = 0;

    constructor(rscache, outFolder, ignoreList, progressFunction = () => { }) {
        if (isBrowser) {
            console.error("Run with Node to dump Cache files, web browser dumping currently not implemented");
            return;
        }

        if (!outFolder.endsWith("/")) {
            outFolder += "/"
        }
        this.cache = rscache;
        this.outFolder = outFolder;
        this.ignoreList = ignoreList;
        this.progressFunction = progressFunction;
    }

    outFolderCheck() {
        if (fs.existsSync(this.outFolder)) return;
        fs.mkdirSync(this.outFolder);
    }

    async dumpAll() {
        for (const [indexType, indexInfo] of Object.entries(IndexType)) {
            if (this.ignoreList.includes(indexType)) {
                continue;
            }

            //@ts-ignore
            if (indexInfo.loader != undefined) {
                try {
                    await this.dumpIndex(indexInfo, indexType);
                } catch (e) {
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
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }

    updateProgress(jobSuccess) {
        if (jobSuccess) {
            this.completedJobs++;
        } else {
            this.failedJobs++;
        }

        const total = (this.failedJobs + this.completedJobs) / this.totalJobs;
        const errorRate = this.failedJobs / (this.failedJobs + this.completedJobs);
        this.progressFunction(total, errorRate);
    }

    async dumpConfig(configInfo, name) {
        if (!fs.existsSync(this.outFolder + "CONFIGS")) fs.mkdirSync(this.outFolder + "CONFIGS");
        if (!fs.existsSync(this.outFolder + "CONFIGS/" + name)) fs.mkdirSync(this.outFolder + "CONFIGS/" + name);
        let files = await this.cache.getAllFiles(IndexType.CONFIGS.id, configInfo.id);
        files.forEach(file => {
            fs.writeFileSync(this.outFolder + "CONFIGS/" + name + "/" + file.def.id + ".json", JSON.stringify(file.def, null, 2));
        });
    }

    async dumpIndex(indexInfo, name) {
        this.outFolderCheck();
        const archivesCount = this.cache.indicies[indexInfo.id].archivesCount;
        if (!fs.existsSync(this.outFolder + name)) fs.mkdirSync(this.outFolder + name);

        this.dumpArchives(indexInfo, name, 3591)
        this.totalJobs += archivesCount;
    }


    async dumpArchives(indexInfo, name, archiveId) {
        if (archiveId < 0) return;

        try {
            let files = await this.cache.getAllFiles(indexInfo.id, archiveId);
            fs.mkdir(this.outFolder + name + "/" + archiveId, () => {
                files.forEach(file => {
                    fs.writeFile(this.outFolder + name + "/" + archiveId + "/" + file.def.id + ".json", JSON.stringify(file.def, null, 2), () => {
                        this.updateProgress(true);
                    });
                });
            });
        } catch (e) {
            this.updateProgress(false);
            console.warn(`Error Loading { Index: ${indexInfo.id} Archive: ${archiveId} }`);
            console.log(e);
        }

        //this.dumpArchives(indexInfo, name, archiveId - 1);
    }

}