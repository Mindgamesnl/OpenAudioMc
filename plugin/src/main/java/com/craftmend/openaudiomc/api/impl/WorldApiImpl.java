package com.craftmend.openaudiomc.api.impl;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.interfaces.WorldApi;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.IRegion;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import org.bukkit.Location;
import org.jetbrains.annotations.Nullable;

import java.util.Collection;

public class WorldApiImpl implements WorldApi {

    @Override
    public Collection<IRegion> getApplicableRegions(Location location) {
        if (OpenAudioMc.getInstance().getPlatform() == Platform.BUNGEE) throw new IllegalStateException("This method is only available in a SPIGOT server.");
        if (OpenAudioMcSpigot.getInstance().getRegionModule() == null ) throw new IllegalStateException("The region module is not enabled.");
        return OpenAudioMcSpigot.getInstance().getRegionModule().getRegionAdapter().getAudioRegions(location);
    }

    @Nullable
    @Override
    public Speaker getPhysicalSpeaker(Location location) {
        if (OpenAudioMc.getInstance().getPlatform() == Platform.BUNGEE) throw new IllegalStateException("This method is only available in a SPIGOT server.");
        return OpenAudioMcSpigot.getInstance().getSpeakerModule().getSpeaker(MappedLocation.fromBukkit(location));
    }
}
