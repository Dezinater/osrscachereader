export class FramemapDefinition {

}

class AnimayaSkeleton {
    constructor(var1, bonesCount) {
        this.bones = new Array(bonesCount);
        this.field1981 = var1.readUint8();

        for (let i = 0; i < this.bones.length; ++i) {
            this.bones[i] = new Bone(this.field1981, var1, false);
        }

        this.attachBones();
    }

    attachBones() {
        let bones = this.bones;

        for (let i = 0; i < bones.length; ++i) {
            let bone = bones[i];
            if (bone.id >= 0) {
                bone.childBone = this.bones[bone.id];
            }
        }
    }

    getBone(index) {
        return index >= this.bones.length ? null : this.bones[index];
    }
}

class Bone {
    constructor(size, buffer, var3) {
        this.field1179 = true;
        this.field1180 = new Matrix();
        this.field1186 = true;
        this.field1187 = new Matrix()
        this.field1189 = new Matrix();
        this.id = buffer.readInt16();
        this.field1182 = new Array(size);
        this.field1183 = new Array(size);
        this.field1188 = new Array(size);
        this.field1181 = new Array(size);

        for (let var4 = 0; var4 < size; ++var4) {
            this.field1182[var4] = new Matrix(buffer, var3);

            this.field1181[var4] = new Array(3);
            this.field1181[var4][0] = buffer.readFloat32();
            this.field1181[var4][1] = buffer.readFloat32();
            this.field1181[var4][2] = buffer.readFloat32();
        }
        this.method683();
    }

    method677() {
        return this.field1189;
    }

    method678(var1) {
        if (this.field1179) {
            this.field1180.copy(this.method685(var1));
            this.field1180.method2175(this.method680());
            this.field1179 = false;
        }

        return this.field1180;
    }

    method680() {
        if (this.field1186) {
            this.field1187.copy(this.method677());
            if (this.field1192 != null) {
                this.field1187.method2175(this.field1192.method680());
            }

            this.field1186 = false;
        }

        return this.field1187;
    }

    method683() {
        this.field1190 = new Array(this.field1182.length).fill().map(x => new Array(3));
        this.field1191 = new Array(this.field1182.length).fill().map(x => new Array(3));
        this.field1185 = new Array(this.field1182.length).fill().map(x => new Array(3));
        let var2 = Matrix.field3775;
        let var1;
        if (Matrix.field3777 == 0) {
            var1 = new Matrix();
        } else {
            Matrix.field3775[--Matrix.field3777].identity();
            var1 = Matrix.field3775[Matrix.field3777];
        }

        let var7 = var1;

        for (let var5 = 0; var5 < this.field1182.length; ++var5) {
            let var4 = this.field1182[var5];
            var7.copy(var4);
            var7.method2181();
            this.field1190[var5] = var7.method2174();
            this.field1191[var5][0] = var4.matrixVals[12];
            this.field1191[var5][1] = var4.matrixVals[13];
            this.field1191[var5][2] = var4.matrixVals[14];
            this.field1185[var5] = var4.method2183();
        }

        var7.method2172();
    }

    method675(var1) {
        return this.field1182[var1];
    }

    method684(var1) {
        if (this.field1183[var1] == null) {
            this.field1183[var1] = new Matrix(this.method675(var1));
            if (this.field1192 != null) {
                this.field1183[var1].method2175(this.field1192.method684(var1));
            } else {
                this.field1183[var1].method2175(Matrix.field3779);
            }
        }

        return this.field1183[var1];
    }

    method685(var1) {
        if (this.field1188[var1] == null || this.field1188[var1] == undefined) {
            this.field1188[var1] = new Matrix(this.method684(var1));
            this.field1188[var1].method2181();
        }

        return this.field1188[var1];
    }
}
class class415 {
    constructor(var1, var2, var3) {
        this.field3768 = var1;
        this.field3767 = var2;
        this.field3766 = var3;
    }

    method2166() {
        return Math.sqrt(this.field3766 * this.field3766 + this.field3767 * this.field3767 + this.field3768 * this.field3768);
    }
}

export class Matrix {
    static field3775 = new Array(0);
    static field3777 = 0;
    static field3779 = new Matrix();

