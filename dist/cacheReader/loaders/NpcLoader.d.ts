export class NpcDefinition {
}
export default class NpcLoader {
    load(bytes: any, id: any): NpcDefinition;
    handleOpcode(def: any, opcode: any, dataview: any): void;
    widthScale: any;
}
