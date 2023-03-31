export default class CacheDumper {
    private ignoreList;
    private cache;
    private outFolder;
    private progressFunction;
    private completedJobs;
    private failedJobs;
    private totalJobs;
    constructor(rscache: any, outFolder: string, progressFunction?: Function);
    outFolderCheck(): void;
    dumpAll(): Promise<void>;
    updateProgress(jobSuccess: boolean): void;
    dumpConfig(configInfo: any, name: any): Promise<void>;
    dumpIndex(indexInfo: any, name: any): Promise<void>;
    dumpArchives(indexInfo: any, name: any, archiveId: any): Promise<void>;
}