    constructor(var1, var2) {
        this.matrixVals = new Array(16);
        if (var1 == undefined && var2 == undefined) {
            this.identity();
            return;
        }

        if (var2 == undefined) {
            this.copy(var1);
            return;
        }

        if (var2) {
            var3 = new class418();
            let var6 = var1.readInt16();
            var6 &= 16383;
            let var5 = (6.283185307179586 * (var6 / 16384.0));
            var3.method2189(var5);
            let var9 = var1.readInt16();
            var9 &= 16383;
            let var8 = (6.283185307179586 * (var9 / 16384.0));
            var3.method2192(var8);
            let var12 = var1.readInt16();
            var12 &= 16383;
            let var11 = (var12 / 16384.0) * 6.283185307179586;
            var3.method2190(var11);
            var3.method2191(var1.readInt16(), var1.readInt16(), var1.readInt16());
            this.method2179(var3);
        } else {
            for (let var13 = 0; var13 < 16; ++var13) {
                this.matrixVals[var13] = var1.readFloat32();
            }
        }
    }

    add(otherMatrix) {
        for (let var2 = 0; var2 < this.matrixVals.length; ++var2) {
            this.matrixVals[var2] += otherMatrix.matrixVals[var2];
        }
    }

    scaleUniform(var1) {
        this.scale(var1, var1, var1);
    }

    scale(var1, var2, var3) {
        this.identity();
        this.matrixVals[0] = var1;
        this.matrixVals[5] = var2;
        this.matrixVals[10] = var3;
    }

    method2172() {
        if (this.field3777 < this.field3776 - 1) {
            this.field3775[++this.field3777 - 1] = this;
        }
    }

    method2183() {
        let var1 = new Array(3);
        let var2 = new class415(this.matrixVals[0], this.matrixVals[1], this.matrixVals[2]);
        let var3 = new class415(this.matrixVals[4], this.matrixVals[5], this.matrixVals[6]);
        let var4 = new class415(this.matrixVals[8], this.matrixVals[9], this.matrixVals[10]);
        var1[0] = var2.method2166();
        var1[1] = var3.method2166();
        var1[2] = var4.method2166();
        return var1;
    }

    copy(otherMatrix) {
        if (otherMatrix == undefined) {
            debugger;
        }
        for (let i = 0; i < 16; i++) {
            this.matrixVals[i] = otherMatrix.matrixVals[i];
        }
    }

    identity() {
        this.matrixVals = new Array(16);
        this.matrixVals[0] = 1.0;
        this.matrixVals[1] = 0.0;
        this.matrixVals[2] = 0.0;
        this.matrixVals[3] = 0.0;
        this.matrixVals[4] = 0.0;
        this.matrixVals[5] = 1.0;
        this.matrixVals[6] = 0.0;
        this.matrixVals[7] = 0.0;
        this.matrixVals[8] = 0.0;
        this.matrixVals[9] = 0.0;
        this.matrixVals[10] = 1.0;
        this.matrixVals[11] = 0.0;
        this.matrixVals[12] = 0.0;
        this.matrixVals[13] = 0.0;
        this.matrixVals[14] = 0.0;
        this.matrixVals[15] = 1.0;
    }

    zero() {
        this.matrixVals[0] = 0.0;
        this.matrixVals[1] = 0.0;
        this.matrixVals[2] = 0.0;
        this.matrixVals[3] = 0.0;
        this.matrixVals[4] = 0.0;
        this.matrixVals[5] = 0.0;
        this.matrixVals[6] = 0.0;
        this.matrixVals[7] = 0.0;
        this.matrixVals[8] = 0.0;
        this.matrixVals[9] = 0.0;
        this.matrixVals[10] = 0.0;
        this.matrixVals[11] = 0.0;
        this.matrixVals[12] = 0.0;
        this.matrixVals[13] = 0.0;
        this.matrixVals[14] = 0.0;
        this.matrixVals[15] = 0.0;
    }

