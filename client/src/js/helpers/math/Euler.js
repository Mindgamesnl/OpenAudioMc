export class Euler {

    constructor(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }

    copy(euler) {
        this.x = euler.x;
        this.y = euler.y;
        this.z = euler.z;
        return this;
    }
}