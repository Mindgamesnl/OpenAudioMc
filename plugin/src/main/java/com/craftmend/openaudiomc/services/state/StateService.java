package com.craftmend.openaudiomc.services.state;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.services.state.interfaces.State;
import com.craftmend.openaudiomc.services.state.states.BootingState;
import lombok.Getter;

public class StateService {

    @Getter private State currentState = new BootingState();
    private OpenAudioMc openAudioMc;

    public StateService(OpenAudioMc openAudioMc) {
        this.openAudioMc = openAudioMc;
    }

    public void setState(State state) {
        // check if state logging is enabled
        Boolean logState = this.openAudioMc.getConfigurationModule().getDataConfig().getBoolean("debug.log-state-changes");
        if (logState) System.out.println(OpenAudioMc.getLOG_PREFIX() + "Changing state from ["
                + currentState.getClass().getSimpleName()
                + "] to ["
                + state.getClass().getSimpleName() + "]");

        // update class
        this.currentState = state;
    }

}
