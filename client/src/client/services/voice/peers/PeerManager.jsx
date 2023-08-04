import {getGlobalState, setGlobalState, store} from "../../../../state/store";
import {VoiceModule, VoiceStatusChangeEvent} from "../VoiceModule";
import {RtcPacket} from "./protocol";
import {playInternalEffect} from "../../media/util";
import {PromisedChannel} from "../data/PromisedChannel";
import {SocketManager} from "../../socket/SocketModule";
import * as PluginChannel from "../../../util/PluginChannel";
import {toast} from "react-toastify";
import {getTranslation} from "../../../OpenAudioAppContainer";
import {feedDebugValue, incrementDebugValue} from "../../debugging/DebugService";
import {DebugStatistic} from "../../debugging/DebugStatistic";
import {MagicValues} from "../../../config/MagicValues";

export class PeerManager {

    constructor() {
        this.peerConnection = null;
        this.dataChannel = null;
        this.lastNegotiationRequest = null;
        this.trackQueue = new Map();
        this.waitingPromises = new Map();
        this.micStream = null;
        this.connectedOnce = false;

        this.connectRtc = this.connectRtc.bind(this);
        this.sendMetaData = this.sendMetaData.bind(this);
        this.setMute = this.setMute.bind(this);

        let lastStateMuted = false;

        this.unsub = store.subscribe(() => {
            let {settings} = store.getState();
            if (settings.voicechatMuted !== lastStateMuted) {
                lastStateMuted = settings.voicechatMuted;
                this.setMute(lastStateMuted);
            }
        })
    }

    sendMetaData(data) {
        if (!this.dataChannel) {
            console.error("Tried to send data before data channel was ready")
            return;
        }

        if (this.dataChannel.readyState !== "open") {
            console.error("Tried to send data before data channel was open")
            return;
        }

        this.dataChannel.send(data);
    }

