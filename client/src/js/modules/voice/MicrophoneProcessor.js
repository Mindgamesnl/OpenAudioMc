import {Hark} from "../../helpers/libs/hark.bundle";

export class MicrophoneProcessor {

    constructor(openAudioMc, voiceModule, stream) {
        this.openAudioMc = openAudioMc
        this.stream = stream;
        this.voiceModule = voiceModule;
        this.id = "visual-speaking-indicator";
        this.createHark(null);
    }

    createHark(vol) {
        this.harkEvents = Hark(this.stream, {})
        this.isSpeaking = false;

        this.harkEvents.on('speaking', () => {
            this.isSpeaking = true;

            // set talking UI
            document.getElementById(this.id).style.backgroundColor = "#34D399"
            document.getElementById(this.id).style.color = "#60A5FA"
        });

        this.harkEvents.on('volume_change', measurement => {
            // only process data when the user is actively speaking
            let level = Math.abs(measurement)
        })

        this.harkEvents.on('stopped_speaking', () => {
            this.isSpeaking = false;

            // set talking UI
            document.getElementById(this.id).style.backgroundColor = ""
            document.getElementById(this.id).style.color = ""
        });
    }

    stop() {
        this.harkEvents.stop()
    }

}
