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

    //media owner
    @Setter private transient Client client;

    //media information
    private String source;
    private int startInstant;
    @Getter @Setter private Boolean doPickup = true;
    @Getter @Setter private Boolean loop = false;
    @Getter @Setter private Boolean autoPlay = true;

    public Media(String source) {
        this.source = source;
        this.startInstant = (int) (System.currentTimeMillis() / 1000L);
    }

}
