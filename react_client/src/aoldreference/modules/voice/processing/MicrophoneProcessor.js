import {Hark} from "../../../helpers/libs/hark.bundle";
import GainController from "mediastream-gain";
import {RtcPacket} from "../streaming/protocol";
import {Checkbox} from "../../../helpers/utils/Checkbox";
import {oalog} from "../../../helpers/log";
import {PitchShifter} from "./PitchShifter";
import {PitchShiftMicMiddleware} from "./PitchShiftMicMiddleware";
import {AudioCableMiddleware} from "./AudioCableMiddleware";

export class MicrophoneProcessor {

    constructor(openAudioMc, voiceModule, stream) {
        this.openAudioMc = openAudioMc
        this.stream = stream;
        this.voiceModule = voiceModule;
        this.id = "visual-speaking-indicator";
        this.startedTalking = null;
        this.shortTriggers = 0;
        this.isStreaming = false;
        this.isMuted = false;

        this.harkEvents = Hark(this.stream, {})
        this.gainController = new GainController(stream);
        this.gainController.on();

        this.loadDefaults();
        this.monitoringVolume = 0;
        this.longSessions = 0;

        this.inputStreamSource = stream;

        this.autoAdjustCheckbox = new Checkbox("enable-auto-adjustments")
            .useCookie("auto-adjust-mic")
            .onChange(isEnabled => {
                oalog("Auto mic adjustments: " + isEnabled)
                this.enabledAutoAdjustments = isEnabled;
            })

        this.enableMonitoringCheckbox = new Checkbox("enable-input-monitoring")
            .useCookie("mic-monitoring")
            .onChange(isEnabled => {
                oalog("Monitoring: " + isEnabled)
            })

        this.setupTrackProcessing(stream)

        // automatically check through a task how long the current speech is
        this.checkLoop = setInterval(() => {
            if (!this.isSpeaking) return;
            let timeActive = new Date().getTime() - this.startedTalking;
            let secondsTalked = (timeActive / 1000);

            if (secondsTalked > 10) {
                this.longSessions++;
                this.startedTalking = new Date().getTime();
            }

            if (this.longSessions > 1) {
                this.decreaseSensitivity()
                this.longSessions = 0;
                this.startedTalking = new Date().getTime();
            }

        }, 500);

        this.hookListeners();
    }

    updateSensitivity(toPositive) {
        let target = -Math.abs(toPositive)
        this.harkEvents.setThreshold(target)
        Cookies.set("mic-sensitivity", target + "", {expires: 30});
        this.currentThreshold = this.harkEvents.getThreshold();
    }

    decreaseSensitivity() {
        if (!this.enabledAutoAdjustments) return;
        let current = Math.abs(this.currentThreshold);
        current -= 5;
        this.updateSensitivity(current)
        document.getElementById("mic-sensitive-slider").value = current;
    }

    onMute() {
        this.isMuted = true;
        if (this.isSpeaking) {
            this.shouldStream(false);
        }
    }

    onUnmute() {
        this.isMuted = false;
        if (this.isSpeaking) {
            this.shouldStream(true);
        }
    }

    onSpeakStart() {
        if (this.isMuted) return;
        this.shouldStream(true);
    }

    onSpeakEnd() {
        if (this.isMuted) return;
        this.shouldStream(false);
    }

    stop() {
        this.harkEvents.stop()
        clearInterval(this.checkLoop)
    }

    shouldStream(state) {
        if (state) {
            // create start rtc notification
            if (!this.isStreaming) {
                this.isStreaming = true;
                if (this.openAudioMc.voiceModule.peerManager.dataChannel.readyState === "open") {
                    this.openAudioMc.voiceModule.peerManager.dataChannel.send(
                        new RtcPacket()
                            .setEventName("DISTRIBUTE_RTP")
                            .serialize()
                    )
                }
            }

            document.getElementById(this.id).style.backgroundColor = "lime"
            document.getElementById(this.id).style.boxShadow = "0 0 10pt 2pt lime"

            clearTimeout(this.haltRtpTask);
            // this.gainController.on();
        } else {
            this.haltRtpTask = setTimeout(() => {
                if (this.openAudioMc.voiceModule.peerManager.dataChannel.readyState === "open") {
                    this.isStreaming = false;
                    this.openAudioMc.voiceModule.peerManager.dataChannel.send(
                        new RtcPacket()
                            .setEventName("HALT_RTP")
                            .serialize()
                    )
                }
            }, 500);

            document.getElementById(this.id).style.boxShadow = ""
            document.getElementById(this.id).style.backgroundColor = ""
            // this.gainController.off();
        }
    }

    loadDefaults() {
        let presetVolume = Cookies.get("mic-sensitivity");
        if (presetVolume != null) {
            presetVolume = parseInt(presetVolume)
            this.harkEvents.setThreshold(presetVolume)
        }

        document.getElementById("mic-sensitive-slider").value = Math.abs(this.harkEvents.getThreshold())
        this.currentThreshold = this.harkEvents.getThreshold();

        this.isSpeaking = false;
        this.harkEvents.setInterval(5)

        document.getElementById("mic-sensitive-slider").oninput = (e) => {
            this.updateSensitivity(e.target.value)
        }
    }

    hookListeners() {
        this.harkEvents.on('speaking', () => {
            this.isSpeaking = true;
            this.startedTalking = new Date().getTime();
            this.setMonitoringVolume(this.monitoringVolume)

            // set talking UI
            this.onSpeakStart()
        });

        this.harkEvents.on('stopped_speaking', () => {
            this.isSpeaking = false;

            // set talking UI
            this.onSpeakEnd()
            this.monitoringGainnode.gain.value = 0;

            // how long did I talk for?
            let timeActive = new Date().getTime() - this.startedTalking;
            let secondsTalked = (timeActive / 1000);
            if (secondsTalked < 1.5) {
                this.shortTriggers++;
                if (this.shortTriggers > 25) {
                    this.decreaseSensitivity();
                    this.shortTriggers = 0;
                }
            } else {
                this.shortTriggers = 0;
            }
        });
    }

    setMonitoringVolume(vol) {
        this.monitoringVolume = vol;
        this.monitoringGainnode.gain.value = (vol / 100);
    }

    setupTrackProcessing(stream) {
        const ctx = this.openAudioMc.world.player.audioCtx;
        this.monitoringAudio = new Audio();
        this.monitoringAudio.muted = true;
        this.monitoringAudio.autoplay = true
        this.monitoringAudio.volume = 1
        this.output = ctx.createMediaStreamDestination()

        this.monitoringAudio.srcObject = this.output.stream;
        this.monitoringGainnode = ctx.createGain();

        this.enableMonitoringCheckbox
            .onChange((allow) => {
                if (allow) {
                    this.monitoringAudio.muted = false;
                    console.log()
                } else {
                    this.monitoringAudio.muted = true;
                    console.log(this.monitoringAudio)
                }
            })

        let src = ctx.createMediaStreamSource(this.inputStreamSource)

        let shiftMiddleware = new AudioCableMiddleware()
        shiftMiddleware.link(ctx, src, this.output)
        this.monitoringAudio.play()

    }

}
