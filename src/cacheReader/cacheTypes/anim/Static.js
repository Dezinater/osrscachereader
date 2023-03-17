export class AttackOption {
    static method590(var0, var1) {
        if (var0 != null && var0.method703() != 0) {
            if (var1 < var0.field1203[0].field1165) {
                return var0.field1201 == 0 ? var0.field1203[0].field1158 : class181.method922(var0, var1, true);
            } else if (var1 > var0.field1203[var0.method703() - 1].field1165) {
                return var0.field1214 == 0 ? var0.field1203[var0.method703() - 1].field1158 : class181.method922(var0, var1, false);
            } else if (var0.field1200) {
                return var0.field1203[0].field1158;
            } else {
                let var2 = var0.method702(var1);
                let var3 = false;
                let var4 = false;
                if (var2 == null) {
                    return 0.0;
                } else {
                    if (var2.field1161 == 0.0 && var2.field1162 == 0.0) {
                        var3 = true;
                    } else if (var2.field1161 == 3.4028234663852886e+38 && 3.4028234663852886e+38 == var2.field1162) {
                        var4 = true;
                    } else if (var2.field1163 != null) {
                        if (var0.field1215) {
                            let var5 = var2.field1165;
                            let var9 = var2.field1158;
                            let var6 = var2.field1161 * 0.33333334 + var5;
                            let var10 = var9 + var2.field1162 * 0.33333334;
                            let var8 = var2.field1163.field1165;
                            let var12 = var2.field1163.field1158;
                            let var7 = var8 - var2.field1163.field1159 * 0.33333334;
                            let var11 = var12 - var2.field1163.field1160 * 0.33333334;
                            if (var0.field1210) {
                                class145.method767(var0, var5, var6, var7, var8, var9, var10, var11, var12);
                            } else {
                                class136.method735(var0, var5, var6, var7, var8, var9, var10, var11, var12);
                            }

                            var0.field1215 = false;
                        }
                    } else {
                        var3 = true;
                    }

                    if (var3) {
                        return var2.field1158;
                    } else if (var4) {
                        return var2.field1165 != var1 && var2.field1163 != null ? var2.field1163.field1158 : var2.field1158;
                    } else {
                        return var0.field1210 ? Tiles.method453(var0, var1) : class467.method2360(var0, var1);
                    }
                }
            }
        } else {
            return 0.0;
        }
    }
}

export class class467 {
    static method2360(var0, var1) {
        if (var0 == null) {
            return 0.0;
        } else {
            let var2 = var1 - var0.field1207;
            return var0.field1202 + var2 * (var2 * (var2 * var0.field1223 + var0.field1208) + var0.field1209);
        }
    }
}

export class class181 {
    static method922(var0, var1, var2) {
        let var3 = 0.0;
        if (var0 != null && var0.method703() != 0) {
            let var4 = var0.field1203[0].field1165;
            let var5 = var0.field1203[var0.method703() - 1].field1165;
            let var6 = var5 - var4;
            if (0.0 == var6) {
                return var0.field1203[0].field1158;
            } else {
                let var7 = 0.0;
                if (var1 > var5) {
                    var7 = (var1 - var5) / var6;
                } else {
                    var7 = (var1 - var4) / var6;
                }

                let var8 = (var7);
                let var10 = Math.abs((float)(var7 - var8));
                let var11 = var10 * var6;
                var8 = Math.abs(var8 + 1.0);
                let var12 = var8 / 2.0;
                let var14 = (var12);
                var10 = (var12 - var14);
                let var16;
                let var17;
                if (var2) {
                    if (var0.field1201 == class125.field1190) {
                        if (var10 != 0.0) {
                            var11 += var4;
                        } else {
                            var11 = var5 - var11;
                        }
                    } else if (var0.field1201 != class125.field1189 && var0.field1201 != class125.field1188) {
                        if (var0.field1201 == class125.field1193) {
                            var11 = var4 - var1;
                            var16 = var0.field1203[0].field1159;
                            var17 = var0.field1203[0].field1160;
                            var3 = var0.field1203[0].field1158;
                            if (var16 != 0.0) {
                                var3 -= var11 * var17 / var16;
                            }

                            return var3;
                        }
                    } else {
                        var11 = var5 - var11;
                    }
                } else if (var0.field1214 == class125.field1190) {
                    if (0.0 != var10) {
                        var11 = var5 - var11;
                    } else {
                        var11 += var4;
                    }
                } else if (var0.field1214 != class125.field1189 && var0.field1214 != class125.field1188) {
                    if (var0.field1214 == class125.field1193) {
                        var11 = var1 - var5;
                        var16 = var0.field1203[var0.method703() - 1].field1161;
                        var17 = var0.field1203[var0.method703() - 1].field1162;
                        var3 = var0.field1203[var0.method703() - 1].field1158;
                        if (0.0 != var16) {
                            var3 += var11 * var17 / var16;
                        }

                        return var3;
                    }
                } else {
                    var11 += var4;
                }

                var3 = AttackOption.method590(var0, var11);
                let var18;
                if (var2 && var0.field1201 == class125.field1188) {
                    var18 = var0.field1203[var0.method703() - 1].field1158 - var0.field1203[0].field1158;
                    var3 = (var3 - var8 * var18);
                } else if (!var2 && var0.field1214 == class125.field1188) {
                    var18 = var0.field1203[var0.method703() - 1].field1158 - var0.field1203[0].field1158;
                    var3 = (var3 + var8 * var18);
                }

                return var3;
            }
        } else {
            return var3;
        }
    }
}

