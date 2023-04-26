import {Mixer} from "./objects/Mixer";
import {Channel} from "./objects/Channel";
import {Sound} from "./objects/Sound";
import {getGlobalState, store} from "../../../state/store";
import {SocketManager} from "../socket/SocketModule";
import * as PluginChannel from "../../util/PluginChannel";
import {debugLog} from "../debugging/DebugService";

export const MediaManager = new class IMediaManager {

    constructor() {
        this.sounds = {};
        this.startSound = null;
        this.mixer = new Mixer(null);

        var lastVolume = 0;
        store.subscribe((e) => {
            if (store.getState().settings.normalVolume === null) return;
            if (lastVolume !== store.getState().settings.normalVolume) {
                lastVolume = store.getState().settings.normalVolume;
                this.setMasterVolume(store.getState().settings.normalVolume);
            }
        });

        this.postBoot = this.postBoot.bind(this);
        this.startVolumeMonitor();
    }

    startVolumeMonitor() {
        let oldVolume = -1;
        setInterval(() => {
            let currentVolume = getGlobalState().settings.normalVolume;
            if (oldVolume !== currentVolume) {
                oldVolume = currentVolume;
                SocketManager.send(PluginChannel.VOLUME_CHANGED, {
                    "volume": currentVolume
                })
            }
        }, 1000)
    }

    async setupAmbianceSound(source) {
        // dont do anything if its empty or whatever
        if (source === "" || source == null) return;
        await this.mixer.setupAmbianceSound(source);
    }

    postBoot() {
        if (this.startSound != null) {
            const createdChannel = new Channel("startsound");
            const createdMedia = new Sound();

            createdChannel.mixer = this.mixer;
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

    destroySounds(soundId, all, instantly, transition, atTheEnd = function () {}) {
        debugLog("Destroying sounds", soundId, all, instantly, transition, atTheEnd)
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
                            atTheEnd();
                        };

                        channel.fadeChannel(0, time, callback);
                    }
                }
            }
        }
    }

    setMasterVolume(volume) {
        this.mixer.bumpVolumeChange(volume);
    }
}()
