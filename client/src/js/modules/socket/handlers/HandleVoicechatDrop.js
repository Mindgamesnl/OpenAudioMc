export function HandleVoiceChatDrop(openAudioMc, data) {
    openAudioMc.voiceModule.removePeer(data.streamKey)
}
