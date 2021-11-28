package com.craftmend.openaudiomc.api.impl;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.interfaces.IAccountProvider;
import com.craftmend.openaudiomc.api.interfaces.RegistryApi;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.media.MediaService;
import com.craftmend.openaudiomc.generic.media.interfaces.UrlMutation;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.utils.data.Filter;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
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
    public void forceNetworkingInterface(Class<? extends NetworkingService> service) {
        forcedService = service;
    }

    @Override
    public void registerTokenProvider(IAccountProvider provider) {
        AuthenticationService.TOKEN_PROVIDER = provider;
    }
}
