package com.craftmend.openaudiomc.spigot.modules.voicechat.commands;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.voicechat.VoiceChannelService;
import com.craftmend.openaudiomc.spigot.modules.voicechat.channels.Channel;
import lombok.SneakyThrows;

public class ChannelLeaveCommand extends SubCommand {

    public ChannelLeaveCommand() {
        super("leave");
    }

    @Override
    @SneakyThrows
    public void onExecute(User sender, String[] args) {
        if (!sender.findClient().isPresent()) {
            throw new CommandError("Only players can create channels");
        }

        Client client = (Client) sender.findClient().get();
        if (!client.hasVoicechatEnabled()) {
            throw new CommandError("You must first have voice chat enabled before you can create a channel");
        }

        ClientConnection clientConnection = (ClientConnection) client;
        Channel channel = clientConnection.getRtcSessionManager().getCurrentChannel();

        if (channel == null) {
            throw new CommandError("You are not in a channel");
        }

        channel.removeMember(sender);
        message(sender, "You have left the channel");
    }
}
