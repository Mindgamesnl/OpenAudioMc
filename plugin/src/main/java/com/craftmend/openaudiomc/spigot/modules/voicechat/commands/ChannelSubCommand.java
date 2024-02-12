package com.craftmend.openaudiomc.spigot.modules.voicechat.commands;

import com.craftmend.openaudiomc.generic.commands.enums.CommandContext;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.voicechat.tabcomplete.VoiceChannelTabCompleteProvider;
import lombok.SneakyThrows;

public class ChannelSubCommand extends SubCommand {

    public ChannelSubCommand() {
        super("channel");
        registerArguments(
                new Argument("create <channel-name>", "Create a new channel"),
                new Argument("leave", "Leave your current channel, back to proximity chat"),
                new Argument("join <channel-name>", "Join a channel")
                        .addTabCompleteProvider(1, new VoiceChannelTabCompleteProvider()),
                new Argument("list", "List all available channels"),
                new Argument("invite <player-name>", "Invite a player to your channel", 1)
        );

        this.ignorePermissions = true;

        registerSubCommands(
                new ChannelCreateCommand(),
                new ChannelLeaveCommand(),
                new ChannelJoinCommand(),
                new ChannelListCommand(),
                new ChannelInviteCommand()
        );
    }

    @Override
    @SneakyThrows
    public void onExecute(User sender, String[] args) {
        if (!sender.findClient().isPresent()) {
            throw new CommandError(StorageKey.MESSAGE_VOICE_CHANNEL_NOT_A_PLAYER.getString());
        }

        if (args.length == 0) {
            dispatchHelp(sender);
            return;
        }

        switch (args[0].toLowerCase()) {
            case "create":
                delegateTo("create", sender, args);
                break;

            case "leave":
                delegateTo("leave", sender, args);
                break;

            case "join":
                delegateTo("join", sender, args);
                break;

            case "list":
                delegateTo("list", sender, args);
                break;

            case "invite":
                delegateTo("invite", sender, args);
                break;

            default:
                dispatchHelp(sender);
        }
    }

    private void dispatchHelp(User sender) {
        commandService.invokeCommand(sender, CommandContext.VOICE, new String[]{"help"}, (err) -> {
            sender.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + Platform.translateColors(err));
        });
    }
}
