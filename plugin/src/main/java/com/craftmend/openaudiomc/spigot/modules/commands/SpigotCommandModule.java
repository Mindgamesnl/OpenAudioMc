package com.craftmend.openaudiomc.spigot.modules.commands;

import com.craftmend.openaudiomc.OpenAudioMcCore;
import com.craftmend.openaudiomc.generic.commands.CommandModule;
import com.craftmend.openaudiomc.generic.commands.middleware.CommandTranslationMiddleware;
import com.craftmend.openaudiomc.generic.commands.subcommands.*;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.commands.command.SpigotMainCommand;
import com.craftmend.openaudiomc.spigot.modules.commands.command.VolumeCommand;
import com.craftmend.openaudiomc.spigot.services.server.enums.ServerVersion;

public class SpigotCommandModule {

    public SpigotCommandModule(OpenAudioMcSpigot openAudioMcSpigot) {
        SpigotMainCommand spigotMainCommand = new SpigotMainCommand(openAudioMcSpigot);
        openAudioMcSpigot.getCommand("openaudiomc").setExecutor(spigotMainCommand);
        openAudioMcSpigot.getCommand("openaudiomc").setTabCompleter(spigotMainCommand);
        openAudioMcSpigot.getCommand("volume").setExecutor(new VolumeCommand());

        CommandModule commandModule = OpenAudioMcCore.getInstance().getCommandModule();

        commandModule.getAliases().addAll(openAudioMcSpigot.getCommand("openaudiomc").getAliases());
        commandModule.getAliases().add("openaudiomc");

        commandModule.registerSubCommand(new HelpSubCommand());
        commandModule.registerSubCommand(new RegionsSubCommand(openAudioMcSpigot));
        commandModule.registerSubCommand(new PlaySubCommand(openAudioMcSpigot));
        commandModule.registerSubCommand(new SpeakersSubCommand(openAudioMcSpigot));
        commandModule.registerSubCommand(new StopSubCommand(openAudioMcSpigot));
        commandModule.registerSubCommand(new HueSubCommand(openAudioMcSpigot));
        commandModule.registerSubCommand(new ReloadSubCommand());
        commandModule.registerSubCommand(new StateSubCommand());

        // if it is a older version, register the middleware
        if (openAudioMcSpigot.getServerService().getVersion() == ServerVersion.LEGACY) {
            openAudioMcSpigot.getServer().getPluginManager().registerEvents(
                    new CommandTranslationMiddleware(),
                    openAudioMcSpigot
            );
        }
    }

}
