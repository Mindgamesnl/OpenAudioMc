import {oalog} from "../../../helpers/log";
import {RtcPacket} from "./protocol";
import {PromisedChannel} from "./PromisedChannel";
import {VoiceStatusChangeEvent} from "../VoiceModule";
import * as PluginChannel from "../../../helpers/protocol/PluginChannel";
import {OpenAudioEnv} from "../../../OpenAudioMc";
import {Channel} from "../../media/objects/Channel";
import {Sound} from "../../media/objects/Sound";
import {makeid} from "../../../helpers/libs/random";

export class PeerManager {

    constructor(openAudioMc, server, streamKey, micStream, micProcessor) {
        this.openAudioMc = openAudioMc;
        this.server = server;
        this.micProcessor = micProcessor;
        this.streamKey = streamKey;
        this.waitingPromises = new Map();
        this.trackQueue = new Map();
        this.updateNegotiation = true;
        this.micStream = micStream;

        this.isMuted = false;
        document.getElementById("vc-mic-mute").onmousedown = () => {
            if (this.muteCooldown) {
                Swal.fire({
                    icon: 'warning',
                    text: "Please wait a moment before doing this again",
                    backdrop: '',
                    timer: 3000,
                });
                return
            }
            this.setMute(!this.isMuted)
        };

        this.muteCooldown = false;
    }

