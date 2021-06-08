export function handleClientBlur(openAudioMc, data) {
    if (data.blurred) {
        openAudioMc.voiceModule.blurWithReason()
    } else {
        openAudioMc.voiceModule.unblur()
    }
}