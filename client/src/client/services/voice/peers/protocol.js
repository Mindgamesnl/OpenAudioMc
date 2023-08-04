export class RtcPacket {
  constructor() {
    this.eventName = '';
    this.params = new Map();
  }

  fromString(input) {
    this.original = input;
    const parts = input.split('~');
    for (let i = 0; i < parts.length; i++) {
      if (i === 0) {
        this.eventName = parts[i];
      } else {
        const p = parts[i];
        if (p.indexOf('=') !== -1) {
          const b = p.split('=');
          this.params.set(b[0], b[1]);
        }
      }
    }
    return this;
  }

  setParam(key, value) {
    this.params.set(key, value);
    return this;
  }

  getParam(key) {
    return this.params.get(key);
  }

  setEventName(name) {
    this.eventName = name;
    return this;
  }

  getEventName() {
    return this.eventName;
  }

  serialize() {
    let out = `${this.eventName}~`;

    // loop through params
    this.params.forEach((value, key) => {
      out += `${key}=${value}~`;
    });

    return out;
  }

  trimmed() {
    const headerLength = this.eventName.length + 1;
    const originalChars = Array.from(this.original);
    const trimmedChars = originalChars.slice(headerLength);
    return trimmedChars.join('');
  }
}
