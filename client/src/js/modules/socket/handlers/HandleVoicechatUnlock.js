export function HandleVoiceUnlock(openAudioMc, data) {
    openAudioMc.voiceModule.enable(data.streamServer, data.streamKey, data.radius)
}
