import {oalog} from "../../../helpers/log";
import {RtcPacket} from "./protocol";
import {PromisedChannel} from "./PromisedChannel";

export class PeerManager {

    constructor(openAudioMc, server, streamKey) {
        this.openAudioMc = openAudioMc;
        this.server = server;
        this.streamKey = streamKey;
        this.waitingPromises = new Map();
        this.trackQueue = new Map();
        this.updateNegotiation = true;
    }

    onStart() {
        oalog("Confluence started")
    }

    dropStream(peerKey) {

        if (this.dataChannel.readyState === "open") {
            this.dataChannel.send(new RtcPacket()
                .setEventName("DROP_STREAM")
                .setParam("owner", peerKey)
                .serialize())
        } else {
            oalog("Warning! can't drop a stream because the connection is closed")
        }
    }

    requestStream(peerKey) {
        if (this.dataChannel.readyState === "open") {
            let promise = new PromisedChannel();
            this.waitingPromises.set(peerKey, promise);

            // make a request
            this.dataChannel.send(new RtcPacket()
                .setEventName("REQUEST_STREAM")
                .setParam("owner", peerKey)
                .serialize())


            return promise;
        } else {
            oalog("Warning! attempted to request a stream for " + peerKey + " but the eb is closed")
            let promise = new PromisedChannel();
            promise.handleError("Connection is closed")
            return promise;
        }
    }

    registerDataChannel(dataChannel, whenSetupFinished) {
        dataChannel.addEventListener('open', event => {
            oalog("Opened RTC event bus")
        });

        dataChannel.addEventListener('close', event => {
            oalog("Closed RTC event bus")
        });

        dataChannel.addEventListener('message', event => {
            const message = event.data;
            let rtcPacket = new RtcPacket().fromString(message)

            switch (rtcPacket.getEventName()) {

                case "PROCESS_OFFER":
                    this.lastNegotiationRequest = performance.now()
                    let offer = JSON.parse(rtcPacket.trimmed())
                    this.pcReceiver.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(offer.sdp))))
                        .then((whatever) => {
                            this.pcReceiver.createAnswer({offerToReceiveAudio:true})
                                .then(answer => {
                                    var packet = new RtcPacket()
                                        .setEventName("PROCESS_RESPONSE")
                                        .serialize()
                                    packet += btoa(JSON.stringify(answer))
                                    this.dataChannel.send(packet);
                                })
                                .catch(console.error)
                        })
                        .catch(console.error)
                    break

                case "CONFIRM_NEGOTIATION":
                    if (this.lastNegotiationRequest != null) {
                        let now = performance.now()
                        let time = Math.ceil(now - this.lastNegotiationRequest)
                        oalog("Renegotiation took " + time + " MS")
                        if (time > 100) {
                            oalog("Warning! Renegotiation took too long!")
                        }
                    }
                    break

                case "NEGOTIATION_CANCELLED":
                    oalog("Negotiation was ignored, server doesn't think it to be needed.")
                    break

                case "OK":
                    // setup finished
                    if (whenSetupFinished != null) whenSetupFinished()
                    oalog("Received Confluence channel confirmation")
                    break

                case "REJECT_REQUEST":
                    let target = rtcPacket.getParam("owner")
                    oalog("The server rejected a stream request to " + target)
                    if (this.waitingPromises.has(target)) {
                        this.waitingPromises.get(target).handleError("Request got denied by the server")
                        this.waitingPromises.delete(target)
                    }
                    break

                case "CONFIRM_REQUEST":
                    console.log(rtcPacket)
                    oalog("Server acknowledged a track request to " + rtcPacket.getParam("name") + "." + " Expecting " + rtcPacket.getParam("streamid"))
                    this.trackQueue.set(rtcPacket.getParam("streamid"), rtcPacket.getParam("owner"));
                    break

                default:
                    oalog("Warning! received a rtc packet called " + rtcPacket.getEventName() + " but I don't have a clue what it does.")
            }
        });
    }

    onInternalTrack(track, isRetry) {
        let trackid = track.id

        if (!this.trackQueue.has(trackid)) {
            oalog("Received an unknown track called " + trackid + ". Ignoring it.")
            return
        }
        let owner = this.trackQueue.get(trackid)

        let promise = this.waitingPromises.get(owner);
        if (promise == null) {
            if (isRetry) {
                oalog("Got a stream that doesn't seem to be asked for, skipping it. it was " + trackid)
            } else {
                oalog("Got a stream that doesn't seem to be asked for, trying again in 1s")
                setTimeout(() => {
                    this.onInternalTrack(track, true)
                }, 1000)
            }
            return;
        }
        oalog("Setting up stream for " + trackid)
        console.log(track)
        promise.handleData(track)
        this.waitingPromises.delete(owner)
    }

    async setup(whenSetupFinished) {
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
        this.pcReceiver.onnegotiationneeded = () => {
            oalog("Finished negotiation round")
        }

        this.dataChannel = this.pcReceiver.createDataChannel("eb");
        this.registerDataChannel(this.dataChannel, whenSetupFinished);
        this.listenForTracks();

        this.pcReceiver.addTransceiver('audio', {'direction': 'recvonly'})
        this.pcReceiver.createOffer()
            .then(d => this.pcReceiver.setLocalDescription(d))
            .then(() => {
                fetch(endpoint, {
                    method: "POST",
                    body: JSON.stringify({"sdp": btoa(JSON.stringify(this.pcReceiver.localDescription))})
                })
                    .then(response => response.json())
                    .then(response => {
                        this.pcReceiver.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(response.Sdp))))
                    })
                    .catch((e) => {
                        console.error(e);
                        // window.location.reload();
                    })
            })
            .catch(console.error)
    }

    countActiveStreams() {
        let i = 0
        for (let receiver of this.pcReceiver.getReceivers()) {
            if (receiver.track.readyState == "live") i++
        }
        return i
    }

    listenForTracks() {
        this.pcReceiver.addEventListener("track", e => {
            for (let i = 0; i < e.streams.length; i++) {
                this.onInternalTrack(e.streams[i], false);
                let t = e.transceiver.sender
                e.streams[i].onremovetrack = (re) => {
                    re.track.stop()
                    this.pcReceiver.removeTrack(t)
                }
            }
        }, false)
    }

}


