export function handleClientVolume(openAudioMc, data) {
    const target = data.volume;
    openAudioMc.getMediaManager().setMasterVolume(target);
    document.getElementById("volume-slider").value = target;
}