import {Hark} from "../../helpers/libs/hark.bundle";
import {VoiceStatusChangeEvent} from "./VoiceModule";
import {oalog} from "../../helpers/log";

/*
 * This class measures the average volume from an incoming media stream
 * It does this by trying to detect when someone is talking, and keeping track
 * of the average volume during silence (mic self noise, etc) and the average volume of speech
 *
 * it then uses those values to detect differences in speech (whispering, normal and shouting)
 *
 * the delta value is completely random and will need some fine tuning, but this design means that you
 * can only stay in a SHOUTING or WHISPERING state for a few seconds before it'll reset become the new
 * default/average volume. This can be tuned by changing the number of required samples.
 */
const AVERAGE_STATE = {
    LEVEL_WHISPERING: -2,
    LEVEL_NORMAL: 0,
    LEVEL_SHOUTING: 2
}

export class MicrophoneProcessor {

    constructor(openAudioMc, voiceModule, stream) {
        this.openAudioMc = openAudioMc

        this.harkEvents = Hark(stream, {})
        this.isSpeaking = false;

        this.harkEvents.on('speaking', () => {
            this.isSpeaking = true;
        });

        this.harkEvents.on('volume_change', measurement => {
            // only process data when the user is actively speaking
            let level = Math.abs(measurement)
        })

        this.harkEvents.on('stopped_speaking', () => {
            this.isSpeaking = false;
        });
    }

    stop() {
        this.harkEvents.stop()
    }

}
