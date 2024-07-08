package com.craftmend.openaudiomc.spigot.modules.regions;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.OpenAudioMcBuild;
import com.craftmend.openaudiomc.api.media.Media;
import com.craftmend.openaudiomc.generic.backups.BackupService;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.media.MediaService;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.utils.data.ArrayUtil;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.SpigotPlayerService;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.regions.adapters.LegacyRegionAdapter;
import com.craftmend.openaudiomc.spigot.modules.regions.adapters.ModernRegionAdapter;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.AbstractRegionAdapter;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.IRegion;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.RegionMutator;
import com.craftmend.openaudiomc.spigot.modules.regions.listeners.WorldLoadListener;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;
import com.craftmend.openaudiomc.spigot.modules.regions.registry.WorldRegionManager;
import com.craftmend.openaudiomc.spigot.services.server.ServerService;
import com.craftmend.openaudiomc.spigot.services.server.enums.ServerVersion;
import lombok.Getter;
import org.bukkit.Bukkit;
import org.bukkit.World;
import org.jetbrains.annotations.Nullable;

import java.util.*;

public class RegionModule {

    @Getter private AbstractRegionAdapter regionAdapter;
    private final Map<String, WorldRegionManager> worldManagers = new HashMap<>();

    // This list contains legacy regions that are not in a world.
    // This is a fallback for legacy versions and kinda hacky, but we don't have a choice.
    @Getter private Set<RegionProperties> regionsWithoutWorld = new HashSet<>();

    public RegionModule(@Nullable AbstractRegionAdapter customAdapter) {
        OpenAudioLogger.info("Turns out you have WorldGuard installed! enabling regions and the region tasks..");

        if (customAdapter == null) {
            if (OpenAudioMc.getService(ServerService.class).getVersion() == ServerVersion.MODERN) {
                OpenAudioLogger.info("Enabling the newer 1.13 regions");
                regionAdapter = new ModernRegionAdapter(this);
            } else {
                OpenAudioLogger.warn("Unknown version. Falling back to the 1.8 to 1.12 region implementation.");
                regionAdapter = new LegacyRegionAdapter(this);
            }
        } else {
            this.regionAdapter = customAdapter;
            this.regionAdapter.boot(this);
        }

        //validate detection
        if (customAdapter == null && OpenAudioMc.getService(ServerService.class).getVersion() == ServerVersion.LEGACY) {
            try {
                Class.forName("com.sk89q.worldguard.bukkit.WGBukkit");
            } catch (ClassNotFoundException e) {
                OpenAudioLogger.warn("Wrong world guard detection! re-switching to 1.13");
                regionAdapter = new ModernRegionAdapter(this);
            }
        }

        // do cleanup
        cleanDuplicates();

        for (RegionProperties region : OpenAudioMc.getService(DatabaseService.class).getRepository(RegionProperties.class).values()) {

            // update null values should be set to defaults
            if (region.getLoop() == null) region.setLoop(true);
            if (region.getDoSync() == null) region.setDoSync(true);

            // does this region adhere to a specific world?
            if (region.hasWorlds()) {
                // loop through all worlds
                for (String world : region.getWorlds()) {
                    WorldRegionManager worldManager = getWorld(world);

                    // does this world already contain a region with the same name?
                    worldManager.registerRegion(region);
                }
            } else {
                // this region was made before the world system was introduced, so we need to add it to all worlds
                regionsWithoutWorld.add(region);
            }
        }

        OpenAudioMc.getService(MediaService.class).getResetTriggers().add(() -> {
            // clean media once a new media adapter is loaded, this ensures that they will be re-evaluated
            worldManagers.forEach((s, worldRegionManager) -> {worldRegionManager.dropMediaCache();});
        });

        // register unknown regions
        if (!OpenAudioMcBuild.IS_TESTING) {
            // skip bukkit API during tests
            for (World world : Bukkit.getWorlds()) {
                getWorld(world.getName()).registerRegions(regionsWithoutWorld);
            }

            // register world load event
            Bukkit.getPluginManager().registerEvents(new WorldLoadListener(this), OpenAudioMcSpigot.getInstance());
        }

        if (StorageKey.SETTINGS_HYDRATE_REGIONS_ON_BOOT.getBoolean()) {
            // hydrate all regions
            for (World world : Bukkit.getWorlds()) {
                WorldRegionManager worldManager = getWorld(world.getName());
                for (RegionProperties region : worldManager.getRegions()) {
                    region.getMediaForWorld(worldManager);
                }
            }
        }

        this.regionAdapter.postLoad();
    }

