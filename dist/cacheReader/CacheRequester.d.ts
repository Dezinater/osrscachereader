export default class CacheRequester {
    constructor(datFile: any);
    promises: {};
    datData: any;
    setXteas(xteas: any): void;
    xteas: any;
    readDataThreaded(index: any, size: any, segment: any, archiveId?: number): Promise<any>;
    readData(index: any, size: any, segment: any, archiveId: number, keys: any): Promise<{
        index: any;
        archiveId: number;
        decompressedData: any;
    }>;
    readSector(buffer: any, pos: any, archiveId: any): void;
    decrypt(data: any, len: any, key: any): any;
}
