package com.craftmend.openaudiomc.spigot.modules.commands.subcommands;

import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.commands.subcommands.voice.VoiceInspectSubCommand;
import com.craftmend.openaudiomc.spigot.modules.commands.subcommands.voice.VoiceModSubCommand;

public class VoiceSubCommand extends SubCommand {

    public VoiceSubCommand() {
        super("voice", "vc", "voicechat", "proximity", "pv");
        registerSubCommands(
                new VoiceModSubCommand(),
                new VoiceInspectSubCommand()
        );

        registerArguments(
                new Argument("extend", "Renew your moderation lease"),
                new Argument("mod", "Toggle moderation mode for voicechat"),
                new Argument("inspect <username>", "Open the moderation menu to view the status of a player or ban them", 1)
        );
    }

    @Override
    public void onExecute(User sender, String[] args) {

        if (args.length == 0) {
            sender.makeExecuteCommand("oa help " + getCommand());
            return;
        }

        if (args[0].equalsIgnoreCase("mod")) {
            delegateTo("mod", sender, args);
            return;
        }

        if (args[0].equalsIgnoreCase("inspect")) {
            delegateTo("inspect", sender, args);
            return;
        }

        if (args[0].equalsIgnoreCase("extend")) {
            ClientConnection cc = (ClientConnection) sender.findClient().get();
            cc.getSession().setModerationTimeRemaining(StorageKey.SETTINGS_MODERATION_TIMER.getInt());
            message(cc.getUser(), "Your moderation lease has been extended for " + StorageKey.SETTINGS_MODERATION_TIMER.getInt() + " seconds.");
            return;
        }

        sender.makeExecuteCommand("oa help " + getCommand());
    }
}
