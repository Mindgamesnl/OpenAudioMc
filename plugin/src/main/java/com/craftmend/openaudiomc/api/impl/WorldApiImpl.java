package com.craftmend.openaudiomc.api.impl;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.interfaces.WorldApi;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.utils.HeatMap;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.regions.RegionModule;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.AbstractRegionAdapter;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.IRegion;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import org.bukkit.Location;
import org.jetbrains.annotations.Nullable;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class WorldApiImpl implements WorldApi {

    @Override
    public void setRegionHandler(AbstractRegionAdapter regionHandler) {
        if (OpenAudioMc.getInstance().getPlatform() == Platform.BUNGEE) throw new IllegalStateException("This method is only available in a SPIGOT server.");
        OpenAudioMcSpigot.getInstance().setRegionModule(new RegionModule(OpenAudioMcSpigot.getInstance(), regionHandler));
    }

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

    @Override
    public Collection<String> getPredictedSources(Location location) {
        if (OpenAudioMc.getInstance().getPlatform() == Platform.BUNGEE) throw new IllegalStateException("This method is only available in a SPIGOT server.");
        
        String newChunkId = OpenAudioMcSpigot.getInstance().getPredictiveMediaService().locationToAudioChunkId(location);
        HeatMap<String, HeatMap<String, Byte>>.Value audioChunk = OpenAudioMcSpigot.getInstance().getPredictiveMediaService().getChunkTracker().get(newChunkId);
        HeatMap<String, Byte> chunkContext = audioChunk.getContext();

        List<HeatMap<String, Byte>.Value> vls = chunkContext.getTop(StorageKey.SETTINGS_PRELOAD_SOUNDS.getInt());

        List<String> sources = new ArrayList<>();

        for (HeatMap<String, Byte>.Value value : vls) {
            // prefetch
            sources.add(value.getValue());
        }
        return sources;
    }
}