    connectRtc(micStream) {
        // setup rtc
        let globalState = getGlobalState();
        let currentUser = globalState.currentUser;
        this.micStream = micStream;

        let endpoint = globalState.voiceState.streamServer;
        if (!globalState.voiceState.streamServer.endsWith("/")) {
            endpoint += "/";
        }

        endpoint += "webrtc/confluence/sdp" +
            "/m/" + currentUser.publicServerKey +
            "/pu/" + currentUser.uuid +
            "/pn/" + currentUser.userName +
            "/sk/" + globalState.voiceState.streamKey;

        this.peerConnection = new RTCPeerConnection();

        // wait for ice to completely finish everything
        let started = false;
        let kickoff = (event) => {
            if (this.peerConnection.connectionState === 'connected' || event.target.iceConnectionState === 'connected') {
                if (started) return;
                started = true;
            }
        }
        this.peerConnection.oniceconnectionstatechange = kickoff
        this.peerConnection.addEventListener('connectionstatechange', kickoff);

        this.dataChannel = this.peerConnection.createDataChannel("eb");
        this.registerDataChannel(this.dataChannel);
        this.listenForTracks();

        // add local track
        const tracks = micStream.getTracks();
        for (let i = 0; i < tracks.length; i++) {
            this.peerConnection.addTrack(micStream.getTracks()[i]);
        }

        // walk through rtc negotiation
        this.peerConnection.createOffer()
            .then(async (d) => {
                return await this.peerConnection.setLocalDescription(d)
            })
            .then(() => {
                return fetch(endpoint, {
                    method: "POST",
                    body: JSON.stringify({"sdp": btoa(JSON.stringify(this.peerConnection.localDescription))})
                })
            })
            .then(response => {
                if (response.status !== 200) {
                    // server denied our negotiation/local description
                    console.error("Server denied our negotiation/local description " + response.status)
                    VoiceModule.panic();
                }
                return response;
            })
            .then((response) => response.json())
            .then(jr => this.peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(jr.Sdp)))))
            .catch((err) => {
                console.error(err)
                VoiceModule.panic()
            })

        // Configure a timeout for 10 seconds, if we aren't connected by then, we're probably not going to be
        setTimeout(() => {
            if (this.connectedOnce) return; // never-mind, we good
            //eslint-disable-next-line
            if ((!!navigator.userAgent.match(/Opera|OPR\//))) {
                toast.error(getTranslation(null, "vc.operaWarning"), {
                    position: "top-center",
                    autoClose: 50000,
                    theme: "dark",
                });

                // set limited
                setGlobalState({
                    browserSupportIsLimited: true
                })
            }
        }, 5000);
    }

    onStart() {
        // start everything! (this is called when the connection is established)
        setGlobalState({
            loadingOverlay: {visible: false},
            voiceState: {ready: true}
        });

        // 10 seconds after initial connection, show the sanity overlay
        setTimeout(() => {
            setGlobalState({
                voiceState: {microphoneSanityPrompt: true}
            })
        }, MagicValues.VOICE_CANT_HEAR_YOU_TIMEOUT);


        SocketManager.send(PluginChannel.RTC_READY, {"enabled": true});
        this.connectedOnce = true;
    }

    registerDataChannel(dataChannel) {
        // register listeners for this data channel once we're done
        // onConfirm is a callback all the way up to voicemodule, to confim that everything loaded and is ready for use
        dataChannel.addEventListener('open', event => {
            console.log("Opened RTC event bus")
        });

        dataChannel.addEventListener('close', event => {
            console.log("Closed RTC event bus")
        });

        dataChannel.addEventListener('message', event => {
            const message = event.data;
            let rtcPacket = new RtcPacket().fromString(message)
            incrementDebugValue(DebugStatistic.VB_EVENTS)

            switch (rtcPacket.getEventName()) {

                case "REQUEST_NEG_INIT":
                    this.initializeRenegotiation();
                    break

                case "NEGOTIATION_RESPONSE":
                    let raw = rtcPacket.trimmed()
                    let response = JSON.parse(raw)
                    this.peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(response.sdp))))
                        .then(() => {
                            this.handleRenagEnd();
                            this.dataChannel.send(new RtcPacket()
                                .setEventName("CLIENT_CONFIRMED_NEG")
                                .serialize());
                        })
                    break

                case "PROCESS_OFFER":
                    this.lastNegotiationRequest = performance.now()
                    let offer = JSON.parse(rtcPacket.trimmed())
                    this.peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(offer.sdp))))
                        .then((whatever) => this.peerConnection.createAnswer())
                        .then((answer) => {
                            var packet = new RtcPacket()
                                .setEventName("PROCESS_RESPONSE")
                                .serialize()
                            packet += btoa(JSON.stringify(answer))
                            this.dataChannel.send(packet);
                            this.peerConnection.setLocalDescription(answer)
                                .catch((err) => {
                                    VoiceModule.panic()
                                })

                        })
                        .catch((err) => {
                            VoiceModule.panic()
                        })
                    break

                case "CONFIRM_NEGOTIATION":
                    this.handleRenagEnd();
                    break

                case "NEGOTIATION_CANCELLED":
                    console.log("Negotiation was ignored, server doesn't think it to be needed.")
                    break

                case "OK":
                    // setup finished
                    this.onStart();
                    if (getGlobalState().settings.voicechatChimesEnabled) {
                        playInternalEffect("assets/unmute.mp3")
                    }
                    break

                case "REJECT_REQUEST":
                    let target = rtcPacket.getParam("owner")
                    if (this.waitingPromises.has(target)) {
                        this.waitingPromises.get(target).handleError("Request got denied by the server")
                        this.waitingPromises.delete(target)
                    }
                    break

                case "CONFIRM_REQUEST":
                    this.trackQueue.set(rtcPacket.getParam("streamid"), rtcPacket.getParam("owner"));
                    break

                case "CONTEXT_EVENT":
                    this.contextEvent(rtcPacket)
                    break

                case "IDENTIFY_SELF":
                    let build = getGlobalState().build
                    this.dataChannel.send(
                        new RtcPacket()
                            .setEventName("VERSION")
                            .setParam("build", build.build + "")
                            .setParam("author", build.compiler)
                            .setParam("isProd", build.isProd + "")
                            .serialize()
                    )
                    break

                case "CONFIRM_BOOT":
                case "MIC_STREAM_ENABLED":
                    // legacy stuff
                    break

                default:
                    console.error("Warning! received a rtc packet called " + rtcPacket.getEventName() + " but I don't have a clue what it does.")
            }
        });
    }

    gatherDebugState() {
        return {
            "peerConnection": this.peerConnection ? this.peerConnection.connectionState : "(null)",
            "dataChannel": this.dataChannel ? this.dataChannel.connectionState : "(null)",
            "peers:": VoiceModule.peerMap.size,
            "trackQueue": this.trackQueue.size,
            "voiceState": getGlobalState().voiceState,
            'settings': getGlobalState().settings,
        }
    }

    contextEvent(eventPacket) {
        let type = eventPacket.getParam("type")

        // check if we have the required peer
        // mapped by stream key
        let peer = eventPacket.getParam("who");

        if (peer == null) {
            console.error("Received a context event from a peer that doesn't exist")
            return
        }

        switch (type) {
            case "client-muted":
                setGlobalState({voiceState: {peers: {[peer]: {muted: true}}}})
                break

            case "client-unmuted":
                setGlobalState({voiceState: {peers: {[peer]: {muted: false}}}})
                break

            default:
                console.error("Received a context event of type " + type + " but I don't know what to do with it.")
        }
    }

    dropStream(peerKey) {
        if (!this.dataChannel) return; // we're not connected yet/anymore
        if (this.dataChannel.readyState === "open") {
            this.dataChannel.send(new RtcPacket()
                .setEventName("DROP_STREAM")
                .setParam("owner", peerKey)
                .serialize())
        } else {
            console.error("Warning! can't drop a stream because the connection is closed")
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
            console.error("Warning! attempted to request a stream for " + peerKey + " but the eb is closed")
            let promise = new PromisedChannel();
            promise.handleError("Connection is " + this.dataChannel.readyState)
            return promise;
        }
    }

    initializeRenegotiation() {
        // create a new offer
        this.lastNegotiationRequest = performance.now()
        this.peerConnection.createOffer()
            .then(d => this.peerConnection.setLocalDescription(d))
            .then(() => JSON.stringify({"sdp": btoa(JSON.stringify(this.peerConnection.localDescription))}))
            .then((offer) => {
                // send the offer
                let packet = new RtcPacket()
                    .setEventName("KICKSTART_RENEG")
                    .serialize()
                packet += offer
                this.dataChannel.send(packet)
            })
            .catch((err) => {
                VoiceModule.panic()
            })
    }

    // once we get a new track from negotiation, we need to add it to the audio context
    onInternalTrack(track, isRetry, mst) {
        let trackid = track.id
        feedDebugValue(DebugStatistic.CACHED_STREAMS, this.peerConnection.getReceivers().length)

        if (!track.active) {
            console.error("Received an inactive track! cancelling.")
            return;
        }

        if (!this.trackQueue.has(trackid)) {
            console.error("Received an unknown track called " + trackid + ". Ignoring it.")
            return
        }

        let owner = this.trackQueue.get(trackid)

        let promise = this.waitingPromises.get(owner);
        if (promise == null) {
            if (isRetry) {
                console.error("Got a stream that doesn't seem to be asked for, skipping it. it was " + trackid)
            } else {
                console.error("Got a stream that doesn't seem to be asked for, trying again in 1s")
                setTimeout(() => {
                    this.onInternalTrack(track, true, mst)
                }, 1000)
            }
            return;
        }

        promise.handleData(track)

        // delete interaction cache
        this.waitingPromises.delete(owner)
        this.trackQueue.delete(trackid)
    }

    handleRenagEnd() {
        if (this.lastNegotiationRequest != null) {
            let now = performance.now()
            let time = Math.ceil(now - this.lastNegotiationRequest)
            console.log("Renegotiation took " + time + " MS - " + (time > 500 ? "Warning! Renegotiation took too long!" : ""))
        }
    }

    listenForTracks() {
        // start listening for tracks
        this.peerConnection.addEventListener("track", e => {
            for (let i = 0; i < e.streams.length; i++) {
                if (e.streams[i].id === "dead-mans-track") {
                    return
                } else {
                    e.track.onended = (event) => {
                        if (this.dataChannel.readyState !== "open") {
                            console.error("Warning! can't drop a stream because the connection is closed")
                            return
                        }

                        this.dataChannel.send(new RtcPacket()
                            .setEventName("SCHEDULE_RENAG")
                            .serialize())
                    }
                    this.onInternalTrack(e.streams[i], false, e.track);
                }
            }
        })
    }

    // this method DOES NOT update the UI,
    // returns a boolean if the action was accepted
    // DON'T DO STATE CHANGES HERE
    // AND DON'T DO STATE CHANGES IF THIS RETURNS FALSE
    setMute(state) {
        if (!this.micStream) return;

        if (state) {
            if (getGlobalState().settings.voicechatChimesEnabled) {
                playInternalEffect("assets/mute.mp3")
            }
        } else {
            if (getGlobalState().settings.voicechatChimesEnabled) {
                playInternalEffect("assets/unmute.mp3")
            }
        }

        for (let i = 0; i < this.micStream.getAudioTracks().length; i++) {
            this.micStream.getAudioTracks()[i].enabled = !state;
        }

        if (state) {
            VoiceModule.pushSocketEvent(VoiceStatusChangeEvent.MIC_MUTE);
            this.dataChannel.send(new RtcPacket()
                .setEventName("CONTEXT_EVENT")
                .setParam("type", "muted-stream")
                .serialize())
        } else {
            VoiceModule.pushSocketEvent(VoiceStatusChangeEvent.MIC_UNMTE);
            this.dataChannel.send(new RtcPacket()
                .setEventName("CONTEXT_EVENT")
                .setParam("type", "unmuted-stream")
                .serialize())
        }
    }

    stop() {
        console.log("Closing voice connection")
        if (this.micStream) {
            this.micStream.getTracks().forEach(function (track) {
                track.stop();
            });
        }
        if (this.peerConnection) {
            this.peerConnection.close();
        }
        this.unsub();
    }
}