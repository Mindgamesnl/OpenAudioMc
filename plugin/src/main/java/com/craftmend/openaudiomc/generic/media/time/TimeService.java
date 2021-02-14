package com.craftmend.openaudiomc.generic.media.time;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.Instant;

@NoArgsConstructor
public class TimeService {

    @Getter private long offset = 0;
    private boolean serverIsAhead = false;
    @Getter private Instant lastUpdated = Instant.now();

    public Instant getSyncedInstant() {
        Instant now = Instant.now();
        if (serverIsAhead) {
            now.plus(Duration.ofMillis(offset));
        } else {
            now.minus(Duration.ofMillis(offset));
        }
        return now;
    }

    /**
     * calculate the time difference between server and client
     *
     * @param timeStamp the server time
     * @param offset the server offset
     */
    public void pushServerUpdate(long timeStamp, long offset) {
        offset = Math.abs(offset / 60);
        Instant server = Instant.ofEpochMilli(timeStamp);
        if (offset < 0) {
            server.minus(Duration.ofHours(offset));
        } else {
            server.plus(Duration.ofHours(offset));
        }
        Instant local = Instant.now();
        Duration diff = Duration.between(local, server);
        serverIsAhead = !diff.isNegative();
        this.offset = diff.toMillis();
        lastUpdated = Instant.now();
    }

}
