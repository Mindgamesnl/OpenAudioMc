package com.craftmend.openaudiomc.modules.media.objects;

import com.craftmend.openaudiomc.modules.players.objects.Client;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Getter
public class Media {

    //media tracker
    private UUID mediaId = UUID.randomUUID();

    //media owner
    @Setter private transient Client client;

    //media information
    private String source;
    private Instant startInstant;

    public Media(String source) {
        this.source = source;
        this.startInstant = Instant.now();
    }

}
