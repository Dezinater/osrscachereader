export default class CacheLoader {
    private onDownloadProgress;
    private datFile;
    private indexFiles;
    private promises;
    constructor(path: string, onDownloadProgress: any);
    getResults(): Promise<unknown>;
    isValidHttpUrl(path: any): boolean;
    fetchURL(url: string): void;
    loadFile(path: string): void;
    readXteas(xteasData: any): {};
}
