package com.craftmend.openaudiomc.generic.state.collectors;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.state.interfaces.StateDetail;

public class PacketThroughputDetail implements StateDetail {
    @Override
    public String title() {
        return "Throughput";
    }

    @Override
    public String value() {
        return OpenAudioMc.getInstance().getNetworkingService().getThroughputPerSecond() + "";
    }
}
