package com.craftmend.openaudiomc.generic.state;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.event.events.StateChangeEvent;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.state.collectors.*;
import com.craftmend.openaudiomc.generic.state.interfaces.State;
import com.craftmend.openaudiomc.generic.state.interfaces.StateDetail;
import com.craftmend.openaudiomc.generic.state.states.BootingState;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
public class StateService extends Service {

    @Getter private State currentState = new BootingState();
    @Getter private final List<StateDetail> details = new ArrayList<>();

    @Override
    public void onEnable() {
        // register states based on platform
        registerDetail(new GeneralStateDetail());
        registerDetail(new AccountTagDetail());
        registerDetail(new PlatformDetail());
        registerDetail(new TimeDetail());
        registerDetail(new PacketThroughputDetail());
        registerDetail(new ServerEnvironmentDetail());
        registerDetail(new VoiceDetail());

        if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT) {
            // minecraft specific shit
            registerDetail(new SpigotConnectedClients());
            registerDetail(new SpigotRegionDetail());
            registerDetail(new SpigotSpeakerDetail());
            registerDetail(new SpigotAliasDetail());
            registerDetail(new SpigotVersionDetail());
        } else {
            registerDetail(new GeneralConnectedClients());
        }
    }

    public void registerDetail(StateDetail detail) {
        details.add(detail);
    }

    public void setState(State state) {
        AudioApi.getInstance().getEventDriver().fire(new StateChangeEvent(currentState, state));

        if (StorageKey.DEBUG_LOG_STATE_CHANGES.getBoolean()) {
            OpenAudioLogger.toConsole("Updating state to: " + state.getClass().getSimpleName() + " - " + state.getDescription());
        }

        this.currentState = state;
    }

}
