package com.craftmend.openaudiomc.generic.state.collectors;

import com.craftmend.openaudiomc.generic.state.interfaces.StateDetail;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;

public class SpigotVersionDetail implements StateDetail {

    @Override
    public String title() {
        return "SrvVersion";
    }

    @Override
    public String value() {
        return OpenAudioMcSpigot.getInstance().getServerService().getVersion().toString();
    }

}
