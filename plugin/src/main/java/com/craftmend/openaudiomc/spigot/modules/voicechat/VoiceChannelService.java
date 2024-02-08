package com.craftmend.openaudiomc.spigot.modules.voicechat;

import com.craftmend.openaudiomc.api.EventApi;
import com.craftmend.openaudiomc.api.events.client.ClientDisconnectEvent;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.enums.CommandContext;
import com.craftmend.openaudiomc.generic.commands.subcommands.HelpSubCommand;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
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
        HelpSubCommand helpSubCommand = new HelpSubCommand(CommandContext.VOICE, false);
        helpSubCommand.setHeaderMessage(StorageKey.MESSAGE_VOICE_COMMAND_HELP_HEADER.getString());

        commandService.registerSubCommands(
                CommandContext.VOICE,
                helpSubCommand,
                new ChannelSubCommand()
        );

        // register events
        EventApi.getInstance().registerHandler(ClientDisconnectEvent.class, event -> {
            ClientConnection client = (ClientConnection) event.getClient();
            if (client.getRtcSessionManager().getCurrentChannel() != null) {
                client.getRtcSessionManager().getCurrentChannel().removeMember(client.getUser());
            }
        });
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