    onStart() {
        oalog("Confluence started")
        this.openAudioMc.socketModule.send(PluginChannel.RTC_READY, {"enabled": true});
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

    initializeRenegotiation() {
        // create a new offer
        this.lastNegotiationRequest = performance.now()
        this.pcReceiver.createOffer()
            .then(d => this.pcReceiver.setLocalDescription(d))
            .then(() => {
                // make a compatible json body
                let offer = JSON.stringify({"sdp": btoa(JSON.stringify(this.pcReceiver.localDescription))});

                // send the offer
                let packet = new RtcPacket()
                    .setEventName("KICKSTART_RENEG")
                    .serialize()
                packet += offer
                this.dataChannel.send(packet)
            })
            .catch((err) => {
                this.openAudioMc.voiceModule.handleCrash(JSON.stringify(err.toJSON()))
            })
    }

    handleRenagEnd() {
        if (this.lastNegotiationRequest != null) {
            let now = performance.now()
            let time = Math.ceil(now - this.lastNegotiationRequest)
            oalog("Renegotiation took " + time + " MS - " + (time > 500 ? "Warning! Renegotiation took too long!" : ""))
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

            if (!OpenAudioEnv.isProd) {
                oalog("Handling bus " + rtcPacket.getEventName())
            }

            switch (rtcPacket.getEventName()) {

                case "REQUEST_NEG_INIT":
                    oalog("Server requested renag start")
                    this.initializeRenegotiation()
                    break

                case "NEGOTIATION_RESPONSE":
                    let raw = rtcPacket.trimmed()
                    let response = JSON.parse(raw)
                    oalog("response was " + raw.length)
                    this.pcReceiver.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(response.sdp))))
                        .then(() => {
                            // send a confirmation
                            this.handleRenagEnd();
                            this.dataChannel.send(new RtcPacket()
                                .setEventName("CLIENT_CONFIRMED_NEG")
                                .serialize());
                        })
                    break

                case "PROCESS_OFFER":
                    this.lastNegotiationRequest = performance.now()
                    let offer = JSON.parse(rtcPacket.trimmed())
                    this.pcReceiver.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(offer.sdp))))
                        .then((whatever) => {
                            this.pcReceiver.createAnswer()
                                .then(answer => {
                                    var packet = new RtcPacket()
                                        .setEventName("PROCESS_RESPONSE")
                                        .serialize()
                                    packet += btoa(JSON.stringify(answer))
                                    this.dataChannel.send(packet);
                                    this.pcReceiver.setLocalDescription(answer)
                                        .catch((err) => {
                                            this.openAudioMc.voiceModule.handleCrash(JSON.stringify(err.toJSON()))
                                        })
                                })
                                .catch((err) => {
                                    this.openAudioMc.voiceModule.handleCrash(JSON.stringify(err.toJSON()))
                                })
                        })
                        .catch((err) => {
                            this.openAudioMc.voiceModule.handleCrash(JSON.stringify(err.toJSON()))
                        })
                    break

                case "CONFIRM_NEGOTIATION":
                    this.handleRenagEnd();
                    break

                case "NEGOTIATION_CANCELLED":
                    oalog("Negotiation was ignored, server doesn't think it to be needed.")
                    break

                case "OK":
                    // setup finished
                    if (whenSetupFinished != null) whenSetupFinished()
                    this.openAudioMc.voiceModule.peerManager.playInternalSound("assets/unmute.mp3")
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
                    this.trackQueue.set(rtcPacket.getParam("streamid"), rtcPacket.getParam("owner"));
                    break

                case "CONTEXT_EVENT":
                    this.contextEvent(rtcPacket)
                    break

                case "IDENTIFY_SELF":
                    this.dataChannel.send(
                        new RtcPacket()
                            .setEventName("VERSION")
                            .setParam("build", OpenAudioEnv.build + "")
                            .setParam("author", OpenAudioEnv.compiler)
                            .setParam("isProd", OpenAudioEnv.isProd + "")
                            .serialize()
                    )
                    break

                default:
                    oalog("Warning! received a rtc packet called " + rtcPacket.getEventName() + " but I don't have a clue what it does.")
            }
        });
    }

    contextEvent(eventPacket) {
        let type = eventPacket.getParam("type")

        switch (type) {
            case "client-muted":
                this.openAudioMc.voiceModule.peerMap.get(eventPacket.getParam("who")).ui.setVisuallyMuted(true);
                break

            case "client-unmuted":
                this.openAudioMc.voiceModule.peerMap.get(eventPacket.getParam("who")).ui.setVisuallyMuted(false);
                break
        }
    }

    onInternalTrack(track, isRetry, mst) {
        let trackid = track.id

        if (!track.active) {
            oalog("Received an inactive track! cancelling.")
            return;
        }

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

        const tracks = this.micStream.getTracks();
        for (let i = 0; i < tracks.length; i++) {
            this.pcReceiver.addTrack(this.micStream.getTracks()[i]);
        }

        this.pcReceiver.createOffer()
            .then(d => this.pcReceiver.setLocalDescription(d))
            .then(() => {
                fetch(endpoint, {
                    method: "POST",
                    body: JSON.stringify({"sdp": btoa(JSON.stringify(this.pcReceiver.localDescription))})
                })
                    .then(response => {
                        if (response.status !== 200) {
                            Swal.fire({
                                backdrop: '',
                                showClass: {
                                    popup: 'swal2-noanimation',
                                    backdrop: 'swal2-noanimation'
                                },
                                icon: 'error',
                                title: "Connection error",
                                text: 'Something went wrong while connecting to the OpenAudioMc voice service. Please try again in a minute or so.',
                                footer: '<a href="https://help.openaudiomc.net/voicechat_troubleshooting">Why do I have this issue?</a>'
                            })
                            response.json().then(text => {
                                this.openAudioMc.voiceModule.handleCrash("RTC connection error, received status body " + JSON.stringify(text) + " " + response.status)
                            })
                        } else {
                            response.json().then(jr => {
                                this.pcReceiver.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(jr.Sdp))))
                            })
                        }
                    })
                    .catch((err) => {
                        console.error(err)
                        this.openAudioMc.voiceModule.handleCrash(JSON.stringify(err.toJSON()))
                    })
            })
            .catch((err) => {
                this.openAudioMc.voiceModule.handleCrash(JSON.stringify(err.toJSON()))
            })

        window.rtcHook = this.pcReceiver;
    }

    playInternalSound(src) {
        oalog("Playing internal sound " + src)
        const createdChannel = new Channel(src);
        const createdMedia = new Sound(src);
        createdMedia.openAudioMc = this.openAudioMc;
        createdMedia.setOa(this.openAudioMc);
        createdMedia.setOnFinish(() => {
                this.openAudioMc.mediaManager.mixer._updatePlayingSounds();
                this.openAudioMc.mediaManager.mixer.removeChannel(src)
        })
        createdMedia.finalize().then(() => {
            this.openAudioMc.mediaManager.mixer.addChannel(createdChannel);
            createdChannel.addSound(createdMedia);
            createdChannel.setChannelVolume(100);
            createdChannel.updateFromMasterVolume();
            createdMedia.finish();
        });
    }

    setMute(state) {
        if (this.muteCooldown) {
            Swal.fire("Please wait a moment before doing this again");
            return;
        }

        if (state) {
            this.playInternalSound("assets/mute.mp3")
        } else {
            this.playInternalSound("assets/unmute.mp3")
        }

        this.isMuted = state;
        this.setVisualMuteState(!state);
        this.muteCooldown = true;
        setTimeout(() => {
            this.muteCooldown = false;
        }, 500);

        for (let i = 0; i < this.micStream.getAudioTracks().length; i++) {
            this.micStream.getAudioTracks()[i].enabled = !state;
        }
        if (state) {
            this.openAudioMc.voiceModule.microphoneProcessing.onMute()
            this.openAudioMc.voiceModule.pushSocketEvent(VoiceStatusChangeEvent.MIC_MUTE);
            this.dataChannel.send(new RtcPacket()
                .setEventName("CONTEXT_EVENT")
                .setParam("type", "muted-stream")
                .serialize())
        } else {
            this.openAudioMc.voiceModule.microphoneProcessing.onUnmute()
            this.openAudioMc.voiceModule.pushSocketEvent(VoiceStatusChangeEvent.MIC_UNMTE);
            this.dataChannel.send(new RtcPacket()
                .setEventName("CONTEXT_EVENT")
                .setParam("type", "unmuted-stream")
                .serialize())
        }
    }

    setVisualMuteState(state) {
        if (state) {
            document.getElementById("vc-mic-mute").style.backgroundColor = ""
            document.getElementById("vc-mic-mute").style.color = ""
        } else {
            document.getElementById("vc-mic-mute").style.backgroundColor = "#EF4444"
            document.getElementById("vc-mic-mute").style.color = "#F3F4F6"
        }
    }

    stop() {
        this.micStream.getTracks().forEach(function (track) {
            track.stop();
        });
        this.pcReceiver.close();
    }

    listenForTracks() {
        this.pcReceiver.addEventListener("track", e => {
            for (let i = 0; i < e.streams.length; i++) {
                if (e.streams[i].id === "dead-mans-track") {
                    return
                } else {
                    e.track.onended = (event) => {
                        this.dataChannel.send(new RtcPacket()
                            .setEventName("SCHEDULE_RENAG")
                            .serialize())
                    }
                    this.onInternalTrack(e.streams[i], false, e.track);
                }
            }
        })
    }

}


