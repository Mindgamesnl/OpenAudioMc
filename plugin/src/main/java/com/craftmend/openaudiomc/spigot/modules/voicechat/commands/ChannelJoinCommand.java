package com.craftmend.openaudiomc.spigot.modules.voicechat.commands;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.voicechat.VoiceChannelService;
import com.craftmend.openaudiomc.spigot.modules.voicechat.channels.Channel;
import lombok.SneakyThrows;

public class ChannelJoinCommand extends SubCommand {

    public ChannelJoinCommand() {
        super("join");
        this.trimArguments = true;
    }

    @Override
    @SneakyThrows
    public void onExecute(User sender, String[] args) {
        if (args.length != 1) {
            throw new CommandError("Please specify a name for the channel");
        }

        if (!sender.findClient().isPresent()) {
            throw new CommandError("Only players can create channels");
        }

        Client client = (Client) sender.findClient().get();
        if (!client.hasVoicechatEnabled()) {
            throw new CommandError("You must first have voice chat enabled before you can create a channel");
        }

        ClientConnection clientConnection = (ClientConnection) client;
        Channel channel = clientConnection.getRtcSessionManager().getCurrentChannel();

        if (channel != null) {
            throw new CommandError("You're already in a channel. Leave it first using /voice channel leave");
        }

        String channelName = args[0].toLowerCase();
        Channel targetChannel = getService(VoiceChannelService.class).getChannel(channelName);
        if (targetChannel == null) {
            throw new CommandError("No channel with that name exists");
        }

        targetChannel.addMember(sender);
        message(sender, "You have joined the channel");
    }
}
