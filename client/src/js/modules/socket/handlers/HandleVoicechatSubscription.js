export function HandleVoiceChatSubscription(openAudioMc, data) {
    openAudioMc.voiceModule.addPeer(data.targetUuid, data.targetPlayerName, data.targetStreamKey);
}
