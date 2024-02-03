package com.craftmend.openaudiomc.spigot.modules.voicechat.commands;

import com.craftmend.openaudiomc.generic.commands.enums.CommandContext;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.user.User;

public class ChannelSubCommand extends SubCommand {

    public ChannelSubCommand() {
        super("channel");
        registerArguments(
                new Argument("create <channel-name>", "Create a new channel"),
                new Argument("leave", "Leave your current channel, back to proximity chat"),
                new Argument("join <channel-name>", "Join a channel"),
                new Argument("list", "List all available channels"),
                new Argument("invite <player-name>", "Invite a player to your channel")
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
    public void onExecute(User sender, String[] args) {
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
        commandService.invokeCommand(sender, CommandContext.VOICE, new String[]{"help"});
    }
}
