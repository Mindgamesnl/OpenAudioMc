import {setGlobalState} from "../../../../../state/store";
import {toast} from "react-toastify";

export function HandleVoiceUnlock(data) {

    // check if voice is even enabled
    if (RTCPeerConnection == null) {
        toast.error('Your browser doesn\'t  support WebRTC, or it could be that a plugin or manual setting disabled it. OpenAudioMc promises only to use WebRTC for its intended purposes (serve media). Please check your browser settings and plugins, and then try again once you enabled it.', {
            position: "top-center",
            autoClose: 60000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        return
    }

    setGlobalState({
        voiceState: {
            enabled: true,
            streamServer: data.streamServer,
            streamKey: data.streamKey,
            radius: data.radius,
            serverHasModeration: data.hasModeration
        }
    })
}
