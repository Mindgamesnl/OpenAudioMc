package com.craftmend.openaudiomc.api.impl;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.interfaces.WorldApi;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.utils.data.ConcurrentHeatMap;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.predictive.PredictiveMediaService;
import com.craftmend.openaudiomc.spigot.modules.regions.RegionModule;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.AbstractRegionAdapter;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.IRegion;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerService;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import org.bukkit.Location;
import org.jetbrains.annotations.Nullable;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Deprecated
public class WorldApiImpl implements WorldApi {

    @Override
    @Deprecated
    public void setRegionHandler(AbstractRegionAdapter regionHandler) {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) throw new IllegalStateException("This method is only available in a SPIGOT server.");
        OpenAudioMcSpigot.getInstance().setRegionModule(new RegionModule(regionHandler));
    }

    @Override
    @Deprecated
    public Collection<IRegion> getApplicableRegions(Location location) {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) throw new IllegalStateException("This method is only available in a SPIGOT server.");
        if (OpenAudioMcSpigot.getInstance().getRegionModule() == null ) throw new IllegalStateException("The region module is not enabled.");
        return OpenAudioMcSpigot.getInstance().getRegionModule().getRegionAdapter().getAudioRegions(location);
    }

    @Nullable
    @Override
    public Speaker getPhysicalSpeaker(Location location) {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) throw new IllegalStateException("This method is only available in a SPIGOT server.");
        return OpenAudioMc.getService(SpeakerService.class).getSpeaker(MappedLocation.fromBukkit(location));
    }

    @Override
    @Deprecated
    public Collection<String> getPredictedSources(Location location) {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) throw new IllegalStateException("This method is only available in a SPIGOT server.");

        ConcurrentHeatMap<String, Byte> chunkContext = getChunkContext(location);
        List<ConcurrentHeatMap<String, Byte>.Value> vls = chunkContext.getTop(StorageKey.SETTINGS_PRELOAD_SOUNDS.getInt());

        return vls
                .stream()
                .map(ConcurrentHeatMap.Value::getValue)
                .collect(Collectors.toList());
    }

    @Override
    @Deprecated
    public ConcurrentHeatMap<String, Byte> getChunkContext(Location location) {
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
    @Deprecated
    public void setChunkContext(Location location, List<ConcurrentHeatMap<String, Byte>.Value> context) {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) throw new IllegalStateException("This method is only available in a SPIGOT server.");

        ConcurrentHeatMap<String, Byte> chunk = getChunkContext(location);
        for (ConcurrentHeatMap<String, Byte>.Value value : context) {
            chunk.get(value.getValue()).setContext(value.getContext());
            chunk.get(value.getValue()).setScore(value.getScore());
        }
    }

    @Override
    @Deprecated
    public String getChunkId(Location location) {
        return getPredictionModule().locationToAudioChunkId(location);
    }

    @Deprecated
    private PredictiveMediaService getPredictionModule() {
        return OpenAudioMc.getService(PredictiveMediaService.class);
    }
}
