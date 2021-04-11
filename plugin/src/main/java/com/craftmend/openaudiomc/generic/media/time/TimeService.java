package com.craftmend.openaudiomc.generic.media.time;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bukkit.Bukkit;

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
            now = now.plusSeconds(offset / 1000);
        } else {
            now = now.minusSeconds(offset / 1000);
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
        Instant local = Instant.now();

        // are we ahead?
        if (local.isAfter(server)) {
            // yes
            serverIsAhead = false;
            Duration diff = Duration.between(server, local);
            this.offset = diff.toMillis();
        } else {
            // no
            serverIsAhead = true;
            Duration diff = Duration.between(local, server);
            this.offset = diff.toMillis();
        }

        lastUpdated = Instant.now();
    }

}
