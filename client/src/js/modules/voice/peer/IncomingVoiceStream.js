export class IncomingVoiceStream {

    constructor(openAudioMc, server, streamKey, peerStreamKey) {
        this.openAudioMc = openAudioMc;
        this.server = server;
        this.streamKey = streamKey;
        this.peerStreamKey = peerStreamKey;
    }

    async start(whenFinished) {
        let endpoint = this.server + "webrtc/listener/sdp" +
            "/m/" + tokenCache.publicServerKey +
            "/pu/" + tokenCache.uuid +
            "/pn/" + tokenCache.name +
            "/tg/" + this.peerStreamKey +
            "/sk/" + this.streamKey;



        this.pcReceiver = new RTCPeerConnection({
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302'
                }
            ]
        });


        this.pcReceiver.addEventListener('connectionstatechange', event => {
            if (this.pcReceiver.connectionState === 'connected') {
                whenFinished();
            }
        });

        this.pcReceiver.onicecandidate = event => {
            if (event.candidate === null) {
                fetch(endpoint, {
                    method: "POST",
                    body: JSON.stringify({"sdp": btoa(JSON.stringify(this.pcReceiver.localDescription))})
                })
                    .then(response => response.json())
                    .then(response => this.pcReceiver.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(response.Sdp)))))
                    .catch((e) => {
                        console.error(e);
                        window.location.reload();
                    })
            }
        };

        this.pcReceiver.addTransceiver('audio', {'direction': 'recvonly'})

        this.pcReceiver.createOffer().then(d => this.pcReceiver.setLocalDescription(d))

        this.pcReceiver.ontrack = function (event) {
            var receiverVideo = document.createElement('audio')
            receiverVideo.srcObject = event.streams[0]
            receiverVideo.autoplay = true;
            receiverVideo.controls = true;
        }
    }

}
