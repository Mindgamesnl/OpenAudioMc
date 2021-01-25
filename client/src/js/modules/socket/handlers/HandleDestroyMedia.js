export function handleDestroyMedia(openAudioMc, data) {
    openAudioMc.getMediaManager().destroySounds(data.soundId, data.all, false, data.fadeTime);
}