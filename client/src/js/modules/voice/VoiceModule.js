import {WrappedUserMedia} from "./WrappedUserMedia";
import {VoicePeer} from "./VoicePeer";
import {oalog} from "../../helpers/log";
import * as PluginChannel from "../../helpers/protocol/PluginChannel";
import {VoiceUiSwitch} from "./ui/VoiceUiSwitch";
import {PeerManager} from "./streaming/PeerManager";
import {RtcClient} from "./streaming/RtcClient";
import {DoBetaWelcome} from "./fun/BetaWelcome";
import {MicrophoneProcessor, MicrophoneStatistics} from "./MicrophoneProcessor";
import {ReportError} from "../../helpers/protocol/ErrorReporter";
import {OpenAudioEnv} from "../../OpenAudioMc";
import {DebugPanel, WhenDebugging} from "../../debug";

export const VoiceStatusChangeEvent = {
    MIC_MUTE: "MICROPHONE_MUTED",
    MIC_UNMTE: "MICROPHONE_UNMUTE",
    LEVEL_WHISPERING: "LEVEL_WHISPERING",
    LEVEL_NORMAL: "LEVEL_NORMAL",
    LEVEL_SHOUTING: "LEVEL_SHOUTING"
};

export class VoiceModule {

    constructor(openAudioMc) {
       this.openAudioMc = openAudioMc;
        this.peerManager = null;
        this.peerMap = new Map();
        this.loadedDeviceList = false;
        this.loadeMicPreference = Cookies.get("preferred-mic");

        this.loudnessDetectionEnabled = false;

        this.surroundSwitch = new VoiceUiSwitch("use-surround", true, (enabled) => {
            this.openAudioMc.socketModule.send(PluginChannel.RTC_READY, {"enabled": false});
            this.useSurround = enabled;
            this.onSurrroundUpdate();
        });

        this.useSurround = this.surroundSwitch.isOn();
    }

    enable(server, streamKey, blocksRadius) {
        this.blocksRadius = blocksRadius;
        this.server = server;
        this.streamKey = streamKey;
        // unhide
        document.getElementById("vc-controls").style.display = "";
        document.getElementById("vc-block-range").innerText = this.blocksRadius + " block";

        document.getElementById("vc-concent-button").onclick = () => {
            this.consent(this.loadeMicPreference);
        };
        showVoiceCard("vc-onboarding")

        DoBetaWelcome()
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
            title: 'Reloading voice system!',
            html: 'Please wait while voice chat gets restarted to apply your new settings.. this shouldn\'t take long',
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
            title: 'Logging into voice chat...',
            html: 'Please wait while we get you setup with a voice server.. hold on tight, shits shouldn\'t take too long.<br /><small>(but please report an issue if it does take too long, it\'s still work in progress after all.</small>',
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

        this.peerManager = new PeerManager(this.openAudioMc, this.server, this.streamKey, stream)
        this.peerManager.setup(this.onOutoingStreamStart).catch((err) => {
            this.handleCrash(JSON.stringify(err.toJSON()))
        })

        // initialize mic processing
        this.microphoneProcessing = new MicrophoneProcessor(this.openAudioMc, this, stream)

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
        this.peerManager = null;

        // wait
        this.openAudioMc.socketModule.send(PluginChannel.RTC_READY, {"enabled": false});
        let timerInterval;
        Swal.fire({
            backdrop: '',
            title: 'Updating microphone!',
            html: 'Please wait while voice chat gets restarted with your new microphone.. this shouldn\'t take long',
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
        showVoiceCard("voice-home");
        Swal.close();
    }

    consent(preferedDeviceId) {
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
        showVoiceCard("vc-onboarding");
        Swal.fire({
            backdrop: '',
            showClass: {
                popup: 'swal2-noanimation',
                backdrop: 'swal2-noanimation'
            },
            icon: 'error',
            title: "Microphone error",
            text: 'Something went wrong while trying to access your microphone. Please press "allow" when your browser asks you for microphone permissions, or visit the wiki for more info.',
            footer: '<a href="https://help.openaudiomc.net/voicechat_troubleshooting">Why do I have this issue?</a>'
        })
    }

    shutDown() {
        document.getElementById("vc-controls").style.display = "none"
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
        document.getElementById("vc-content").classList.add("filter")
        document.getElementById("vc-content").classList.add("blur-md")
        document.getElementById("vc-disabled-overlay").style.display = ""
    }

    unblur() {
        document.getElementById("vc-content").classList.remove("filter")
        document.getElementById("vc-content").classList.remove("blur-md")
        document.getElementById("vc-disabled-overlay").style.display = "none"
    }

}

export function showVoiceCard(id) {
    let elements = document.querySelectorAll('[data-type=voice-card]');

    for (let element of elements) {
        element.style.display = "none";
    }

    document.getElementById(id).style.display = "";
}
