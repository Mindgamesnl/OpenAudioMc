export class ConnectionClosedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConnectionClosedError';
  }
}
