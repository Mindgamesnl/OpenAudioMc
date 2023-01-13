import {PeerManager} from "./peers/PeerManager";
import {getGlobalState, setGlobalState} from "../../../state/store";
import {makeid} from "../../util/random";
import {getTranslation} from "../../OpenAudioAppContainer";
import {WrappedUserMedia} from "./util/WrappedUserMedia";
import {toast} from "react-toastify";
import {MicrophoneProcessor} from "./processing/MicrophoneProcessor";
import {SocketManager} from "../socket/SocketModule";
import * as PluginChannel from "../../util/PluginChannel";

var gainTrackers = {}

export function untrackVoiceGainNode(id) {
    delete gainTrackers[id];
}

function updateVoiceGain(gainNode) {
    // update node property from VOICECHAT_VOLUME
    gainNode.gain.value = getGlobalState().settings.voicechatVolume / 100;
}

export function trackVoiceGainNode(gainNode) {
    updateVoiceGain(gainNode)
    let id = makeid(5);
    gainTrackers[id] = gainNode
    return id;
}

export const VoiceModule = new class IVoiceModule {

    constructor() {
        this.peerManager = new PeerManager();
        this.peerMap = new Map();
        this.loadedDeviceList = false;
        this.microphoneProcessing = null;
    }

    startVoiceChat() {
        this.showLoadingPopup();

        // try to get the device
        let deviceLoader = new WrappedUserMedia();

        // on success
        deviceLoader.successCallback = (stream) => {
            // update mic cache while we're at it
            navigator.mediaDevices.enumerateDevices()
                .then(devices => {
                    let deviceMap = []
                    for (let i = 0; i < devices.length; i++) {
                        let device = devices[i];
                        if (device.kind === "audioinput") {
                            deviceMap.push({
                                "name": device.label,
                                "id": device.deviceId
                            });
                        }
                    }
                    setGlobalState({voiceState: {mics: deviceMap}});
                })
                .catch((err) => {
                    console.error(err)
                    this.panic()
                });

            // set the stream
            this.microphoneProcessing = new MicrophoneProcessor(stream)

            let startCallback = () => {
                // remove the loading popup
                setGlobalState({loadingOverlay: {visible: false}});
            }

            this.peerManager.connectRtc(startCallback, stream);
        }

        // on fail
        deviceLoader.errorCallback = (error) => {
            // reset the prefered mic, if we had one
            if (error.name === "OverconstrainedError" || error instanceof OverconstrainedError || getGlobalState().settings.preferredMicId) {
                setGlobalState({settings: {preferredMicId: null}})
                // try again
                this.startVoiceChat();
                toast.error('Preferred microphone not available, trying to use default microphone instead.');
                return
            }

            // hide error popup
            setGlobalState({loadingOverlay: {visible: false}});
            toast.error(getTranslation(null, "vc.micErrorPopup"), {autoClose: false});
        }

        deviceLoader.getUserMedia(getGlobalState().settings.preferredMicId);
    }

    panic() {
        setGlobalState({
            loadingOverlay: {
                visible: false
            },
            voiceState: {
                enabled: false
            }
        })
        toast.error("Voice chat has crashed, please reload the page to try again. Feel free to contact support if this keeps happening, as you might have a permission issue.", {autoClose: false});
        console.error(new Error("niet cool"))
    }

    isReady() {
        return getGlobalState().voiceState.ready;
    }

    showLoadingPopup() {
        setGlobalState({
            loadingOverlay: {
                visible: true,
                title: getTranslation(null, "vc.startingPopupTitle"),
                message: getTranslation(null, "vc.startingPopup")
            }
        })
    }

    pushSocketEvent(event) {
        if (this.peerManager != null) {
            SocketManager.send(PluginChannel.RTC_READY, {"event": event});
        }
    }

}()

export const VoiceStatusChangeEvent = {
    MIC_MUTE: "MICROPHONE_MUTED",
    MIC_UNMTE: "MICROPHONE_UNMUTE",
};
