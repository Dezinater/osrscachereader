export class ObjectDefinition {
    shadow: boolean;
}
export default class ObjectLoader {
    load(bytes: any, id: any): ObjectDefinition;
    handleOpcode(def: any, opcode: any, dataview: any): void;
}
