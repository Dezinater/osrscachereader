export default class Index {
    constructor(id: any);
    id: any;
    protocol: number;
    revision: number;
    hash: number;
    crc: number;
    compression: number;
    named: boolean;
    archivesCount: number;
    archives: {};
    indexSegments: any[];
    loadIndexData(data: any): void;
    toString(): any;
}
