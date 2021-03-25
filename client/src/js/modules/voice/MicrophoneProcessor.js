import {Hark} from "../../helpers/libs/hark.bundle";
import {VoiceStatusChangeEvent} from "./VoiceModule";
import {oalog} from "../../helpers/log";

export class MicrophoneProcessor {

    constructor(openAudioMc, voiceModule, stream) {
        this.openAudioMc = openAudioMc

        this.harkEvents = Hark(stream, {})
        this.loudnessHistory = []
        this.isSpeaking = false;
        this.state = VoiceStatusChangeEvent.LEVEL_NORMAL

        // temp config, loudness delta to trigger shouting and whispering when
        // finding a difference from the average
        this.delta = 30

        this.harkEvents.on('speaking', () => {
            this.isSpeaking = true;
        });

        this.harkEvents.on('volume_change', e => {
            // only process data when the user is actively speaking
            if (this.isSpeaking) {
                // normalize DB
                let level = e+100

                // map the last 200 voice events while the user is speaking
                if (this.loudnessHistory.length > 200) {
                    // drop first entry
                    this.loudnessHistory.shift()
                }
                this.loudnessHistory.push(level)

                this.onUpdate(e)
            }
        })

        this.harkEvents.on('stopped_speaking', () => {
            this.isSpeaking = false;
        });
    }

    // only enable this feature when there is enough data to calculate an average
    isReady() {
        return this.loudnessHistory.length > 180
    }

    // calculate and return the average loudness when speaking
    findAverageLoudness() {
        return arr => this.loudnessHistory.reduce((a,b) => a + b, 0) / this.loudnessHistory.length
    }

    onUpdate(lastMeasurement) {
        // do we have enough data for a reliable result?
        if (!this.isReady()) return // no, lets try again in a bit

        // find a difference
        let diff = Math.abs(this.findAverageLoudness() - lastMeasurement)

        // enough to trigger
        if (diff > this.delta) {
            if (lastMeasurement > this.findAverageLoudness()) {
                // shouting
                this.onChange(VoiceStatusChangeEvent.LEVEL_SHOUTING)
            } else {
                // whispering
                this.onChange(VoiceStatusChangeEvent.LEVEL_WHISPERING)
            }
        } else {
            // nothing crazy
            this.onChange(VoiceStatusChangeEvent.LEVEL_NORMAL)
        }
    }

    onChange(updatedState) {
        if (updatedState != this.state) {
            this.state = updatedState
            oalog("Changing special voice flair to " + this.state)
            this.openAudioMc.voiceModule.pushSocketEvent(this.state);
        }
    }

    stop() {
        this.harkEvents.stop()
    }

}