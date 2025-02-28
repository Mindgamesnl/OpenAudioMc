export class PromisedChannel {
  constructor() {
    this.whenFinished = () => { console.error('A promised channel got finished before it got used'); }; // eslint-disable-line no-console
    this.whenRejected = () => { console.error('A promised channel got finished before it got used'); }; // eslint-disable-line no-console
    this.statusUpdateHandler = () => {};

    this.error = null;
    this.payload = null;
  }

  onFinish(f) {
    if (this.payload != null) {
      f(this.payload);
      return;
    }
    this.whenFinished = f;
  }

  notifyStatusUpdate(message) {
    this.statusUpdateHandler(message);
  }

  onStatusUpdate(f) {
    this.statusUpdateHandler = f;
  }

  onReject(f) {
    if (this.error != null) {
      f(this.error);
      return;
    }
    this.whenRejected = f;
  }

  handleData(e) {
    this.payload = e;
    this.whenFinished(e);
  }

  handleError(e) {
    this.error = e;
    this.whenRejected(e);
  }
}
