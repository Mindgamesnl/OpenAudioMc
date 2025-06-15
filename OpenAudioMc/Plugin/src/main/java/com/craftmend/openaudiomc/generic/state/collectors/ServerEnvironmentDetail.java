package com.craftmend.openaudiomc.generic.state.collectors;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.state.interfaces.StateDetail;

public class ServerEnvironmentDetail implements StateDetail {
    @Override
    public String title() {
        return "Env";
    }

    @Override
    public String value() {
        return OpenAudioMc.SERVER_ENVIRONMENT.name();
    }
}
