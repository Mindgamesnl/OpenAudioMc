package com.craftmend.openaudiomc.generic.state.collectors;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.state.interfaces.StateDetail;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerService;
import com.craftmend.openaudiomc.spigot.modules.version.MinecraftVersion;
import org.bukkit.Bukkit;

public class SpeakerDriverDetail implements StateDetail {

    @Override
    public String title() {
        return "SpeakerDriverAPI";
    }

    @Override
    public String value() {
        return OpenAudioMc.getService(SpeakerService.class).getSpeakerNbtUtil().getClass().getSimpleName();
    }

}
