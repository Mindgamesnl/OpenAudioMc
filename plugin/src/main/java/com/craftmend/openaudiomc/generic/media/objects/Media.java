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
    @Setter private String mediaId = UUID.randomUUID().toString();

    //media information
    private String source;
    @Setter private long startInstant;
    @Setter private transient int keepTimeout = -1;
    @Setter private boolean doPickup = false;
    @Setter private boolean loop = false;
    @Setter private int fadeTime = 0;
    @Setter private int volume = 100;
    @Setter private boolean muteRegions = false;
    @Setter private boolean muteSpeakers = false;
    @Setter private int startAtSeconds = 0;
    @Setter private MediaFlag flag = MediaFlag.DEFAULT;

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
        this.muteRegions = options.isMuteRegions();
        this.muteSpeakers = options.isMuteSpeakers();
        this.startAtSeconds = options.getStartAtSeconds();
        return this;
    }

}
