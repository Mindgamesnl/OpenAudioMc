export class MediaManager {

    constructor(main) {
        this.sounds = {};
        this.masterVolume = 80;
        this.openAudioMc = main;

        document.getElementById("volume-slider").oninput = () => {
            let value = document.getElementById("volume-slider").value;
            this.setMasterVolume(value);
            Cookies.set("volume", value);
        }
    }

    destroySounds(key) {
        this.openAudioMc.debugPrint("<b>starting to quit fade </b> " + key)
        let that = this;

        if (key != null && that.sounds[key] != null) {
            that.sounds[key].setVolume(0, 300, () => {
                this.openAudioMc.debugPrint("<b>finished fading</b> " + key + "")
                if (that.sounds[key] != null) that.sounds[key].destroy();
                delete that.sounds[key];
                this.openAudioMc.debugPrint("<b>stopping</b> " + key + " <b>after fading</b>")
            });
        } else {
            for (let key in this.sounds) {
                if (!this.sounds.hasOwnProperty(key)) continue;
                if (this.sounds[key].getFlag() === "DEFAULT") {
                    if (that.sounds[key] != null) that.sounds[key].destroy();
                    delete that.sounds[key];
                }
            }
        }
    }

    setMasterVolume(volume) {
        this.masterVolume = volume;
        document.getElementById("volume-disp").innerText = "volume: " + volume + "%";
        for (let key in this.sounds) {
            if (this.sounds.hasOwnProperty(key)) this.sounds[key].setMasterVolume(volume);
        }

        // update voice call volume, if any
        this.openAudioMc.voiceModule.setVolume(volume);
    }

    changeVolume(volume) {
        document.getElementById("volume-slider").value = volume;
        this.setMasterVolume(volume);
    }

    getMasterVolume() {
        return this.masterVolume;
    }

    getSound(id) {
        return this.sounds[id];
    }

    registerMedia(id, media) {
        this.sounds[id] = media;
        this.openAudioMc.debugPrint("<b>created media</b> " + id + "")
    }

}
