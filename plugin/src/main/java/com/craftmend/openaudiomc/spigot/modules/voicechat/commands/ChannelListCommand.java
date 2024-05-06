package com.craftmend.openaudiomc.spigot.modules.voicechat.commands;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
import com.craftmend.openaudiomc.generic.platform.OaColor;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.voicechat.VoiceChannelService;
import com.craftmend.openaudiomc.spigot.modules.voicechat.channels.Channel;
import lombok.SneakyThrows;

import java.util.Collection;

public class ChannelListCommand extends SubCommand {

    public ChannelListCommand() {
        super("list");
        registerArguments(new Argument("", "List all available channels"));
        this.ignorePermissions = true;
    }

    @Override
    @SneakyThrows
    public void onExecute(User sender, String[] args) {
        if (!sender.findClient().isPresent()) {
            throw new CommandError(StorageKey.MESSAGE_VOICE_CHANNEL_NOT_A_PLAYER.getString());
        }

        Collection<Channel> channels = getService(VoiceChannelService.class).getChannels();

        if (channels.isEmpty()) {
            throw new CommandError(StorageKey.MESSAGE_VOICE_CHANNEL_LIST_NO_CHANNELS.getString());
        }

        sender.sendMessage(Platform.translateColors(StorageKey.MESSAGE_VOICE_CHANNEL_LIST_HEADER.getString()));

        for (Channel channel : channels) {
            StringBuilder readableOccupants;
            Collection<Client> occupants = channel.getMembers();
            if (occupants.isEmpty()) {
                readableOccupants = new StringBuilder(OaColor.RED + "[empty]");
            } else {
                int size = occupants.size();
                int i = 0;
                readableOccupants = new StringBuilder(OaColor.GREEN + "[");
                for (Client occupant : occupants) {
                    readableOccupants.append(occupant.getActor().getName());
                    if (i < size - 1) {
                        readableOccupants.append(", ");
                    }
                    i++;
                }
                readableOccupants.append(OaColor.GREEN);
                readableOccupants.append("]");
            }

            sender.sendMessage(
                    Platform.translateColors(StorageKey.MESSAGE_VOICE_CHANNEL_LIST_ITEM.getString()
                            .replace("{channel}", channel.getName())
                            .replace("{participants}", readableOccupants.toString())
                            .replace("{type}", channel.getReadableType())
                    )
            );
        }
    }
}
