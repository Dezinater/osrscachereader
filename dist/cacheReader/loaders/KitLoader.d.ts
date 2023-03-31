export class KitDefinition {
}
export default class KitLoader {
    load(bytes: any, id: any): KitDefinition;
    handleOpcode(def: any, opcode: any, dataview: any): void;
}
