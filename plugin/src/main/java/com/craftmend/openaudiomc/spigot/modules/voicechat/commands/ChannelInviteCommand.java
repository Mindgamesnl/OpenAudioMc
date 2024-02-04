package com.craftmend.openaudiomc.spigot.modules.voicechat.commands;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
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
        this.trimArguments = true;
    }

    @Override
    @SneakyThrows
    public void onExecute(User sender, String[] args) {
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
                throw new CommandError("You must first have voice chat enabled before you can join a channel");
            }

            if (client.getRtcSessionManager().getCurrentChannel() != null) {
                throw new CommandError("You're already in a channel. Leave it first using /voice channel leave");
            }

            Channel channel = getService(VoiceChannelService.class).getChannel(channelName);
            if (channel == null) {
                throw new CommandError("No channel with that name exists");
            }

            channel.addMember(sender);
            message(sender, "You have joined the channel");
            return;
        }

        if (!sender.findClient().isPresent()) {
            throw new CommandError("Only players can use invitations");
        }

        Client client = (Client) sender.findClient().get();
        if (!client.hasVoicechatEnabled()) {
            throw new CommandError("You must first have voice chat enabled before you can send an invitation");
        }

        ClientConnection clientConnection = (ClientConnection) client;
        Channel channel = clientConnection.getRtcSessionManager().getCurrentChannel();

        if (channel == null) {
            throw new CommandError("You are not in a channel");
        }

        // am I the owner?
        if (!channel.getCreator().getUniqueId().equals(sender.getUniqueId())) {
            if (sender.isAdministrator()) {
                message(sender, "You are not the owner of this channel, but your invite was allowed because you are an admin");
            } else {
                throw new CommandError("Only the owner of the channel can invite people");
            }
        }

        String targetName = args[0];
        Player target = Bukkit.getPlayer(targetName);
        if (target == null) {
            throw new CommandError("No player with that name is online");
        }

        if (target.getUniqueId().equals(sender.getUniqueId())) {
            throw new CommandError("You can't invite yourself to a channel");
        }

        // is the target already in a channel?
        for (ClientConnection member : channel.getMembers()) {
            if (member.getOwner().getUniqueId().equals(target.getUniqueId())) {
                throw new CommandError("That player is already in a channel");
            }
        }

        UUID invitationId = UUID.randomUUID();
        invitations.put(invitationId, channel.getName());

        String invitationMessage = StorageKey.MESSAGE_VOICE_CHANNEL_INVITED.getString()
                .replace("{channel}", channel.getName())
                .replace("{inviter}", sender.getName());

        User targetUser = resolveDependency(UserHooks.class).byUuid(target.getUniqueId());
        if (targetUser == null) {
            throw new CommandError("That player is not connected to OpenAudioMc");
        }
        ClientConnection targetClient = (ClientConnection) targetUser.findClient().get();

        if (targetClient == null) {
            throw new CommandError("That player is not connected to OpenAudioMc");
        }

        if (targetClient.getRtcSessionManager().getCurrentChannel() != null) {
            throw new CommandError("That player is already in a channel");
        }

        if (!targetClient.getRtcSessionManager().isReady()) {
            throw new CommandError("That player is not connected to voice chat yet, please ask them to connect and try again.");
        }

        targetClient.getUser().sendClickableCommandMessage(
                invitationMessage,
                "Click to join the channel",
                "voice channel invite use " + channel.getName()
        );

        message(sender, "You have invited " + target.getName() + " to the channel.");

        Bukkit.getScheduler().runTaskLater(OpenAudioMcSpigot.getInstance(), () -> {
            if (invitations.containsKey(invitationId)) {
                invitations.remove(invitationId);
                message(sender, "The invitation to " + target.getName() + " has expired");
            }
        }, 20 * 30);
    }
}
