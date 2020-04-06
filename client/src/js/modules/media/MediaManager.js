import {Mixer} from "./objects/Mixer";

export class MediaManager {

    constructor(main) {
        this.sounds = {};
        this.masterVolume = 80;
        this.openAudioMc = main;
        this.mixer = new Mixer();

        document.getElementById("volume-slider").oninput = () => {
            let value = document.getElementById("volume-slider").value;
            this.setMasterVolume(value);
            Cookies.set("volume", value);
        }
    }

    destroySounds(soundId, all) {
        this.openAudioMc.debugPrint("starting to quit fade " + soundId)

        for (let channelsKey in this.mixer.getChannels()) {
            const channel = this.mixer.getChannels()[channelsKey];

            if (soundId == null || soundId === "") {
                if ((channel.hasTag(soundId) && channel.hasTag("default")) || all) {
                    this.mixer.removeChannel(channel);
                }
            } else {
                // sound id provided, only get that one or all if needed
                if (channel.hasTag(soundId) || all) {
                    this.mixer.removeChannel(channel);
                }
            }
        }
    }

    setMasterVolume(volume) {
        this.masterVolume = volume;
        if (volume === 0) {
            document.getElementById("volume-disp").innerHTML = "<i>(muted)</i>";
        } else {
            document.getElementById("volume-disp").innerText = "Volume: " + volume + "%";
        }

        Cookies.set("volume", volume);

        this.mixer.setMasterVolume(volume);

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
}