export class class145 {
    static method767(var0, var1, var2, var3, var4, var5, var6, var7, var8) {
        if (var0 != null) {
            let var9 = var4 - var1;
            if (0.0 != var9) {
                let var10 = var2 - var1;
                let var11 = var3 - var1;
                let var12 = [var10 / var9, var11 / var9];
                var0.field1221 = var12[0] == 0.33333334 && 0.6666667 == var12[1];
                let var13 = var12[0];
                let var14 = var12[1];
                if (var12[0] < 0.0) {
                    var12[0] = 0.0;
                }

                if (var12[1] > 1.0) {
                    var12[1] = 1.0;
                }

                let var15;
                if (var12[0] > 1.0 || var12[1] < -1.0) {
                    var12[1] = 1.0 - var12[1];
                    if (var12[0] < 0.0) {
                        var12[0] = 0.0;
                    }

                    if (var12[1] < 0.0) {
                        var12[1] = 0.0;
                    }

                    if (var12[0] > 1.0 || var12[1] > 1.0) {
                        var15 = (1.0 + var12[1] * (var12[1] - 2.0) + (var12[0] * (var12[1] + (var12[0] - 2.0))));
                        if (var15 + class123.field1167 > 0.0) {
                            Client.method384(var12);
                        }
                    }

                    var12[1] = 1.0 - var12[1];
                }

                let var10000;
                if (var13 != var12[0]) {
                    var10000 = var1 + var9 * var12[0];
                    if (0.0 != var13) {
                        var6 = var5 + var12[0] * (var6 - var5) / var13;
                    }
                }

                if (var12[1] != var14) {
                    var10000 = var1 + var12[1] * var9;
                    if (1.0 != var14) {
                        var7 = (var8 - (var8 - var7) * (1.0 - var12[1]) / (1.0 - var14));
                    }
                }

                var0.field1207 = var1;
                var0.field1206 = var4;
                var15 = var12[0];
                let var16 = var12[1];
                let var17 = var15 - 0.0;
                let var18 = var16 - var15;
                let var19 = 1.0 - var16;
                let var20 = var18 - var17;
                var0.field1202 = var19 - var18 - var20;
                var0.field1209 = var20 + var20 + var20;
                var0.field1208 = var17 + var17 + var17;
                var0.field1223 = 0.0;
                DesktopPlatformInfoProvider.method2241(var5, var6, var7, var8, var0);
            }
        }
    }

}

export class Client {
    method384(var0) {
        if (class123.field1167 + var0[0] < 1.3333334) {
            let var1 = var0[0] - 2.0;
            let var2 = var0[0] - 1.0;
            let var3 = Math.sqrt((double)(var1 * var1 - var2 * var2 * 4.0));
            let var4 = 0.5 * (var3 + -var1);
            if (var0[1] + class123.field1167 > var4) {
                var0[1] = var4 - class123.field1167;
            } else {
                var4 = (-var1 - var3) * 0.5;
                if (var0[1] < var4 + class123.field1167) {
                    var0[1] = var4 + class123.field1167;
                }
            }
        } else {
            var0[0] = 1.3333334 - class123.field1167;
            var0[1] = 0.33333334 - class123.field1167;
        }

    }
}

