export class AbstractMicMiddleware {
  unlink() {
    throw new Error('Not implemented');
  }

  // eslint-disable-next-line no-unused-vars
  link(context, from, to) {
    // these should be unused, which is okay because they are abstract
    throw new Error('Not implemented');
  }
}
