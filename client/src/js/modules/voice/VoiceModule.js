import {WrappedUserMedia} from "./WrappedUserMedia";
import {OutgoingVoiceStream} from "./OutgoingVoiceStream";
import {VoicePeer} from "./peer/VoicePeer";
import {oalog} from "../../helpers/log";
import * as PluginChannel from "../../helpers/protocol/PluginChannel";

export const VoiceStatusChangeEvent = {
    MIC_MUTE: "MICROPHONE_MUTED",
    MIC_UNMTE: "MICROPHONE_UNMUTE"
};

export class VoiceModule {

    constructor(openAudioMc) {
        this.openAudioMc = openAudioMc;
        this.streamer = null;
        this.peerMap = new Map();
        this.loadedDeviceList = false;
        this.loadeMicPreference = Cookies.get("preferred-mic");
        this.useSurround = (Cookies.get("use-surround") == null ? true : JSON.parse(Cookies.get("use-surround")));
        document.getElementById("vc-use-surround").checked = !this.useSurround;
        document.getElementById("vc-use-surround").onclick = () => {
            this.toggleSurround();
        };
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
    }

    addPeer(playerUuid, playerName, playerStreamKey, location) {
        oalog("Trying to add peer " + playerName);
        this.peerMap.set(playerStreamKey, new VoicePeer(this.openAudioMc, playerName, playerUuid, playerStreamKey, this.server, location));
    }

    peerLocationUpdate(peerStreamKey, x, y, z) {
        if (this.peerMap.has(peerStreamKey)) {
            this.peerMap.get(peerStreamKey).updateLocation(x, y, z);
        }
    }

    removePeer(key) {
        if (this.peerMap.has(key)) {
            oalog("Removing peer " + key)
            this.peerMap.get(key).stop();
            this.peerMap.delete(key);
        } else {
            oalog("Couldn't remove peer " + key + " because, well, there is no such peer")
        }
    }

    toggleSurround() {
        // wait
        this.openAudioMc.socketModule.send(PluginChannel.RTC_READY, {"enabled": false});
        this.useSurround = !this.useSurround;
        Cookies.set("use-surround", this.useSurround, {expires: 30});
        let timerInterval;
        Swal.fire({
            title: 'Reloading voice system!',
            html: 'Please wait while voice chat gets restarted to apply your new settings.. this shouldn\'t take long',
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
                this.openAudioMc.socketModule.send(PluginChannel.RTC_READY, {"enabled": true});
            }
        })
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
                .catch(function (err) {
                    console.error(err)
                });
            this.loadedDeviceList = true;
        }

        Swal.fire({
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

        this.streamer = new OutgoingVoiceStream(this.openAudioMc, this.server, this.streamKey, stream);
        this.streamer.start(this.onOutoingStreamStart).catch(console.error)
    }

    changeInput(deviceId) {
        oalog("Stopping current streamer, and restarting with a diferent user input")
        Cookies.set("preferred-mic", deviceId, {expires: 30});
        this.streamer.setMute(false);
        this.streamer.stop();
        this.streamer = null;

        // wait
        this.openAudioMc.socketModule.send(PluginChannel.RTC_READY, {"enabled": false});
        let timerInterval;
        Swal.fire({
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
        let query = {audio: true}
        if (preferedDeviceId) {
            query = {
                audio:
                    {
                        deviceId: {exact: preferedDeviceId},
                        noiseSuppression: false,
                        sampleRate: 64000,
                        echoCancellation: false,
                        autoGainControl: false,
                    }
            }
        } else {
            query = {
                audio:
                    {
                        noiseSuppression: false,
                        sampleRate: 64000,
                        echoCancellation: false,
                        autoGainControl: false,
                    }
            }
        }

        // request audio permission and handle that shit
        let wm = new WrappedUserMedia();

        wm.successCallback = function (a) {
            this.openAudioMc.voiceModule.handleAudioPermissions(a)
        }.bind(this);

        wm.errorCallback = function (a) {
            console.error(a)
            this.openAudioMc.voiceModule.permissionError(a)
        }.bind(this);

        wm.getUserMedia(query)
    }

    permissionError() {
        showVoiceCard("vc-onboarding");
        Swal.fire({
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
        if (this.streamer != null) {
            this.streamer.stop()
        }
        for (let [key, value] of this.peerMap) {
            value.stop();
        }
    }

    pushSocketEvent(event) {
        if (this.streamer != null) {
            this.openAudioMc.socketModule.send(PluginChannel.RTC_READY, {"event": event});
        }
    }

}

export function showVoiceCard(id) {
    let elements = document.querySelectorAll('[data-type=voice-card]');

    for (let element of elements) {
        element.style.display = "none";
    }

    document.getElementById(id).style.display = "";
}
