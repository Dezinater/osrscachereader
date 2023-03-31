export class OverlayDefinition {
}
export default class OverlayLoader {
    load(bytes: any, id: any): OverlayDefinition;
    handleOpcode(def: any, opcode: any, dataview: any): void;
}
