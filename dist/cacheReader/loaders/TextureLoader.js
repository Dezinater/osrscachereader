export class TextureDefinition {
}
export default class TextureLoader {
    load(bytes, id) {
        let def = new TextureDefinition();
        def.id = id;
        let dataview = new DataView(bytes.buffer);
        def.field1777 = dataview.readUint16();
        def.field1778 = dataview.readInt8() != 0;
        let count = dataview.readUint8();
        def.fileIds = new Array(count);
        for (let i = 0; i < count; ++i) {
            def.fileIds[i] = dataview.readUint16();
        }
        if (count > 1) {
            def.field1780 = new Array(count - 1);
            for (let var3 = 0; var3 < count - 1; ++var3) {
                def.field1780[var3] = dataview.readUint8();
            }
        }
        if (count > 1) {
            def.field1781 = new Array(count - 1);
            for (let var3 = 0; var3 < count - 1; ++var3) {
                def.field1781[var3] = dataview.readUint8();
            }
        }
        def.field1786 = new Array(count);
        for (let var3 = 0; var3 < count; ++var3) {
            def.field1786[var3] = dataview.readInt32();
        }
        def.animationDirection = dataview.readUint8();
        def.animationSpeed = dataview.readUint8();
        return def;
    }
}
