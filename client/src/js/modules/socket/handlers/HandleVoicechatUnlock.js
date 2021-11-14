import {OpenAudioEnv} from "../../../OpenAudioMc";
import {EnableDebugMode} from "../../../debug";
import {OpenModal} from "../../../helpers/modal";
import {AlertBox} from "../../ui/Notification";

export function HandleVoiceUnlock(openAudioMc, data) {

    // check if voice is even enabled
    if (RTCPeerConnection == null) {
        OpenModal('Your browser doesn\'t  support WebRTC, or it could be that a plugin or manual setting disabled it. OpenAudioMc promises only to use WebRTC for its intended purposes (serve media). Please check your browser settings and plugins, and then try again once you enabled it.', {
            title: "WebRTC error!",
            icon: "error"
        }).then(r => {})
        return
    }

    // // forcefully enable debug mode since this is a beta feature
    // if (OpenAudioEnv.isProd) {
    //     // still enable it
    //     OpenAudioEnv.isProd = false;
    //     EnableDebugMode()
    // }

    openAudioMc.voiceModule.enable(data.streamServer, data.streamKey, data.radius)

    new AlertBox('#alert-area', {
        closeTime: 60000,
        persistent: false,
        hideCloseButton: true,
    }).show(getMessageString("notification.info.voicechat"));
}

window.enableOpenAudioDebugMode = function () {
    OpenAudioEnv.isProd = false;
    EnableDebugMode()
}
