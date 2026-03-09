/**
 * Used the paint the heightmap of Map tiles
 * @class UnderlayDefinition
 * @category Definitions
 * @hideconstructor
 */
export class UnderlayDefinition {
    id;
    color;
    hue;
    saturation;
    lightness;
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

        this.loadHsl(def);
        this.packHsl(def);
        return def;
    }

    packHsl(def) {
        if (def.lightness > 179) {
            def.saturation = (def.saturation / 2) | 0;
        }
      
        if (def.lightness > 192) {
            def.saturation = (def.saturation / 2) | 0;
        }
      
        if (def.lightness > 217) {
            def.saturation = (def.saturation / 2) | 0;
        }
      
        if (def.lightness > 243) {
            def.saturation = (def.saturation / 2) | 0;
        }
      
        def.color = (Math.floor(def.saturation / 32) << 7) + (Math.floor(def.hue / 4) << 10) + (Math.floor(def.lightness / 2) | 0);
    }

    handleOpcode(def, opcode, dataview) {
        if (opcode == 0) {
            return;
        }
        if (opcode == 1) {
            def.color = dataview.readInt24();
        }
    }

    loadHsl(def) {
        let var1 = def.color;
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
                var12 = 2 + (var6 - var2) / (var10 - var8);
            } else if (var6 == var10) {
                var12 = 4 + (var2 - var4) / (var10 - var8);
            }
        }

        var12 /= 6;
        let saturation = Math.floor(var14 * 256);
        let lightness = Math.floor(var16 * 256);
        if (saturation < 0) {
            saturation = 0;
        } else if (saturation > 256) {
            saturation = 256;
        }

        if (lightness < 0) {
            lightness = 0;
        } else if (lightness > 256) {
            lightness = 256;
        }

        let hueMultiplier;
        if (var16 > 0.5) {
            hueMultiplier = Math.floor((var14 * (1 - var16)) * 512);
        } else {
            hueMultiplier = Math.floor(512 * (var16 * var14));
        }

        if (hueMultiplier < 1) {
            hueMultiplier = 1;
        }

        let hue = Math.floor(hueMultiplier * var12);


        //console.log(`${var1} RGB ${(var1 >> 16) & 255}, ${(var1 >> 8) & 255}, ${var1 & 255}    HSL ${hue}, ${saturation}, ${lightness}`)

        def.hue = hue;
        def.saturation = saturation;
        def.lightness = lightness;
    }
}
