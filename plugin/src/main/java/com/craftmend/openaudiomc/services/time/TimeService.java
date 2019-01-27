package com.craftmend.openaudiomc.services.time;

import lombok.NoArgsConstructor;
import org.bukkit.Bukkit;

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
