class class419 {
    constructor(var1, var2, var3) {
        this.field3733 = var1;
        this.field3731 = var2;
        this.field3734 = var3;
    }
    method2178() {
        return Math.sqrt(this.field3731 * this.field3731 + this.field3733 * this.field3733 + this.field3734 * this.field3734);
    }
}
class Matrix {
    matrixVals = new Array(16);
    field3744 = 100;
    static field3746 = new Array(0);
    static field3745;
    static field3747;
    static field3746 = new Array(100);
    static field3745 = 0;
    static field3747 = new Matrix();
    constructor(var1, var2) {
        if (var1 == undefined && var2 == undefined) {
            this.method2193();
        }
        else if (var2 == undefined) {
            this.copy(var1);
        }
        else {
            this.method2198(var1, var2);
        }
    }
    method2200() {
        //release pooling
    }
    method2198(var1, var2) {
        if (var2) {
            let var3 = new class422();
            let var6 = var1.readInt16();
            var6 &= 16383;
            let var5 = ((var6 / 16384.0) * 6.283185307179586);
            var3.method2203(var5);
            let var9 = var1.readInt16();
            var9 &= 16383;
            let var8 = (6.283185307179586 * (double)(var9 / 16384.0));
            var3.method2204(var8);
            let var12 = var1.readInt16();
            var12 &= 16383;
            let var11 = (6.283185307179586 * (var12 / 16384.0));
            var3.method2205(var11);
            var3.method2206(var1.readInt16(), var1.readInt16(), var1.readInt16());
            this.method2201(var3);
        }
        else {
            for (let var13 = 0; var13 < 16; ++var13) {
                this.matrixVals[var13] = var1.readFloat32();
            }
        }
    }
    method2185() {
        let var1 = new float[3];
        if (this.matrixVals[2] < 0.999 && this.matrixVals[2] > -0.999) {
            var1[1] = (-Math.asin(this.matrixVals[2]));
            let var2 = Math.cos(var1[1]);
            var1[0] = Math.atan2(this.matrixVals[6] / var2, this.matrixVals[10] / var2);
            var1[2] = Math.atan2(this.matrixVals[1] / var2, this.matrixVals[0] / var2);
        }
        else {
            var1[0] = 0.0;
            var1[1] = Math.atan2(this.matrixVals[2], 0.0);
            var1[2] = Math.atan2((-this.matrixVals[9]), this.matrixVals[5]);
        }
        return var1;
    }
    method2195() {
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
        }
        else {
            var4 = this.matrixVals[1];
            var6 = this.matrixVals[0];
            if (this.matrixVals[6] < 0.0) {
                var1[1] = Math.atan2(var4, var6);
            }
            else {
                var1[1] = (-Math.atan2(var4, var6));
            }
            var1[2] = 0.0;
        }
        return var1;
    }
    method2193() {
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
    method2196() {
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
    method2187(var1) {
        this.method2186(var1, var1, var1);
    }
    method2186(var1, var2, var3) {
        this.method2193();
        this.matrixVals[0] = var1;
        this.matrixVals[5] = var2;
        this.matrixVals[10] = var3;
    }
    method2199(var1) {
        for (let var2 = 0; var2 < this.matrixVals.length; ++var2) {
            this.matrixVals[var2] += var1.matrixVals[var2];
        }
    }
    method2189(var1) {
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
    method2190(var1) {
        let var2 = var1.field3738 * var1.field3738;
        let var3 = var1.field3738 * var1.field3737;
        let var4 = var1.field3739 * var1.field3738;
        let var5 = var1.field3740 * var1.field3738;
        let var6 = var1.field3737 * var1.field3737;
        let var7 = var1.field3739 * var1.field3737;
        let var8 = var1.field3737 * var1.field3740;
        let var9 = var1.field3739 * var1.field3739;
        let var10 = var1.field3740 * var1.field3739;
        let var11 = var1.field3740 * var1.field3740;
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
    method2201(var1) {
        this.matrixVals[0] = var1.field3754;
        this.matrixVals[1] = var1.field3759;
        this.matrixVals[2] = var1.field3750;
        this.matrixVals[3] = 0.;
        this.matrixVals[4] = var1.field3751;
        this.matrixVals[5] = var1.field3752;
        this.matrixVals[6] = var1.field3753;
        this.matrixVals[7] = 0.0;
        this.matrixVals[8] = var1.field3748;
        this.matrixVals[9] = var1.field3755;
        this.matrixVals[10] = var1.field3756;
        this.matrixVals[11] = 0.0;
        this.matrixVals[12] = var1.field3757;
        this.matrixVals[13] = var1.field3749;
        this.matrixVals[14] = var1.field3758;
        this.matrixVals[15] = 1.0;
    }
    method2191() {
        return this.matrixVals[12] * this.matrixVals[3] * this.matrixVals[6] * this.matrixVals[9] + (this.matrixVals[10] * this.matrixVals[3] * this.matrixVals[4] * this.matrixVals[13] + (this.matrixVals[1] * this.matrixVals[6] * this.matrixVals[8] * this.matrixVals[15] + this.matrixVals[5] * this.matrixVals[0] * this.matrixVals[10] * this.matrixVals[15] - this.matrixVals[5] * this.matrixVals[0] * this.matrixVals[11] * this.matrixVals[14] - this.matrixVals[0] * this.matrixVals[6] * this.matrixVals[9] * this.matrixVals[15] + this.matrixVals[6] * this.matrixVals[0] * this.matrixVals[11] * this.matrixVals[13] + this.matrixVals[14] * this.matrixVals[9] * this.matrixVals[7] * this.matrixVals[0] - this.matrixVals[10] * this.matrixVals[7] * this.matrixVals[0] * this.matrixVals[13] - this.matrixVals[10] * this.matrixVals[1] * this.matrixVals[4] * this.matrixVals[15] + this.matrixVals[14] * this.matrixVals[4] * this.matrixVals[1] * this.matrixVals[11] - this.matrixVals[12] * this.matrixVals[11] * this.matrixVals[6] * this.matrixVals[1] - this.matrixVals[7] * this.matrixVals[1] * this.matrixVals[8] * this.matrixVals[14] + this.matrixVals[12] * this.matrixVals[7] * this.matrixVals[1] * this.matrixVals[10] + this.matrixVals[9] * this.matrixVals[4] * this.matrixVals[2] * this.matrixVals[15] - this.matrixVals[13] * this.matrixVals[4] * this.matrixVals[2] * this.matrixVals[11] - this.matrixVals[15] * this.matrixVals[5] * this.matrixVals[2] * this.matrixVals[8] + this.matrixVals[2] * this.matrixVals[5] * this.matrixVals[11] * this.matrixVals[12] + this.matrixVals[13] * this.matrixVals[8] * this.matrixVals[7] * this.matrixVals[2] - this.matrixVals[9] * this.matrixVals[7] * this.matrixVals[2] * this.matrixVals[12] - this.matrixVals[14] * this.matrixVals[3] * this.matrixVals[4] * this.matrixVals[9]) + this.matrixVals[14] * this.matrixVals[8] * this.matrixVals[5] * this.matrixVals[3] - this.matrixVals[5] * this.matrixVals[3] * this.matrixVals[10] * this.matrixVals[12] - this.matrixVals[3] * this.matrixVals[6] * this.matrixVals[8] * this.matrixVals[13]);
    }
    method2192() {
        let var1 = 1.0 / this.method2191();
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
    method2194() {
        let var1 = new Array(3);
        let var2 = new class419(this.matrixVals[0], this.matrixVals[1], this.matrixVals[2]);
        let var3 = new class419(this.matrixVals[4], this.matrixVals[5], this.matrixVals[6]);
        let var4 = new class419(this.matrixVals[8], this.matrixVals[9], this.matrixVals[10]);
        var1[0] = var2.method2178();
        var1[1] = var3.method2178();
        var1[2] = var4.method2178();
        return var1;
    }
    toString() {
        let var1 = new StringBuilder();
        this.method2195();
        this.method2185();
        for (let var2 = 0; var2 < 4; ++var2) {
            for (let var3 = 0; var3 < 4; ++var3) {
                if (var3 > 0) {
                    var1.append("\t");
                }
                let var4 = this.matrixVals[var3 + var2 * 4];
                if (Math.sqrt((var4 * var4)) < 9.999999747378752E-5) {
                    var4 = 0.0;
                }
                var1.append(var4);
            }
            var1.append("\n");
        }
        return var1.toString();
    }
    hashCode() {
        let var1 = true;
        let var2 = 1;
        let var3 = var2 * 31 + Arrays.hashCode(this.matrixVals);
        return var3;
    }
    equals(var1) {
        if (!(var1 instanceof Matrix)) {
            return false;
        }
        else {
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
export default Matrix;
