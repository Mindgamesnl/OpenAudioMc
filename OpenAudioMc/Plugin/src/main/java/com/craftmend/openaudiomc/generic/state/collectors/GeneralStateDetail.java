package com.craftmend.openaudiomc.generic.state.collectors;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.state.StateService;
import com.craftmend.openaudiomc.generic.state.interfaces.StateDetail;

public class GeneralStateDetail implements StateDetail {
    @Override
    public String title() {
        return "State";
    }

    @Override
    public String value() {
        return OpenAudioMc.getService(StateService.class).getCurrentState().getClass().getSimpleName() + " - " + OpenAudioMc.getService(StateService.class).getCurrentState().getDescription();
    }
}
