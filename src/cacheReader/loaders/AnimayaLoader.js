import { FramesDefinition } from "./FramesLoader.js";
import IndexType from "../cacheTypes/IndexType.js";
import { AttackOption } from "../cacheTypes/anim/Static.js";

class class122 {
    field1165;
    field1158;
    field1159 = 3.4028234663852886e38; //Java Float MAX_VALUE
    field1160 = 3.4028234663852886e38;
    field1161 = 3.4028234663852886e38;
    field1162 = 3.4028234663852886e38;

    method673(var1, var2) {
        this.field1165 = var1.readInt16();
        this.field1158 = var1.readFloat32();
        this.field1159 = var1.readFloat32();
        this.field1160 = var1.readFloat32();
        this.field1161 = var1.readFloat32();
        this.field1162 = var1.readFloat32();
    }
}

class class127 {
    field1215 = true;
    field1205 = 0;

    method698(var1, var2) {
        let var3 = var1.readUint16();
        var1.readUint8();
        this.field1201 = var1.readUint8(); //rsordinal
        this.field1214 = var1.readUint8(); //rsordinal
        this.field1210 = var1.readUint8() != 0;
        this.field1203 = new Array(var3);
        let var4 = null;

        for (let var5 = 0; var5 < var3; ++var5) {
            let var6 = new class122();
            var6.method673(var1, var2);
            this.field1203[var5] = var6;
            if (var4 != null) {
                var4.field1163 = var6;
            }

            var4 = var6;
        }

        return var3;
    }

    method702(var1) {
        let var2 = this.method706(var1);
        return var2 >= 0 && var2 < this.field1203.length ? this.field1203[var2] : null;
    }

    method705() {
        this.field1218 = this.field1203[0].field1165;
        this.field1219 = this.field1203[this.method703() - 1].field1165;
        this.field1217 = new Array(this.method701() + 1).fill(0);

        for (let var1 = this.method704(); var1 <= this.method700(); ++var1) {
            this.field1217[var1 - this.method704()] = AttackOption.method590(this, var1);
        }

        this.field1203 = null;
        this.field1220 = AttackOption.method590(this, this.method704() - 1);
        this.field1216 = AttackOption.method590(this, this.method700() + 1);
    }

    method699(var1) {
        if (var1 < this.method704()) {
            return this.field1220;
        } else {
            return var1 > this.method700() ? this.field1216 : this.field1217[var1 - this.method704()];
        }
    }

    method706(var1) {
        if (
            this.field1205 < 0 ||
            this.field1203[this.field1205].field1165 > var1 ||
            (this.field1203[this.field1205].field1163 != null &&
                this.field1203[this.field1205].field1163.field1165 <= var1)
        ) {
            if (var1 >= this.method704() && var1 <= this.method700()) {
                let var2 = this.method703();
                let var3 = this.field1205;
                if (var2 > 0) {
                    let var4 = 0;
                    let var5 = var2 - 1;

                    do {
                        let var6 = (var4 + var5) >> 1;
                        if (var1 < this.field1203[var6].field1165) {
                            if (var1 > this.field1203[var6 - 1].field1165) {
                                var3 = var6 - 1;
                                break;
                            }

                            var5 = var6 - 1;
                        } else {
                            if (var1 <= this.field1203[var6].field1165) {
                                var3 = var6;
                                break;
                            }

                            if (var1 < this.field1203[var6 + 1].field1165) {
                                var3 = var6;
                                break;
                            }

                            var4 = var6 + 1;
                        }
                    } while (var4 <= var5);
                }

                if (var3 != this.field1205) {
                    this.field1205 = var3;
                    this.field1215 = true;
                }

                return this.field1205;
            } else {
                return -1;
            }
        } else {
            return this.field1205;
        }
    }

    method700() {
        return this.field1219;
    }

    method701() {
        return this.method700() - this.method704();
    }

    method703() {
        return this.field1203 == null ? 0 : this.field1203.length;
    }

    method704() {
        return this.field1218;
    }
}

/**
 * @class AnimayaDefinition
 * @category Definitions
 * @hideconstructor
 */
export class AnimayaDefinition {
    /** @type {Byte} */
    version;

    /**
     * Which framemap to load the skeleton info from
     * @type {boolean}
     */
    skeletonId;

