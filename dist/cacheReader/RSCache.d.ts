export default class RSCache {
    constructor(cacheRootDir?: string, progressFunc?: () => void, nameRootDir?: any);
    indicies: {};
    progressFunc: () => void;
    onload: Promise<void>;
    cacheRequester: CacheRequester;
    progress(amount: any): void;
    getAllFiles(indexId: any, archiveId: any, options?: {}): Promise<any>;
    loadRequests: any[];
    getFile(indexId: any, archiveId: any, fileId: number, options: any): Promise<any>;
    loadCacheFiles(indexFiles: any, xteasDir: any, namesRootDir: any): Promise<{
        index: any;
        archiveId: number;
        decompressedData: any;
    }[]>;
    loadIndicies(idxData: any): Promise<{
        index: any;
        archiveId: number;
        decompressedData: any;
    }[]>;
    indexPromises: Promise<{
        index: any;
        archiveId: number;
        decompressedData: any;
    }>[];
}
import CacheRequester from './CacheRequester.js';