    method2175(var1) {
        if (var1 == undefined) {
            debugger;
        }
        let var2 = var1.matrixVals[0] * this.matrixVals[0] + var1.matrixVals[4] * this.matrixVals[1] + var1.matrixVals[8] * this.matrixVals[2] + var1.matrixVals[12] * this.matrixVals[3];
        let var3 = this.matrixVals[3] * var1.matrixVals[13] + this.matrixVals[1] * var1.matrixVals[5] + this.matrixVals[0] * var1.matrixVals[1] + var1.matrixVals[9] * this.matrixVals[2];
        let var4 = this.matrixVals[3] * var1.matrixVals[14] + var1.matrixVals[2] * this.matrixVals[0] + var1.matrixVals[6] * this.matrixVals[1] + this.matrixVals[2] * var1.matrixVals[10];
        let var5 = this.matrixVals[3] * var1.matrixVals[15] + this.matrixVals[2] * var1.matrixVals[11] + this.matrixVals[0] * var1.matrixVals[3] + var1.matrixVals[7] * this.matrixVals[1];
        let var6 = this.matrixVals[7] * var1.matrixVals[12] + this.matrixVals[6] * var1.matrixVals[8] + var1.matrixVals[0] * this.matrixVals[4] + this.matrixVals[5] * var1.matrixVals[4];
        let var7 = this.matrixVals[5] * var1.matrixVals[5] + this.matrixVals[4] * var1.matrixVals[1] + var1.matrixVals[9] * this.matrixVals[6] + this.matrixVals[7] * var1.matrixVals[13];
        let var8 = var1.matrixVals[14] * this.matrixVals[7] + var1.matrixVals[10] * this.matrixVals[6] + var1.matrixVals[6] * this.matrixVals[5] + var1.matrixVals[2] * this.matrixVals[4];
        let var9 = var1.matrixVals[11] * this.matrixVals[6] + this.matrixVals[5] * var1.matrixVals[7] + this.matrixVals[4] * var1.matrixVals[3] + this.matrixVals[7] * var1.matrixVals[15];
        let var10 = this.matrixVals[9] * var1.matrixVals[4] + var1.matrixVals[0] * this.matrixVals[8] + this.matrixVals[10] * var1.matrixVals[8] + this.matrixVals[11] * var1.matrixVals[12];
        let var11 = var1.matrixVals[13] * this.matrixVals[11] + this.matrixVals[10] * var1.matrixVals[9] + var1.matrixVals[5] * this.matrixVals[9] + var1.matrixVals[1] * this.matrixVals[8];
        let var12 = this.matrixVals[11] * var1.matrixVals[14] + var1.matrixVals[6] * this.matrixVals[9] + var1.matrixVals[2] * this.matrixVals[8] + this.matrixVals[10] * var1.matrixVals[10];
        let var13 = var1.matrixVals[15] * this.matrixVals[11] + var1.matrixVals[3] * this.matrixVals[8] + this.matrixVals[9] * var1.matrixVals[7] + this.matrixVals[10] * var1.matrixVals[11];
        let var14 = this.matrixVals[14] * var1.matrixVals[8] + this.matrixVals[12] * var1.matrixVals[0] + this.matrixVals[13] * var1.matrixVals[4] + var1.matrixVals[12] * this.matrixVals[15];
        let var15 = var1.matrixVals[13] * this.matrixVals[15] + this.matrixVals[12] * var1.matrixVals[1] + this.matrixVals[13] * var1.matrixVals[5] + var1.matrixVals[9] * this.matrixVals[14];
        let var16 = this.matrixVals[15] * var1.matrixVals[14] + var1.matrixVals[2] * this.matrixVals[12] + var1.matrixVals[6] * this.matrixVals[13] + this.matrixVals[14] * var1.matrixVals[10];
        let var17 = this.matrixVals[15] * var1.matrixVals[15] + this.matrixVals[14] * var1.matrixVals[11] + this.matrixVals[13] * var1.matrixVals[7] + this.matrixVals[12] * var1.matrixVals[3];
        this.matrixVals[0] = var2;
        this.matrixVals[1] = var3;
        this.matrixVals[2] = var4;
        this.matrixVals[3] = var5;
        this.matrixVals[4] = var6;
        this.matrixVals[5] = var7;
        this.matrixVals[6] = var8;
        this.matrixVals[7] = var9;
        this.matrixVals[8] = var10;
        this.matrixVals[9] = var11;
        this.matrixVals[10] = var12;
        this.matrixVals[11] = var13;
        this.matrixVals[12] = var14;
        this.matrixVals[13] = var15;
        this.matrixVals[14] = var16;
        this.matrixVals[15] = var17;
    }

