import * as PluginChannel from "../../../helpers/protocol/PluginChannel";
import {VoiceStatusChangeEvent} from "../VoiceModule";
import {oalog} from "../../../helpers/log";

export class OutgoingVoiceStream {

    constructor(openAudioMc, server, streamKey, micStream) {
        this.openAudioMc = openAudioMc;
        this.server = server;
        this.streamKey = streamKey;
        this.micStream = micStream;
        this.isMuted = false;
        document.getElementById("vc-mic-mute").onchange = () => {
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

        oalog("Starting stream")


        this.pcSender = new RTCPeerConnection({
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302'
                }
            ]
        });

        this.pcSender.onconnectionstatechange = (event) => {
            console.log("state " + this.pcSender.connectionState)
            oalog("State change " + this.pcSender.connectionState + " for " + this.streamKey)
        };

        let started = false;
        let kickoff = (event) => {
            if (this.pcSender.connectionState === 'connected' || event.target.iceConnectionState === 'connected') {
                if (started) return;
                started = true;
                oalog("Finished handshake for" + this.streamKey);
                whenFinished();
                // enable VC mode
                this.openAudioMc.socketModule.send(PluginChannel.RTC_READY, {"enabled": true});
            }
        }

        this.pcSender.oniceconnectionstatechange = kickoff
        this.pcSender.addEventListener('connectionstatechange', kickoff);

        this.pcSender.onicecandidate = event => {
            oalog("Candidate event for " + this.streamKey + " nc " + (event.target == null));
        }

        this.pcSender.onnegotiationneeded = (event) => {
            oalog("Negotiation ended for " + this.streamKey);
        }

        const tracks = this.micStream.getTracks();
        for (let i = 0; i < tracks.length; i++) {
            this.pcSender.addTrack(this.micStream.getTracks()[i]);
        }

        this.pcSender.createOffer()
            .then(d => this.pcSender.setLocalDescription(d))
            .then(() => {
                fetch(endpoint, {
                    method: "POST",
                    body: JSON.stringify({"sdp": btoa(JSON.stringify(this.pcSender.localDescription))})
                })
                    .then(response => response.json())
                    .then(response => {
                        this.pcSender.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(response.Sdp))))
                    })
                    .catch((e) => {
                        console.error(e);
                        // window.location.reload();
                    })
            })
            .catch(console.error)
    }

    setMute(state) {
        if (this.muteCooldown) {
            Swal.fire("Please wait a moment before doing this again");
            return;
        }
        this.isMuted = state;
        this.muteCooldown = true;
        document.getElementById("vc-mic-mute").disabled = true;
        setTimeout(() => {
            this.muteCooldown = false;
            document.getElementById("vc-mic-mute").disabled = false;
        }, 1500);

        for (let i = 0; i < this.micStream.getAudioTracks().length; i++) {
            this.micStream.getAudioTracks()[i].enabled = !state;
        }
        if (state) {
            this.openAudioMc.voiceModule.pushSocketEvent(VoiceStatusChangeEvent.MIC_MUTE);
        } else {
            this.openAudioMc.voiceModule.pushSocketEvent(VoiceStatusChangeEvent.MIC_UNMTE);
        }
    }

    stop() {
        this.micStream.getTracks().forEach(function (track) {
            track.stop();
        });
        this.pcSender.close();
    }

}
