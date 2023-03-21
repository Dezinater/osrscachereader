import Matrix from '../cacheTypes/anim/MatrixTest.js';
import IndexType from '../cacheTypes/IndexType.js'
import AnimayaLoader from './AnimayaLoader.js';

export class class420 {
    constructor() {
        this.method2179();
    }

    method2179() {
        this.field3740 = 0.0;
        this.field3739 = 0.0;
        this.field3737 = 0.0;
        this.field3738 = 1.0;
    }

    method2181(var1, var2, var3, var4) {
        let var5 = Math.sin(var4 * 0.5);
        let var6 = Math.cos(var4 * 0.5);
        this.field3737 = var1 * var5;
        this.field3739 = var2 * var5;
        this.field3740 = var5 * var3;
        this.field3738 = var6;
    }

    method2180(var1) {
        this.method2182(this.field3740 * var1.field3739 + this.field3738 * var1.field3737 + this.field3737 * var1.field3738 - var1.field3740 * this.field3739, this.field3738 * var1.field3739 + (var1.field3738 * this.field3739 - this.field3740 * var1.field3737) + this.field3737 * var1.field3740, this.field3739 * var1.field3737 + this.field3740 * var1.field3738 - var1.field3739 * this.field3737 + var1.field3740 * this.field3738, this.field3738 * var1.field3738 - var1.field3737 * this.field3737 - this.field3739 * var1.field3739 - this.field3740 * var1.field3740);
     }

     method2182(var1, var2, var3, var4) {
        this.field3737 = var1;
        this.field3739 = var2;
        this.field3740 = var3;
        this.field3738 = var4;
    }


}

export class FramesDefinition {
    method727(var1, var2, var3) {
        let var5 = new Matrix();

        this.method728(var5, var3, var2, var1);
        this.method726(var5, var3, var2, var1);
        this.method730(var5, var3, var2, var1);
        //console.log(var2.id, var5);

        var2.method691(var5);
        //var5.method2200(); //release back into pooling system?
    }

    method728(var1, var2, var3, var4) {
        let var5 = var3.method688(this.field1257);
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
        
        let var17 = new class420();
        var17.method2181(1.0, 0.0, 0.0, var6);
        
        let var18 = new class420();
        var18.method2181(0.0, 1.0, 0.0, var7);
        
        let var19 = new class420();
        var19.method2181(0.0, 0.0, 1.0, var8);
        
        let var12 = new class420();

        var12.method2180(var19);
        var12.method2180(var17);
        var12.method2180(var18);

        let var13 = new Matrix();

        var13.method2190(var12);
        var1.method2189(var13);
        /*
        var25.method2170();
        var27.method2170();
        var13.method2170();
        var15.method2170();
        var17.method2200();
        */
    }


    method730(var1, var2, var3, var4) {
        let var5 = var3.method689(this.field1257);
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
        let var5 = var3.method690(this.field1257);
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
        var15.method2186(var6, var7, var8);
        var1.method2189(var15);
        //var15.method2200();
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
            def = new AnimayaLoader().load(def, bytes, cache);
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
        return cache.getFile(IndexType.FRAMEMAPS.id, framemapArchiveIndex).then((framemap) => {

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
                }
                else {
                    def.translator_x[index] = var11;
                }

                if ((var9 & 2) != 0) {
                    def.translator_y[index] = dataview.readShortSmart();
                }
                else {
                    def.translator_y[index] = var11;
                }

                if ((var9 & 4) != 0) {
                    def.translator_z[index] = dataview.readShortSmart();
                }
                else {
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