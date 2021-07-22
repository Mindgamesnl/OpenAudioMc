package com.craftmend.openaudiomc.generic.media.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.media.MediaService;
import com.craftmend.openaudiomc.generic.media.enums.MediaFlag;
import com.craftmend.openaudiomc.generic.media.time.TimeService;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
public class Media {

    //media tracker
    @Setter @Getter private String mediaId = UUID.randomUUID().toString();

    //media information
    private final String source;
    @Setter @Getter private long startInstant;
    @Setter @Getter private transient int keepTimeout = -1;
    @Getter @Setter private boolean doPickup = false;
    @Getter @Setter private boolean loop = false;
    @Getter @Setter private int fadeTime = 0;
    @Getter @Setter private int volume = 100;
    @Getter @Setter private MediaFlag flag = MediaFlag.DEFAULT;

    /**
     * Create a new media based on a url
     * the source will first be processed by the mutation api
     * so you can just use addons without needing to wor§§ry
     *
     * @param source the resource url
     */
    public Media(String source) {
        this.source = OpenAudioMc.getService(MediaService.class).process(source);
        this.startInstant = OpenAudioMc.getService(TimeService.class).getSyncedInstant().toEpochMilli();
    }

    /**
     * You can apply multiple options.
     * Used by the commands to allow settings via JSON
     *
     * @param options The options. Selected via the command
     * @return instance of self
     */
    public Media applySettings(MediaOptions options) {
        this.loop = options.isLoop();
        this.keepTimeout = options.getExpirationTimeout();
        if (options.getId() != null) this.mediaId = options.getId();
        this.doPickup = options.isPickUp();
        this.setFadeTime(options.getFadeTime());
        this.volume = options.getVolume();
        return this;
    }

}
