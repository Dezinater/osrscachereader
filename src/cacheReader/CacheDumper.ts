
import RSCache from "./RSCache";
import IndexType from "./cacheTypes/IndexType.js"
import { isBrowser } from "browser-or-node";
import fs from "fs";

export default class CacheDumper {

    private cache: RSCache;
    private outFolder: string;

    private completedJobs = 0;
    private failedJobs = 0;
    private totalJobs = 0;

    constructor(rscache, outFolder: string) {
        if (isBrowser) {
            console.error("Run with Node to dump Cache files, web browser dumping currently not implemented");
            return;
        }

        if (!outFolder.endsWith("/")) {
            outFolder += "/"
        }
        this.cache = rscache;
        this.outFolder = outFolder;
    }

    outFolderCheck() {
        if (fs.existsSync(this.outFolder)) return;
        fs.mkdirSync(this.outFolder);
    }

    dumpAll() {
        for (const [indexType, indexInfo] of Object.entries(IndexType)) {
            //@ts-ignore
            if (indexInfo.loader != undefined) {
                //@ts-ignore
                this.dumpIndex(indexInfo.id);
                return;
            }
        }
    }

    async dumpIndex(indexId) {
        this.outFolderCheck();
        const archivesCount = this.cache.indicies[indexId].archivesCount;

        for (let archiveId = 0; archiveId < archivesCount; archiveId++) {
            this.totalJobs++;
            try {
                let files = await this.cache.getAllFiles(indexId, archiveId);
                fs.mkdir(this.outFolder + archiveId, () => {
                    files.forEach(file => {
                        fs.writeFile(this.outFolder + archiveId + "/" + file.def.id + ".json", JSON.stringify(file.def, null, 2), () => {
                            this.completedJobs++;
                        });
                    });
                });
            } catch (e) {
                this.failedJobs++;
                console.warn(`Error Loading { Index: ${indexId} Archive: ${archiveId} }`);
                console.log(e);
            }
        }
    }

}