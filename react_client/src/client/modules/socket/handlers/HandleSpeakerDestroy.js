export function handleSpeakerDestroy(openAudioMc, data) {
// speaker out of range
    const speaker = data.clientSpeaker;
    openAudioMc.world.removeSpeaker(speaker.id);
}