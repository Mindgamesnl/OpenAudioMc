package net.openaudiomc.jclient.modules.media.objects;

import lombok.Getter;

import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.player.objects.AudioListener;
import net.openaudiomc.jclient.utils.Mp3Reader;
import net.openaudiomc.jclient.utils.OpenaudioFailedMp3ParseException;
import net.openaudiomc.jclient.utils.config.ConfigStorageMedia;

public class AudioSpeaker {

    @Getter private String id;
    private String url;
    private String urlKey;
    private Long length;
    @Getter private Media media;

    public AudioSpeaker(String id, String source) {
        this.id = id;
        this.url = source;
        this.urlKey = this.url.replace(".", "--_--");

        System.out.println("[OpenAudioMc] Initializing speaker: " + this.id);

        if (OpenAudioMc.getInstance().getConf().getStorage().getMedia(this.urlKey) != null) {
            this.length = OpenAudioMc.getInstance().getConf().getStorage().getMedia(this.urlKey).getLength();
            this.media = new Media(OpenAudioMc.getInstance().getApiEndpoints().youtubeEndpoint(this.url, "oa-region-prompter"));
            this.media.setSyncronized(length);
            this.media.setId("speaker_"+id);
            this.media.setLooping();
        } else {
            ConfigStorageMedia savedMedia = new ConfigStorageMedia();
            savedMedia.setName(this.urlKey);
            new Mp3Reader(OpenAudioMc.getInstance().getApiEndpoints().youtubeEndpoint(source, "oa-region-prompter")).run()
                    .thenAccept(i -> {
                        if (i == null) {
                            OpenAudioMc.getInstance().getLogger().fine("Failed to load mp3 length!");
                            length = 0L;
                            savedMedia.setLength(0L);
                        } else {
                            length = i;
                            savedMedia.setLength(i);
                        }

                        if (length != 0) {
                            this.media = new Media(this.url);
                            this.media.setLooping();
                            this.media.setId("speaker_" + this.id);
                            this.media.setSyncronized(this.length);
                            System.out.println("[OpenAudioMc] Created syncronized speaker: " + this.id);
                        } else {
                            this.media = new Media(this.url);
                            this.media.setLooping();
                            this.media.setId("speaker_" + this.id);
                            System.out.println("[OpenAudioMc] Failed to create syncronized speaker, speaker is now in the old default mode: " + this.id);
                        }
                        OpenAudioMc.getInstance().getConf().getStorage().addMedia(savedMedia);
                    })
                    .exceptionally(e -> { e.printStackTrace(); return null; });
        }
    }

    public void play(AudioListener l) {
        if (this.media != null) {
            l.sendPacket(this.media.getHandle(l));
        }
    }
}
