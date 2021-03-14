package com.craftmend.openaudiomc.api.impl;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.interfaces.RegistryApi;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.media.interfaces.UrlMutation;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.utils.Filter;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import org.bukkit.entity.Player;

public class RegistryApiImpl implements RegistryApi {
    @Override
    public void registerSubCommand(SubCommand subCommand) {
        OpenAudioMc.getInstance().getCommandModule().registerSubCommand(subCommand);
    }

    @Override
    public void registerMutation(String pattern, UrlMutation urlMutation) {
        OpenAudioMc.getInstance().getMediaModule().registerMutation(pattern, urlMutation);
    }

    @Override
    public void setProximityFilter(Filter<ClientConnection, Player> filter) {
        OpenAudioMcSpigot.getInstance().getSpigotVoicechatModule().getProximityTicker().setFilter(filter);
    }
}
