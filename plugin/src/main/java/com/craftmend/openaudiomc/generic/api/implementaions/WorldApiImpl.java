package com.craftmend.openaudiomc.generic.api.implementaions;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.WorldApi;
import com.craftmend.openaudiomc.api.exceptions.InvalidRegionException;
import com.craftmend.openaudiomc.api.exceptions.InvalidThreadException;
import com.craftmend.openaudiomc.api.exceptions.UnknownWorldException;
import com.craftmend.openaudiomc.api.media.Media;
import com.craftmend.openaudiomc.api.regions.AudioRegion;
import com.craftmend.openaudiomc.api.regions.RegionMediaOptions;
import com.craftmend.openaudiomc.api.speakers.BasicSpeaker;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.regions.RegionModule;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.ApiRegion;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.TimedRegionProperties;
import com.craftmend.openaudiomc.spigot.modules.regions.registry.WorldRegionManager;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerService;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import lombok.AllArgsConstructor;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.Location;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

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

    @Override
    public void registerRegion(String worldName, String regionId, RegionMediaOptions regionMedia) throws InvalidRegionException, InvalidThreadException {
        Objects.requireNonNull(worldName, "World name cannot be null");
        Objects.requireNonNull(regionId, "Region id cannot be null");
        Objects.requireNonNull(regionMedia, "Region media cannot be null");

        if (!Bukkit.isPrimaryThread()) {
            throw new InvalidThreadException();
        }

        OpenAudioMcSpigot oams = OpenAudioMcSpigot.getInstance();

        if (!oams.getRegionModule().getRegionAdapter().doesRegionExist(regionId)) {
            throw new InvalidRegionException("Region " + regionId + " does not exist");
        }

        WorldRegionManager worldRegionManager = oams.getRegionModule().getWorld(worldName);

        // check if this region already is defined
        RegionProperties regionProperties = worldRegionManager.getRegionProperties(regionId);
        if (regionProperties != null) {
            if (regionProperties instanceof TimedRegionProperties) {
                TimedRegionProperties timedRegion = (TimedRegionProperties) regionProperties;
                worldRegionManager.unregisterRegion(regionId);
                timedRegion.destroy();
            } else {
                throw new InvalidRegionException("The region '" + regionId + "' already has permanent media linked to it.");
            }
        }

        RegionProperties rp = new RegionProperties(
                regionMedia.getSource(),
                regionMedia.getVolume(),
                regionMedia.getFadeTime(),
                true,
                regionId,
                worldName
        );

        OpenAudioMc.getService(DatabaseService.class).getRepository(RegionProperties.class)
                .save(rp);

        worldRegionManager.registerRegion(rp);
        oams.getRegionModule().forceUpdateRegions();
    }

    @Override
    public void registerTempRegion(String worldName, String regionId, RegionMediaOptions regionMedia, int duration) throws UnknownWorldException, InvalidRegionException, InvalidThreadException {
        Objects.requireNonNull(worldName, "World name cannot be null");
        Objects.requireNonNull(regionId, "Region id cannot be null");
        Objects.requireNonNull(regionMedia, "Region media cannot be null");

        if (!Bukkit.isPrimaryThread()) {
            throw new InvalidThreadException();
        }

        OpenAudioMcSpigot oams = OpenAudioMcSpigot.getInstance();

        if (!oams.getRegionModule().getRegionAdapter().doesRegionExist(regionId)) {
            throw new InvalidRegionException("Region " + regionId + " does not exist");
        }

        WorldRegionManager worldRegionManager = oams.getRegionModule().getWorld(worldName);

        // check if this region already is defined
        RegionProperties regionProperties = worldRegionManager.getRegionProperties(regionId);
        if (regionProperties != null) {
            if (regionProperties instanceof TimedRegionProperties) {
                TimedRegionProperties timedRegion = (TimedRegionProperties) regionProperties;
                worldRegionManager.unregisterRegion(regionId);
                timedRegion.destroy();
            } else {
                throw new InvalidRegionException("The region '" + regionId + "' already has permanent media linked to it.");
            }
        }

        worldRegionManager.registerRegion(new TimedRegionProperties(
                regionMedia.getSource(),
                duration,
                regionId,
                regionMedia.getVolume(),
                regionMedia.getFadeTime(),
                regionId,
                worldName
        ));

        oams.getRegionModule().forceUpdateRegions();
    }

    @Override
    public void unregisterRegion(String worldName, String regionId) throws InvalidThreadException {
        Objects.requireNonNull(worldName, "World name cannot be null");
        Objects.requireNonNull(regionId, "Region id cannot be null");

        if (!Bukkit.isPrimaryThread()) {
            throw new InvalidThreadException();
        }

        OpenAudioMcSpigot oams = OpenAudioMcSpigot.getInstance();
        WorldRegionManager worldRegionManager = oams.getRegionModule().getWorld(worldName);

        RegionProperties rp = worldRegionManager.getRegionProperties(regionId);
        if (rp != null) {
            if (rp.getId() != null && !(rp instanceof TimedRegionProperties)) {
                OpenAudioMc.getService(DatabaseService.class).getRepository(RegionProperties.class)
                        .delete(rp);
            }

            if (rp instanceof TimedRegionProperties) {
                ((TimedRegionProperties) rp).destroy();
            }

            worldRegionManager.unregisterRegion(regionId);
        }

        oams.getRegionModule().forceUpdateRegions();
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
