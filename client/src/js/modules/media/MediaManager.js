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

    destroySounds(key, all) {
        this.openAudioMc.debugPrint("starting to quit fade " + key)
        let that = this;

        if (key != null && that.sounds[key] != null) {
            that.sounds[key].setVolume(0, 300, () => {
                this.openAudioMc.debugPrint("finished fading " + key + "")
                if (that.sounds[key] != null) that.sounds[key].destroy();
                delete that.sounds[key];
                this.openAudioMc.debugPrint("stopping " + key + " after fading")
            });
        } else {
            for (let key in this.sounds) {
                if (!this.sounds.hasOwnProperty(key)) continue;
                if (this.sounds[key].getFlag() === "DEFAULT" || (all != null && all)) {
                    if (that.sounds[key] != null) that.sounds[key].destroy();
                    delete that.sounds[key];
                }
            }
        }
    }

    setMasterVolume(volume) {
        this.masterVolume = volume;
        if (volume == 0) {
            document.getElementById("volume-disp").innerHTML = "<i>(muted)</i>";
        } else {
            document.getElementById("volume-disp").innerText = "Volume: " + volume + "%";
        }

        Cookies.set("volume", volume);

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
