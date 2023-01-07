import {getGlobalState} from "../../../../state/store";
import {VoiceModule} from "../VoiceModule";

export class PeerManager {

    constructor() {
        this.peerConnection = null;
        this.dataChannel = null;

        this.connectRtc = this.connectRtc.bind(this);
        this.sendMetaData = this.sendMetaData.bind(this);
    }

    sendMetaData(data) {

    }

    connectRtc(onConfirm, micStream) {
        // setup rtc
        let globalState = getGlobalState();
        let currentUser = globalState.currentUser;
        let endpoint = globalState.voiceState.streamServer + "webrtc/confluence/sdp" +
            "/m/" + currentUser.publicServerKey +
            "/pu/" + currentUser.uuid +
            "/pn/" + currentUser.name +
            "/sk/" + globalState.voiceState.streamKey;

        this.peerConnection = new RTCPeerConnection();

        // wait for ice to completely finish everything
        let started = false;
        let kickoff = (event) => {
            if (this.peerConnection.connectionState === 'connected' || event.target.iceConnectionState === 'connected') {
                if (started) return;
                started = true;
                this.onStart();
            }
        }
        this.peerConnection.oniceconnectionstatechange = kickoff
        this.peerConnection.addEventListener('connectionstatechange', kickoff);

        this.dataChannel = this.peerConnection.createDataChannel("eb");
        this.registerDataChannel(this.dataChannel, onConfirm);
        this.listenForTracks();

        // add local track
        const tracks = micStream.getTracks();
        for (let i = 0; i < tracks.length; i++) {
            this.peerConnection.addTrack(micStream.getTracks()[i]);
        }

        // walk through rtc negotiation
        this.peerConnection.createOffer()
            .then(d => this.peerConnection.setLocalDescription(d))
            .then(() => fetch(endpoint, {
                method: "POST",
                body: JSON.stringify({"sdp": btoa(JSON.stringify(this.peerConnection.localDescription))})
            }))
            .then(response => {
                if (response.status !== 200) {
                    // server denied our negotiation/local description
                    VoiceModule.panic();
                }
            })
            .then((response) => response.json())
            .then(jr => this.peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(jr.Sdp)))))
            .catch((err) => {
                console.error(err)
                VoiceModule.panic()
            })
    }

    onStart() {
        // start everything! (this is called when the connection is established)

    }

    registerDataChannel(dataChannel, onConfirm) {
        // register listeners for this data channel once we're done
        // onConfirm is a callback all the way up to voicemodule, to confim that everything loaded and is ready for use
    }

    listenForTracks() {
        // start listening for tracks
    }
}