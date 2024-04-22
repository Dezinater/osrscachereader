import Matrix from "../cacheTypes/anim/Matrix.js";
import IndexType from "../cacheTypes/IndexType.js";
import AnimayaLoader from "./AnimayaLoader.js";
import Quaternion from "../cacheTypes/anim/Quaternion.js";

/**
 * @class FramesDefinition
 * @category Definitions
 * @hideconstructor
 */
export class FramesDefinition {
    /**
     * The file ID of this Frame
     * @type {number}
     */
    id;

    /**
     * Skeleton used for this frame
     * @type {FramemapDefinition}
     */
    framemap;

    /** @type {Array<number>} */
    translator_x = [];

    /** @type {Array<number>} */
    translator_y = [];

    /** @type {Array<number>} */
    translator_z = [];

    /** @type {number} */
    translatorCount = -1;

    /** @type {Array<number>} */
    indexFrameIds = [];

    /** @type {boolean} */
    showing;

    method727(var1, var2, var3) {
        let var5 = new Matrix();

        this.method728(var5, var3, var2, var1);
        this.method726(var5, var3, var2, var1);
        this.method730(var5, var3, var2, var1);
        //console.log(var2.id, var5);

        var2.copy(var5);
    }

    method728(var1, var2, var3, var4) {
        let var5 = var3.getRotation(this.field1257);
        let var6 = var5[0];
        let var7 = var5[1];
        let var8 = var5[2];

        if (this.field1265[var2] != null) {
            let var9 = this.field1265[var2][0];
            let var10 = this.field1265[var2][1];
            let var11 = this.field1265[var2][2];
            if (var9 != null) {
                var6 = var9.method699(var4);
            }

            if (var10 != null) {
                var7 = var10.method699(var4);
            }

            if (var11 != null) {
                var8 = var11.method699(var4);
            }
        }

        let var17 = new Quaternion();
        var17.setRotation(1.0, 0.0, 0.0, var6);

        let var18 = new Quaternion();
        var18.setRotation(0.0, 1.0, 0.0, var7);

        let var19 = new Quaternion();
        var19.setRotation(0.0, 0.0, 1.0, var8);

        let var12 = new Quaternion();

        var12.multiply(var19);
        var12.multiply(var17);
        var12.multiply(var18);

        let var13 = new Matrix();

        var13.rotate(var12);
        var1.multiply(var13);
    }

    method730(var1, var2, var3, var4) {
        let var5 = var3.getTranslation(this.field1257);
        let var6 = var5[0];
        let var7 = var5[1];
        let var8 = var5[2];
        if (this.field1265[var2] != null) {
            let var9 = this.field1265[var2][3];
            let var10 = this.field1265[var2][4];
            let var11 = this.field1265[var2][5];
            if (var9 != null) {
                var6 = var9.method699(var4);
            }

            if (var10 != null) {
                var7 = var10.method699(var4);
            }

            if (var11 != null) {
                var8 = var11.method699(var4);
            }
        }

        var1.matrixVals[12] = var6;
        var1.matrixVals[13] = var7;
        var1.matrixVals[14] = var8;
    }

    method726(var1, var2, var3, var4) {
        let var5 = var3.getVectorMagnitudes(this.field1257);
        let var6 = var5[0];
        let var7 = var5[1];
        let var8 = var5[2];
        if (this.field1265[var2] != null) {
            let var9 = this.field1265[var2][6];
            let var10 = this.field1265[var2][7];
            let var11 = this.field1265[var2][8];
            if (var9 != null) {
                var6 = var9.method699(var4);
            }

            if (var10 != null) {
                var7 = var10.method699(var4);
            }

            if (var11 != null) {
                var8 = var11.method699(var4);
            }
        }

        let var15 = new Matrix();
        var15.setScaleXYZ(var6, var7, var8);
        var1.multiply(var15);
    }
}

export default class FramesLoader {
    load(bytes, id, cache, options) {
        let def = new FramesDefinition();
        def.id = id;
        let inview = new DataView(bytes.buffer);
        let dataview = new DataView(bytes.buffer);

        let framemapArchiveIndex = inview.readUint16();
        let length = inview.readUint8();

        if (options.isAnimaya) {
            def = new AnimayaLoader().load(def, bytes, cache, options);
            return def;
        }

        dataview.setPosition(3 + length);

        def.indexFrameIds = [];
        def.translator_x = [];
        def.translator_y = [];
        def.translator_z = [];

        let lastI = -1;
        let index = 0;
        //return this.def;
        return cache
            .getFile(IndexType.FRAMEMAPS.id, framemapArchiveIndex, 0, { cacheResults: true })
            .then((framemap) => {
                def.framemap = framemap.def;

                for (let i = 0; i < length; ++i) {
                    let var9 = inview.readUint8();

                    if (var9 <= 0) {
                        continue;
                    }

                    if (def.framemap.types[i] != 0) {
                        for (let var10 = i - 1; var10 > lastI; --var10) {
                            if (def.framemap.types[var10] == 0) {
                                def.indexFrameIds[index] = var10;
                                def.translator_x[index] = 0;
                                def.translator_y[index] = 0;
                                def.translator_z[index] = 0;
                                ++index;
                                break;
                            }
                        }
                    }

                    def.indexFrameIds[index] = i;
                    let var11 = 0;
                    if (def.framemap.types[i] == 3) {
                        var11 = 128;
                    }

                    if ((var9 & 1) != 0) {
                        def.translator_x[index] = dataview.readShortSmart();
                    } else {
                        def.translator_x[index] = var11;
                    }

                    if ((var9 & 2) != 0) {
                        def.translator_y[index] = dataview.readShortSmart();
                    } else {
                        def.translator_y[index] = var11;
                    }

                    if ((var9 & 4) != 0) {
                        def.translator_z[index] = dataview.readShortSmart();
                    } else {
                        def.translator_z[index] = var11;
                    }

                    lastI = i;
                    ++index;
                    if (def.framemap.types[i] == 5) {
                        def.showing = true;
                    }
                }

                return def;
            });
    }
}
