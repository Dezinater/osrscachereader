import IndexType from '../cacheTypes/IndexType.js'
import { Matrix } from './FramemapLoader.js';

export class class416 {
    constructor() {
        this.method2168();
    }

    method2168() {
        this.field3773 = 0.0;
        this.field3772 = 0.0;
        this.field3771 = 0.0;
        this.field3774 = 1.0;
    }

    method2171(var1, var2, var3, var4) {
        let var5 = Math.sin(var4 * 0.5);
        let var6 = Math.cos(var4 * 0.5);
        this.field3771 = var1 * var5;
        this.field3772 = var2 * var5;
        this.field3773 = var5 * var3;
        this.field3774 = var6;
    }

    method2169(var1) {
        this.method2167(var1.field3772 * this.field3773 + this.field3774 * var1.field3771 + var1.field3774 * this.field3771 - this.field3772 * var1.field3773, this.field3771 * var1.field3773 + this.field3772 * var1.field3774 - var1.field3771 * this.field3773 + var1.field3772 * this.field3774, var1.field3774 * this.field3773 + var1.field3771 * this.field3772 - this.field3771 * var1.field3772 + var1.field3773 * this.field3774, var1.field3774 * this.field3774 - this.field3771 * var1.field3771 - var1.field3772 * this.field3772 - var1.field3773 * this.field3773);
    }

    method2167(var1, var2, var3, var4) {
        this.field3771 = var1;
        this.field3772 = var2;
        this.field3773 = var3;
        this.field3774 = var4;
    }


}

export class FramesDefinition {
    method721(var1, var2, var3) {
        let var5 = new Matrix();

        this.method718(var5, var3, var2, var1);
        this.method724(var5, var3, var2, var1);
        this.method723(var5, var3, var2, var1);
        var2.method676(var5);
        //var5.method2172(); //release back into pooling system?
    }

    method718(var1, var2, var3, var4) {
        let var5 = var3.method679(this.field1264);
        let var6 = var5[0];
        let var7 = var5[1];
        let var8 = var5[2];

        if (this.field1267[var2] != null) {
            let var9 = this.field1267[var2][0];
            let var10 = this.field1267[var2][1];
            let var11 = this.field1267[var2][2];
            if (var9 != null) {
                var6 = var9.method696(var4);
            }


            if (var10 != null) {
                var7 = var10.method696(var4);
            }

            if (var11 != null) {
                var8 = var11.method696(var4);
            }
        }
        let var26 = class416.field3770;
        let var25 = new class416();

        var25.method2171(1.0, 0.0, 0.0, var6);
        let var12 = class416.field3770;
        let var27 = new class416();

        var27.method2171(0.0, 1.0, 0.0, var7);
        let var14 = class416.field3770;
        let var13 = new class416();

        var13.method2171(0.0, 0.0, 1.0, var8);
        let var16 = class416.field3770;
        let var15 = new class416();

        var15.method2169(var13);
        var15.method2169(var25);
        var15.method2169(var27);
        let var18 = Matrix.field3775;
        let var17 = new Matrix();

        var17.method2178(var15);
        var1.method2175(var17);
        /*
        var25.method2170();
        var27.method2170();
        var13.method2170();
        var15.method2170();
        var17.method2172();
        */
    }


    method723(var1, var2, var3, var4) {
        let var5 = var3.method682(this.field1264);
        let var6 = var5[0];
        let var7 = var5[1];
        let var8 = var5[2];
        if (this.field1267[var2] != null) {
            let var9 = this.field1267[var2][3];
            let var10 = this.field1267[var2][4];
            let var11 = this.field1267[var2][5];
            if (var9 != null) {
                var6 = var9.method696(var4);
            }

            if (var10 != null) {
                var7 = var10.method696(var4);
            }

            if (var11 != null) {
                var8 = var11.method696(var4);
            }
        }

        var1.matrixVals[12] = var6;
        var1.matrixVals[13] = var7;
        var1.matrixVals[14] = var8;
    }

    method724(var1, var2, var3, var4) {
        let var5 = var3.method681(this.field1264);
        let var6 = var5[0];
        let var7 = var5[1];
        let var8 = var5[2];
        if (this.field1267[var2] != null) {
            let var9 = this.field1267[var2][6];
            let var10 = this.field1267[var2][7];
            let var11 = this.field1267[var2][8];
            if (var9 != null) {
                var6 = var9.method696(var4);
            }

            if (var10 != null) {
                var7 = var10.method696(var4);
            }

            if (var11 != null) {
                var8 = var11.method696(var4);
            }
        }

        let var14 = Matrix.field3775;
        let var15 = new Matrix();
        var15.scale(var6, var7, var8);
        var1.method2175(var15);
        var15.method2172();
    }
}

export default class FramesLoader {

    load(bytes, id, cache) {
        //console.log(id);
        let def = new FramesDefinition();
        def.id = id;
        let inview = new DataView(bytes.buffer);
        let dataview = new DataView(bytes.buffer);

        let framemapArchiveIndex = inview.readUint16();
        let length = inview.readUint8();


        let animFormat = dataview.readUint8();
        let skeletonId = dataview.readUint16();

        console.log(animFormat, skeletonId);
        if (animFormat == 1) { //new animmaya system

            return cache.getFile(IndexType.FRAMEMAPS.id, skeletonId).then((framemap) => {
                framemap = framemap.def;
                //console.log(framemap);

                dataview.readUint16();
                dataview.readUint16();
                def.field1264 = dataview.readUint8();
                let var3 = dataview.readUint16();
                def.field1267 = new Array(framemap.animayaSkeleton.bones.length);
                def.field1266 = new Array(framemap.count);
                let var4 = new Array(var3);

                let var5;
                let var7;
                let var16;
                for (var5 = 0; var5 < var3; ++var5) {
                    var7 = dataview.readUint8();
                    var16 = dataview.readShortSmart();
                    let var11 = dataview.readUint8();
                    //console.log(var16, var11);
                    /*
                    class127 var12 = (class127)class4.findEnumerated(class122.method688(), var11);
                    if (var12 == null) {
                       var12 = class127.field1244;
                    }
           
                    class125 var13 = new class125();
                    var13.method704(var1, var2);
                    var4[var5] = new class124(this, var13, var9, var12, var16);
                    int var14 = var9.method708();
                    class125[][] var15;
                    if (var9 == class126.field1229) {
                       var15 = this.field1267;
                    } else {
                       var15 = this.field1266;
                    }
           
                    if (var15[var16] == null) {
                       var15[var16] = new class125[var14];
                    }
           
                    if (var9 == class126.field1232) {
                       this.field1262 = true;
                    }
                    */
                }

                def.framemap = framemap;
                return def;
            });
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