    /**
     * Used for something related to matricies, translation and rotation
     * @type {Byte}
     */
    field1257;

    /**
     * Something to do with bones
     * @type {Array<number>}
     */
    field1265;

    /** @type {Array<number>} */
    field1258;

    /** @type {boolean} */
    field1259;
}

export class class129 {
    static values = [
        [0, 0, null, -1, -1],
        [1, 1, null, 0, 2],
        [2, 2, null, 1, 2],
        [3, 3, null, 2, 2],
        [4, 4, null, 3, 1],
        [5, 5, null, 4, 1],
        [6, 6, null, 5, 1],
        [7, 7, null, 6, 3],
        [8, 8, null, 7, 3],
        [9, 9, null, 8, 3],
        [10, 10, null, 0, 7],
        [11, 11, null, 1, 7],
        [12, 12, null, 2, 7],
        [13, 13, null, 3, 7],
        [14, 14, null, 4, 7],
        [15, 15, null, 5, 7],
        [16, 16, null, 0, 5],
    ];
    static findEnumerated(val) {
        let foundValue = this.values.find((x) => x[1] == val);
        if (foundValue == undefined) {
            foundValue = this.values[0];
        }

        return new this(foundValue[0], foundValue[1], foundValue[2], foundValue[3], foundValue[5]);
    }

    constructor(var1, var2, var3, var4, var5) {
        this.field1253 = var1;
        this.field1251 = var2;
        this.field1252 = var4;
    }

    method711() {
        return this.field1252;
    }
}

export class class128 {
    static values = [
        [0, 0, null, 0],
        [1, 1, null, 9],
        [2, 2, null, 3],
        [3, 3, null, 6],
        [4, 4, null, 1],
        [5, 5, null, 3],
    ];
    static findEnumerated(val) {
        let foundValue = this.values.find((x) => x[1] == val);
        if (foundValue == undefined) {
            foundValue = this.values[0];
        }

        return new this(foundValue[0], foundValue[1], foundValue[2], foundValue[3], foundValue[5]);
    }

    constructor(var1, var2, var3, var4) {
        this.field1230 = var1;
        this.field1224 = var2;
        this.field1232 = var4;
    }

    method707() {
        return this.field1232;
    }
}

export default class AnimayaLoader {
    load(def, bytes, cache, options) {
        let dataview = new DataView(bytes.buffer);

        def.version = dataview.readUint8();
        def.skeletonId = dataview.readUint16();
        if (options.earlyStop) {
            return def;
        }
        //console.log(version, skeletonId, "TEST");
        return cache.getFile(IndexType.FRAMEMAPS.id, def.skeletonId, 0, { cacheResults: true }).then((framemap) => {
            framemap = framemap.def;

            dataview.readUint16();
            dataview.readUint16();
            def.field1257 = dataview.readUint8();
            let var3 = dataview.readUint16();
            def.field1265 = new Array(framemap.animayaSkeleton.bones.length);
            def.field1258 = new Array(framemap.length);
            let var4 = new Array(var3);

            let var5;
            let var7;
            let tasks = []; //osrs uses some pool or something
            for (var5 = 0; var5 < var3; ++var5) {
                let var6 = class128.findEnumerated(dataview.readUint8());
                var7 = dataview.readShortSmart();
                let var8 = class129.findEnumerated(dataview.readUint8());

                let var9 = new class127();
                var9.method698(dataview, def.version);
                let var10 = var6.method707();

                let var11;

                if (var6.field1230 == 1) {
                    // var6 == class128.field1234
                    var11 = def.field1265;
                } else {
                    var11 = def.field1258;
                }

                if (var11[var7] == null) {
                    var11[var7] = new Array(var10);
                }

                if (var6.field1230 == 4) {
                    // var6 == class128.field1228
                    def.field1259 = true;
                }

                tasks.push({ var9, var6, var8, var7 });
            }

            tasks.forEach((task) => {
                task.var9.method705();

                let var1;
                if (task.var6.field1230 == 1) {
                    //var8 == class128.field1234
                    var1 = def.field1265;
                } else {
                    var1 = def.field1258;
                }

                var1[task.var7][task.var8.method711()] = task.var9;
            });
            for (var5 = 0; var5 < var3; ++var5) {}

            def.framemap = framemap;
            return def;
        });
    }
}
