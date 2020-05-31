export class Quaternion {

    constructor(x, y, z, w) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.w = (w !== undefined) ? w : 1;
    }

    setFromEuler(euler) {
        let x = euler.x, y = euler.y, z = euler.z;

        let c1 = Math.cos(x / 2);
        let c2 = Math.cos(y / 2);
        let c3 = Math.cos(z / 2);

        let s1 = Math.sin(x / 2);
        let s2 = Math.sin(y / 2);
        let s3 = Math.sin(z / 2);

        this.x = s1 * c2 * c3 + c1 * s2 * s3;
        this.y = c1 * s2 * c3 - s1 * c2 * s3;
        this.z = c1 * c2 * s3 + s1 * s2 * c3;
        this.w = c1 * c2 * c3 - s1 * s2 * s3;

        return this;
    }

}