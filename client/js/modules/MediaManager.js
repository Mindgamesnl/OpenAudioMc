class MediaManager {

    constructor() {
        this.sounds = {};
        this.masterVolume = 80;
    }

    destroySounds(key) {
        openAudioMc.debugPrint("<b>starting to quit fade </b> " + key)
        let that = this;

        if (key != null && that.sounds[key] != null) {
            that.sounds[key].setVolume(0, 300, function () {
                openAudioMc.debugPrint("<b>finished fading</b> " + key + "")
                if (that.sounds[key] != null) that.sounds[key].destroy();
                delete that.sounds[key];
                openAudioMc.debugPrint("<b>stopping</b> " + key + " <b>after fading</b>")
            });
        } else {
            for (var key in this.sounds) {
                if (this.sounds[key].getFlag() === "DEFAULT") {
                    if (that.sounds[key] != null) that.sounds[key].destroy();
                    delete that.sounds[key];
                }
            }
        }
    }

    setMasterVolume(volume) {
        this.masterVolume = volume;
        for (var key in this.sounds) {
            this.sounds[key].setMasterVolume(volume);
        }
    }

    getMasterVolume() {
        return this.masterVolume;
    }

    getSound(id) {
        return this.sounds[id];
    }

    registerMedia(id, media) {
        this.sounds[id] = media;
        openAudioMc.debugPrint("<b>created media</b> " + id + "")
    }

}