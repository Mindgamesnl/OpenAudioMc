import {Mixer} from "./objects/Mixer";
import {Channel} from "./objects/Channel";
import {Sound} from "./objects/Sound";
import * as PluginChannel from '../../helpers/protocol/PluginChannel'
import {replaceGlobalText} from "../../helpers/domhelper";

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
            Cookies.set("volume", value, { expires: 30 });
        }
    }

    startVolumeMonitor(oaInstance) {
        let oldVolume = -1;
        setInterval(() => {
            if (oldVolume != this.masterVolume) {
                oldVolume = this.masterVolume;

                // do whatever your ugly heart desires
                oaInstance.socketModule.send(PluginChannel.VOLUME_CHANGED, {
                    "volume": this.masterVolume
                });
            }
        }, 300)
    }

    async setupAmbianceSound(source) {
        // dont do anything if its empty or whatever
        if (source == "" || source == null) return;
        await this.mixer.setupAmbianceSound(source);
    }

    startVolumeWatcher(oaInstance) {
        this.startVolumeMonitor(oaInstance)
    }

    postBoot() {
        if (this.startSound != null) {
            const createdChannel = new Channel("startsound");
            const createdMedia = new Sound();

            createdMedia.openAudioMc = this.openAudioMc;
            createdMedia.setOa(this.openAudioMc);

            createdMedia.load(this.startSound)
                .then(() => {
                    createdChannel.addSound(createdMedia);
                    createdMedia.setOnFinish(() => {
                        setTimeout(() => {
                            this.mixer._updatePlayingSounds();
                        }, 1000)
                    })
                    createdMedia.finalize().then(() => {
                        this.mixer.addChannel(createdChannel);
                        createdChannel.setChannelVolume(100);
                        createdChannel.updateFromMasterVolume();
                        createdMedia.finish();
                    });
                })
        } else {
            setTimeout(() => {
                this.mixer._updatePlayingSounds();
            }, 500)
        }
    }

    destroySounds(soundId, all, instantly, transition) {
        let time = transition;
        if (time == null) {
            time = 500;
        }
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
            replaceGlobalText("{{ oam.volume }}", volume + "(muted)")
        } else {
            replaceGlobalText("{{ oam.volume }}", volume + "%")
        }

        Cookies.set("volume", volume, { expires: 30 });

        this.mixer.setMasterVolume(volume);
    }

    changeVolume(volume) {
        document.getElementById("volume-slider").value = volume;
        this.setMasterVolume(volume);
    }

    getMasterVolume() {
        return this.masterVolume;
    }
}
