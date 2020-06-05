import {Mixer} from "./objects/Mixer";
import {Channel} from "./objects/Channel";
import {Sound} from "./objects/Sound";

export class MediaManager {

    constructor(main) {
        this.sounds = {};
        this.masterVolume = 80;
        this.openAudioMc = main;
        this.startSound = null;
        this.mixer = new Mixer(null, main);

        document.getElementById("volume-slider").oninput = () => {
            let value = document.getElementById("volume-slider").value;
            this.setMasterVolume(value);
            Cookies.set("volume", value);
        }
    }

    postBoot() {
        if (this.startSound != null) {
            const createdChannel = new Channel("startsound");
            const createdMedia = new Sound(this.startSound);
            createdMedia.openAudioMc = this.openAudioMc;
            createdMedia.setOa(this.openAudioMc);
            createdMedia.finalize().then(() => {
                this.mixer.addChannel(createdChannel);
                createdChannel.addSound(createdMedia);
                createdChannel.setChannelVolume(100);
                createdChannel.updateFromMasterVolume();
                createdMedia.finish();
            });
        }
    }

    destroySounds(soundId, all, instantly) {
        this.openAudioMc.debugPrint("starting to quit fade " + soundId)
        let time = 100;
        if (instantly) time = 0;

        for (let channel of this.mixer.getChannels()) {
            if (all) {
                channel.fadeChannel(0, time * 5, () => {
                    this.mixer.removeChannel(channel);
                });
            } else {
                if (soundId == null || soundId === "") {
                    if ((!channel.hasTag("SPECIAL") && !channel.hasTag("REGION") && !channel.hasTag("SPEAKER"))) {
                        channel.fadeChannel(0, time * 5, () => {
                            this.mixer.removeChannel(channel);
                        });
                    }
                } else {
                    if (channel.hasTag(soundId)) {
                        channel.sounds.forEach((sound) => {
                            sound.gotShutDown = true;
                        });

                        let callback = () => {
                            this.mixer.removeChannel(channel);
                        };

                        channel.fadeChannel(0, time, callback);
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
