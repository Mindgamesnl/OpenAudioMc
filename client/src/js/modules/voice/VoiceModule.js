import {WrappedUserMedia} from "./WrappedUserMedia";
import {OutgoingVoiceStream} from "./OutgoingVoiceStream";
import {VoicePeer} from "./peer/VoicePeer";
import {oalog} from "../../helpers/log";

export class VoiceModule {

    constructor(openAudioMc) {
        this.openAudioMc = openAudioMc;
        this.streamer = null;
        this.peerMap = new Map();
    }

    enable(server, streamKey, blocksRadius) {
        this.blocksRadius = blocksRadius;
        this.server = server;
        this.streamKey = streamKey;
        // unhide
        document.getElementById("vc-controls").style.display = "";
        document.getElementById("vc-block-range").innerText = this.blocksRadius + " block";
        document.getElementById("vc-concent-button").onclick = () => {
            this.consent(Cookies.get("preferred-mic"));
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

    handleAudioPermissions(stream) {
        showVoiceCard("voice-home");

        navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                let deviceMap = []
                for (let i = 0; i < devices.length; i++){
                    let device = devices[i];
                    if (device.kind == "audiooutput") {
                        deviceNames.push({
                            "name": device.label,
                            "id": device.deviceId
                        })
                    }
                }
                this.loadedDevices(deviceMap)
            })
            .catch(function(err) {
                console.log(err.name + ": " + err.message);
            });

        this.streamer = new OutgoingVoiceStream(this.openAudioMc, this.server, this.streamKey, stream);
        this.streamer.start(this.onOutoingStreamStart).catch(console.error)
    }

    changeInput(deviceId) {
        oalog("Stopping current streamer, and restarting with a diferent user input")
        Cookies.set("preferred-mic", deviceId, { expires: 30 });
        this.streamer.setMute(false);
        this.streamer.stop();
        // re-start
        this.consent(deviceId);
    }

    loadedDevices(deviceMap) {
        let select = document.getElementById("vc-mic-select")
        select.onchange = (event) => {
            let deviceId = event.options[event.selectedIndex].dataset.deviceId;
            this.changeInput(deviceId);
        }

        while (select.options.length > 0) {
            select.remove(0);
        }

        for (let i = 0; i < deviceMap.length; i++) {
            let device = deviceMap[i]
            let option = document.createElement( 'option' );
            option.value = device.name;
            option.dataset.deviceId = device.id
            select.add(option);
        }
    }

    onOutoingStreamStart() {

    }

    consent(preferedDeviceId) {
        let query = {audio: true}
        if (preferedDeviceId) {
            query = {audio: { deviceId: {exact: preferedDeviceId}}}
        }

        // request audio permission and handle that shit
        let wm = new WrappedUserMedia();

        wm.successCallback = function (a) {
            this.openAudioMc.voiceModule.handleAudioPermissions(a)
        }.bind(this);

        wm.errorCallback = function (a) {
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
    }

}

export function showVoiceCard(id) {
    let elements = document.querySelectorAll('[data-type=voice-card]');

    for (let element of elements) {
        element.style.display = "none";
    }

    document.getElementById(id).style.display = "";
}
