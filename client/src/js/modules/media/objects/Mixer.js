import {Channel} from "./Channel";

export class Mixer {

    constructor(mixerName) {
        this.mixerName = mixerName;
        this.masterVolume = 100;
        this.channels = new Map();
    }

    setMasterVolume(masterVolume) {
        this.masterVolume = masterVolume;
    }

    removeChannel(channelName) {
        let channel;
        if (channelName in Channel) {
            channel = channelName;
        } else {
            channel = this.channels.get(channelName);
        }

        if (channel != null) {
            channel.destroy();
            this.channels.delete(channelName);
        }
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
            this.channels.put(channelId, channel);
        } else {
            throw new Error("Argument isn't a channel");
        }
    }

}