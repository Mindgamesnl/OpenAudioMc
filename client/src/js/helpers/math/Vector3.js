export class Vector3 {

    constructor(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }

    add(x, y, z) {
        this.x += x;
        this.y += y;
        this.z += z;
        return this;
    }

    applyQuaternion(q) {
        let x = this.x, y = this.y, z = this.z;
        let qx = q.x, qy = q.y, qz = q.z, qw = q.w;

        let ix = qw * x + qy * z - qz * y;
        let iy = qw * y + qz * x - qx * z;
        let iz = qw * z + qx * y - qy * x;
        let iw = -qx * x - qy * y - qz * z;

        this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

        return this;
    }

    square(a) {
        return a * a;
    }

    distance(o) {
        const d = this.square(this.x - o.x) + this.square(this.y - o.y) + this.square(this.z - o.z);
        return Math.sqrt(d);
    }

}