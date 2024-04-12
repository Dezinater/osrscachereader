/**
 * Used the paint the heightmap of Map tiles
 * @class UnderlayDefinition
 * @category Definitions
 * @hideconstructor
 */
export class UnderlayDefinition {
    id;
    color;
}
export default class UnderlayLoader {
    load(bytes, id) {
        let def = new UnderlayDefinition();
        def.id = id;
        let dataview = new DataView(bytes.buffer);
        do {
            var opcode = dataview.readUint8();
            this.handleOpcode(def, opcode, dataview);
        } while (opcode != 0);

        def.color = this.convertToHsl(def.color);
        return def;
    }

    handleOpcode(def, opcode, dataview) {
        if (opcode == 0) {
            return;
        }
        if (opcode == 1) {
            def.color = dataview.readInt24();
        }
    }

    convertToHsl(var1) {
        let var2 = ((var1 >> 16) & 255) / 256;
        let var4 = ((var1 >> 8) & 255) / 256;
        let var6 = (var1 & 255) / 256;

        let var8 = var2;
        if (var4 < var2) {
            var8 = var4;
        }

        if (var6 < var8) {
            var8 = var6;
        }

        let var10 = var2;
        if (var4 > var2) {
            var10 = var4;
        }

        if (var6 > var10) {
            var10 = var6;
        }

        let var12 = 0;
        let var14 = 0;
        let var16 = (var10 + var8) / 2;
        if (var8 != var10) {
            if (var16 < 0.5) {
                var14 = (var10 - var8) / (var8 + var10);
            }

            if (var16 >= 0.5) {
                var14 = (var10 - var8) / (2 - var10 - var8);
            }

            if (var2 == var10) {
                var12 = (var4 - var6) / (var10 - var8);
            } else if (var4 == var10) {
                var12 = (var6 - var2) / (var10 - var8) + 2;
            } else if (var6 == var10) {
                var12 = 4 + (var2 - var4) / (var10 - var8);
            }
        }

        var12 /= 6;
        let saturation = Math.floor(var14 * 8);
        let lightness = Math.floor(var16 * 128);
        if (saturation < 0) {
            saturation = 0;
        } else if (saturation > 7) {
            saturation = 7;
        }

        if (lightness < 0) {
            lightness = 0;
        } else if (lightness > 127) {
            lightness = 127;
        }

        let hueMultiplier;
        if (var16 > 0.5) {
            hueMultiplier = Math.floor((1 - var16) * var14 * 512);
        } else {
            hueMultiplier = Math.floor(512 * var16 * var14);
        }

        if (hueMultiplier < 1) {
            hueMultiplier = 1;
        }

        let hue = Math.floor(hueMultiplier * var12);

        return (hue << 10) | (saturation << 7) | lightness;
    }
}
