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

        if (key != null && this.sounds[key] != null) {
            this.sounds[key].setVolume(0, 300, () => {
                setTimeout(() => {
                    this.openAudioMc.debugPrint("finished fading " + key + "")
                    if (this.sounds[key] != null) this.sounds[key].destroy();
                    this.openAudioMc.debugPrint("stopping " + key + " after fading")
                    delete this.sounds[key];
                }, 50)
            });
        } else {
            for (let key in this.sounds) {
                console.log(this.sounds[key])
                let temp = this.sounds[key];
                if (temp._source.indexOf("barelyalive") != -1) {
                    temp.destroy();
                    delete this.sounds[key];
                    console.log("temp destroy")
                    continue;
                }
                if (!this.sounds.hasOwnProperty(key)) continue;

                if (this.sounds[key].getFlag() === "DEFAULT" || (all != null && all)) {
                    if (this.sounds[key] != null) this.sounds[key].destroy();
                    delete this.sounds[key];
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

    getMedia(id) {
        if (this.sounds[id] != null) {
            return this.sounds[id];
        }
        return null;
    }

    registerOrGetMedia(id, media) {
        if (this.sounds[id] != null) {
            this.sounds[id].destroy();
        }

        this.sounds[id] = media;
        this.openAudioMc.debugPrint("<b>created media</b> " + id + "")
    }

}
