export class Mutex {
  constructor() {
    this._locked = false;
    this._waiting = [];
  }

  async lock() {
    if (this._locked) {
      // eslint-disable-next-line no-console
      console.warn('MUTEX: waiting for lock');
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => this._waiting.push(resolve));
    }
    this._locked = true;
  }

  unlock() {
    this._locked = false;
    if (this._waiting.length > 0) {
      const next = this._waiting.shift();
      next();
    }
  }
}

export const MEDIA_MUTEX = new Mutex();
