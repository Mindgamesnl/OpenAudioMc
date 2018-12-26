package com.craftmend.openaudiomc.modules.media.objects;

import lombok.Getter;

import java.time.Instant;
import java.util.UUID;

@Getter
public class Media {

    //media tracker
    private UUID mediaId = UUID.randomUUID();

    //media information
    private String source;
    private transient Instant startInstant;
    private int length = -1;
    private Boolean hasTimings = false;

    public Media(String source) {
        this.source = source;
        this.startInstant = Instant.now();
    }

}
