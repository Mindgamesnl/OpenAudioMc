import {OpenAudioEnv} from "../../../OpenAudioMc";
import {EnableDebugMode} from "../../../debug";

export function HandleVoiceUnlock(openAudioMc, data) {

    // check if voice is even enabled
    if (RTCPeerConnection == null) {
        Swal.fire({
            backdrop: '',
            showClass: {
                popup: 'swal2-noanimation',
                backdrop: 'swal2-noanimation'
            },
            icon: 'error',
            title: "WebRTC is disabled!",
            text: 'Your browser doesn\'t  support WebRTC, or it could be that a plugin or manual setting disabled it. OpenAudioMc promises only to use WebRTC for its intended purposes (serve media). Please check your browser settings and plugins, and then try again once you enabled it.'
        })
        return
    }

    // // forcefully enable debug mode since this is a beta feature
    // if (OpenAudioEnv.isProd) {
    //     // still enable it
    //     OpenAudioEnv.isProd = false;
    //     EnableDebugMode()
    // }

    openAudioMc.voiceModule.enable(data.streamServer, data.streamKey, data.radius)
}

window.enableOpenAudioDebugMode = function () {
    OpenAudioEnv.isProd = false;
    EnableDebugMode()
}
