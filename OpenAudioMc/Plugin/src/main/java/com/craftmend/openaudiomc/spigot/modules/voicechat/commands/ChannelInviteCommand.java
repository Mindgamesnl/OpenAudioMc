package com.craftmend.openaudiomc.spigot.modules.voicechat.commands;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.voicechat.VoiceChannelService;
import com.craftmend.openaudiomc.spigot.modules.voicechat.channels.Channel;
import lombok.SneakyThrows;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class ChannelInviteCommand extends SubCommand {

    private final Map<UUID, String> invitations = new HashMap<>();

    public ChannelInviteCommand() {
        super("invite");
        registerArguments(new Argument("<player-name>", "Invite a player to your channel", 0));
        this.ignorePermissions = true;
    }

    @Override
    @SneakyThrows
    public void onExecute(User sender, String[] args) {
        if (!sender.findClient().isPresent()) {
            throw new CommandError(StorageKey.MESSAGE_VOICE_CHANNEL_NOT_A_PLAYER.getString());
        }

        // do we have an invitation code?
        if (args.length == 2 && args[0].equalsIgnoreCase("use")) {
            UUID invitationId;
            try {
                invitationId = UUID.fromString(args[1]);
            } catch (IllegalArgumentException e) {
                throw new CommandError("Invalid invitation code");
            }

            if (!invitations.containsKey(invitationId)) {
                throw new CommandError("Invalid invitation code");
            }

            String channelName = invitations.get(invitationId);
            invitations.remove(invitationId);

            ClientConnection client = (ClientConnection) sender.findClient().get();
            if (!client.hasVoicechatEnabled()) {
                throw new CommandError(StorageKey.MESSAGE_VC_NOT_CONNECTED.getString());
            }

            if (client.getRtcSessionManager().getCurrentChannel() != null) {
                throw new CommandError(StorageKey.MESSAGE_VOICE_CHANNEL_ALREADY_MEMBER.getString());
            }

            Channel channel = getService(VoiceChannelService.class).getChannel(channelName);
            if (channel == null) {
                throw new CommandError(StorageKey.MESSAGE_VOICE_CHANNEL_NOT_FOUND.getString());
            }

            channel.addMember(sender);

            sender.sendMessage(Platform.translateColors(StorageKey.MESSAGE_VOICE_CHANNEL_JOINED.getString().replace("{channel}", channel.getName())));
            return;
        }

        if (!sender.findClient().isPresent()) {
            throw new CommandError("Only players can use invitations");
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

        // am I the owner?
        if (channel.getCreator() != null && !channel.getCreator().getUniqueId().equals(sender.getUniqueId())) {
            if (sender.isAdministrator()) {
                message(sender, "You are not the owner of this channel, but your invite was allowed because you are an admin");
            } else {
                throw new CommandError(StorageKey.MESSAGE_VOICE_CHANNEL_NOT_THE_OWNER.getString());
            }
        }

        String targetName = args[0];
        Player target = Bukkit.getPlayer(targetName);
        if (target == null) {
            throw new CommandError(StorageKey.MESSAGE_VOICE_CHANNEL_MEMBER_NOT_FOUND.getString());
        }

        if (target.getUniqueId().equals(sender.getUniqueId())) {
            throw new CommandError("You can't invite yourself to a channel");
        }

        // is the target already in a channel?
        for (Client member : channel.getMembers()) {
            if (member.getActor().getUniqueId().equals(target.getUniqueId())) {
                throw new CommandError(StorageKey.MESSAGE_VOICE_CHANNEL_TARGET_ALREADY_MEMBER.getString());
            }
        }

        UUID invitationId = UUID.randomUUID();
        invitations.put(invitationId, channel.getName());

        String invitationMessage = StorageKey.MESSAGE_VOICE_CHANNEL_INVITED.getString()
                .replace("{channel}", channel.getName())
                .replace("{inviter}", sender.getName());

        User targetUser = resolveDependency(UserHooks.class).byUuid(target.getUniqueId());
        if (targetUser == null) {
            throw new CommandError(StorageKey.MESSAGE_VOICE_CHANNEL_TARGET_NOT_CONNECTED.getString());
        }
        ClientConnection targetClient = (ClientConnection) targetUser.findClient().get();

        if (targetClient == null) {
            throw new CommandError(StorageKey.MESSAGE_VOICE_CHANNEL_TARGET_NOT_CONNECTED.getString());
        }

        if (targetClient.getRtcSessionManager().getCurrentChannel() != null) {
            throw new CommandError(StorageKey.MESSAGE_VOICE_CHANNEL_TARGET_ALREADY_MEMBER.getString());
        }

        if (!targetClient.getRtcSessionManager().isReady()) {
            throw new CommandError(StorageKey.MESSAGE_VOICE_CHANNEL_TARGET_NOT_CONNECTED.getString());
        }

        targetClient.getUser().sendClickableCommandMessage(
                invitationMessage,
                "Click to join the channel",
                "channel invite use " + invitationId
        );

        sender.sendMessage(Platform.translateColors(
                StorageKey.MESSAGE_VOICE_CHANNEL_INVITATION_SENT.getString()
                        .replace("{player}", target.getName())
        ));

        Bukkit.getScheduler().runTaskLater(OpenAudioMcSpigot.getInstance(), () -> {
            if (invitations.containsKey(invitationId)) {
                invitations.remove(invitationId);
                sender.sendMessage(Platform.translateColors(
                        StorageKey.MESSAGE_VOICE_CHANNEL_INVITATION_EXPIRED.getString()
                                .replace("{player}", target.getName())
                ));
            }
        }, 20 * 30);
    }
}
