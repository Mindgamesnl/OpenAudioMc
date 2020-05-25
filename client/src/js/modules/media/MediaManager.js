import {Mixer} from "./objects/Mixer";

export class MediaManager {

    constructor(main) {
        this.sounds = {};
        this.masterVolume = 80;
        this.openAudioMc = main;
        this.mixer = new Mixer(null, main);

        document.getElementById("volume-slider").oninput = () => {
            let value = document.getElementById("volume-slider").value;
            this.setMasterVolume(value);
            Cookies.set("volume", value);
        }
    }

    destroySounds(soundId, all, instantly) {
        this.openAudioMc.debugPrint("starting to quit fade " + soundId)
        let time = 250;
        if (instantly) time = 0;

        for (let channel of this.mixer.getChannels()) {

            if (all) {
                channel.fadeChannel(0, time, () => {
                    this.mixer.removeChannel(channel);
                });
            } else {
                if (soundId == null || soundId === "") {
                    if ((!channel.hasTag("SPECIAL") && !channel.hasTag("REGION") && !channel.hasTag("SPEAKER"))) {
                        channel.fadeChannel(0, time, () => {
                            this.mixer.removeChannel(channel);
                        });
                    }
                } else {
                    if (channel.hasTag(soundId)) {
                        channel.fadeChannel(0, time, () => {
                            this.mixer.removeChannel(channel);
                        });
                    }
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
