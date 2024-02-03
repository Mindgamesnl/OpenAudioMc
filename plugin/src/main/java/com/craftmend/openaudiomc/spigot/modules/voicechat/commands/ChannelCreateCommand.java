package com.craftmend.openaudiomc.spigot.modules.voicechat.commands;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.voicechat.VoiceChannelService;
import lombok.SneakyThrows;
import org.bukkit.Bukkit;

public class ChannelCreateCommand extends SubCommand {

    public ChannelCreateCommand() {
        super("create");
        this.trimArguments = true;
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

        if (args.length != 1) {
            throw new CommandError("Please specify a name for the channel");
        }

        String channelName = args[0].toLowerCase();
        boolean success = getService(VoiceChannelService.class).createChannel(channelName, sender);

        if (!success) {
            throw new CommandError("A channel with that name already exists");
        }

        message(sender, "Channel '" + channelName + "' has been created");
    }
}
