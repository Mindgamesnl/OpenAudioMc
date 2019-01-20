package com.craftmend.openaudiomc.services.time;

import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;

@NoArgsConstructor
public class TimeService {

    private int offset = 0;
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

    public void pushServerUpdate(int timeStampSeconds) {
        Instant server = new Date((long) timeStampSeconds * 1000).toInstant();
        Instant local = Instant.now();
        Duration differance = Duration.between(local, server);
        serverIsAhead = !differance.isNegative();
        offset = (int) (differance.toMillis() / 1000);
    }

}
