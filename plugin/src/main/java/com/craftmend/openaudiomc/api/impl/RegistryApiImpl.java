package com.craftmend.openaudiomc.api.impl;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.exceptions.RegionException;
import com.craftmend.openaudiomc.api.interfaces.ITokenProvider;
import com.craftmend.openaudiomc.api.interfaces.RegistryApi;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.media.MediaService;
import com.craftmend.openaudiomc.generic.media.interfaces.UrlMutation;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.utils.data.Filter;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.TimedRegionProperties;
import com.craftmend.openaudiomc.spigot.modules.shortner.AliasService;
import com.craftmend.openaudiomc.spigot.modules.shortner.data.Alias;
import com.craftmend.openaudiomc.spigot.modules.voicechat.SpigotVoiceChatService;
import lombok.Getter;
import org.bukkit.entity.Player;

public class RegistryApiImpl implements RegistryApi {

    @Getter private Class<? extends NetworkingService> forcedService;

    @Override
    public void registerSubCommand(SubCommand subCommand) {
        OpenAudioMc.getService(CommandService.class).registerSubCommand(subCommand);
    }

    @Override
    public void registerMutation(String pattern, UrlMutation urlMutation) {
        OpenAudioMc.getService(MediaService.class).registerMutation(pattern, urlMutation);
    }

    @Override
    public void registerAlias(String aliasName, String value) {
        OpenAudioMc.getService(AliasService.class).getAliasMap().put(aliasName, new Alias(aliasName, value));
    }

    @Override
    public void setProximityFilter(Filter<ClientConnection, Player> filter) {
        OpenAudioMc.getService(SpigotVoiceChatService.class).getProximityTicker().setFilter(filter);
    }

    @Override
    public void addProximityFilter(Filter<ClientConnection, Player> filter) {
        OpenAudioMc.getService(SpigotVoiceChatService.class).getProximityTicker().addFilter(filter);
    }

    @Override
    public void forceNetworkingInterface(Class<? extends NetworkingService> service) {
        forcedService = service;
    }

    @Override
    public void registerTokenProvider(ITokenProvider provider) {
        AuthenticationService.TOKEN_PROVIDER = provider;
    }

    @Override
    public void removeRegion(String regionName) throws RegionException {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) throw new RegionException("This API functionality is only accessible on Spigot");
        OpenAudioMcSpigot openAudioMcSpigot = OpenAudioMcSpigot.getInstance();
        if (!openAudioMcSpigot.getRegionModule().getRegionAdapter().doesRegionExist(regionName)) {
            throw new RegionException("The region " + regionName + " isn't registered in your region provider plugin");
        }

        regionName = regionName.toLowerCase();
        RegionProperties rp = openAudioMcSpigot.getRegionModule().getRegionPropertiesMap().get(regionName);
        if (rp != null) {
            OpenAudioMc.getService(DatabaseService.class).getRepository(RegionProperties.class)
                    .delete(rp);
            if (rp instanceof TimedRegionProperties) {
                ((TimedRegionProperties) rp).destroy();
            }
            openAudioMcSpigot.getRegionModule().removeRegion(regionName);
            openAudioMcSpigot.getRegionModule().forceUpdateRegions();
        }
    }

    @Override
    public void registerTempRegion(TimedRegionProperties regionProperties) throws RegionException {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) throw new RegionException("This API functionality is only accessible on Spigot");
        OpenAudioMcSpigot openAudioMcSpigot = OpenAudioMcSpigot.getInstance();
        String regionName = regionProperties.getRegionName().toLowerCase();
        // check if this region already is defined
        RegionProperties existingRegionProperties = OpenAudioMcSpigot.getInstance().getRegionModule().getRegionPropertiesMap().get(regionName);
        if (existingRegionProperties != null) {
            openAudioMcSpigot.getRegionModule().removeRegion(regionName);
            if (existingRegionProperties instanceof TimedRegionProperties) {
                // reset it, because fuck it
                TimedRegionProperties timedRegion = (TimedRegionProperties) existingRegionProperties;
                openAudioMcSpigot.getRegionModule().removeRegion(regionName);
                timedRegion.destroy();
            }
        }

        if (!openAudioMcSpigot.getRegionModule().getRegionAdapter().doesRegionExist(regionName)) {
            throw new RegionException("The region " + regionName + " isn't registered in your region provider plugin");
        }

        openAudioMcSpigot.getRegionModule().registerRegion(regionName, regionProperties);
        openAudioMcSpigot.getRegionModule().forceUpdateRegions();
    }

    @Override
    public void registerRegion(RegionProperties regionProperties) throws RegionException {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) throw new RegionException("This API functionality is only accessible on Spigot");
        OpenAudioMcSpigot openAudioMcSpigot = OpenAudioMcSpigot.getInstance();
        String regionName = regionProperties.getRegionName().toLowerCase();
        if (!openAudioMcSpigot.getRegionModule().getRegionAdapter().doesRegionExist(regionName)) {
            throw new RegionException("The region " + regionName + " isn't registered in your region provider plugin");
        }
        OpenAudioMc.getService(DatabaseService.class).getRepository(RegionProperties.class)
                .save(regionProperties);
        openAudioMcSpigot.getRegionModule().registerRegion(regionName, regionProperties);
        openAudioMcSpigot.getRegionModule().forceUpdateRegions();
    }

}
