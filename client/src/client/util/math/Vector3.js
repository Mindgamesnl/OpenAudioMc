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

  clone() {
    return new Vector3(this.x, this.y, this.z);
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  }

  plus(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }

  divide(by) {
    this.x /= by;
    this.y /= by;
    this.z /= by;
    return this;
  }

  applyQuaternion(q) {
    const { x } = this;
    const { y } = this;
    const { z } = this;
    const qx = q.x; const qy = q.y; const qz = q.z; const
      qw = q.w;

    const ix = qw * x + qy * z - qz * y;
    const iy = qw * y + qz * x - qx * z;
    const iz = qw * z + qx * y - qy * x;
    const iw = -qx * x - qy * y - qz * z;

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
