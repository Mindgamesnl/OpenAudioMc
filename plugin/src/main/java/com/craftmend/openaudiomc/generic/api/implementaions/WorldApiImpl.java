package com.craftmend.openaudiomc.generic.api.implementaions;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.WorldApi;
import com.craftmend.openaudiomc.api.media.Media;
import com.craftmend.openaudiomc.api.regions.AudioRegion;
import com.craftmend.openaudiomc.api.speakers.BasicSpeaker;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.regions.RegionModule;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.ApiRegion;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerService;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import lombok.AllArgsConstructor;
import org.bukkit.Bukkit;
import org.bukkit.Location;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class WorldApiImpl implements WorldApi {

    @NotNull
    @Override
    public Collection<AudioRegion> getRegionsAt(int x, int y, int z, @NotNull String world) {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) {
            throw new IllegalStateException("This method is only available on the spigot platform");
        }

        RegionModule regionModule = OpenAudioMcSpigot.getInstance().getRegionModule();

        List<AudioRegion> regions = new ArrayList<>();

        for (ApiRegion apiRegion : regionModule.getRegionAdapter().getRegionsAtLocation(
                new Location(Bukkit.getWorld(world), x, y, z)
        )) {
            RegionProperties rp = regionModule.getWorld(world).getRegionProperties(apiRegion.getName());
            regions.add(new WrappedRegion(apiRegion, world, rp.getMediaForWorld(world)));
        }

        return regions;
    }

    @Nullable
    @Override
    public BasicSpeaker getSpeakerAt(int x, int y, int z, @NotNull String world) {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) {
            throw new IllegalStateException("This method is only available on the spigot platform");
        }

        return OpenAudioMc.getService(SpeakerService.class).getSpeaker(new MappedLocation(x, y, z, world));
    }

    @AllArgsConstructor
    private static class WrappedRegion implements AudioRegion {

        private ApiRegion region;
        private String world;
        private Media media;

        @NotNull
        @Override
        public Media getMedia() {
            return media;
        }

        @NotNull
        @Override
        public String getRegionId() {
            return region.getName();
        }

        @Nullable
        @Override
        public String getWorld() {
            return world;
        }

        @Override
        public int getPriority() {
            return region.getPriority();
        }
    }

}
