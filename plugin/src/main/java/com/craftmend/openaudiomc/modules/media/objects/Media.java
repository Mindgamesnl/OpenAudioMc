package com.craftmend.openaudiomc.modules.media.objects;

import com.craftmend.openaudiomc.modules.players.objects.Client;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Getter
public class Media {

    //media tracker
    @Setter @Getter private String mediaId = UUID.randomUUID().toString();

    //media information
    private String source;
    private int startInstant;
    @Getter private transient int keepTimeout = -1;
    @Getter @Setter private Boolean doPickup = true;
    @Getter @Setter private Boolean loop = false;
    @Getter @Setter private Boolean autoPlay = true;
    @Getter @Setter private int fadeTime = 0;

    public Media(String source) {
        this.source = source;
        this.startInstant = (int) (System.currentTimeMillis() / 1000L);
    }

    public Media applySettings(MediaOptions options) {
        this.loop = options.getLoop();
        this.keepTimeout = options.getExpirationTimeout();
        this.autoPlay = options.getAutoPlay();
        if (options.getId() != null) this.mediaId = options.getId();
        this.doPickup = options.getPickUp();
        this.setFadeTime(options.getFadeTime());
        return this;
    }

}
