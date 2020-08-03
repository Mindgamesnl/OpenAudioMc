import {Channel} from "../../media/objects/Channel";
import {Sound} from "../../media/objects/Sound";

export function handleCreateMedia(openAudioMc, data) {
    const looping = data.media.loop;
    const startInstant = data.media.startInstant;
    const id = data.media.mediaId;
    const source = data.media.source;
    const doPickup = data.media.doPickup;
    const fadeTime = data.media.fadeTime;
    const distance = data.distance;
    const flag = data.media.flag;
    const maxDistance = data.maxDistance;
    let volume = 100;

    // only if its a new version and provided, then use that volume
    if (data.media.volume != null && data.media.volume != 0) {
        volume = data.media.volume;
    }

    // attempt to stop the existing one, if any
    openAudioMc.getMediaManager().destroySounds(id, false, true);

    const createdChannel = new Channel(id);
    createdChannel.trackable = true;
    const createdMedia = new Sound(source);
    createdMedia.openAudioMc = openAudioMc;
    createdMedia.setOa(openAudioMc);
    openAudioMc.getMediaManager().mixer.addChannel(createdChannel);
    createdChannel.addSound(createdMedia);
    createdChannel.setChannelVolume(0);
    createdMedia.setLooping(looping);
    createdChannel.setTag(id);

    // convert distance
    if (maxDistance !== 0) {
        let startVolume = this.convertDistanceToVolume(maxDistance, distance);
        createdChannel.setTag("SPECIAL");
        createdChannel.maxDistance = maxDistance;
        createdChannel.fadeChannel(startVolume, fadeTime);
    } else {
        // default sound, just play
        createdChannel.setTag("DEFAULT");
        setTimeout(() => {
            if (fadeTime === 0) {
                createdChannel.setChannelVolume(volume);
                createdChannel.updateFromMasterVolume();
            } else {
                createdChannel.updateFromMasterVolume();
                createdChannel.fadeChannel(volume, fadeTime);
            }
        }, 1);
    }
    createdChannel.setTag(flag);
    openAudioMc.getMediaManager().mixer.updateCurrent();

    createdMedia.finalize().then(() => {
        if (doPickup) createdMedia.startDate(startInstant, true);
        createdMedia.finish();
    });
}