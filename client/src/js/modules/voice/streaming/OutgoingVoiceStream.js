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
        document.getElementById("mute-wrapper").addEventListener('mouseup', e => {
            if (this.muteCooldown) {
                Swal.fire({
                    icon: 'warning',
                    text: "Please wait a moment before doing this again",
                    backdrop: '',
                    timer: 3000,
                });
            }
        });
        this.muteCooldown = false;
    }

    async start(whenFinished) {
        let endpoint = this.server + "webrtc/broadcaster/sdp" +
            "/m/" + tokenCache.publicServerKey +
            "/pu/" + tokenCache.uuid +
            "/pn/" + tokenCache.name +
            "/sk/" + this.streamKey;

        oalog("Starting stream")


        this.pcSender = new RTCPeerConnection();

        this.pcSender.onconnectionstatechange = (event) => {
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

        this.pcSender.onicecandidateerror = (event) => {
            this.openAudioMc.sendError('Oh no, this wasn\'t supposed to happen at all! something went wrong while connecting you to the voice server.' + "\n" +
                'Please report this as a bug with the following details.<br /><b>Code: </b>' + event.errorCode + '' + "\n" +
                '<br /><b>Side: </b>' + 'BROADCASTER' + "\n" +
                '<br /><b>Context: </b>' + event.errorText + "\n" +
                '<br /><b>RUI: </b>' + event.url + "\n" +
                '<br /><b>HC: </b>' + event.hostCandidate + "\n" +
                "hostname=" + window.location.host + "\n" +
                "useragent=" + window.navigator.userAgent
            );

            console.log('Oh no, this wasn\'t supposed to happen at all! something went wrong while connecting you to the voice server.' +
                'Please report this as a bug with the following details.<br /><b>Code: </b>' + event.errorCode + '' +
                '<br /><b>Side: </b>' + 'BROADCASTER' +
                '<br /><b>Context: </b>' + event.errorText +
                '<br /><b>RUI: </b>' + event.url +
                '<br /><b>HC: </b>' + event.hostCandidate)
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
