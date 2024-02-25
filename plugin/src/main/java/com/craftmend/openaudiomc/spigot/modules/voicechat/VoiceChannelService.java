package com.craftmend.openaudiomc.spigot.modules.voicechat;

import com.craftmend.openaudiomc.api.EventApi;
import com.craftmend.openaudiomc.api.events.client.ClientDisconnectEvent;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.enums.CommandContext;
import com.craftmend.openaudiomc.generic.commands.subcommands.HelpSubCommand;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.voicechat.channels.Channel;
import com.craftmend.openaudiomc.spigot.modules.voicechat.commands.*;
import org.bukkit.Bukkit;
import org.bukkit.permissions.Permission;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class VoiceChannelService extends Service {

    private Map<String, Channel> channelMap = new HashMap<>();

    @Inject
    public VoiceChannelService(
          CommandService commandService
    ) {
        HelpSubCommand helpSubCommand = new HelpSubCommand(CommandContext.CHANNEL, false);
        helpSubCommand.setHeaderMessage(StorageKey.MESSAGE_VOICE_COMMAND_HELP_HEADER.getString());

        commandService.registerSubCommands(
                CommandContext.CHANNEL,
                helpSubCommand,
                //new ChannelSubCommand()
                new ChannelCreateCommand(),
                new ChannelLeaveCommand(),
                new ChannelJoinCommand(),
                new ChannelListCommand(),
                new ChannelInviteCommand()
        );

        // register events
        EventApi.getInstance().registerHandler(ClientDisconnectEvent.class, event -> {
            ClientConnection client = (ClientConnection) event.getClient();
            if (client.getRtcSessionManager().getCurrentChannel() != null) {
                client.getRtcSessionManager().getCurrentChannel().removeMember(client.getUser());
            }
        });

        // load static channels
        try {
            if (!StorageKey.SETTINGS_STATIC_CHANNELS_ENABLED.getBoolean()) {
                OpenAudioLogger.info("Static voice channels are disabled, skipping load..");
                return;
            }

            int loaded = 0;
            OpenAudioLogger.info("Loading static voice channels..");
            for (Map<String, Object> obj : StorageKey.SETTINGS_STATIC_CHANNELS_BASE.getObjectList()) {
                // check if its valid
                boolean valid = obj.containsKey("name") && obj.get("name") instanceof String
                        && obj.containsKey("permission") && obj.get("permission") instanceof String
                        && obj.containsKey("requirePermission") && obj.get("requirePermission") instanceof Boolean;

                if (!valid) {
                    OpenAudioLogger.warn("Failed to load a static voice channel, invalid configuration. Read:");
                    OpenAudioLogger.warn(obj.toString());
                    continue;
                }

                boolean requirePermission = (boolean) obj.get("requirePermission");
                String permission = (String) obj.get("permission");

                if (requirePermission) {
                    Permission registeredPermission = new Permission(permission);
                    registeredPermission.setDescription("This permission allows a user access to the " + obj.get("name") + " voice channel.");
                    Bukkit.getPluginManager().addPermission(registeredPermission);
                }

                String name = (String) obj.get("name");

                if (!isChannelNameValid(name)) {
                    OpenAudioLogger.warn("Failed to load a static voice channel, invalid name (cannot be empty, already taken or contain spaces). Read:");
                    OpenAudioLogger.warn(obj.toString());
                    continue;
                }

                Channel staticChannel = new Channel(
                        name,
                        requirePermission ? permission : null,
                        this
                );
                channelMap.put(staticChannel.getName(), staticChannel);
                OpenAudioLogger.info("Created static channel: " + staticChannel.getName());

                loaded++;
            }

            OpenAudioLogger.info("Loaded " + loaded + " static voice channels");
        } catch (Exception e) {
            OpenAudioLogger.error(e, "Failed to load voice channels");
        }
    }

    public boolean createUserChannel(String name, User creator) {
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

    private boolean isChannelNameValid(String s) {
        if (s.isEmpty()) return false;
        if (s.contains(" ")) return false;
        if (channelMap.containsKey(s)) return false;
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
