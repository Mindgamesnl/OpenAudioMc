package net.openaudiomc.jclient.modules.media.objects;

import lombok.Getter;

import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.player.objects.AudioListener;
import net.openaudiomc.jclient.utils.Mp3Reader;
import net.openaudiomc.jclient.utils.OpenaudioFailedMp3ParseException;

public class AudioRegion {

    @Getter private String id;
    private String url;
    private String urlKey;
    private Integer length;
    @Getter private Media media;

    public AudioRegion(String id, String url) {
        this.id = id;
        this.url = url;
        this.urlKey = this.url.replace(".", "--_--");

        System.out.println("[OpenAudioMc] Initializing region: " + this.id);

        if (OpenAudioMc.getInstance().getConfig().contains("storage.media.lenth." + this.urlKey)) {
            this.length = OpenAudioMc.getInstance().getConfig().getInt("storage.media.lenth." + this.urlKey);
        } else {
            try {
                new Mp3Reader(this.url).run()
                        .thenAccept(i -> {
                            length = i;
                            OpenAudioMc.getInstance().getConfig().set("storage.media.lenth." + this.urlKey, i);
                            OpenAudioMc.getInstance().saveConfig();
                        })
                        .exceptionally(e -> { e.printStackTrace(); return null; });
            } catch (OpenaudioFailedMp3ParseException e) {
                e.printStackTrace();
                OpenAudioMc.getInstance().getLogger().fine("Failed to load mp3 length!");
                this.length = 0;
                OpenAudioMc.getInstance().getConfig().set("storage.media.lenth." + this.urlKey, 0);
            }
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
    }

    public void play(AudioListener l) {
        l.sendPacket(this.media.getHandle(l));
    }

}
