class MediaManager {

    constructor() {
        this.sounds = {};
    }

    destroySounds(id) {
        for (var key in this.sounds) {
            if (key === id) {
                let that = this;
                that.sounds[key].setVolume(0, 1000, function () {
                    that.sounds[key].destroy();
                    delete that.sounds[key];
                    openAudioMc.debugPrint("<b>stopping</b> " + key + " after fading")
                });
            }
        }
    }

    registerMedia(id, media) {
        this.sounds[id] = media;
        openAudioMc.debugPrint("<b>created media</b> " + id + "")
    }

}