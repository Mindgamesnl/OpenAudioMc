package com.craftmend.openaudiomc.spigot.modules.voicechat.commands;

import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.platform.OaColor;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.voicechat.VoiceChannelService;
import com.craftmend.openaudiomc.spigot.modules.voicechat.channels.Channel;

import java.util.Collection;

public class ChannelListCommand extends SubCommand {

    public ChannelListCommand() {
        super("list");
    }

    @Override
    public void onExecute(User sender, String[] args) {
        Collection<Channel> channels = getService(VoiceChannelService.class).getChannels();

        if (channels.isEmpty()) {
            message(sender, "There are no channels yet");
            return;
        }

        message(sender, "Existing channels with occupants:");
        for (Channel channel : channels) {
            StringBuilder readableOccupants;
            Collection<ClientConnection> occupants = channel.getMembers();
            if (occupants.isEmpty()) {
                readableOccupants = new StringBuilder(OaColor.RED + "[empty]");
            } else {
                int size = occupants.size();
                int i = 0;
                readableOccupants = new StringBuilder(OaColor.GREEN + "[");
                for (ClientConnection occupant : occupants) {
                    readableOccupants.append(occupant.getActor().getName());
                    if (i < size - 1) {
                        readableOccupants.append(", ");
                    }
                    i++;
                }
                readableOccupants.append(OaColor.GREEN);
                readableOccupants.append("]");
            }

            message(sender, " - " + channel.getName() + " " + readableOccupants);
        }
    }
}
