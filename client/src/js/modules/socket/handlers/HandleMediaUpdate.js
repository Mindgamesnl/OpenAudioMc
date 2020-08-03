export function handleMediaUpdate(openAudioMc, data) {
    // old for old versions
    function convertDistanceToVolume(maxDistance, currentDistance) {
        return Math.round(((maxDistance - currentDistance) / maxDistance) * 100);
    }

    const id = data.mediaOptions.target;
    const fadeTime = data.mediaOptions.fadeTime;
    const distance = data.mediaOptions.distance;

    for (let channel of openAudioMc.getMediaManager().mixer.getChannels()) {
        if (channel.hasTag(id)) {
            channel.fadeChannel(convertDistanceToVolume(channel.maxDistance, distance), fadeTime);
        }
    }
}