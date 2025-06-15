package com.craftmend.openaudiomc.generic.state.collectors;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.state.interfaces.StateDetail;

public class PlatformDetail implements StateDetail {
    @Override
    public String title() {
        return "Platform";
    }

    @Override
    public String value() {
        return OpenAudioMc.getInstance().getPlatform().toString();
    }
}
