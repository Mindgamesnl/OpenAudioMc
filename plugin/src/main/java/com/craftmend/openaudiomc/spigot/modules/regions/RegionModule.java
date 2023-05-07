package com.craftmend.openaudiomc.spigot.modules.regions;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.OpenAudioMcBuild;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.media.MediaService;
import com.craftmend.openaudiomc.generic.media.objects.Media;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
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
        OpenAudioLogger.toConsole("Turns out you have WorldGuard installed! enabling regions and the region tasks..");

        if (customAdapter == null) {
            if (OpenAudioMc.getService(ServerService.class).getVersion() == ServerVersion.MODERN) {
                OpenAudioLogger.toConsole("Enabling the newer 1.13 regions");
                regionAdapter = new ModernRegionAdapter(this);
            } else {
                OpenAudioLogger.toConsole("Unknown version. Falling back to the 1.8 to 1.12 region implementation.");
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
                OpenAudioLogger.toConsole("Wrong world guard detection! re-switching to 1.13");
                regionAdapter = new ModernRegionAdapter(this);
            }
        }

        for (RegionProperties region : OpenAudioMc.getService(DatabaseService.class).getRepository(RegionProperties.class).values()) {

            // update null values should be set to defaults
            if (region.getLoop() == null) region.setLoop(true);

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
            worldManagers.forEach((s, worldRegionManager) -> {worldRegionManager.clearMedia();});
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

        this.regionAdapter.postLoad();
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
                    OpenAudioLogger.toConsole("Failed to mutate region " + regionName + " in world " + world);
                    e.printStackTrace();
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
}
