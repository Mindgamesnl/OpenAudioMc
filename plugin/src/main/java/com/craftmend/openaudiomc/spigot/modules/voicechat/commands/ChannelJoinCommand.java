package com.craftmend.openaudiomc.spigot.modules.voicechat.commands;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.voicechat.VoiceChannelService;
import com.craftmend.openaudiomc.spigot.modules.voicechat.channels.Channel;
import com.craftmend.openaudiomc.spigot.modules.voicechat.channels.ChannelEnterResponse;
import com.craftmend.openaudiomc.spigot.modules.voicechat.tabcomplete.VoiceChannelTabCompleteProvider;
import lombok.SneakyThrows;

public class ChannelJoinCommand extends SubCommand {

    public ChannelJoinCommand() {
        super("join");
        registerArguments(new Argument("<channel-name>", "Join a channel")
                .addTabCompleteProvider(0, new VoiceChannelTabCompleteProvider()));
        // this command does some special stuff with permissions, so we ignore them here
        this.ignorePermissions = true;
    }

    @Override
    @SneakyThrows
    public void onExecute(User sender, String[] args) {
        if (!sender.findClient().isPresent()) {
            throw new CommandError(StorageKey.MESSAGE_VOICE_CHANNEL_NOT_A_PLAYER.getString());
        }

        if (args.length != 1) {
            throw new CommandError("Please specify a name for the channel");
        }

        Client client = (Client) sender.findClient().get();
        if (!client.hasVoicechatEnabled()) {
            throw new CommandError(StorageKey.MESSAGE_VC_NOT_CONNECTED.getString());
        }

        ClientConnection clientConnection = (ClientConnection) client;
        Channel channel = clientConnection.getRtcSessionManager().getCurrentChannel();

        if (channel != null) {
            throw new CommandError(StorageKey.MESSAGE_VOICE_CHANNEL_ALREADY_MEMBER.getString());
        }

        String channelName = args[0];
        Channel targetChannel = getService(VoiceChannelService.class).getChannel(channelName);
        if (targetChannel == null) {
            throw new CommandError(StorageKey.MESSAGE_VOICE_CHANNEL_NOT_FOUND.getString());
        }

        ChannelEnterResponse response = targetChannel.attemptEnter(sender);
        if (response != ChannelEnterResponse.OK) {
            throw new CommandError(
                    response.getMessage()
                            .replace("{owner}", targetChannel.getCreator() != null ? targetChannel.getCreator().getName() : "unknown")
            );
        }

        targetChannel.addMember(sender);
        sender.sendMessage(Platform.translateColors(
                StorageKey.MESSAGE_VOICE_CHANNEL_JOINED.getString()
                        .replace("{channel}", channelName)
        ));
    }
}
