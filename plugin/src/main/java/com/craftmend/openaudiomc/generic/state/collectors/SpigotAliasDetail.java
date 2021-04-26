package com.craftmend.openaudiomc.generic.state.collectors;

import com.craftmend.openaudiomc.generic.state.interfaces.StateDetail;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;

public class SpigotAliasDetail implements StateDetail {

    @Override
    public String title() {
        return "Aliases";
    }

    @Override
    public String value() {
        return OpenAudioMcSpigot.getInstance().getAliasModule().getAliasMap().size() + "";
    }

}
