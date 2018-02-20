package net.openaudiomc.jclient.modules.media.objects;

import lombok.Getter;

import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.player.objects.AudioListener;
import net.openaudiomc.jclient.utils.Mp3Reader;
import net.openaudiomc.jclient.utils.OpenaudioFailedMp3ParseException;
import net.openaudiomc.jclient.utils.config.ConfigStorageMedia;

public class AudioRegion {

    @Getter private String id;
    private String url;
    private String urlKey;
    private Long length;
    @Getter private Media media;

    public AudioRegion(String id, String url) {
        this.id = id;
        this.url = url;
        this.urlKey = this.url.replace(".", "--_--");

        System.out.println("[OpenAudioMc] Initializing region: " + this.id);

        if (OpenAudioMc.getInstance().getConf().getStorage().getMedia(this.urlKey) != null) {
            this.length = OpenAudioMc.getInstance().getConf().getStorage().getMedia(this.urlKey).getLength();
            this.media = new Media(this.url);
            this.media.setSyncronized(length);
            this.media.setId("region_"+id);
        } else {
            ConfigStorageMedia mediaConfig = new ConfigStorageMedia();
            mediaConfig.setName(this.urlKey);
            try {
                new Mp3Reader(OpenAudioMc.getInstance().getApiEndpoints().youtubeEndpoint(url, "oa-region-prompter")).run()
                        .thenAccept(i -> {
                            if (i == null) {
                                OpenAudioMc.getInstance().getLogger().fine("Failed to load mp3 length!");
                                length = 0L;
                                mediaConfig.setLength(0L);
                            } else {
                                length = i;
                                mediaConfig.setLength(i);
                            }

                            if (this.length != 0) {
                                this.media = new Media(this.url);
                                this.media.setLooping();
                                this.media.setId("region_" + this.id);
                                this.media.setSyncronized(this.length);
                                System.out.println("[OpenAudioMc] Created syncronized region: " + this.id);
                            } else {
                                this.media = new Media(this.url);
                                this.media.setLooping();
                                this.media.setId("region_" + this.id);
                                System.out.println("[OpenAudioMc] Failed to create syncronized region, region is now in the old default mode: " + this.id);
                            }

                            OpenAudioMc.getInstance().getConf().getStorage().addMedia(mediaConfig);
                        })
                        .exceptionally(e -> { e.printStackTrace(); return null; });
            } catch (OpenaudioFailedMp3ParseException e) {
                e.printStackTrace();
                OpenAudioMc.getInstance().getLogger().fine("Failed to load mp3 length!");
                this.length = 0L;
                mediaConfig.setLength(0L);
            }
        }
    }

    public void play(AudioListener l) {
        if (this.media != null) {
            l.sendPacket(this.media.getHandle(l));
        }
    }

}
