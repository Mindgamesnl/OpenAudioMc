import {WebAudio} from "../media/WebAudio";

export class Handlers {

    constructor(openAudioMc) {
        this.openAudioMc = openAudioMc;

        openAudioMc.socketModule.registerHandler("ClientCreateMediaPayload", data => {
            const looping = data.media.loop;
            const startInstant = data.media.startInstant;
            const id = data.media.mediaId;
            const source = data.media.source;
            const doPickup = data.media.doPickup;
            const fadeTime = data.media.fadeTime;
            const distance = data.distance;
            const flag = data.media.flag;
            const maxDistance = data.maxDistance;
            let volume = openAudioMc.getMediaManager().getMasterVolume();

            let media;
            media = new WebAudio(source, openAudioMc, function () {
                openAudioMc.getMediaManager().registerMedia(id, media);
                media.setMasterVolume(openAudioMc.getMediaManager().getMasterVolume());

                if (maxDistance !== 0) {
                    media.setSpeakerData(maxDistance, distance);
                }

                media.setFlag(flag);

                if (fadeTime === 0) {
                    media.setVolume(volume);
                } else {
                    media.setVolume(0);
                    media.setVolume(volume, fadeTime);
                }

                media.setLooping(looping);
                if (doPickup) media.startDate(startInstant, looping);
                media.play();
            });
        });

        openAudioMc.socketModule.registerHandler("ClientSettingsPayload", data => {
            this.openAudioMc.debugPrint("Updating settings...");
            const settings = data.clientSettings;
            const background = settings.background;
            const title = settings.title;
            const welcomeMessage = settings.welcomeMessage;
            const errorMessage = settings.errorMessage;
            const hueConnected = settings.hueConnected;
            const hueLinking = settings.hueLinking;
            const hueBridgeFound = settings.hueBridgeFound;

            if (hueConnected !== "default") openAudioMc.getMessages().hueConnected = hueConnected;
            if (hueLinking !== "default") openAudioMc.getMessages().hueLinking = hueLinking;
            if (hueBridgeFound !== "default") openAudioMc.getMessages().hueWelcome = hueBridgeFound;
            if (errorMessage !== "default") openAudioMc.getMessages().errorMessage = errorMessage;
            if (welcomeMessage !== "default") openAudioMc.getMessages().welcomeMessage = welcomeMessage;

            if (background !== "default") {
                document.getElementById("page").style = "vertical-align: middle;\n" +
                    "    background:\n" +
                    "            linear-gradient(\n" +
                    "                    rgba(98, 90, 238, 0.45),\n" +
                    "                    rgba(98, 90, 238, 0.25)\n" +
                    "            ),\n" +
                    "            url(" + background + ");\n" +
                    "    font-family: 'Roboto', serif;\n" +
                    "    -webkit-background-size: cover;\n" +
                    "    background-size: cover;"
            }

            if (title !== "default") {
                document.title = title;
            }

            openAudioMc.getMessages().apply();
        });

        openAudioMc.socketModule.registerHandler("ClientVolumePayload", data => {
            const target = data.volume;
            this.openAudioMc.getMediaManager().setMasterVolume(target);
            document.getElementById("volume-slider").value = target;
        });

        openAudioMc.socketModule.registerHandler("ClientDestroyMediaPayload", data => {
            this.openAudioMc.getMediaManager().destroySounds(data.soundId);
        });

        function convertRange(value, r1, r2) {
            return (value-r1[0]) * (r2[1]-r2[0]) / (r1[1] - r1[0]) + r2[0];
        }

        openAudioMc.socketModule.registerHandler("HueColorPayload", data => {
            const targetLights = data.lights;
            const targetColor = data.hueColor;
            const rgbaColor = "rgba(" + targetColor.r + "," + targetColor.g + "," + targetColor.b + "," + convertRange(targetColor.bir, [0,255], [0,1]) + ")";
            if (openAudioMc.getHueModule().isLinked) {
                openAudioMc.getHueModule().setLight(targetLights, rgbaColor);
            }
        });

        openAudioMc.socketModule.registerHandler("ClientUpdateMediaPayload", data => {
            const id = data.mediaOptions.target;
            const fadeTime = data.mediaOptions.fadeTime;
            const distance = data.mediaOptions.distance;
            const media = openAudioMc.getMediaManager().getSound(id);
            if (media != null){
                if (distance != null) {
                    media.updateDistance(distance);
                }
                media.setVolume(openAudioMc.getMediaManager().masterVolume, fadeTime);
            }
        });

    }

}
