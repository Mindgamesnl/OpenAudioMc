package com.craftmend.openaudiomc.spigot.modules.commands.subcommands;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.commands.subcommands.voice.VoiceModSubCommand;

public class VoiceSubCommand extends SubCommand {

    public VoiceSubCommand() {
        super("voice", "vc", "voicechat", "proximity", "pv");
        registerSubCommands(
                new VoiceModSubCommand()
        );

        registerArguments(
                new Argument("mod <username>", "Open the moderation menu to view the status of a player or ban them")
        );
    }

    @Override
    public void onExecute(User sender, String[] args) {

        if (args.length == 0) {
            sender.makeExecuteCommand("oa help " + getCommand());
            return;
        }

        if (args[0].equalsIgnoreCase("mod") && args.length == 2) {
            delegateTo("mod", sender, args);
            return;
        }

        sender.makeExecuteCommand("oa help " + getCommand());
    }
}
