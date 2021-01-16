import * as PluginChannel from "../../helpers/protocol/PluginChannel";
import {VoiceStatusChangeEvent} from "./VoiceModule";

export class OutgoingVoiceStream {

    constructor(openAudioMc, server, streamKey, micStream) {
        this.openAudioMc = openAudioMc;
        this.server = server;
        this.streamKey = streamKey;
        this.micStream = micStream;
        this.isMuted = false;
        document.getElementById("vc-mic-mute").onclick = () => {
            this.setMute(!this.isMuted)
        };
        this.muteCooldown = false;
    }

    async start(whenFinished) {
        let endpoint = this.server + "webrtc/broadcaster/sdp" +
            "/m/" + tokenCache.publicServerKey +
            "/pu/" + tokenCache.uuid +
            "/pn/" + tokenCache.name +
            "/sk/" + this.streamKey;


        this.pcSender = new RTCPeerConnection({
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302'
                }
            ]
        });

        this.pcSender.addEventListener('connectionstatechange', event => {
            if (this.pcSender.connectionState === 'connected') {
                whenFinished();

                // enable VC mode
                this.openAudioMc.socketModule.send(PluginChannel.RTC_READY, {"enabled": true});
            }
        });

        this.pcSender.onicecandidate = event => {
            if (event.candidate === null) {
                fetch(endpoint, {
                    method: "POST",
                    body: JSON.stringify({"sdp": btoa(JSON.stringify(this.pcSender.localDescription))})
                })
                    .then(response => response.json())
                    .then(response => this.pcSender.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(response.Sdp)))))
                    .catch((e) => {
                        console.error(e);
                        window.location.reload();
                    })
            }
        }

        // gather tracks
        var tracks = this.micStream.getTracks();
        for (var i = 0; i < tracks.length; i++) {
            this.pcSender.addTrack(this.micStream.getTracks()[i]);
        }

        this.pcSender.createOffer().then(d => this.pcSender.setLocalDescription(d))
    }

    setMute(state) {
        if (this.muteCooldown) {
            Swal.fire("Please wait a moment before doing this again")
            return;
        }

        this.muteCooldown = true;
        setTimeout(() => {
            this.muteCooldown = false;
        }, 1500);

        if (state == this.isMuted) return
        for (let i = 0; i < this.micStream.getAudioTracks().length; i++) {
            this.micStream.getAudioTracks()[i].enabled = !state;
        }

        if (state) {
            this.openAudioMc.voiceModule.pushSocketEvent(VoiceStatusChangeEvent.MIC_MUTE);
        } else {
            this.openAudioMc.voiceModule.pushSocketEvent(VoiceStatusChangeEvent.MIC_UNMTE);
        }

        if (state) {
            document.getElementById("vc-mic-mute").classList.remove("bg-green-500");
            document.getElementById("vc-mic-mute").classList.add("bg-red-500");
            document.getElementById("vc-mic-mute").innerText = "Unmute Microphone"
        } else {
            document.getElementById("vc-mic-mute").classList.remove("bg-red-500");
            document.getElementById("vc-mic-mute").classList.add("bg-green-500");
            document.getElementById("vc-mic-mute").innerText = "Mute Microphone"
        }
        this.isMuted = state;
    }

    stop() {
        this.micStream.getTracks().forEach(function (track) {
            track.stop();
        });
        this.pcSender.close();
    }

}
