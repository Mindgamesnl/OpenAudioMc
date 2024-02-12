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
import lombok.SneakyThrows;

public class ChannelCreateCommand extends SubCommand {

    public ChannelCreateCommand() {
        super("create");
        registerArguments(new Argument("<channel-name>", "Create a new channel"));
        this.permissionScope = "openaudiomc.channel.";
    }

    @Override
    @SneakyThrows
    public void onExecute(User sender, String[] args) {
        if (!sender.findClient().isPresent()) {
            throw new CommandError(StorageKey.MESSAGE_VOICE_CHANNEL_NOT_A_PLAYER.getString());
        }

        Client client = (Client) sender.findClient().get();
        if (!client.hasVoicechatEnabled()) {
            throw new CommandError(StorageKey.MESSAGE_VC_NOT_CONNECTED.getString());
        }

        ClientConnection clientConnection = (ClientConnection) client;
        if (clientConnection.getRtcSessionManager().getCurrentChannel() != null) {
            throw new CommandError(StorageKey.MESSAGE_VOICE_CHANNEL_ALREADY_MEMBER.getString());
        }

        if (args.length != 1) {
            throw new CommandError(StorageKey.MESSAGE_VOICE_CHANNEL_NO_NAME.getString());
        }

        String channelName = args[0].toLowerCase();
        boolean success = getService(VoiceChannelService.class).createUserChannel(channelName, sender);

        if (!success) {
            throw new CommandError(StorageKey.MESSAGE_VOICE_CHANNEL_NAME_TAKEN.getString());
        }

        sender.sendMessage(Platform.translateColors(StorageKey.MESSAGE_VOICE_CHANNEL_CREATED.getString()
                .replace("{channel}", channelName)
        ));
    }
}
