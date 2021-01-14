export class OutgoingVoiceStream {

    constructor(openAudioMc, server, streamKey, micStream) {
        this.openAudioMc = openAudioMc;
        this.server = server;
        this.streamKey = streamKey;
        this.micStream = micStream;
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

}
