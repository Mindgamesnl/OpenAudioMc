package com.craftmend.openaudiomc.bungee.modules.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.bungee.modules.commands.commands.BungeeAudioCommand;
import com.craftmend.openaudiomc.bungee.modules.commands.commands.BungeeVolumeCommand;
import com.craftmend.openaudiomc.bungee.modules.commands.commands.OpenAudioMcBungeeCommand;
import com.craftmend.openaudiomc.bungee.modules.commands.subcommand.*;
import com.craftmend.openaudiomc.generic.commands.CommandModule;
import com.craftmend.openaudiomc.generic.commands.subcommands.HelpSubCommand;
import com.craftmend.openaudiomc.spigot.modules.commands.subcommands.ReloadSubCommand;

public class BungeeCommandModule {

    public BungeeCommandModule(OpenAudioMcBungee openAudioMcBungee) {
        openAudioMcBungee.getProxy().getPluginManager().registerCommand(openAudioMcBungee, new OpenAudioMcBungeeCommand());
        openAudioMcBungee.getProxy().getPluginManager().registerCommand(openAudioMcBungee, new BungeeVolumeCommand());
        openAudioMcBungee.getProxy().getPluginManager().registerCommand(openAudioMcBungee, new BungeeAudioCommand());

        CommandModule commandModule = OpenAudioMc.getInstance().getCommandModule();

        commandModule.registerSubCommands(
                new HelpSubCommand(),
                new StateSubCommand(),
                new BungeePlayCommand(OpenAudioMc.getInstance()),
                new BungeeStopCommand(OpenAudioMc.getInstance()),
                new BungeeHueCommand(),
                new BungeeRegionCommand(),
                new BungeeSpeakerCommand(),
                new BungeeShowCommand(),
                new ReloadSubCommand(),
                new BungeeAliasCommand()
        );

    }

}
