export default class ArchiveData {
    id: number;
    name: string;
    hash: number;
    nameHash: number;
    crc: number;
    revision: number;
    filesLoaded: boolean;
    files: any[];
    loadFiles(data: any): void;
}
