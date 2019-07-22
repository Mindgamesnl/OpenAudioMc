package com.craftmend.openaudiomc.generic.media.objects;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
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
    private int startInstant;
    @Setter @Getter private transient int keepTimeout = -1;
    @Getter @Setter private Boolean doPickup = true;
    @Getter @Setter private Boolean loop = false;
    @Getter @Setter private int fadeTime = 0;
    @Getter @Setter private MediaFlag flag = MediaFlag.DEFAULT;

    /**
     * Create a new media based on a url
     * the source will first be processed by the mutation api
     * so you can just use addons without needing to worry
     *
     * @param source the resource url
     */
    public Media(String source) {
        this.source = OpenAudioMcSpigot.getInstance().getMediaModule().process(source);
        this.startInstant = (int) (OpenAudioMcSpigot.getInstance().getTimeService().getSyncedInstant().toEpochMilli() / 1000);
    }

    /**
     * You can apply multiple options.
     * Used by the commands to allow settings via JSON
     *
     * @param options The options. Selected via the command
     * @return instance of self
     */
    public Media applySettings(MediaOptions options) {
        this.loop = options.getLoop();
        this.keepTimeout = options.getExpirationTimeout();
        if (options.getId() != null) this.mediaId = options.getId();
        this.doPickup = options.getPickUp();
        this.setFadeTime(options.getFadeTime());
        return this;
    }

}
