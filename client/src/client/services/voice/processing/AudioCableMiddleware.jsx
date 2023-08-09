import { AbstractMicMiddleware } from './AbstractMicMiddleware';

export class AudioCableMiddleware extends AbstractMicMiddleware {
  unlink() {
    this.target.disconnect();
  }

  link(context, from, to) {
    this.target = from;
    from.connect(to);
  }
}
