import {oalog} from "../../../helpers/log";
import {RtcPacket} from "../protocol";

export class PeerManager {

    constructor(openAudioMc, server, streamKey) {
        this.openAudioMc = openAudioMc;
        this.server = server;
        this.streamKey = streamKey;
    }

    onStart() {
        oalog("Confluence started")
    }

    registerDataChannel(dataChannel) {
        dataChannel.addEventListener('open', event => {
            oalog("Opened RTC event bus")
        });

        dataChannel.addEventListener('close', event => {
            oalog("Closed RTC event bus")
        });

        dataChannel.addEventListener('message', event => {
            const message = event.data;
            let rtcPacket = new RtcPacket().fromString(message)

            // received packet
        });
    }

    async setup() {
        // setup rtc
        let endpoint = this.server + "webrtc/confluence/sdp" +
            "/m/" + tokenCache.publicServerKey +
            "/pu/" + tokenCache.uuid +
            "/pn/" + tokenCache.name +
            "/sk/" + this.streamKey;

        this.pcReceiver = new RTCPeerConnection();

        let started = false;
        let kickoff = (event) => {
            if (this.pcReceiver.connectionState === 'connected' || event.target.iceConnectionState === 'connected') {
                if (started) return;
                started = true;
                this.onStart();
            }
        }

        this.pcReceiver.oniceconnectionstatechange = kickoff
        this.pcReceiver.addEventListener('connectionstatechange', kickoff);

        this.dataChannel = this.pcReceiver.createDataChannel("eb");
        this.registerDataChannel(this.dataChannel);

        this.pcReceiver.addTransceiver('audio', {'direction': 'recvonly'})
        this.pcReceiver.createOffer()
            .then(d => this.pcReceiver.setLocalDescription(d))
            .then(() => {
                fetch(endpoint, {
                    method: "POST",
                    body: JSON.stringify({"sdp": btoa(JSON.stringify(this.pcReceiver.localDescription))})
                })
                    .then(response => response.json())
                    .then(response => this.pcReceiver.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(response.Sdp)))))
                    .catch((e) => {
                        console.error(e);
                        // window.location.reload();
                    })
            })
            .catch(console.error)
    }

}