    method2180() {
        return this.matrixVals[8] * this.matrixVals[5] * this.matrixVals[3] * this.matrixVals[14] + this.matrixVals[13] * this.matrixVals[10] * this.matrixVals[3] * this.matrixVals[4] + (this.matrixVals[8] * this.matrixVals[1] * this.matrixVals[6] * this.matrixVals[15] + this.matrixVals[14] * this.matrixVals[1] * this.matrixVals[4] * this.matrixVals[11] + (this.matrixVals[14] * this.matrixVals[9] * this.matrixVals[0] * this.matrixVals[7] + this.matrixVals[11] * this.matrixVals[6] * this.matrixVals[0] * this.matrixVals[13] + (this.matrixVals[15] * this.matrixVals[10] * this.matrixVals[5] * this.matrixVals[0] - this.matrixVals[11] * this.matrixVals[5] * this.matrixVals[0] * this.matrixVals[14] - this.matrixVals[15] * this.matrixVals[9] * this.matrixVals[0] * this.matrixVals[6]) - this.matrixVals[0] * this.matrixVals[7] * this.matrixVals[10] * this.matrixVals[13] - this.matrixVals[1] * this.matrixVals[4] * this.matrixVals[10] * this.matrixVals[15]) - this.matrixVals[12] * this.matrixVals[6] * this.matrixVals[1] * this.matrixVals[11] - this.matrixVals[8] * this.matrixVals[1] * this.matrixVals[7] * this.matrixVals[14] + this.matrixVals[12] * this.matrixVals[10] * this.matrixVals[7] * this.matrixVals[1] + this.matrixVals[2] * this.matrixVals[4] * this.matrixVals[9] * this.matrixVals[15] - this.matrixVals[13] * this.matrixVals[11] * this.matrixVals[4] * this.matrixVals[2] - this.matrixVals[2] * this.matrixVals[5] * this.matrixVals[8] * this.matrixVals[15] + this.matrixVals[12] * this.matrixVals[11] * this.matrixVals[5] * this.matrixVals[2] + this.matrixVals[13] * this.matrixVals[2] * this.matrixVals[7] * this.matrixVals[8] - this.matrixVals[7] * this.matrixVals[2] * this.matrixVals[9] * this.matrixVals[12] - this.matrixVals[14] * this.matrixVals[4] * this.matrixVals[3] * this.matrixVals[9]) - this.matrixVals[3] * this.matrixVals[5] * this.matrixVals[10] * this.matrixVals[12] - this.matrixVals[13] * this.matrixVals[3] * this.matrixVals[6] * this.matrixVals[8] + this.matrixVals[9] * this.matrixVals[6] * this.matrixVals[3] * this.matrixVals[12];
    }

