package com.craftmend.openaudiomc.generic.state.collectors;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.craftmend.CraftmendService;
import com.craftmend.openaudiomc.generic.state.interfaces.StateDetail;
import com.craftmend.openaudiomc.generic.voicechat.DefaultVoiceServiceImpl;
import com.craftmend.openaudiomc.generic.voicechat.VoiceService;

public class VoiceDetail implements StateDetail {
    @Override
    public String title() {
        return "VoiceRTP";
    }

    @Override
    public String value() {
        // is it even loaded
        if (OpenAudioMc.getService(CraftmendService.class).getVoiceService() == null) {
            return "No service";
        }

        VoiceService voiceService = OpenAudioMc.getService(CraftmendService.class).getVoiceService();

        if (voiceService.isEnabled()) {
            if (voiceService.getDriver() == null) {
                return "No driver";
            } else {
                if (voiceService instanceof DefaultVoiceServiceImpl) {
                    DefaultVoiceServiceImpl i = (DefaultVoiceServiceImpl) voiceService;
                    // parse service name
                    String host = i.getHost().split("\\.")[0].split("//")[1];
                    return "Using " + i.getUsedSlots() + " out of " + i.getAllowedSlots() + " slots @ " + host;
                } else {
                    return "Unknown service type";
                }
            }
        } else {
            return "Disabled";
        }
    }
}
