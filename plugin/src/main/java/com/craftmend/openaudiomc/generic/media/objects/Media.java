package com.craftmend.openaudiomc.generic.media.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.media.enums.MediaFlag;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
public class Media {

    //media tracker
    @Setter @Getter private String mediaId = UUID.randomUUID().toString();

    //media information
    private String source;
    @Setter @Getter private long startInstant;
    @Setter @Getter private transient int keepTimeout = -1;
    @Getter @Setter private boolean doPickup = false;
    @Getter @Setter private boolean loop = false;
    @Getter @Setter private int fadeTime = 0;
    @Getter @Setter private MediaFlag flag = MediaFlag.DEFAULT;

    /**
     * Create a new media based on a url
     * the source will first be processed by the mutation api
     * so you can just use addons without needing to wor§§ry
     *
     * @param source the resource url
     */
    public Media(String source) {
        this.source = OpenAudioMc.getInstance().getMediaModule().process(source);
        this.startInstant = OpenAudioMc.getInstance().getTimeService().getSyncedInstant().toEpochMilli();
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
        return this;
    }

}
