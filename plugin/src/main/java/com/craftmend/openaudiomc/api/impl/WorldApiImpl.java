package com.craftmend.openaudiomc.api.impl;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.interfaces.WorldApi;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.utils.data.HeatMap;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.predictive.PredictiveMediaModule;
import com.craftmend.openaudiomc.spigot.modules.regions.RegionModule;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.AbstractRegionAdapter;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.IRegion;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import org.bukkit.Location;
import org.jetbrains.annotations.Nullable;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class WorldApiImpl implements WorldApi {

    @Override
    public void setRegionHandler(AbstractRegionAdapter regionHandler) {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) throw new IllegalStateException("This method is only available in a SPIGOT server.");
        OpenAudioMcSpigot.getInstance().setRegionModule(new RegionModule(OpenAudioMcSpigot.getInstance(), regionHandler));
    }

    @Override
    public Collection<IRegion> getApplicableRegions(Location location) {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) throw new IllegalStateException("This method is only available in a SPIGOT server.");
        if (OpenAudioMcSpigot.getInstance().getRegionModule() == null ) throw new IllegalStateException("The region module is not enabled.");
        return OpenAudioMcSpigot.getInstance().getRegionModule().getRegionAdapter().getAudioRegions(location);
    }

    @Nullable
    @Override
    public Speaker getPhysicalSpeaker(Location location) {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) throw new IllegalStateException("This method is only available in a SPIGOT server.");
        return OpenAudioMcSpigot.getInstance().getSpeakerModule().getSpeaker(MappedLocation.fromBukkit(location));
    }

    @Override
    public Collection<String> getPredictedSources(Location location) {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) throw new IllegalStateException("This method is only available in a SPIGOT server.");

        HeatMap<String, Byte> chunkContext = getChunkContext(location);
        List<HeatMap<String, Byte>.Value> vls = chunkContext.getTop(StorageKey.SETTINGS_PRELOAD_SOUNDS.getInt());

        return vls
                .stream()
                .map(HeatMap.Value::getValue)
                .collect(Collectors.toList());
    }

    @Override
    public HeatMap<String, Byte> getChunkContext(Location location) {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) throw new IllegalStateException("This method is only available in a SPIGOT server.");

        return getPredictionModule()
                .getChunkTracker()
                .get(
                        getPredictionModule().locationToAudioChunkId(location)
                )
                .bump()
                .getContext();
    }

    @Override
    public void setChunkContext(Location location, List<HeatMap<String, Byte>.Value> context) {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) throw new IllegalStateException("This method is only available in a SPIGOT server.");

        HeatMap<String, Byte> chunk = getChunkContext(location);
        for (HeatMap<String, Byte>.Value value : context) {
            chunk.get(value.getValue()).setContext(value.getContext());
            chunk.get(value.getValue()).setScore(value.getScore());
        }
    }

    @Override
    public String getChunkId(Location location) {
        return getPredictionModule().locationToAudioChunkId(location);
    }

    private PredictiveMediaModule getPredictionModule() {
        return OpenAudioMcSpigot.getInstance().getPredictiveMediaService();
    }
}
