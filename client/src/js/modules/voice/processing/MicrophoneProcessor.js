import {Hark} from "../../../helpers/libs/hark.bundle";
import GainController from "mediastream-gain";
import {RtcPacket} from "../streaming/protocol";

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

        this.longSessions = 0;

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
            document.getElementById(this.id).style.backgroundColor = "#34D399"
            document.getElementById(this.id).style.color = "#EC4899"
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

            document.getElementById(this.id).style.backgroundColor = ""
            document.getElementById(this.id).style.color = ""
            // this.gainController.off();
        }
    }

    loadDefaults() {
        this.enabledAutoAdjustments = (Cookies.get("mic-sensitivity-bot") === "enabled")
        document.getElementById("enable-auto-adjustments").checked = this.enabledAutoAdjustments;
        document.getElementById("enable-auto-adjustments").onchange = (e) => {
            if (e.target.checked) {
                this.enabledAutoAdjustments = true;
                Cookies.set("enable-auto-adjustments", "enabled", {expires: 30});
            } else {
                this.enabledAutoAdjustments = false;
                Cookies.set("enable-auto-adjustments", "disabled", {expires: 30});
            }
        }

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

            // set talking UI
            this.onSpeakStart()
        });

        this.harkEvents.on('stopped_speaking', () => {
            this.isSpeaking = false;

            // set talking UI
            this.onSpeakEnd()

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

}
