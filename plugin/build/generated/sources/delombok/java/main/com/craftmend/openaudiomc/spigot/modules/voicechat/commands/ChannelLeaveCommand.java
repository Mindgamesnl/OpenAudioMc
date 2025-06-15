package com.craftmend.openaudiomc.spigot.modules.voicechat.commands;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.voicechat.channels.Channel;

public class ChannelLeaveCommand extends SubCommand {
    public ChannelLeaveCommand() {
        super("leave");
        registerArguments(new Argument("", "Leave your current channel, back to proximity chat"));
        this.ignorePermissions = true;
    }

    @Override
    public void onExecute(User sender, String[] args) {
        try {
            if (!sender.findClient().isPresent()) {
                throw new CommandError(StorageKey.MESSAGE_VOICE_CHANNEL_NOT_A_PLAYER.getString());
            }
            Client client = (Client) sender.findClient().get();
            if (!client.hasVoicechatEnabled()) {
                throw new CommandError(StorageKey.MESSAGE_VC_NOT_CONNECTED.getString());
            }
            ClientConnection clientConnection = (ClientConnection) client;
            Channel channel = clientConnection.getRtcSessionManager().getCurrentChannel();
            if (channel == null) {
                throw new CommandError(StorageKey.MESSAGE_VOICE_CHANNEL_NOT_A_MEMBER.getString());
            }
            channel.removeMember(sender);
            sender.sendMessage(Platform.translateColors(StorageKey.MESSAGE_VOICE_CHANNEL_LEFT.getString()));
        } catch (final java.lang.Throwable $ex) {
            throw lombok.Lombok.sneakyThrow($ex);
        }
    }
}
