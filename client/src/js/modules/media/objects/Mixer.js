import {Channel} from "./Channel";
import * as PluginChannel from "../../../helpers/PluginChannel";

export class Mixer {

    constructor(mixerName, main) {
        this.openAudioMc = main;
        this.mixerName = mixerName;
        this.masterVolume = 100;
        this.channels = new Map();
    }

    updateCurrent() {
        let current = [];
        this.channels.forEach((channel, key) => {
            let tags = [];
            channel.tags.forEach((value, tag) => {
                tags.push(tag);
            });

            current.push({
                "name": key,
                "tags": tags
            });
        });

        this.openAudioMc.socketModule.send(PluginChannel.CHANNELS_UPDATED, {
            "tracks": current
        });
    }

    setMasterVolume(masterVolume) {
        this.masterVolume = masterVolume;
        for (let channel of this.channels.values()) {
            channel.updateFromMasterVolume();
        }
    }

    removeChannel(channelName) {
        let channel;
        if (channelName instanceof Channel) {
            channel = channelName;
        } else {
            channel = this.channels.get(channelName);
        }

        if (channel != null) {
            channel.destroy();
            this.channels.delete(channel.channelName);
        }

        this.updateCurrent();
    }

    getChannels() {
        return this.channels.values();
    }

    addChannel(channel) {
        if (channel instanceof Channel) {
            const channelId = channel.channelName;
            const existingChannel = this.channels.get(channelId);
            if (existingChannel != null) {
                existingChannel.destroy();
            }
            channel.registerMixer(this);
            this.channels.set(channelId, channel);
        } else {
            throw new Error("Argument isn't a channel");
        }
    }

}