package com.craftmend.openaudiomc.api.impl;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.interfaces.RegistryApi;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.media.MediaService;
import com.craftmend.openaudiomc.generic.media.interfaces.UrlMutation;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.utils.data.Filter;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.voicechat.SpigotVoiceChatService;
import org.bukkit.entity.Player;

public class RegistryApiImpl implements RegistryApi {
    @Override
    public void registerSubCommand(SubCommand subCommand) {
        OpenAudioMc.getService(CommandService.class).registerSubCommand(subCommand);
    }

    @Override
    public void registerMutation(String pattern, UrlMutation urlMutation) {
        OpenAudioMc.getService(MediaService.class).registerMutation(pattern, urlMutation);
    }

    @Override
    public void setProximityFilter(Filter<ClientConnection, Player> filter) {
        OpenAudioMc.getService(SpigotVoiceChatService.class).getProximityTicker().setFilter(filter);
    }
}
