import {AlertBox} from "../ui/Notification";
import {Card} from "../card/Card";
import {Channel} from "../media/objects/Channel";
import {Sound} from "../media/objects/Sound";
import {Vector3} from "../../helpers/ThreeJS/Vector3";

export class Handlers {

    constructor(openAudioMc) {
        this.openAudioMc = openAudioMc;

        if (window.location.href.indexOf("debug") > -1) {
            console.log("Allowing debug")
            var AudioContext = window.AudioContext || window.webkitAudioContext;
            var audioCtx = new AudioContext();

            var panner = audioCtx.createPanner();
            panner.panningModel = 'HRTF';
            panner.distanceModel = 'inverse';
            panner.refDistance = 1;
            panner.maxDistance = 10;
            panner.rolloffFactor = 1;
            panner.coneInnerAngle = 360;
            panner.coneOuterAngle = 360;
            panner.coneOuterGain = 0;

            panner.positionX.value = -387.5;
            panner.positionY.value = 73;
            panner.positionZ.value = 275.5;


            let source = audioCtx.createBufferSource();
            let request = new XMLHttpRequest();

            request.open('GET', 'https://cf-media.sndcdn.com/LHfrvAkR4OrR.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vTEhmcnZBa1I0T3JSLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE1OTA0MjA1NTZ9fX1dfQ__&Signature=OuF5Uy8LzyJb3AP53A1gCWxd9lyOiH3yWE5DwwhQZzPiRkppYm6xpAqKxiFuH7sHIh~S4ioVTmGAwBnUdscyNQmLIbeL26h-vosYr8j8xYCIg83nfZ5Uxp3mc9zZpgR-DE7tHLFebcqSZbsTEv9uizWx26y-l6DVYSOCyM5XXgsWv0qeIix14SjS-GGOFBRtGyPThWKxNWTQeuWDIVH~MadeMjaFy11Sd6MlnGIReCKPXje4ybjsq8BIYtaeaqj1Wq4qIxqxPvwaEAKM~dgcnyKKsY65aVRx6L6MFnuyfXkpshY6io4u1Wcx0AYtGMxnOZN4oylZONmDwxTwcKGmZQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ', true);

            request.responseType = 'arraybuffer';


            request.onload = function () {
                let audioData = request.response;

                audioCtx.decodeAudioData(audioData, function (buffer) {
                        let myBuffer = buffer;
                        source.buffer = myBuffer;

                        source.connect(panner);
                        panner.connect(audioCtx.destination);
                        source.loop = true;
                    },

                    function (e) {
                        console.log("Error with decoding audio data" + e.err);
                    });
            }
            request.send();

            var listener = audioCtx.listener;
            listener.setOrientation(0, 0, -1, 0, 1, 0);

            openAudioMc.socketModule.registerHandler("ClientPlayerLocationPayload", data => {
                const x = data.x;
                const y = data.y;
                const z = data.z;
                const pitch = data.pitch;
                const yaw = data.yaw;

                let position = new Vector3(x, y, z);
                let forward = this.calculateOffset(x, y, z, pitch + 90, yaw, 1);
                let up = this.calculateOffset(x, y, z, 90 + pitch, yaw, 1);

                listener.forwardX.value = forward.x;
                listener.forwardY.value = forward.y;
                listener.forwardZ.value = forward.z;
                listener.positionX.value = position.x;
                listener.positionY.value = position.y;
                listener.positionZ.value = position.z;
                listener.upX.value = up.x;
                listener.upY.value = up.y;
                listener.upZ.value = up.z;

                console.log("update loc")
            });

            source.start(0);

        }


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
            let volume = 100;

            // attempt to stop the existing one, if any
            openAudioMc.getMediaManager().destroySounds(id, false, true);

            const createdChannel = new Channel(id);
            const createdMedia = new Sound(source);
            createdMedia.openAudioMc = openAudioMc;
            createdMedia.setOa(openAudioMc);
            if (doPickup) createdMedia.startDate(startInstant, true);
            createdMedia.finalize().then(ready => {
                if (doPickup) createdMedia.startDate(startInstant, true);
                openAudioMc.getMediaManager().mixer.addChannel(createdChannel);
                createdChannel.addSound(createdMedia);
                createdChannel.setChannelVolume(0);
                createdMedia.setLooping(looping);
                createdChannel.setTag(id);

                // convert distance
                if (maxDistance !== 0) {
                    let startVolume = this.convertDistanceToVolume(maxDistance, distance);
                    createdChannel.setTag("SPECIAL");
                    createdChannel.maxDistance = maxDistance;
                    createdChannel.fadeChannel(startVolume, fadeTime);
                } else {
                    // default sound, just play
                    createdChannel.setTag("DEFAULT");
                    setTimeout(() => {
                        if (fadeTime === 0) {
                            createdChannel.setChannelVolume(volume);
                            createdChannel.updateFromMasterVolume();
                        } else {
                            createdChannel.updateFromMasterVolume();
                            createdChannel.fadeChannel(volume, fadeTime);
                        }
                    }, 1);
                }


                createdChannel.setTag(flag);

                openAudioMc.getMediaManager().mixer.updateCurrent();

                createdMedia.finish();
            });
        });

        openAudioMc.socketModule.registerHandler("ClientDestroyCardPayload", () => {
            document.getElementById("card-panel").style.display = "none";
        });

        openAudioMc.socketModule.registerHandler("ClientUpdateCardPayload", data => {
            const cardData = JSON.parse(data.serializedCard);
            new Card().replaceWithJson(data.id, cardData);
        });

        openAudioMc.socketModule.registerHandler("ClientCreateCardPayload", data => {
            const cardData = JSON.parse(data.serializedCard);
            new Card(cardData);
        });


        openAudioMc.socketModule.registerHandler("NotificationPayload", data => {
            const message = data.message;
            this.openAudioMc.notificationModule.sendNotification(data.title, message);
            new AlertBox('#alert-area', {
                closeTime: 30000,
                persistent: false,
                hideCloseButton: false,
            }).show(data.title + '<hr />' + message);
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
                    "            url(" + background + ");\n" +
                    "    -webkit-background-size: cover;\n" +
                    "    background-size: cover;"
            }

            if (title !== "default") {
                document.title = title;
            }

            openAudioMc.getMessages().apply();
        });

        openAudioMc.socketModule.registerHandler("ClientVersionPayload", data => {
            const revision = parseInt(data.protocolRevision);

            console.log("[OpenAudioMc] Received PROTOCOL revision update");
            if (revision => 2) {
                // enable callbacks
                console.log("[OpenAudioMc] PROTO rev => 2, enabling callbacks");
                openAudioMc.socketModule.callbacksEnabled = true;
            }
        });

        openAudioMc.socketModule.registerHandler("ClientVolumePayload", data => {
            const target = data.volume;
            this.openAudioMc.getMediaManager().setMasterVolume(target);
            document.getElementById("volume-slider").value = target;
        });

        openAudioMc.socketModule.registerHandler("ClientDestroyMediaPayload", data => {
            this.openAudioMc.getMediaManager().destroySounds(data.soundId, data.all);
        });

        function convertRange(value, r1, r2) {
            return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
        }

        openAudioMc.socketModule.registerHandler("HueColorPayload", data => {
            const targetLights = data.lights;
            const targetColor = data.hueColor;
            const rgbaColor = "rgba(" + targetColor.r + "," + targetColor.g + "," + targetColor.b + "," + convertRange(targetColor.bir, [0, 255], [0, 1]) + ")";
            if (openAudioMc.getHueModule().isLinked) {
                openAudioMc.getHueModule().setLight(targetLights, rgbaColor);
            }
        });

        openAudioMc.socketModule.registerHandler("ClientUpdateMediaPayload", data => {
            const id = data.mediaOptions.target;
            const fadeTime = data.mediaOptions.fadeTime;
            const distance = data.mediaOptions.distance;

            for (let channel of openAudioMc.getMediaManager().mixer.getChannels()) {
                if (channel.hasTag(id)) {
                    channel.fadeChannel(this.convertDistanceToVolume(channel.maxDistance, distance), fadeTime);
                }
            }
        });

    }

    degreesToRadians(degrees) {
        var pi = Math.PI;
        return degrees * (pi / 180);
    }

    calculateOffset(x, y, z, pitch, yaw, distance) {
        pitch = this.degreesToRadians(pitch);
        yaw = this.degreesToRadians(yaw);
        let targetX = x;
        let targetY = y;
        let targetZ = z;

        targetX = Math.sin(pitch) * Math.cos(yaw);
        targetY = Math.sin(yaw) * Math.cos(pitch);
        targetZ = Math.sin(pitch) * Math.sin(yaw);

        return new Vector3(
            x + (targetX * distance) - 1,
            y + (targetY * distance),
            z + (targetZ * distance),
        );
    }

    convertDistanceToVolume(maxDistance, currentDistance) {
        return Math.round(((maxDistance - currentDistance) / maxDistance) * 100);
    }

}
