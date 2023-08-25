export default class Quaternion {
    constructor() {
        this.identity();
    }

    identity() {
        this.z = 0.0;
        this.y = 0.0;
        this.x = 0.0;
        this.w = 1.0;
    }

    setRotation(x, y, z, angle) {
        let halfSin = Math.sin(angle * 0.5);
        let halfCos = Math.cos(angle * 0.5);
        this.x = x * halfSin;
        this.y = y * halfSin;
        this.z = halfSin * z;
        this.w = halfCos;
    }

    multiply(var1) {
        this.set(this.z * var1.y + this.w * var1.x + this.x * var1.w - var1.z * this.y, this.w * var1.y + (var1.w * this.y - this.z * var1.x) + this.x * var1.z, this.y * var1.x + this.z * var1.w - var1.y * this.x + var1.z * this.w, this.w * var1.w - var1.x * this.x - this.y * var1.y - this.z * var1.z);
    }

    set(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
}