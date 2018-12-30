class Handlers {

    constructor(openAudioMc) {

        openAudioMc.socketModule.registerHandler("ClientCreateMediaPayload", function (data) {
            const looping = data.media.loop;
            const autoplay = data.media.autoPlay;
            const startInstant = data.media.startInstant;
            const id = data.media.mediaId;
            const source = data.media.source;
            const doPickup = data.media.doPickup;

            let media;
            media = new WebAudio(source, function () {
                openAudioMc.getMediaManager().registerMedia(id, media);
                media.setVolume(0);
                media.setLooping(looping);
                if (doPickup) media.startDate(startInstant, looping);
                if (autoplay) media.play();
                media.setVolume(100, 1500);
            });
        });

        openAudioMc.socketModule.registerHandler("ClientDestroyMediaPayload", function (data) {
            openAudioMc.getMediaManager().destroySounds(data.soundId);
        });

    }

}