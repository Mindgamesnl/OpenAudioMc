package com.craftmend.openaudiomc.generic.media.time;

import com.craftmend.openaudiomc.api.EventApi;
import com.craftmend.openaudiomc.generic.events.events.TimeServiceUpdateEvent;
import com.craftmend.openaudiomc.generic.service.Service;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.Instant;

@NoArgsConstructor
public class TimeService extends Service {

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

        // push to child servers
        EventApi.getInstance().callEvent(new TimeServiceUpdateEvent(this));
    }

    @Override
    public void onEnable() {

    }
}
