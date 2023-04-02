"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverlayDefinition = void 0;
class OverlayDefinition {
}
exports.OverlayDefinition = OverlayDefinition;
class OverlayLoader {
    load(bytes, id) {
        let def = new OverlayDefinition();
        def.id = id;
        let dataview = new DataView(bytes.buffer);
        do {
            var opcode = dataview.readUint8();
            this.handleOpcode(def, opcode, dataview);
        } while (opcode != 0);
        return def;
    }
    handleOpcode(def, opcode, dataview) {
        if (opcode == 0) {
            return;
        }
        if (opcode == 1) {
            def.color = dataview.readInt24();
        }
        else if (opcode == 2) {
            def.texture = dataview.readUint8();
        }
        else if (opcode == 5) {
            def.hideUnderlay = false;
        }
        else if (opcode == 7) {
            def.secondaryColor = dataview.readInt24();
        }
    }
}
exports.default = OverlayLoader;