    private void cleanDuplicates() {
        //load config
        Map<String, Map<String, RegionProperties>> regionsByWorld = new HashMap<>();
        Map<String, RegionProperties> regionsWithoutWorld = new HashMap<>();
        List<RegionProperties> discardedRegions = new ArrayList<>();

        Collection<RegionProperties> allRegions = OpenAudioMc.getService(DatabaseService.class).getRepository(RegionProperties.class).values();
        int totalCount = OpenAudioMc.getService(DatabaseService.class).getRepository(RegionProperties.class).count();

        OpenAudioLogger.info("Scanning " + allRegions.size() + " regions for duplicates (out of " + totalCount + " total regions)");

        //loop through all regions
        for (RegionProperties region : allRegions) {
            // does this region adhere to a specific world?
            if (region.hasWorlds()) {
                // loop through all worlds
                for (String world : region.getWorlds()) {
                    // does this world already contain a region with the same name?
                    if (regionsByWorld.containsKey(world)) {
                        // does this world already contain a region with the same name?
                        if (regionsByWorld.get(world).containsKey(region.getRegionName())) {
                            RegionProperties existingInWorld = regionsByWorld.get(world).get(region.getRegionName());
                            if (existingInWorld.getId() < region.getId()) {
                                // the existing region has a lower priority, so we should replace it
                                regionsByWorld.get(world).put(region.getRegionName(), region);

                                // remove the world from the existing region
                                existingInWorld.setWorlds(ArrayUtil.removeElement(existingInWorld.getWorlds(), world));

                                // does it have any worlds left?
                                if (existingInWorld.getWorlds().length == 0) {
                                    // nope, so we can discard it
                                    discardedRegions.add(existingInWorld);
                                }
                            } else if (existingInWorld.getId() > region.getId()) {
                                // the existing region has a higher priority, so we should discard this one
                                region.setWorlds(ArrayUtil.removeElement(region.getWorlds(), world));

                                // does it have any worlds left?
                                if (region.getWorlds().length == 0) {
                                    // nope, so we can discard it
                                    discardedRegions.add(region);
                                }
                            }
                        } else {
                            // add the region to the world
                            regionsByWorld.get(world).put(region.getRegionName(), region);
                        }
                    } else {
                        // create a new world entry
                        Map<String, RegionProperties> newWorld = new HashMap<>();
                        newWorld.put(region.getRegionName(), region);
                        regionsByWorld.put(world, newWorld);
                    }
                }
            } else {
                if (regionsWithoutWorld.containsKey(region.getRegionName())) {
                    RegionProperties existing = regionsWithoutWorld.get(region.getRegionName());
                    if (existing.getId() < region.getId()) {
                        // the existing region has a lower priority, so we should replace it
                        regionsWithoutWorld.put(region.getRegionName(), region);
                        discardedRegions.add(existing);
                    } else if (existing.getId() > region.getId()) {
                        // the existing region has a higher priority, so we should discard this one
                        discardedRegions.add(region);
                    }
                } else {
                    regionsWithoutWorld.put(region.getRegionName(), region);
                }
            }
        }

        if (discardedRegions.isEmpty()) {
            OpenAudioLogger.info("No duplicate regions found, skipping cleanup...");
            return;
        }

        OpenAudioLogger.warn("Found " + discardedRegions.size() + " duplicate regions with old ID's, making a backup and then cleaning up...");
        OpenAudioMc.getService(BackupService.class).makeBackup(true);

        // remove all old regions
        for (RegionProperties discardedRegion : discardedRegions) {
            OpenAudioLogger.info("Removing region " + discardedRegion.getRegionName() + " with ID " + discardedRegion.getId());
            try {
                OpenAudioMc.getService(DatabaseService.class).getRepository(RegionProperties.class).delete(discardedRegion);
            } catch (Exception e) {
                OpenAudioLogger.error(e, "Failed to remove region " + discardedRegion.getRegionName() + " with ID " + discardedRegion.getId());
            }
        }
    }

    public void forceUpdateRegions() {
        for (SpigotConnection client : OpenAudioMc.getService(SpigotPlayerService.class).getClients()) {
            if (client.getRegionHandler() != null) client.getRegionHandler().tick();
        }
    }

    public Set<SpigotConnection> findPlayersInRegion(String regionName) {
        Set<SpigotConnection> clients = new HashSet<>();
        for (SpigotConnection client : OpenAudioMc.getService(SpigotPlayerService.class).getClients()) {
            Collection<IRegion> regionsAtClient = getRegionAdapter().getAudioRegions(client.getBukkitPlayer().getLocation());
            if (regionsAtClient.stream().anyMatch(region -> region.getId().equalsIgnoreCase(regionName))) {
                clients.add(client);
            }
        }
        return clients;
    }

    public WorldRegionManager getWorld(@Nullable String world) {
        if (world == null) world = StorageKey.SETTINGS_DEFAULT_WORLD_NAME.getString();

        if (!worldManagers.containsKey(world)) {
            worldManagers.put(world, new WorldRegionManager(world));
        }

        return worldManagers.get(world);
    }

    public int mutateForMatchingWorld(RegionMutator mutator, String regionName, String... worlds) {
        // edge case for when there are no worlds
        if (worlds.length == 0) {
            worlds = worldManagers.keySet().toArray(new String[0]);
        }

        int changedCount = 0;

        // loop over all worlds
        for (String world : worlds) {
            WorldRegionManager worldManager = getWorld(world);

            // does this world contain a region with the same name?
            if (worldManager.containsRegion(regionName)) {
                RegionProperties region = worldManager.getRegionProperties(regionName);
                Media media = region.getMediaForWorld(worldManager);

                // mutate the region
                try {
                    mutator.feed(region, media);
                    changedCount++;
                } catch (Exception e) {
                    OpenAudioLogger.error(e, "Failed to mutate region " + regionName + " in world " + world);
                }
            }
        }

        return changedCount;
    }

    public int getWorldCount() {
        return worldManagers.size();
    }

    public int getRegionCount() {
        int count = 0;
        for (WorldRegionManager worldManager : worldManagers.values()) {
            count += worldManager.getRegionCount();
        }
        return count;
    }

    public Collection<WorldRegionManager> getWorlds() {
        return worldManagers.values();
    }
}
