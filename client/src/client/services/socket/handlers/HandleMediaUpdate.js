import {MediaManager} from "../../media/MediaManager";

export function handleMediaUpdate(data) {
    // old for old versions
    function convertDistanceToVolume(maxDistance, currentDistance) {
        return Math.round(((maxDistance - currentDistance) / maxDistance) * 100);
    }

    const id = data.mediaOptions.target;
    const fadeTime = data.mediaOptions.fadeTime;
    const distance = data.mediaOptions.distance;
    const reApplyVolume = data.mediaOptions.reApplyVolume;
    const newVolume = data.mediaOptions.volume;

    for (let channel of MediaManager.mixer.getChannels()) {
        if (channel.hasTag(id)) {
            if (reApplyVolume) {
                // update master volume
                console.log("Updating volume for channel " + id + " to " + newVolume +", possibly due to region change");
                channel.fadeChannel(newVolume, fadeTime);
            } else {
                // only update distance
                channel.fadeChannel(convertDistanceToVolume(channel.maxDistance, distance), fadeTime);
            }
        }
    }
}