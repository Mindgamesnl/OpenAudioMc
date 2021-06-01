import {OpenAudioEnv} from "../../../OpenAudioMc";
import {EnableDebugMode} from "../../../debug";

export function HandleVoiceUnlock(openAudioMc, data) {

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
