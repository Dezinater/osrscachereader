export class MapDefinition {

}
export default class MapLoader {

    load(bytes, x, y) {
        let def = new ItemDefinition();
        def.id = id;
        let dataview = new DataView(bytes.buffer);
        do {
            var opcode = dataview.readUint8();
            this.handleOpcode(def, opcode, dataview);
        } while (opcode != 0);

        return def;
    }

}