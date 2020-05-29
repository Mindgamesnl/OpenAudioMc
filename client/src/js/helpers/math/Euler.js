export const DefaultOrder = 'XYZ';

export class Euler {

    constructor(x, y, z, order) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.order = order || DefaultOrder;
    }

    set(x, y, z, order) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.order = order || this.order;
        return this;
    }

    clone() {
        return new Euler(this.x, this.y, this.z, this.order);
    }

    copy(euler) {
        this.x = euler.x;
        this.y = euler.y;
        this.z = euler.z;
        this.order = euler.order;
        return this;
    }
}