class MediaManager {

    constructor() {
        this.sounds = {};
    }

    registerMedia(id, media) {
        this.sounds[id] = media;
    }

}