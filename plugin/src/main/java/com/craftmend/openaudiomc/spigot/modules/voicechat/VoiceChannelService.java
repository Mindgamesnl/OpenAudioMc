package com.craftmend.openaudiomc.spigot.modules.voicechat;

import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.enums.CommandContext;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.voicechat.channels.Channel;
import com.craftmend.openaudiomc.spigot.modules.voicechat.commands.ChannelSubCommand;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class VoiceChannelService extends Service {

    private Map<String, Channel> channelMap = new HashMap<>();

    @Inject
    public VoiceChannelService(
          CommandService commandService
    ) {
        commandService.registerSubCommands(
                CommandContext.VOICE,
                new ChannelSubCommand()
        );
    }

    public boolean createChannel(String name, User creator) {
        Channel created = new Channel(creator, name, this);
        Channel previous = channelMap.putIfAbsent(name, created);
        if (previous != null) {
            // race condition, put it back
            channelMap.put(name, previous);
            return false;
        }

        created.addMember(creator);

        // success
        return true;
    }

    public Channel getChannel(String name) {
        return channelMap.get(name);
    }

    public Collection<Channel> getChannels() {
        return channelMap.values();
    }

    public boolean deleteChannel(String name) {
        Channel deleted = channelMap.remove(name);
        if (deleted != null) {
            deleted.drainMembers();
        }
        return deleted != null;
    }

}
