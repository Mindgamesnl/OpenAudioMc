import {WrappedUserMedia} from "./util/WrappedUserMedia";
import {VoicePeer} from "./streaming/VoicePeer";
import {oalog} from "../../helpers/log";
import * as PluginChannel from "../../helpers/protocol/PluginChannel";
import {VoiceUiSwitch} from "./ui/VoiceUiSwitch";
import {PeerManager} from "./streaming/PeerManager";
import {MicrophoneProcessor} from "./processing/MicrophoneProcessor";
import {ReportError} from "../../helpers/protocol/ErrorReporter";
import {DebugPanel, WhenDebugging} from "../../debug";
import {replaceGlobalText, replaceProperty} from "../../helpers/domhelper";
import {VoicePeerUi} from "./ui/VoicePeerUi";
import {makeid} from "../../helpers/libs/random";
import {SETTING_STATES} from "../settings/SettingsManager";

export const VoiceStatusChangeEvent = {
    MIC_MUTE: "MICROPHONE_MUTED",
    MIC_UNMTE: "MICROPHONE_UNMUTE",
};

export let VOICECHAT_VOLUME = 0;

var gainTrackers = {}

export function untrackGainNode(id) {
    oalog("Untracking gain " + id)
    delete gainTrackers[id];
}

function updateGain(gainNode) {
    // update node property from VOICECHAT_VOLUME
    gainNode.gain.value = VOICECHAT_VOLUME / 100;
}

export function trackGainNode(gainNode) {
    updateGain(gainNode)
    let id = makeid(5);
    gainTrackers[id] = gainNode
    return id;
}


export class VoiceModule {

    constructor(openAudioMc) {
       this.openAudioMc = openAudioMc;
        this.peerManager = null;
        this.peerMap = new Map();
        this.loadedDeviceList = false;
        this.loadeMicPreference = Cookies.get("preferred-mic");
        VOICECHAT_VOLUME = (Cookies.get("vc-volume") != null ? Cookies.get("vc-volume") : 100);

        this.volumeSlider = document.getElementById("vc-volume-slider");
        this.volumeSlider.value = VOICECHAT_VOLUME;
        this.volumeSlider.oninput = (e) => {
            VOICECHAT_VOLUME = e.target.value;
            replaceGlobalText("{{ oam.vc.volume }}", VOICECHAT_VOLUME + "%")
            for (let pannerTrackersKey in gainTrackers) {
                updateGain(gainTrackers[pannerTrackersKey])
            }
            Cookies.set("vc-volume", VOICECHAT_VOLUME)
        }
        replaceGlobalText("{{ oam.vc.volume }}", VOICECHAT_VOLUME + "%")

        oalog("Booted voice module")
    }

    enable(server, streamKey, blocksRadius) {
        this.surroundSwitch = new VoiceUiSwitch("use-surround", true, (enabled) => {
                this.openAudioMc.socketModule.send(PluginChannel.RTC_READY, {"enabled": false});
                this.useSurround = enabled;
                this.onSurrroundUpdate();
            },
            getMessageString("vc.settingsDisablePositionalAudio"),
            getMessageString("vc.settingsEnablePositionalAudio"));

        this.useSurround = this.surroundSwitch.isOn();

        this.blocksRadius = blocksRadius;
        this.server = server;
        this.streamKey = streamKey;
        // unhide

        document.getElementById("voicechat-onboarding").classList.remove("super-hidden")
        replaceGlobalText("{{ vc.onboarding }}", window.getMessageString("vc.onboarding", [["%range", this.blocksRadius + ""]]))

        document.getElementById("vc-connect-button").onclick = () => {
            replaceProperty("{{ navbar.vc_button }}", "", "style")
            this.consent(this.loadeMicPreference);
            document.getElementById("open-voice-tab").click();
        };
    }

