package com.craftmend.openaudiomc.api.impl;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.exceptions.RegionException;
import com.craftmend.openaudiomc.api.interfaces.ITokenProvider;
import com.craftmend.openaudiomc.api.interfaces.RegistryApi;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.enums.CommandContext;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.media.MediaService;
import com.craftmend.openaudiomc.api.media.UrlMutation;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.utils.data.Filter;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.TimedRegionProperties;
import com.craftmend.openaudiomc.spigot.modules.regions.registry.WorldRegionManager;
import com.craftmend.openaudiomc.spigot.modules.shortner.AliasService;
import com.craftmend.openaudiomc.spigot.modules.shortner.data.Alias;
import com.craftmend.openaudiomc.spigot.modules.voicechat.SpigotVoiceChatService;
import lombok.Getter;
import org.bukkit.entity.Player;

@Deprecated
public class RegistryApiImpl implements RegistryApi {

    @Getter private Class<? extends NetworkingService> forcedService;

    @Override
    @Deprecated
    public void registerSubCommand(SubCommand subCommand) {
        OpenAudioMc.getService(CommandService.class).registerSubCommands(CommandContext.OPENAUDIOMC, subCommand);
    }

    @Override
    @Deprecated
    public void registerMutation(String pattern, UrlMutation urlMutation) {
        OpenAudioMc.getService(MediaService.class).registerMutation(pattern, urlMutation);
    }

    @Override
    @Deprecated
    public void registerAlias(String aliasName, String value) {
        OpenAudioMc.getService(AliasService.class).getAliasMap().put(aliasName, new Alias(aliasName, value));
    }

    @Override
    @Deprecated
    public void setProximityFilter(Filter<ClientConnection, Player> filter) {
        OpenAudioMc.getService(SpigotVoiceChatService.class).getPeerTicker().setFilter(filter);
    }

    @Override
    @Deprecated
    public void addProximityFilter(Filter<ClientConnection, Player> filter) {
        OpenAudioMc.getService(SpigotVoiceChatService.class).getPeerTicker().addFilter(filter);
    }

    @Override
    @Deprecated
    public void forceNetworkingInterface(Class<? extends NetworkingService> service) {
        forcedService = service;
    }

    @Override
    @Deprecated
    public void registerTokenProvider(ITokenProvider provider) {
        AuthenticationService.TOKEN_PROVIDER = provider;
    }

    @Override
    @Deprecated
    public void removeRegion(String worldName, String regionName) throws RegionException {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) throw new RegionException("This API functionality is only accessible on Spigot");
        OpenAudioMcSpigot openAudioMcSpigot = OpenAudioMcSpigot.getInstance();
        if (!openAudioMcSpigot.getRegionModule().getRegionAdapter().doesRegionExist(regionName)) {
            throw new RegionException("The region " + regionName + " isn't registered in your region provider plugin");
        }

        regionName = regionName.toLowerCase();
        WorldRegionManager worldRegionManager = openAudioMcSpigot.getRegionModule().getWorld(worldName);
        RegionProperties rp = worldRegionManager.getRegionProperties(regionName);
        if (rp != null) {
            if (rp instanceof TimedRegionProperties) {
                ((TimedRegionProperties) rp).destroy();
            } else {
                OpenAudioMc.getService(DatabaseService.class).getRepository(RegionProperties.class)
                        .delete(rp);
            }
            worldRegionManager.unregisterRegion(regionName);
            openAudioMcSpigot.getRegionModule().forceUpdateRegions();
        }
    }

    @Override
    @Deprecated
    public void registerTempRegion(String worldName, TimedRegionProperties regionProperties) throws RegionException {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) throw new RegionException("This API functionality is only accessible on Spigot");
        OpenAudioMcSpigot openAudioMcSpigot = OpenAudioMcSpigot.getInstance();
        String regionName = regionProperties.getRegionName().toLowerCase();
        // check if this region already is defined
        WorldRegionManager worldRegionManager = openAudioMcSpigot.getRegionModule().getWorld(worldName);
        RegionProperties existingRegionProperties = worldRegionManager.getRegionProperties(regionName);
        if (existingRegionProperties != null) {
            worldRegionManager.unregisterRegion(regionName);
            if (existingRegionProperties instanceof TimedRegionProperties) {
                // reset it, because fuck it
                TimedRegionProperties timedRegion = (TimedRegionProperties) existingRegionProperties;
                timedRegion.destroy();
            }
        }

        if (!openAudioMcSpigot.getRegionModule().getRegionAdapter().doesRegionExist(regionName)) {
            throw new RegionException("The region " + regionName + " isn't registered in your region provider plugin");
        }

        regionProperties.setRegionName(regionName);

        worldRegionManager.registerRegion(regionProperties);
        openAudioMcSpigot.getRegionModule().forceUpdateRegions();
    }

    @Override
    @Deprecated
    public void registerRegion(String worldName, RegionProperties regionProperties) throws RegionException {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) throw new RegionException("This API functionality is only accessible on Spigot");
        OpenAudioMcSpigot openAudioMcSpigot = OpenAudioMcSpigot.getInstance();
        String regionName = regionProperties.getRegionName().toLowerCase();
        if (!openAudioMcSpigot.getRegionModule().getRegionAdapter().doesRegionExist(regionName)) {
            throw new RegionException("The region " + regionName + " isn't registered in your region provider plugin");
        }

        WorldRegionManager worldRegionManager = openAudioMcSpigot.getRegionModule().getWorld(worldName);

        OpenAudioMc.getService(DatabaseService.class).getRepository(RegionProperties.class)
                .save(regionProperties);

        worldRegionManager.registerRegion(regionProperties);
        openAudioMcSpigot.getRegionModule().forceUpdateRegions();
    }

}
