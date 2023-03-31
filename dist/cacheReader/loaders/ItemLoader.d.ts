export class ItemDefinition {
}
export default class ItemLoader {
    load(bytes: any, id: any): ItemDefinition;
    handleOpcode(def: any, opcode: any, dataview: any, lastOpCode: any): void;
}