    addPeer(playerUuid, playerName, playerStreamKey, location) {
        this.peerMap.set(playerStreamKey, new VoicePeer(this.openAudioMc, playerName, playerUuid, playerStreamKey, this.server, location));
    }

    peerLocationUpdate(peerStreamKey, x, y, z) {
        if (this.peerMap.has(peerStreamKey)) {
            this.peerMap.get(peerStreamKey).updateLocation(x, y, z);
        }
    }

    removeAllPeers() {
        for (let [key, value] of this.peerMap) {
            this.removePeer(key);
        }
    }

    removePeer(key) {
        if (this.peerMap.has(key)) {
            let instance = this.peerMap.get(key)
            this.peerMap.delete(key);
            instance.stop();
        } else {
            oalog("Couldn't remove peer " + key + " because, well, there is no such peer")
        }
    }

    onSurrroundUpdate() {
        // wait
        this.openAudioMc.socketModule.send(PluginChannel.RTC_READY, {"enabled": false});
        let timerInterval;



        Swal.fire({
            title: window.getMessageString("vc.reloadingPopupTitle"),
            html: window.getMessageString("vc.reloadingPopup"),
            timer: 3500,
            showCloseButton: false,
            backdrop: '',
            showCancelButton: false,
            timerProgressBar: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            didOpen: () => {
                Swal.showLoading();
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                // restart
                this.openAudioMc.socketModule.send(PluginChannel.RTC_READY, {"enabled": true});
            }
        })
    }

