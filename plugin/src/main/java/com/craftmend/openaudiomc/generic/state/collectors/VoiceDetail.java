package com.craftmend.openaudiomc.generic.state.collectors;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.craftmend.CraftmendService;
import com.craftmend.openaudiomc.generic.state.interfaces.StateDetail;
import com.craftmend.openaudiomc.generic.voicechat.bus.VoiceApiConnection;
import com.craftmend.openaudiomc.generic.voicechat.enums.VoiceApiStatus;

public class VoiceDetail implements StateDetail {
    @Override
    public String title() {
        return "VoiceRTP";
    }

    @Override
    public String value() {
        VoiceApiConnection apiConnection = OpenAudioMc.getService(CraftmendService.class).getVoiceApiConnection();

        if (apiConnection.getStatus() != VoiceApiStatus.CONNECTED) {
            return apiConnection.getStatus().name();
        }

        // parse service name
        String host = apiConnection.getHost().split("\\.")[0].split("//")[1];
        return "Using " + apiConnection.getUsedSlots() + " out of " + apiConnection.getMaxSlots() + " slots @ " + host;
    }
}
