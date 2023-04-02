"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FileData {
    constructor(id) {
        this.id = id;
        this.name = "";
        this.def = undefined;
        this.nameHash = 0;
        this.size = 0;
        this.content = [];
    }
}
exports.default = FileData;
