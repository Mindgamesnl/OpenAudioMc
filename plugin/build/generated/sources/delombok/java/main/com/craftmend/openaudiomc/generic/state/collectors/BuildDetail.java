package com.craftmend.openaudiomc.generic.state.collectors;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.state.interfaces.StateDetail;

public class BuildDetail implements StateDetail {

    @Override
    public String title() {
        return "Build";
    }

    @Override
    public String value() {
        return "Running build: " + OpenAudioMc.BUILD.getBuildNumber();
    }

}
