export default class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    magnitude() {
        return Math.sqrt(this.y * this.y + this.x * this.x + this.z * this.z);
    }
}
