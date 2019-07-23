package com.craftmend.openaudiomc.bungee.modules.commands;

import com.craftmend.openaudiomc.OpenAudioMcCore;
import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.bungee.modules.commands.commands.BungeeAudioCommand;
import com.craftmend.openaudiomc.bungee.modules.commands.commands.BungeeVolumeCommand;
import com.craftmend.openaudiomc.bungee.modules.commands.commands.OpenAudioMcBungeeCommand;
import com.craftmend.openaudiomc.bungee.modules.commands.subcommand.BungeePlayCommand;
import com.craftmend.openaudiomc.bungee.modules.commands.subcommand.BungeeStopCommand;
import com.craftmend.openaudiomc.bungee.modules.commands.subcommand.StateSubCommand;
import com.craftmend.openaudiomc.generic.commands.subcommands.HelpSubCommand;

public class BungeeCommandModule {

    public BungeeCommandModule(OpenAudioMcBungee openAudioMcBungee) {
        openAudioMcBungee.getProxy().getPluginManager().registerCommand(openAudioMcBungee, new OpenAudioMcBungeeCommand());
        openAudioMcBungee.getProxy().getPluginManager().registerCommand(openAudioMcBungee, new BungeeVolumeCommand());
        openAudioMcBungee.getProxy().getPluginManager().registerCommand(openAudioMcBungee, new BungeeAudioCommand());

        OpenAudioMcCore.getInstance().getCommandModule().registerSubCommand(new HelpSubCommand());
        OpenAudioMcCore.getInstance().getCommandModule().registerSubCommand(new StateSubCommand());
        OpenAudioMcCore.getInstance().getCommandModule().registerSubCommand(new BungeePlayCommand(OpenAudioMcCore.getInstance()));
        OpenAudioMcCore.getInstance().getCommandModule().registerSubCommand(new BungeeStopCommand(OpenAudioMcCore.getInstance()));

    }

}
