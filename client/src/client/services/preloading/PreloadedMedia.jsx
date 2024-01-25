export class PreloadedMedia {
  constructor(source, namespace) {
    this.source = source;
    this.namespace = namespace;

    const soundElement = new Audio();
    soundElement.autoplay = false;
    soundElement.src = source;
    soundElement.load();

    this.audio = soundElement;
  }

  preDelete() {
    // optionally do something before the media is deleted
  }
}
