package com.craftmend.openaudiomc.generic.state.collectors;

import com.craftmend.openaudiomc.generic.state.interfaces.StateDetail;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;

public class SpigotSpeakerDetail implements StateDetail {
    @Override
    public String title() {
        return "Loaded Speakers";
    }

    @Override
    public String value() {
        return OpenAudioMcSpigot.getInstance().getSpeakerModule().getSpeakerMap().size() + "";
    }
}
