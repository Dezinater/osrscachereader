import MusicPatchNode2 from "./MusicPatchNode2.js";
export default class MusicPatch {
    constructor(var1) {
        let var2 = new DataView(var1);
      
        let var3;
        for (var3 = 0; var2.array[var3 + var2.pos] != 0; ++var3) {
            ;
        }

        let var4 = new Array(var3);
      
        let var5;
        for (var5 = 0; var5 < var3; ++var5) {
            var4[var5] = var2.readByte();
        }

        ++var2.pos;
        ++var3;
        var5 = var2.pos;
        var2.pos += var3;
      
        let var6;
        for (var6 = 0; var2.array[var6 + var2.pos] != 0; ++var6) {
            ;
        }

        let var7 = new Array(var6);
      
        let var8;
        for (var8 = 0; var8 < var6; ++var8) {
            var7[var8] = var2.readByte();
        }

        ++var2.pos;
        ++var6;
        var8 = var2.pos;
        var2.pos += var6;
      
        let var9;
        for (var9 = 0; var2.array[var9 + var2.pos] != 0; ++var9) {
            ;
        }

        let var10 = new Array(var9);

        for (let var11 = 0; var11 < var9; ++var11) {
            var10[var11] = var2.readByte();
        }

        ++var2.pos;
        ++var9;
        let var38 = new Array(var9);
        let var12;
        let var14;
        if (var9 > 1) {
            var38[1] = 1;
            let var13 = 1;
            var12 = 2;

            for (var14 = 2; var14 < var9; ++var14) {
                let var15 = var2.readUnsignedByte();
                if (var15 == 0) {
                    var13 = var12++;
                } else {
                    if (var15 <= var13) {
                        --var15;
                    }

                    var13 = var15;
                }

                var38[var14] = var13;
            }
        } else {
            var12 = var9;
        }

        let var39 = new Array(var12);
      
        let var40;
        for (var14 = 0; var14 < var39.length; ++var14) {
            var40 = var39[var14] = new MusicPatchNode2();
            let var16 = var2.readUnsignedByte();
            if (var16 > 0) {
                var40.field2718 = new byte[var16 * 2];
            }

            var16 = var2.readUnsignedByte();
            if (var16 > 0) {
                var40.field2717 = new byte[var16 * 2 + 2];
                var40.field2717[1] = 64;
            }
        }

        var14 = var2.readUnsignedByte();
        let var47 = var14 > 0 ? new Array(var14 * 2) : null;
        var14 = var2.readUnsignedByte();
        let var41 = var14 > 0 ? new Array(var14 * 2) : null;
      
        let var17;
        for (var17 = 0; var2.array[var17 + var2.pos] != 0; ++var17) {
            ;
        }

        let var18 = new Array(var17);
      
        let var19;
        for (var19 = 0; var19 < var17; ++var19) {
            var18[var19] = var2.readByte();
        }

        ++var2.pos;
        ++var17;
        var19 = 0;
      
        let var20;
        for (var20 = 0; var20 < 128; ++var20) {
            var19 += var2.readUnsignedByte();
            this.field2771[var20] = var19;
        }

        var19 = 0;

        for (var20 = 0; var20 < 128; ++var20) {
            var19 += var2.readUnsignedByte();
            this.field2771[var20] = (this.field2771[var20] + (var19 << 8));
        }

        var20 = 0;
        let var21 = 0;
        let var22 = 0;
      
        let var23;
        for (var23 = 0; var23 < 128; ++var23) {
            if (var20 == 0) {
                if (var21 < var18.length) {
                    var20 = var18[var21++];
                } else {
                    var20 = -1;
                }

                var22 = var2.readVarInt();
            }

            this.field2771[var23] = (short)(this.field2771[var23] + ((var22 - 1 & 2) << 14));
            this.field2777[var23] = var22;
            --var20;
        }

        var20 = 0;
        var21 = 0;
        var23 = 0;
      
        let var24;
        for (var24 = 0; var24 < 128; ++var24) {
            if (this.field2777[var24] != 0) {
                if (var20 == 0) {
                    if (var21 < var4.length) {
                        var20 = var4[var21++];
                    } else {
                        var20 = -1;
                    }

                    var23 = var2.array[var5++] - 1;
                }

                this.field2776[var24] = var23;
                --var20;
            }
        }

        var20 = 0;
        var21 = 0;
        var24 = 0;

        for (let var25 = 0; var25 < 128; ++var25) {
            if (this.field2777[var25] != 0) {
                if (var20 == 0) {
                    if (var21 < var7.length) {
                        var20 = var7[var21++];
                    } else {
                        var20 = -1;
                    }

                    var24 = var2.array[var8++] + 16 << 2;
                }

                this.field2774[var25] = var24;
                --var20;
            }
        }

        var20 = 0;
        var21 = 0;
        let var42 = null;
      
        let var26;
        for (var26 = 0; var26 < 128; ++var26) {
            if (this.field2777[var26] != 0) {
                if (var20 == 0) {
                    var42 = var39[var38[var21]];
                    if (var21 < var10.length) {
                        var20 = var10[var21++];
                    } else {
                        var20 = -1;
                    }
                }

                this.field2775[var26] = var42;
                --var20;
            }
        }

        var20 = 0;
        var21 = 0;
        var26 = 0;
      
        let var27;
        for (var27 = 0; var27 < 128; ++var27) {
            if (var20 == 0) {
                if (var21 < var18.length) {
                    var20 = var18[var21++];
                } else {
                    var20 = -1;
                }

                if (this.field2777[var27] > 0) {
                    var26 = var2.readUnsignedByte() + 1;
                }
            }

            this.field2773[var27] = var26;
            --var20;
        }

        this.field2772 = var2.readUnsignedByte() + 1;
      
        let var28;
        let var29;
        for (var27 = 0; var27 < var12; ++var27) {
            var28 = var39[var27];
            if (var28.field2718 != null) {
                for (var29 = 1; var29 < var28.field2718.length; var29 += 2) {
                    var28.field2718[var29] = var2.readByte();
                }
            }

            if (var28.field2717 != null) {
                for (var29 = 3; var29 < var28.field2717.length - 2; var29 += 2) {
                    var28.field2717[var29] = var2.readByte();
                }
            }
        }

        if (var47 != null) {
            for (var27 = 1; var27 < var47.length; var27 += 2) {
                var47[var27] = var2.readByte();
            }
        }

        if (var41 != null) {
            for (var27 = 1; var27 < var41.length; var27 += 2) {
                var41[var27] = var2.readByte();
            }
        }

        for (var27 = 0; var27 < var12; ++var27) {
            var28 = var39[var27];
            if (var28.field2717 != null) {
                var19 = 0;

                for (var29 = 2; var29 < var28.field2717.length; var29 += 2) {
                    var19 = var19 + 1 + var2.readUnsignedByte();
                    var28.field2717[var29] = var19;
                }
            }
        }

        for (var27 = 0; var27 < var12; ++var27) {
            var28 = var39[var27];
            if (var28.field2718 != null) {
                var19 = 0;

                for (var29 = 2; var29 < var28.field2718.length; var29 += 2) {
                    var19 = var19 + 1 + var2.readUnsignedByte();
                    var28.field2718[var29] = var19;
                }
            }
        }
      
            let var30;
            let var32;
            let var33;
            let var34;
            let var35;
            let var36;
            let var44;
            let var46;
        if (var47 != null) {
            var19 = var2.readUnsignedByte();
            var47[0] = var19;

            for (var27 = 2; var27 < var47.length; var27 += 2) {
                var19 = var19 + 1 + var2.readUnsignedByte();
                var47[var27] = var19;
            }

            var46 = var47[0];
               let var43 = var47[1];

            for (var29 = 0; var29 < var46; ++var29) {
                this.field2773[var29] = (byte)(var43 * this.field2773[var29] + 32 >> 6);
            }

            for (var29 = 2; var29 < var47.length; var29 += 2) {
                var30 = var47[var29];
                  let var31 = var47[var29 + 1];
                var32 = var43 * (var30 - var46) + (var30 - var46) / 2;

                for (var33 = var46; var33 < var30; ++var33) {
                    var35 = var30 - var46;
                    var36 = var32 >>> 31;
                    var34 = (var32 + var36) / var35 - var36;
                    this.field2773[var33] = (byte)(var34 * this.field2773[var33] + 32 >> 6);
                    var32 += var31 - var43;
                }

                var46 = var30;
                var43 = var31;
            }

            for (var44 = var46; var44 < 128; ++var44) {
                this.field2773[var44] = (byte)(var43 * this.field2773[var44] + 32 >> 6);
            }

            var40 = null;
        }

        if (var41 != null) {
            var19 = var2.readUnsignedByte();
            var41[0] = var19;

            for (var27 = 2; var27 < var41.length; var27 += 2) {
                var19 = var19 + 1 + var2.readUnsignedByte();
                var41[var27] = var19;
            }

            var46 = var41[0];
               let var49 = var41[1] << 1;

            for (var29 = 0; var29 < var46; ++var29) {
                var44 = var49 + (this.field2774[var29] & 255);
                if (var44 < 0) {
                    var44 = 0;
                }

                if (var44 > 128) {
                    var44 = 128;
                }

                this.field2774[var29] = var44;
            }
      
               let var45;
            for (var29 = 2; var29 < var41.length; var29 += 2) {
                var30 = var41[var29];
                var45 = var41[var29 + 1] << 1;
                var32 = var49 * (var30 - var46) + (var30 - var46) / 2;

                for (var33 = var46; var33 < var30; ++var33) {
                    var35 = var30 - var46;
                    var36 = var32 >>> 31;
                    var34 = (var32 + var36) / var35 - var36;
                     let var37 = var34 + (this.field2774[var33] & 255);
                    if (var37 < 0) {
                        var37 = 0;
                    }

                    if (var37 > 128) {
                        var37 = 128;
                    }

                    this.field2774[var33] = var37;
                    var32 += var45 - var49;
                }

                var46 = var30;
                var49 = var45;
            }

            for (var44 = var46; var44 < 128; ++var44) {
                var45 = var49 + (this.field2774[var44] & 255);
                if (var45 < 0) {
                    var45 = 0;
                }

                if (var45 > 128) {
                    var45 = 128;
                }

                this.field2774[var44] = var45;
            }
        }

        for (var27 = 0; var27 < var12; ++var27) {
            var39[var27].field2719 = var2.readUnsignedByte();
        }

        for (var27 = 0; var27 < var12; ++var27) {
            var28 = var39[var27];
            if (var28.field2718 != null) {
                var28.field2720 = var2.readUnsignedByte();
            }

            if (var28.field2717 != null) {
                var28.field2725 = var2.readUnsignedByte();
            }

            if (var28.field2719 > 0) {
                var28.field2722 = var2.readUnsignedByte();
            }
        }

        for (var27 = 0; var27 < var12; ++var27) {
            var39[var27].field2724 = var2.readUnsignedByte();
        }

        for (var27 = 0; var27 < var12; ++var27) {
            var28 = var39[var27];
            if (var28.field2724 > 0) {
                var28.field2723 = var2.readUnsignedByte();
            }
        }

        for (var27 = 0; var27 < var12; ++var27) {
            var28 = var39[var27];
            if (var28.field2723 > 0) {
                var28.field2721 = var2.readUnsignedByte();
            }
        }

    }

    async method1663(var1, var2, var3) {
        let var4 = true;
        let var5 = 0;
        let var6 = null;
  
        for(let var7 = 0; var7 < 128; ++var7) {
           if (var2 == null || var2[var7] != 0) {
              let var8 = this.field2777[var7];
              if (var8 != 0) {
                 if (var8 != var5) {
                    var5 = var8--;
                    if ((var8 & 1) == 0) {
                       var6 = await var1.getSoundEffect(var8 >> 2, var3);
                    } else {
                       var6 = await var1.getMusicSample(var8 >> 2, var3);
                    }
  
                    if (var6 == null) {
                       var4 = false;
                    }
                 }
  
                 if (var6 != null) {
                    this.rawSounds[var7] = var6;
                    this.field2777[var7] = 0;
                 }
              }
           }
        }
  
        return var4;
     }
  
}