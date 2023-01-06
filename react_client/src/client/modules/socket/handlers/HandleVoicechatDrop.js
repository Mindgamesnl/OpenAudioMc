export function HandleVoiceChatDrop(openAudioMc, data) {

    if (data.streamKey == null) {
        // fuck them all
        openAudioMc.voiceModule.removeAllPeers()
    } else {
        // remove one peer
        openAudioMc.voiceModule.removePeer(data.streamKey)
    }
}
