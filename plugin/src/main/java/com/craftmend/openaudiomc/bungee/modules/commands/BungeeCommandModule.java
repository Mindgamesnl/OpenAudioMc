package com.craftmend.openaudiomc.bungee.modules.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.bungee.modules.commands.commands.BungeeAudioCommand;
import com.craftmend.openaudiomc.bungee.modules.commands.commands.BungeeVolumeCommand;
import com.craftmend.openaudiomc.bungee.modules.commands.commands.OpenAudioMcBungeeCommand;
import com.craftmend.openaudiomc.bungee.modules.commands.subcommand.*;
import com.craftmend.openaudiomc.generic.commands.CommandModule;
import com.craftmend.openaudiomc.generic.commands.subcommands.AcceptSubCommand;
import com.craftmend.openaudiomc.generic.commands.subcommands.HelpSubCommand;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;

public class BungeeCommandModule {

    public BungeeCommandModule(OpenAudioMcBungee openAudioMcBungee) {
        openAudioMcBungee.getProxy().getPluginManager().registerCommand(openAudioMcBungee, new OpenAudioMcBungeeCommand());
        openAudioMcBungee.getProxy().getPluginManager().registerCommand(openAudioMcBungee, new BungeeVolumeCommand());
        openAudioMcBungee.getProxy().getPluginManager().registerCommand(openAudioMcBungee, new BungeeAudioCommand());

        CommandModule commandModule = OpenAudioMc.getInstance().getCommandModule();

        commandModule.registerSubCommands(
                new HelpSubCommand(),
                new BungeePlayCommand(OpenAudioMc.getInstance()),
                new BungeeStopCommand(OpenAudioMc.getInstance()),
                new BungeeHueCommand(),
                new BungeeRegionCommand(),
                new BungeeSpeakerCommand(),
                new BungeeShowCommand(),
                new BungeeAliasCommand()
        );

        // add accept sub command if the player is new
        if (!OpenAudioMc.getInstance().getConfiguration().getBoolean(StorageKey.LEGAL_ACCEPTED_TOS_AND_PRIVACY)) {
            commandModule.registerSubCommands(new AcceptSubCommand());
        }

    }

}