    method2181() {
        const var1 = 1.0 / this.method2180();
        const var2 = var1 * (this.matrixVals[13] * this.matrixVals[6] * this.matrixVals[11] + (this.matrixVals[10] * this.matrixVals[5] * this.matrixVals[15] - this.matrixVals[14] * this.matrixVals[11] * this.matrixVals[5] - this.matrixVals[6] * this.matrixVals[9] * this.matrixVals[15]) + this.matrixVals[9] * this.matrixVals[7] * this.matrixVals[14] - this.matrixVals[13] * this.matrixVals[10] * this.matrixVals[7]);
        const var3 = var1 * (this.matrixVals[13] * this.matrixVals[10] * this.matrixVals[3] + (this.matrixVals[10] * -this.matrixVals[1] * this.matrixVals[15] + this.matrixVals[14] * this.matrixVals[11] * this.matrixVals[1] + this.matrixVals[9] * this.matrixVals[2] * this.matrixVals[15] - this.matrixVals[13] * this.matrixVals[11] * this.matrixVals[2] - this.matrixVals[3] * this.matrixVals[9] * this.matrixVals[14]));
        const var4 = (this.matrixVals[15] * this.matrixVals[1] * this.matrixVals[6] - this.matrixVals[14] * this.matrixVals[7] * this.matrixVals[1] - this.matrixVals[2] * this.matrixVals[5] * this.matrixVals[15] + this.matrixVals[2] * this.matrixVals[7] * this.matrixVals[13] + this.matrixVals[5] * this.matrixVals[3] * this.matrixVals[14] - this.matrixVals[13] * this.matrixVals[6] * this.matrixVals[3]) * var1;
        const var5 = (this.matrixVals[9] * this.matrixVals[6] * this.matrixVals[3] + (this.matrixVals[2] * this.matrixVals[5] * this.matrixVals[11] + this.matrixVals[1] * this.matrixVals[7] * this.matrixVals[10] + this.matrixVals[11] * this.matrixVals[6] * -this.matrixVals[1] - this.matrixVals[9] * this.matrixVals[7] * this.matrixVals[2] - this.matrixVals[3] * this.matrixVals[5] * this.matrixVals[10])) * var1;
        const var6 = (this.matrixVals[6] * this.matrixVals[8] * this.matrixVals[15] + this.matrixVals[15] * -this.matrixVals[4] * this.matrixVals[10] + this.matrixVals[14] * this.matrixVals[4] * this.matrixVals[11] - this.matrixVals[12] * this.matrixVals[11] * this.matrixVals[6] - this.matrixVals[7] * this.matrixVals[8] * this.matrixVals[14] + this.matrixVals[12] * this.matrixVals[10] * this.matrixVals[7]) * var1;
        const var7 = var1 * (this.matrixVals[8] * this.matrixVals[3] * this.matrixVals[14] + this.matrixVals[2] * this.matrixVals[11] * this.matrixVals[12] + (this.matrixVals[10] * this.matrixVals[0] * this.matrixVals[15] - this.matrixVals[0] * this.matrixVals[11] * this.matrixVals[14] - this.matrixVals[15] * this.matrixVals[8] * this.matrixVals[2]) - this.matrixVals[3] * this.matrixVals[10] * this.matrixVals[12]);
        const var8 = var1 * (this.matrixVals[2] * this.matrixVals[4] * this.matrixVals[15] + this.matrixVals[15] * this.matrixVals[6] * -this.matrixVals[0] + this.matrixVals[7] * this.matrixVals[0] * this.matrixVals[14] - this.matrixVals[12] * this.matrixVals[7] * this.matrixVals[2] - this.matrixVals[14] * this.matrixVals[3] * this.matrixVals[4] + this.matrixVals[3] * this.matrixVals[6] * this.matrixVals[12]);
        const var9 = (this.matrixVals[4] * this.matrixVals[3] * this.matrixVals[10] + this.matrixVals[11] * this.matrixVals[0] * this.matrixVals[6] - this.matrixVals[10] * this.matrixVals[7] * this.matrixVals[0] - this.matrixVals[11] * this.matrixVals[4] * this.matrixVals[2] + this.matrixVals[8] * this.matrixVals[2] * this.matrixVals[7] - this.matrixVals[8] * this.matrixVals[3] * this.matrixVals[6]) * var1;
        const var10 = (this.matrixVals[13] * this.matrixVals[7] * this.matrixVals[8] + this.matrixVals[11] * this.matrixVals[5] * this.matrixVals[12] + (this.matrixVals[9] * this.matrixVals[4] * this.matrixVals[15] - this.matrixVals[4] * this.matrixVals[11] * this.matrixVals[13] - this.matrixVals[15] * this.matrixVals[5] * this.matrixVals[8]) - this.matrixVals[12] * this.matrixVals[7] * this.matrixVals[9]) * var1;
        const var11 = (this.matrixVals[3] * this.matrixVals[9] * this.matrixVals[12] + (this.matrixVals[8] * this.matrixVals[1] * this.matrixVals[15] + this.matrixVals[9] * -this.matrixVals[0] * this.matrixVals[15] + this.matrixVals[11] * this.matrixVals[0] * this.matrixVals[13] - this.matrixVals[1] * this.matrixVals[11] * this.matrixVals[12] - this.matrixVals[13] * this.matrixVals[3] * this.matrixVals[8])) * var1;
        const var12 = (this.matrixVals[15] * this.matrixVals[5] * this.matrixVals[0] - this.matrixVals[0] * this.matrixVals[7] * this.matrixVals[13] - this.matrixVals[1] * this.matrixVals[4] * this.matrixVals[15] + this.matrixVals[1] * this.matrixVals[7] * this.matrixVals[12] + this.matrixVals[13] * this.matrixVals[4] * this.matrixVals[3] - this.matrixVals[12] * this.matrixVals[5] * this.matrixVals[3]) * var1;
        const var13 = var1 * (this.matrixVals[3] * this.matrixVals[5] * this.matrixVals[8] + (this.matrixVals[11] * this.matrixVals[4] * this.matrixVals[1] + -this.matrixVals[0] * this.matrixVals[5] * this.matrixVals[11] + this.matrixVals[7] * this.matrixVals[0] * this.matrixVals[9] - this.matrixVals[1] * this.matrixVals[7] * this.matrixVals[8] - this.matrixVals[3] * this.matrixVals[4] * this.matrixVals[9]));
        const var14 = var1 * (this.matrixVals[14] * this.matrixVals[9] * -this.matrixVals[4] + this.matrixVals[13] * this.matrixVals[4] * this.matrixVals[10] + this.matrixVals[8] * this.matrixVals[5] * this.matrixVals[14] - this.matrixVals[12] * this.matrixVals[10] * this.matrixVals[5] - this.matrixVals[8] * this.matrixVals[6] * this.matrixVals[13] + this.matrixVals[12] * this.matrixVals[9] * this.matrixVals[6]);
        const var15 = (this.matrixVals[14] * this.matrixVals[0] * this.matrixVals[9] - this.matrixVals[13] * this.matrixVals[0] * this.matrixVals[10] - this.matrixVals[14] * this.matrixVals[8] * this.matrixVals[1] + this.matrixVals[12] * this.matrixVals[1] * this.matrixVals[10] + this.matrixVals[2] * this.matrixVals[8] * this.matrixVals[13] - this.matrixVals[12] * this.matrixVals[2] * this.matrixVals[9]) * var1;
        const var16 = var1 * (this.matrixVals[14] * this.matrixVals[1] * this.matrixVals[4] + this.matrixVals[5] * -this.matrixVals[0] * this.matrixVals[14] + this.matrixVals[6] * this.matrixVals[0] * this.matrixVals[13] - this.matrixVals[12] * this.matrixVals[6] * this.matrixVals[1] - this.matrixVals[4] * this.matrixVals[2] * this.matrixVals[13] + this.matrixVals[12] * this.matrixVals[2] * this.matrixVals[5]);
        const var17 = (this.matrixVals[9] * this.matrixVals[2] * this.matrixVals[4] + this.matrixVals[1] * this.matrixVals[6] * this.matrixVals[8] + (this.matrixVals[5] * this.matrixVals[0] * this.matrixVals[10] - this.matrixVals[0] * this.matrixVals[6] * this.matrixVals[9] - this.matrixVals[4] * this.matrixVals[1] * this.matrixVals[10]) - this.matrixVals[2] * this.matrixVals[5] * this.matrixVals[8]) * var1;
        this.matrixVals[0] = var2;
        this.matrixVals[1] = var3;
        this.matrixVals[2] = var4;
        this.matrixVals[3] = var5;
        this.matrixVals[4] = var6;
        this.matrixVals[5] = var7;
        this.matrixVals[6] = var8;
        this.matrixVals[7] = var9;
        this.matrixVals[8] = var10;
        this.matrixVals[9] = var11;
        this.matrixVals[10] = var12;
        this.matrixVals[11] = var13;
        this.matrixVals[12] = var14;
        this.matrixVals[13] = var15;
        this.matrixVals[14] = var16;
        this.matrixVals[15] = var17;
    }

