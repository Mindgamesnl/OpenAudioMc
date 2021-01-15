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
            this.consent();
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

        this.streamer = new OutgoingVoiceStream(this.openAudioMc, this.server, this.streamKey, stream);
        this.streamer.start(this.onOutoingStreamStart).catch(console.error)
    }

    onOutoingStreamStart() {

    }

    consent() {
        // request audio permission and handle that shit
        let wm = new WrappedUserMedia();

        wm.successCallback = function (a) {
            this.openAudioMc.voiceModule.handleAudioPermissions(a)
        }.bind(this);

        wm.errorCallback = function (a) {
            this.openAudioMc.voiceModule.permissionError(a)
        }.bind(this);

        wm.exec({audio: true})
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
