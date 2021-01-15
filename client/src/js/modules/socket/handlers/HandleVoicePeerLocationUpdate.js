export function HandleVoicePeerLocationUpdate(openAudioMc, data) {
    for (let i = 0; i < data.updateSet.length; i++) {
        let update = data.updateSet[i];
        openAudioMc.voiceModule.peerLocationUpdate(update.streamKey, update.x, update.y, update.z);
    }
}