    method2174() {
        let var1 = new Array()
        var1.push(-Math.asin(this.matrixVals[6]));
        var1.push(0.0);
        var1.push(0.0);
        let var2 = Math.cos(var1[0]);
        let var4;
        let var6;
        if (Math.abs(var2) > 0.005) {
            var4 = this.matrixVals[2];
            var6 = this.matrixVals[10];
            let var8 = this.matrixVals[4];
            let var10 = this.matrixVals[5];
            var1[1] = Math.atan2(var4, var6);
            var1[2] = Math.atan2(var8, var10);
        } else {
            var4 = this.matrixVals[1];
            var6 = this.matrixVals[0];
            if (this.matrixVals[6] < 0.0) {
                var1[1] = Math.atan2(var4, var6);
            } else {
                var1[1] = (-Math.atan2(var4, var6));
            }

            var1[2] = 0.0;
        }

        return var1;
    }
}

class class418 {
    constructor() {
        this.field3780 = 0.0;
        this.field3790 = 0.0;
        this.field3789 = 0.0;
        this.field3788 = 0.0;
        this.field3787 = 0.0;
        this.field3786 = 0.0;
        this.field3783 = 0.0;
        this.field3782 = 0.0;
        this.field3781 = 0.0;
        this.field3791 = 1.0;
        this.field3784 = 1.0;
        this.field3785 = 1.0;
    }
}

export default class FramemapLoader {

    load(bytes, id) {
        let def = new FramemapDefinition();
        def.id = id;
        let dataview = new DataView(bytes.buffer);
        def.length = dataview.readUint8();
        def.types = [];
        def.frameMaps = [];

        for (let i = 0; i < def.length; ++i) {
            def.types[i] = dataview.readUint8();
        }

        for (let i = 0; i < def.length; ++i) {
            def.frameMaps[i] = new Array(dataview.readUint8());
        }

        for (let i = 0; i < def.length; ++i) {
            for (let j = 0; j < def.frameMaps[i].length; ++j) {
                def.frameMaps[i][j] = dataview.readUint8();
            }
        }

        if (dataview.getPosition() < dataview.byteLength) {
            let var4 = dataview.readUint16();
            if (var4 > 0) {
                def.animayaSkeleton = new AnimayaSkeleton(dataview, var4);
            }
        }
        return def;
    }
}