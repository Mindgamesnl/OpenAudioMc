import {AlertBox} from "../ui/Notification";
import {Card} from "../card/Card";
import {Channel} from "../media/objects/Channel";
import {Sound} from "../media/objects/Sound";
import {Vector3} from "../../helpers/math/Vector3";
import {Speaker} from "../world/objects/Speaker";

export class Handlers {

    constructor(openAudioMc) {
        this.openAudioMc = openAudioMc;

        // util
        function registerHandler(channel, handler) {
            openAudioMc.socketModule.registerHandler(channel, handler);
        }

        registerHandler("ClientCreateMediaPayload", data => {
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

            // only if its a new version and provided, then use that volume
            if (data.media.volume != null && data.media.volume != 0) {
                volume = data.media.volume;
            }

            // attempt to stop the existing one, if any
            openAudioMc.getMediaManager().destroySounds(id, false, true);

            const createdChannel = new Channel(id);
            createdChannel.trackable = true;
            const createdMedia = new Sound(source);
            createdMedia.openAudioMc = openAudioMc;
            createdMedia.setOa(openAudioMc);
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

            createdMedia.finalize().then(() => {
                if (doPickup) createdMedia.startDate(startInstant, true);
                createdMedia.finish();
            });
        });

        registerHandler("ClientDestroyCardPayload", () => {
            document.getElementById("card-panel").style.display = "none";
        });

        registerHandler("ClientUpdateCardPayload", data => {
            const cardData = JSON.parse(data.serializedCard);
            new Card().replaceWithJson(data.id, cardData);
        });

        registerHandler("ClientCreateCardPayload", data => {
            const cardData = JSON.parse(data.serializedCard);
            new Card(cardData);
        });


        registerHandler("NotificationPayload", data => {
            const message = data.message;
            this.openAudioMc.notificationModule.sendNotification(data.title, message);
            new AlertBox('#alert-area', {
                closeTime: 30000,
                persistent: false,
                hideCloseButton: false,
            }).show(data.title + '<hr />' + message);
        });

        registerHandler("ClientSettingsPayload", data => {
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
                try {
                    parent.document.title = title;
                } catch (e) {

                }
            }

            openAudioMc.getMessages().apply();
        });

        registerHandler("ClientVersionPayload", data => {
            const revision = parseInt(data.protocolRevision);

            console.log("[OpenAudioMc] Received PROTOCOL revision update");
            if (revision => 2) {
                // enable callbacks
                console.log("[OpenAudioMc] PROTO rev => 2, enabling callbacks");
                openAudioMc.socketModule.callbacksEnabled = true;
            }
        });

        registerHandler("ClientVolumePayload", data => {
            const target = data.volume;
            this.openAudioMc.getMediaManager().setMasterVolume(target);
            document.getElementById("volume-slider").value = target;
        });

        registerHandler("ClientDestroyMediaPayload", data => {
            this.openAudioMc.getMediaManager().destroySounds(data.soundId, data.all);
        });

        function convertRange(value, r1, r2) {
            return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
        }

        registerHandler("HueColorPayload", data => {
            const targetLights = data.lights;
            const targetColor = data.hueColor;
            const rgbaColor = "rgba(" + targetColor.r + "," + targetColor.g + "," + targetColor.b + "," + convertRange(targetColor.bir, [0, 255], [0, 1]) + ")";
            if (openAudioMc.getHueModule().isLinked) {
                openAudioMc.getHueModule().setLight(targetLights, rgbaColor);
            }
        });

        registerHandler("ClientUpdateMediaPayload", data => {
            const id = data.mediaOptions.target;
            const fadeTime = data.mediaOptions.fadeTime;
            const distance = data.mediaOptions.distance;

            for (let channel of openAudioMc.getMediaManager().mixer.getChannels()) {
                if (channel.hasTag(id)) {
                    channel.fadeChannel(this.convertDistanceToVolume(channel.maxDistance, distance), fadeTime);
                }
            }
        });

        registerHandler("ClientPlayerLocationPayload", data => {
            const x = data.x;
            const y = data.y;
            const z = data.z;
            const pitch = data.pitch;
            const yaw = data.yaw;

            this.openAudioMc.world.player.updateLocation(new Vector3(x, y, z), pitch, yaw);
        });

        registerHandler("ClientSpeakerCreatePayload", data => {
           // speaker in range
            const speaker = data.clientSpeaker;

            // Vector3 representing the center of the speaker
            const loc = new Vector3(
                speaker.location.x,
                speaker.location.y,
                speaker.location.z
            ).add(0.5, 0.5, 0.5);

            // create speaker
            const speakerData = new Speaker(
                speaker.id,
                speaker.source,
                loc,
                speaker.type,
                speaker.maxDistance,
                speaker.startInstant,
                this.openAudioMc
            );

            // add it to the render queue
            this.openAudioMc.world.addSpeaker(speaker.id, speakerData);
        });

        registerHandler("ClientSpeakerDestroyPayload", data => {
            // speaker out of range
            const speaker = data.clientSpeaker;
            this.openAudioMc.world.removeSpeaker(speaker.id);
        });

    }

    convertDistanceToVolume(maxDistance, currentDistance) {
        return Math.round(((maxDistance - currentDistance) / maxDistance) * 100);
    }

}