export class DesktopPlatformInfoProvider {
    static method2241(var0, var1, var2, var3, var4) {
        let var5 = var1 - var0;
        let var6 = var2 - var1;
        let var7 = var3 - var2;
        let var8 = var6 - var5;
        var4.field1222 = var7 - var6 - var8;
        var4.field1213 = var8 + var8 + var8;
        var4.field1212 = var5 + var5 + var5;
        var4.field1211 = var0;
    }
}

export class class136 {
    static method735(var0, var1, var2, var3, var4, var5, var6, var7, var8) {
        if (var0 != null) {
            var0.field1207 = var1;
            let var9 = var4 - var1;
            let var10 = var8 - var5;
            let var11 = var2 - var1;
            let var12 = 0.0;
            let var13 = 0.0;
            if (var11 != 0.0) {
                var12 = (var6 - var5) / var11;
            }

            var11 = var4 - var3;
            if (0.0 != var11) {
                var13 = (var8 - var7) / var11;
            }

            let var14 = 1.0 / (var9 * var9);
            let var15 = var9 * var12;
            let var16 = var13 * var9;
            var0.field1223 = (var16 + var15 - var10 - var10) * var14 / var9;
            var0.field1208 = (var10 + var10 + var10 - var15 - var15 - var16) * var14;
            var0.field1209 = var12;
            var0.field1202 = var5;
        }
    }
}

export class Tiles {
    static method453(var0, var1) {
        if (var0 == null) {
            return 0.0;
        } else {
            let var2;
            if (var0.field1207 == var1) {
                var2 = 0.0;
            } else if (var0.field1206 == var1) {
                var2 = 1.0;
            } else {
                var2 = (var1 - var0.field1207) / (var0.field1206 - var0.field1207);
            }

            let var3;
            if (var0.field1221) {
                var3 = var2;
            } else {
                class123.field1168[3] = var0.field1202;
                class123.field1168[2] = var0.field1209;
                class123.field1168[1] = var0.field1208;
                class123.field1168[0] = var0.field1223 - var2;
                class123.field1169[0] = 0.0;
                class123.field1169[1] = 0.0;
                class123.field1169[2] = 0.0;
                class123.field1169[3] = 0.0;
                class123.field1169[4] = 0.0;
                let var4 = class368.method1942(class123.field1168, 3, 0.0, true, 1.0, true, class123.field1169);
                if (var4 == 1) {
                    var3 = class123.field1169[0];
                } else {
                    var3 = 0.0;
                }
            }

            return var0.field1211 + (var0.field1212 + (var3 * var0.field1222 + var0.field1213) * var3) * var3;
        }
    }
}

export class class368 {
    static method1942(var0, var1, var2, var3, var4, var5, var6) {
        let var7 = 0.0;

        for (let var8 = 0; var8 < var1 + 1; ++var8) {
            var7 += Math.abs(var0[var8]);
        }

        let var24 = (Math.abs(var2) + Math.abs(var4)) * (float)(var1 + 1) * class123.field1167;
        if (var7 <= var24) {
            return -1;
        } else {
            let var9 = new Array(var1 + 1);

            let var10;
            for (var10 = 0; var10 < var1 + 1; ++var10) {
                var9[var10] = var0[var10] * (1.0 / var7);
            }

            while (Math.abs(var9[var1]) < var24) {
                --var1;
            }

            var10 = 0;
            if (var1 == 0) {
                return var10;
            } else if (var1 == 1) {
                var6[0] = -var9[0] / var9[1];
                let var11 = var3 ? var2 < var24 + var6[0] : var2 < var6[0] - var24;
                let var12 = var5 ? var4 > var6[0] - var24 : var4 > var24 + var6[0];
                var10 = var11 && var12 ? 1 : 0;
                if (var10 > 0) {
                    if (var3 && var6[0] < var2) {
                        var6[0] = var2;
                    } else if (var5 && var6[0] > var4) {
                        var6[0] = var4;
                    }
                }

                return var10;
            } else {
                let var21 = new class423(var9, var1);
                let var22 = new Array(var1 + 1);

                for (let var13 = 1; var13 <= var1; ++var13) {
                    var22[var13 - 1] = var13 * var9[var13];
                }

                let var23 = new Array(var1 + 1);
                let var14 = this.method1942(var22, var1 - 1, var2, false, var4, false, var23);
                if (var14 == -1) {
                    return 0;
                } else {
                    let var15 = false;
                    let var17 = 0.0;
                    let var18 = 0.0;
                    let var19 = 0.0;

                    for (let var20 = 0; var20 <= var14; ++var20) {
                        if (var10 > var1) {
                            return var10;
                        }

                        let var16;
                        if (var20 == 0) {
                            var16 = var2;
                            var18 = class102.method598(var9, var1, var2);
                            if (Math.abs(var18) <= var24 && var3) {
                                var6[var10++] = var2;
                            }
                        } else {
                            var16 = var19;
                            var18 = var17;
                        }

                        if (var20 == var14) {
                            var19 = var4;
                            var15 = false;
                        } else {
                            var19 = var23[var20];
                        }

                        var17 = class102.method598(var9, var1, var19);
                        if (var15) {
                            var15 = false;
                        } else if (Math.abs(var17) < var24) {
                            if (var14 != var20 || var5) {
                                var6[var10++] = var19;
                                var15 = true;
                            }
                        } else if (var18 < 0.0 && var17 > 0.0 || var18 > 0.0 && var17 < 0.0) {
                            var6[var10++] = class88.method478(var21, var16, var19, 0.0);
                            if (var10 > 1 && var6[var10 - 2] >= var6[var10 - 1] - var24) {
                                var6[var10 - 2] = (var6[var10 - 2] + var6[var10 - 1]) * 0.5;
                                --var10;
                            }
                        }
                    }

                    return var10;
                }
            }
        }
    }
}

