import Vector from "./Vector.js"

export default class Matrix {
    matrixVals = new Array(16);

    static field3747;
    static field3746 = new Array(100);
    static field3747 = new Matrix();


    constructor(var1, var2) {
        if (var1 == undefined && var2 == undefined) {
            this.identity();
        } else if (var2 == undefined) {
            this.copy(var1);
        } else {
            this.initFromBuffer(var1, var2);
        }
    }

    initFromBuffer(buffer, var2) {
        for (let i = 0; i < 16; ++i) {
            this.matrixVals[i] = buffer.readFloat32();
        }
    }

    getRotation() {
        let var1 = [(-Math.asin(this.matrixVals[6])), 0.0, 0.0];
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

    identity() {
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

    copy(otherMatrix) {
        if (otherMatrix == undefined) {
            debugger;
        }
        for (let i = 0; i < 16; i++) {
            this.matrixVals[i] = otherMatrix.matrixVals[i];
        }
    }

    setScale(var1) {
        this.setScaleXYZ(var1, var1, var1);
    }

    setScaleXYZ(var1, var2, var3) {
        this.identity();
        this.matrixVals[0] = var1;
        this.matrixVals[5] = var2;
        this.matrixVals[10] = var3;
    }

    add(var1) {
        for (let var2 = 0; var2 < this.matrixVals.length; ++var2) {
            this.matrixVals[var2] += var1.matrixVals[var2];
        }

    }

    multiply(var1) {
        let var2 = this.matrixVals[1] * var1.matrixVals[4] + this.matrixVals[0] * var1.matrixVals[0] + this.matrixVals[2] * var1.matrixVals[8] + this.matrixVals[3] * var1.matrixVals[12];
        let var3 = this.matrixVals[3] * var1.matrixVals[13] + this.matrixVals[2] * var1.matrixVals[9] + this.matrixVals[1] * var1.matrixVals[5] + var1.matrixVals[1] * this.matrixVals[0];
        let var4 = var1.matrixVals[10] * this.matrixVals[2] + var1.matrixVals[2] * this.matrixVals[0] + var1.matrixVals[6] * this.matrixVals[1] + this.matrixVals[3] * var1.matrixVals[14];
        let var5 = var1.matrixVals[7] * this.matrixVals[1] + var1.matrixVals[3] * this.matrixVals[0] + this.matrixVals[2] * var1.matrixVals[11] + var1.matrixVals[15] * this.matrixVals[3];
        let var6 = this.matrixVals[7] * var1.matrixVals[12] + this.matrixVals[6] * var1.matrixVals[8] + this.matrixVals[4] * var1.matrixVals[0] + this.matrixVals[5] * var1.matrixVals[4];
        let var7 = this.matrixVals[7] * var1.matrixVals[13] + var1.matrixVals[9] * this.matrixVals[6] + this.matrixVals[5] * var1.matrixVals[5] + var1.matrixVals[1] * this.matrixVals[4];
        let var8 = this.matrixVals[6] * var1.matrixVals[10] + this.matrixVals[5] * var1.matrixVals[6] + this.matrixVals[4] * var1.matrixVals[2] + var1.matrixVals[14] * this.matrixVals[7];
        let var9 = var1.matrixVals[15] * this.matrixVals[7] + this.matrixVals[4] * var1.matrixVals[3] + var1.matrixVals[7] * this.matrixVals[5] + this.matrixVals[6] * var1.matrixVals[11];
        let var10 = var1.matrixVals[12] * this.matrixVals[11] + var1.matrixVals[0] * this.matrixVals[8] + this.matrixVals[9] * var1.matrixVals[4] + this.matrixVals[10] * var1.matrixVals[8];
        let var11 = var1.matrixVals[13] * this.matrixVals[11] + var1.matrixVals[9] * this.matrixVals[10] + var1.matrixVals[5] * this.matrixVals[9] + var1.matrixVals[1] * this.matrixVals[8];
        let var12 = this.matrixVals[11] * var1.matrixVals[14] + var1.matrixVals[10] * this.matrixVals[10] + this.matrixVals[8] * var1.matrixVals[2] + var1.matrixVals[6] * this.matrixVals[9];
        let var13 = var1.matrixVals[11] * this.matrixVals[10] + var1.matrixVals[7] * this.matrixVals[9] + this.matrixVals[8] * var1.matrixVals[3] + var1.matrixVals[15] * this.matrixVals[11];
        let var14 = this.matrixVals[15] * var1.matrixVals[12] + this.matrixVals[13] * var1.matrixVals[4] + var1.matrixVals[0] * this.matrixVals[12] + this.matrixVals[14] * var1.matrixVals[8];
        let var15 = this.matrixVals[14] * var1.matrixVals[9] + this.matrixVals[12] * var1.matrixVals[1] + var1.matrixVals[5] * this.matrixVals[13] + var1.matrixVals[13] * this.matrixVals[15];
        let var16 = this.matrixVals[14] * var1.matrixVals[10] + var1.matrixVals[6] * this.matrixVals[13] + this.matrixVals[12] * var1.matrixVals[2] + this.matrixVals[15] * var1.matrixVals[14];
        let var17 = var1.matrixVals[15] * this.matrixVals[15] + this.matrixVals[14] * var1.matrixVals[11] + this.matrixVals[13] * var1.matrixVals[7] + this.matrixVals[12] * var1.matrixVals[3];
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

    rotate(var1) {
        let var2 = var1.w * var1.w;
        let var3 = var1.w * var1.x;
        let var4 = var1.y * var1.w;
        let var5 = var1.z * var1.w;
        let var6 = var1.x * var1.x;
        let var7 = var1.y * var1.x;
        let var8 = var1.x * var1.z;
        let var9 = var1.y * var1.y;
        let var10 = var1.z * var1.y;
        let var11 = var1.z * var1.z;
        this.matrixVals[0] = var6 + var2 - var11 - var9;
        this.matrixVals[1] = var7 + var7 + var5 + var5;
        this.matrixVals[2] = var8 - var4 - var4 + var8;
        this.matrixVals[4] = var7 + (var7 - var5 - var5);
        this.matrixVals[5] = var9 + var2 - var6 - var11;
        this.matrixVals[6] = var3 + var3 + var10 + var10;
        this.matrixVals[8] = var8 + var8 + var4 + var4;
        this.matrixVals[9] = var10 + (var10 - var3 - var3);
        this.matrixVals[10] = var11 + var2 - var9 - var6;
    }

    determinant() {
        return this.matrixVals[12] * this.matrixVals[3] * this.matrixVals[6] * this.matrixVals[9] + (this.matrixVals[10] * this.matrixVals[3] * this.matrixVals[4] * this.matrixVals[13] + (this.matrixVals[1] * this.matrixVals[6] * this.matrixVals[8] * this.matrixVals[15] + this.matrixVals[5] * this.matrixVals[0] * this.matrixVals[10] * this.matrixVals[15] - this.matrixVals[5] * this.matrixVals[0] * this.matrixVals[11] * this.matrixVals[14] - this.matrixVals[0] * this.matrixVals[6] * this.matrixVals[9] * this.matrixVals[15] + this.matrixVals[6] * this.matrixVals[0] * this.matrixVals[11] * this.matrixVals[13] + this.matrixVals[14] * this.matrixVals[9] * this.matrixVals[7] * this.matrixVals[0] - this.matrixVals[10] * this.matrixVals[7] * this.matrixVals[0] * this.matrixVals[13] - this.matrixVals[10] * this.matrixVals[1] * this.matrixVals[4] * this.matrixVals[15] + this.matrixVals[14] * this.matrixVals[4] * this.matrixVals[1] * this.matrixVals[11] - this.matrixVals[12] * this.matrixVals[11] * this.matrixVals[6] * this.matrixVals[1] - this.matrixVals[7] * this.matrixVals[1] * this.matrixVals[8] * this.matrixVals[14] + this.matrixVals[12] * this.matrixVals[7] * this.matrixVals[1] * this.matrixVals[10] + this.matrixVals[9] * this.matrixVals[4] * this.matrixVals[2] * this.matrixVals[15] - this.matrixVals[13] * this.matrixVals[4] * this.matrixVals[2] * this.matrixVals[11] - this.matrixVals[15] * this.matrixVals[5] * this.matrixVals[2] * this.matrixVals[8] + this.matrixVals[2] * this.matrixVals[5] * this.matrixVals[11] * this.matrixVals[12] + this.matrixVals[13] * this.matrixVals[8] * this.matrixVals[7] * this.matrixVals[2] - this.matrixVals[9] * this.matrixVals[7] * this.matrixVals[2] * this.matrixVals[12] - this.matrixVals[14] * this.matrixVals[3] * this.matrixVals[4] * this.matrixVals[9]) + this.matrixVals[14] * this.matrixVals[8] * this.matrixVals[5] * this.matrixVals[3] - this.matrixVals[5] * this.matrixVals[3] * this.matrixVals[10] * this.matrixVals[12] - this.matrixVals[3] * this.matrixVals[6] * this.matrixVals[8] * this.matrixVals[13]);
    }

    inverse() {
        let var1 = 1.0 / this.determinant();
        let var2 = var1 * (this.matrixVals[14] * this.matrixVals[9] * this.matrixVals[7] + this.matrixVals[13] * this.matrixVals[6] * this.matrixVals[11] + (this.matrixVals[10] * this.matrixVals[5] * this.matrixVals[15] - this.matrixVals[11] * this.matrixVals[5] * this.matrixVals[14] - this.matrixVals[15] * this.matrixVals[9] * this.matrixVals[6]) - this.matrixVals[13] * this.matrixVals[7] * this.matrixVals[10]);
        let var3 = var1 * (this.matrixVals[3] * this.matrixVals[10] * this.matrixVals[13] + (this.matrixVals[15] * -this.matrixVals[1] * this.matrixVals[10] + this.matrixVals[14] * this.matrixVals[11] * this.matrixVals[1] + this.matrixVals[15] * this.matrixVals[9] * this.matrixVals[2] - this.matrixVals[13] * this.matrixVals[2] * this.matrixVals[11] - this.matrixVals[3] * this.matrixVals[9] * this.matrixVals[14]));
        let var4 = var1 * (this.matrixVals[2] * this.matrixVals[7] * this.matrixVals[13] + (this.matrixVals[15] * this.matrixVals[6] * this.matrixVals[1] - this.matrixVals[1] * this.matrixVals[7] * this.matrixVals[14] - this.matrixVals[5] * this.matrixVals[2] * this.matrixVals[15]) + this.matrixVals[3] * this.matrixVals[5] * this.matrixVals[14] - this.matrixVals[13] * this.matrixVals[3] * this.matrixVals[6]);
        let var5 = (this.matrixVals[6] * -this.matrixVals[1] * this.matrixVals[11] + this.matrixVals[10] * this.matrixVals[1] * this.matrixVals[7] + this.matrixVals[11] * this.matrixVals[2] * this.matrixVals[5] - this.matrixVals[2] * this.matrixVals[7] * this.matrixVals[9] - this.matrixVals[10] * this.matrixVals[3] * this.matrixVals[5] + this.matrixVals[9] * this.matrixVals[3] * this.matrixVals[6]) * var1;
        let var6 = var1 * (this.matrixVals[12] * this.matrixVals[7] * this.matrixVals[10] + (this.matrixVals[14] * this.matrixVals[4] * this.matrixVals[11] + -this.matrixVals[4] * this.matrixVals[10] * this.matrixVals[15] + this.matrixVals[8] * this.matrixVals[6] * this.matrixVals[15] - this.matrixVals[12] * this.matrixVals[11] * this.matrixVals[6] - this.matrixVals[7] * this.matrixVals[8] * this.matrixVals[14]));
        let var7 = (this.matrixVals[12] * this.matrixVals[2] * this.matrixVals[11] + (this.matrixVals[15] * this.matrixVals[0] * this.matrixVals[10] - this.matrixVals[14] * this.matrixVals[11] * this.matrixVals[0] - this.matrixVals[8] * this.matrixVals[2] * this.matrixVals[15]) + this.matrixVals[14] * this.matrixVals[3] * this.matrixVals[8] - this.matrixVals[12] * this.matrixVals[10] * this.matrixVals[3]) * var1;
        let var8 = (this.matrixVals[4] * this.matrixVals[2] * this.matrixVals[15] + this.matrixVals[15] * this.matrixVals[6] * -this.matrixVals[0] + this.matrixVals[14] * this.matrixVals[0] * this.matrixVals[7] - this.matrixVals[2] * this.matrixVals[7] * this.matrixVals[12] - this.matrixVals[14] * this.matrixVals[4] * this.matrixVals[3] + this.matrixVals[6] * this.matrixVals[3] * this.matrixVals[12]) * var1;
        let var9 = var1 * (this.matrixVals[11] * this.matrixVals[0] * this.matrixVals[6] - this.matrixVals[10] * this.matrixVals[0] * this.matrixVals[7] - this.matrixVals[11] * this.matrixVals[4] * this.matrixVals[2] + this.matrixVals[7] * this.matrixVals[2] * this.matrixVals[8] + this.matrixVals[3] * this.matrixVals[4] * this.matrixVals[10] - this.matrixVals[8] * this.matrixVals[3] * this.matrixVals[6]);
        let var10 = (this.matrixVals[13] * this.matrixVals[8] * this.matrixVals[7] + this.matrixVals[15] * this.matrixVals[9] * this.matrixVals[4] - this.matrixVals[4] * this.matrixVals[11] * this.matrixVals[13] - this.matrixVals[5] * this.matrixVals[8] * this.matrixVals[15] + this.matrixVals[12] * this.matrixVals[11] * this.matrixVals[5] - this.matrixVals[7] * this.matrixVals[9] * this.matrixVals[12]) * var1;
        let var11 = (-this.matrixVals[0] * this.matrixVals[9] * this.matrixVals[15] + this.matrixVals[13] * this.matrixVals[11] * this.matrixVals[0] + this.matrixVals[8] * this.matrixVals[1] * this.matrixVals[15] - this.matrixVals[11] * this.matrixVals[1] * this.matrixVals[12] - this.matrixVals[8] * this.matrixVals[3] * this.matrixVals[13] + this.matrixVals[12] * this.matrixVals[9] * this.matrixVals[3]) * var1;
        let var12 = (this.matrixVals[3] * this.matrixVals[4] * this.matrixVals[13] + this.matrixVals[1] * this.matrixVals[7] * this.matrixVals[12] + (this.matrixVals[0] * this.matrixVals[5] * this.matrixVals[15] - this.matrixVals[13] * this.matrixVals[0] * this.matrixVals[7] - this.matrixVals[4] * this.matrixVals[1] * this.matrixVals[15]) - this.matrixVals[3] * this.matrixVals[5] * this.matrixVals[12]) * var1;
        let var13 = var1 * (this.matrixVals[0] * this.matrixVals[7] * this.matrixVals[9] + -this.matrixVals[0] * this.matrixVals[5] * this.matrixVals[11] + this.matrixVals[11] * this.matrixVals[1] * this.matrixVals[4] - this.matrixVals[8] * this.matrixVals[7] * this.matrixVals[1] - this.matrixVals[9] * this.matrixVals[3] * this.matrixVals[4] + this.matrixVals[8] * this.matrixVals[3] * this.matrixVals[5]);
        let var14 = var1 * (this.matrixVals[12] * this.matrixVals[9] * this.matrixVals[6] + (this.matrixVals[14] * this.matrixVals[9] * -this.matrixVals[4] + this.matrixVals[4] * this.matrixVals[10] * this.matrixVals[13] + this.matrixVals[14] * this.matrixVals[8] * this.matrixVals[5] - this.matrixVals[5] * this.matrixVals[10] * this.matrixVals[12] - this.matrixVals[6] * this.matrixVals[8] * this.matrixVals[13]));
        let var15 = var1 * (this.matrixVals[2] * this.matrixVals[8] * this.matrixVals[13] + this.matrixVals[12] * this.matrixVals[1] * this.matrixVals[10] + (this.matrixVals[14] * this.matrixVals[9] * this.matrixVals[0] - this.matrixVals[10] * this.matrixVals[0] * this.matrixVals[13] - this.matrixVals[1] * this.matrixVals[8] * this.matrixVals[14]) - this.matrixVals[2] * this.matrixVals[9] * this.matrixVals[12]);
        let var16 = (this.matrixVals[5] * this.matrixVals[2] * this.matrixVals[12] + (this.matrixVals[4] * this.matrixVals[1] * this.matrixVals[14] + -this.matrixVals[0] * this.matrixVals[5] * this.matrixVals[14] + this.matrixVals[13] * this.matrixVals[6] * this.matrixVals[0] - this.matrixVals[12] * this.matrixVals[1] * this.matrixVals[6] - this.matrixVals[4] * this.matrixVals[2] * this.matrixVals[13])) * var1;
        let var17 = var1 * (this.matrixVals[9] * this.matrixVals[4] * this.matrixVals[2] + this.matrixVals[8] * this.matrixVals[1] * this.matrixVals[6] + (this.matrixVals[5] * this.matrixVals[0] * this.matrixVals[10] - this.matrixVals[9] * this.matrixVals[0] * this.matrixVals[6] - this.matrixVals[10] * this.matrixVals[1] * this.matrixVals[4]) - this.matrixVals[5] * this.matrixVals[2] * this.matrixVals[8]);
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

    getVectorMagnitudes() {
        let var1 = new Array(3);
        let var2 = new Vector(this.matrixVals[0], this.matrixVals[1], this.matrixVals[2]);
        let var3 = new Vector(this.matrixVals[4], this.matrixVals[5], this.matrixVals[6]);
        let var4 = new Vector(this.matrixVals[8], this.matrixVals[9], this.matrixVals[10]);
        var1[0] = var2.magnitude();
        var1[1] = var3.magnitude();
        var1[2] = var4.magnitude();
        return var1;
    }

    equals(var1) {
        if (!(var1 instanceof Matrix)) {
            return false;
        } else {
            let var2 = var1;

            for (let var3 = 0; var3 < 16; ++var3) {
                if (this.matrixVals[var3] != var2.matrixVals[var3]) {
                    return false;
                }
            }

            return true;
        }
    }
}
