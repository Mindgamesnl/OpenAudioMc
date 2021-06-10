import {Hark} from "../../helpers/libs/hark.bundle";
import GainController from "mediastream-gain";

export class MicrophoneProcessor {

    constructor(openAudioMc, voiceModule, stream) {
        this.openAudioMc = openAudioMc
        this.stream = stream;
        this.voiceModule = voiceModule;
        this.id = "visual-speaking-indicator";

        this.harkEvents = Hark(this.stream, {})

        this.gainController = new GainController(stream);

        let presetVolume = Cookies.get("mic-sensitivity");
        if (presetVolume != null) {
            presetVolume = parseInt(presetVolume)
            this.harkEvents.setThreshold(presetVolume)
        }

        document.getElementById("mic-sensitive-slider").value = Math.abs(this.harkEvents.getThreshold())

        this.isSpeaking = false;
        this.harkEvents.setInterval(5)

        document.getElementById("mic-sensitive-slider").oninput = (e) => {
            let target = -Math.abs(e.target.value)
            this.harkEvents.setThreshold(target)
            Cookies.set("mic-sensitivity", target + "", {expires: 30});
        }

        this.harkEvents.on('speaking', () => {
            this.isSpeaking = true;

            // set talking UI
            document.getElementById(this.id).style.backgroundColor = "#34D399"
            document.getElementById(this.id).style.color = "#EC4899"
            this.gainController.on();
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
            this.gainController.off();
        });
    }

    stop() {
        this.harkEvents.stop()
    }

}
