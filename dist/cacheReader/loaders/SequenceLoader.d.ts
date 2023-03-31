export class SequenceDefinition {
}
export default class SequenceLoader {
    load(bytes: any, id: any): SequenceDefinition;
    handleOpcode(def: any, opcode: any, dataview: any): void;
}