    handleCrash(error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong while starting your voice chat session. Please report this problem and try again later.',
            backdrop: '',
        })
        ReportError('Something went wrong while enabling voicechat. Error: ' + error, window.tokenCache.name)
    }

    handleAudioPermissions(stream) {
        document.getElementById("voice-settings-container").style.display = "";

        if (!this.loadedDeviceList) {
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
                    this.loadedDevices(deviceMap)
                })
                .catch((err) => {
                    console.error(err)
                    this.handleCrash(JSON.stringify(err.toJSON()))
                });
            this.loadedDeviceList = true;
        }

        Swal.fire({
            backdrop: '',
            title: window.getMessageString("vc.startingPopupTitle"),
            html: window.getMessageString("vc.startingPopup"),
            showCloseButton: false,
            showCancelButton: false,
            timerProgressBar: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            didOpen: () => {
                Swal.showLoading();
            }
        })

        // initialize mic processing
        this.microphoneProcessing = new MicrophoneProcessor(this.openAudioMc, this, stream)

        this.peerManager = new PeerManager(this.openAudioMc, this.server, this.streamKey, stream, this.microphoneProcessing)
        this.peerManager.setup(this.onOutoingStreamStart).catch((err) => {
            this.handleCrash(JSON.stringify(err.toJSON()))
        })

        WhenDebugging(() => {
            oalog("Enabling rtc debugging")
            window.debugUi.addPanel(DebugPanel.RTC, () => {
                return "waitingPromises=" + this.peerManager.waitingPromises.size +
                    ", trackQueue=" + this.peerManager.trackQueue.size +
                    ", state=" + this.peerManager.pcReceiver.connectionState +
                    ", ice=" + this.peerManager.pcReceiver.iceConnectionState +
                    ", isSpeaking=" + this.microphoneProcessing.isSpeaking +
                    ", transceivers=" + this.peerManager.pcReceiver.getTransceivers().length +
                    ", muxPolicy=" + this.peerManager.pcReceiver.getConfiguration().rtcpMuxPolicy
            })
        })
    }

    changeInput(deviceId) {
        oalog("Stopping current streamer, and restarting with a diferent user input")
        Cookies.set("preferred-mic", deviceId, {expires: 30});
        this.peerManager.setMute(false);
        this.peerManager.stop();
        this.microphoneProcessing.stop()
        this.peerManager = null;

        // wait
        this.openAudioMc.socketModule.send(PluginChannel.RTC_READY, {"enabled": false});
        let timerInterval;
        Swal.fire({
            backdrop: '',
            title: window.getMessageString("vc.updatingMicPopupTitle"),
            html: window.getMessageString("vc.updatingMicPopup"),
            timer: 3500,
            showCloseButton: false,
            showCancelButton: false,
            timerProgressBar: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            didOpen: () => {
                Swal.showLoading();
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                // restart
                this.consent(deviceId);
            }
        })
    }

    loadedDevices(deviceMap) {
        let select = document.getElementById("vc-mic-select");

        while (select.options.length > 0) {
            select.remove(0);
        }

        for (let i = 0; i < deviceMap.length; i++) {
            let device = deviceMap[i]
            let option = document.createElement('option');
            if (this.loadeMicPreference == null && i == 0) {
                option.selected = true;
            }
            option.value = device.id;
            option.innerText = device.name;
            option.dataset.deviceId = device.id;
            select.add(option);
        }

        if (this.loadeMicPreference != null) {
            select.value = this.loadeMicPreference;
        }

        select.onchange = (event) => {
            let deviceId = event.target.value;
            this.changeInput(deviceId);
        };
    }

    onOutoingStreamStart() {
        Swal.close();
    }

    consent(preferedDeviceId) {
        document.getElementById("voicechat-onboarding").style.display = "none";

        let query
        if (preferedDeviceId) {
            query = {
                audio:
                    {
                        deviceId: {exact: preferedDeviceId},
                        noiseSuppression: true,
                        // sampleRate: 64000,
                        echoCancellation: false,
                        autoGainControl: false,
                        channelCount: 1,
                    }
            }
        } else {
            query = {
                audio:
                    {
                        noiseSuppression: true,
                        // sampleRate: 64000,
                        echoCancellation: false,
                        autoGainControl: false,
                        channelCount: 1,
                    }
            }
        }

        // request audio permission and handle that shit
        let wm = new WrappedUserMedia();

        wm.successCallback = function (a) {
            this.openAudioMc.voiceModule.handleAudioPermissions(a)
        }.bind(this);

        wm.errorCallback = function (a) {

            // if there is a preference, try again without one
            if (preferedDeviceId != null) {
                Cookies.remove("preferred-mic")
                this.consent(null);
                return;
            }

            console.error(a)
            if (a.name === "OverconstrainedError" || a instanceof OverconstrainedError) {
                oalog("Couldn't get microphone, ignoring and trying again")
                this.consent(null);
                return
            }

            this.openAudioMc.voiceModule.permissionError(a)
        }.bind(this);

        wm.getUserMedia(query)
    }

    permissionError() {
        replaceProperty("{{ navbar.vc_button }}", "displey: none;", "style")
        document.getElementById("tab1").click();
        Swal.fire({
            backdrop: '',
            showClass: {
                popup: 'swal2-noanimation',
                backdrop: 'swal2-noanimation'
            },
            icon: 'error',
            title: window.getMessageString("vc.micErrorPopupTitle"),
            text: window.getMessageString("vc.micErrorPopup"),
            footer: '<a href="https://help.openaudiomc.net/voicechat_troubleshooting">Why do I have this issue?</a>'
        })
    }

    shutDown() {
        if (this.peerManager != null) {
            this.peerManager.stop()
        }
        if (this.microphoneProcessing != null) {
            this.microphoneProcessing.stop()
        }
        for (let [key, value] of this.peerMap) {
            value.stop();
        }
    }

    pushSocketEvent(event) {
        if (this.peerManager != null) {
            // TODO: refactor from RTC_READY to an actual event packet :)
            this.openAudioMc.socketModule.send(PluginChannel.RTC_READY, {"event": event});
        }
    }

    blurWithReason(reason) {
        // set message with server name
        replaceGlobalText("{{ oam.vc.disabled }}", window.getMessageString("vc.disabled"), [["%server", this.openAudioMc.serverName]])
    }

    unblur() {
        // todo?
    }

}