export class class102 {
    static method598(var0, var1, var2) {
        let var3 = var0[var1];

        for (let var4 = var1 - 1; var4 >= 0; --var4) {
            var3 = var0[var4] + var3 * var2;
        }

        return var3;
    }
}

export class class188 {
    static method478(var0, var1, var2, var3) {
        let var4 = class102.method598(var0.field3760, var0.field3761, var1);
        if (Math.abs(var4) < class123.field1167) {
            return var1;
        } else {
            let var5 = class102.method598(var0.field3760, var0.field3761, var2);
            if (Math.abs(var5) < class123.field1167) {
                return var2;
            } else {
                let var6 = 0.0;
                let var7 = 0.0;
                let var8 = 0.0;
                let var13 = 0.0;
                let var14 = true;
                let var15 = false;

                do {
                    var15 = false;
                    if (var14) {
                        var6 = var1;
                        var13 = var4;
                        var7 = var2 - var1;
                        var8 = var7;
                        var14 = false;
                    }

                    if (Math.abs(var13) < Math.abs(var5)) {
                        var1 = var2;
                        var2 = var6;
                        var6 = var1;
                        var4 = var5;
                        var5 = var13;
                        var13 = var4;
                    }

                    let var16 = class123.field1166 * Math.abs(var2) + var3 * 0.5;
                    let var17 = (var6 - var2) * 0.5;
                    let var18 = Math.abs(var17) > var16 && 0.0 != var5;
                    if (var18) {
                        if (Math.abs(var8) >= var16 && Math.abs(var4) > Math.abs(var5)) {
                            let var12 = var5 / var4;
                            let var9;
                            let var10;
                            if (var1 == var6) {
                                var9 = var17 * 2.0 * var12;
                                var10 = 1.0 - var12;
                            } else {
                                var10 = var4 / var13;
                                let var11 = var5 / var13;
                                var9 = (var17 * 2.0 * var10 * (var10 - var11) - (var2 - var1) * (var11 - 1.0)) * var12;
                                var10 = (var10 - 1.0) * (var11 - 1.0) * (var12 - 1.0);
                            }

                            if (var9 > 0.0) {
                                var10 = -var10;
                            } else {
                                var9 = -var9;
                            }

                            var12 = var8;
                            var8 = var7;
                            if (var9 * 2.0 < var10 * var17 * 3.0 - Math.abs(var16 * var10) && var9 < Math.abs(var10 * var12 * 0.5)) {
                                var7 = var9 / var10;
                            } else {
                                var7 = var17;
                                var8 = var17;
                            }
                        } else {
                            var7 = var17;
                            var8 = var17;
                        }

                        var1 = var2;
                        var4 = var5;
                        if (Math.abs(var7) > var16) {
                            var2 += var7;
                        } else if (var17 > 0.0) {
                            var2 += var16;
                        } else {
                            var2 -= var16;
                        }

                        var5 = class102.method598(var0.field3760, var0.field3761, var2);
                        if ((var5 * (var13 / Math.abs(var13))) > 0.0) {
                            var14 = true;
                            var15 = true;
                        } else {
                            var15 = true;
                        }
                    }
                } while (var15);

                return var2;
            }
        }
    }
}