export class UnderlayDefinition {
}
export default class UnderlayLoader {
    load(bytes: any, id: any): UnderlayDefinition;
    handleOpcode(def: any, opcode: any, dataview: any): void;
}
