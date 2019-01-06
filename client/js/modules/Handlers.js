class Handlers {

    constructor(openAudioMc) {

        openAudioMc.socketModule.registerHandler("ClientCreateMediaPayload", function (data) {
            const looping = data.media.loop;
            const autoplay = data.media.autoPlay;
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
            media = new WebAudio(source, function () {
                openAudioMc.getMediaManager().registerMedia(id, media);
                media.setMasterVolume(openAudioMc.getMediaManager().getMasterVolume());

                if (maxDistance !== 0) {
                    volume = openAudioMc.getUtils().calculateVolume((maxDistance - distance), maxDistance);
                    media.setHasOwnVolume(true);
                } else {
                    media.setHasOwnVolume(false);
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
                if (autoplay) media.play();
            });
        });

        openAudioMc.socketModule.registerHandler("ClientDestroyMediaPayload", function (data) {
            openAudioMc.getMediaManager().destroySounds(data.soundId);
        });

        function convertRange( value, r1, r2 ) {
            return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
        }

        openAudioMc.socketModule.registerHandler("HueColorPayload", function (data) {
            const targetLights = data.lights;
            const targetColor = data.hueColor;
            const rgbaColor = "rgba(" + targetColor.r + "," + targetColor.g + "," + targetColor.b + "," + convertRange( targetColor.bir, [0, 255], [0, 1]) + ")";
            if (openAudioMc.getHueModule().isLinked) {
                openAudioMc.getHueModule().setLight(targetLights, rgbaColor);
            }
        });

        openAudioMc.socketModule.registerHandler("ClientUpdateMediaPayload", function (data) {
            const id = data.mediaOptions.target;
            const fadeTime = data.mediaOptions.fadeTime;
            const distance = data.mediaOptions.distance;
            const maxDistance = data.mediaOptions.maxDistance;
            const media = openAudioMc.getMediaManager().getSound(id);
            if (media != null) media.setVolume(openAudioMc.getUtils().calculateVolume((maxDistance - distance), maxDistance), fadeTime);
        });

    }

}