package com.craftmend.openaudiomc.generic.state.collectors;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.state.interfaces.StateDetail;

import java.time.Duration;
import java.time.Instant;

public class TimeDetail implements StateDetail {

    @Override
    public String title() {
        return "TimeData";
    }

    @Override
    public String value() {
        return (OpenAudioMc.getInstance().getTimeService().getOffset() / 1000) + "compens, " + Duration.between(OpenAudioMc.getInstance().getTimeService().getLastUpdated(), Instant.now()).getSeconds() + " seconds ago";
    }

}
