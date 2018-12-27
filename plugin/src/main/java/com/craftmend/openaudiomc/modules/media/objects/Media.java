package com.craftmend.openaudiomc.modules.media.objects;

import com.craftmend.openaudiomc.modules.players.objects.Client;
import lombok.Getter;
import lombok.Setter;

import java.time.Duration;
import java.time.Instant;
import java.util.UUID;

@Getter
public class Media {

    //media tracker
    private UUID mediaId = UUID.randomUUID();
    private transient Instant startInstant;
    private transient int duration = -1;

    //media owner
    @Setter private transient Client client;

    //media information
    private String source;

    public Media(String source) {
        this.source = source;
        this.startInstant = Instant.now();
    }

    public int getCurrentTime() {
        int timeStamp = (int) Duration.between(startInstant, Instant.now()).getSeconds();

        //check if it is too old
        if (timeStamp >= duration) {
            timeStamp = 0;
            startInstant = Instant.now();
        }

        return timeStamp;
    }

}
