package com.craftmend.openaudiomc.services.time;

import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.Instant;

@NoArgsConstructor
public class TimeService {

    private long offset = 0;
    private boolean serverIsAhead = false;

    public Instant getSyncedInstant() {
        Instant now = Instant.now();
        if (serverIsAhead) {
            now.plus(Duration.ofSeconds(offset));
        } else {
            now.minus(Duration.ofSeconds(offset));
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
    }

}
