package com.craftmend.openaudiomc.spigot.modules.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandModule;
import com.craftmend.openaudiomc.generic.commands.subcommands.HelpSubCommand;
import com.craftmend.openaudiomc.spigot.modules.commands.middleware.CommandTranslationMiddleware;
import com.craftmend.openaudiomc.spigot.modules.commands.subcommands.*;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.commands.command.SpigotMainCommand;
import com.craftmend.openaudiomc.spigot.modules.commands.command.VolumeCommand;
import com.craftmend.openaudiomc.spigot.services.server.enums.ServerVersion;
import org.bukkit.plugin.SimplePluginManager;

public class SpigotCommandModule {

    public SpigotCommandModule(OpenAudioMcSpigot openAudioMcSpigot) {
        SpigotMainCommand spigotMainCommand = new SpigotMainCommand(openAudioMcSpigot);
        openAudioMcSpigot.getCommand("openaudiomc").setExecutor(spigotMainCommand);
        openAudioMcSpigot.getCommand("openaudiomc").setTabCompleter(spigotMainCommand);
        openAudioMcSpigot.getCommand("volume").setExecutor(new VolumeCommand());

        CommandModule commandModule = OpenAudioMc.getInstance().getCommandModule();

        commandModule.getAliases().addAll(openAudioMcSpigot.getCommand("openaudiomc").getAliases());
        commandModule.getAliases().add("openaudiomc");

        commandModule.registerSubCommands(
                new HelpSubCommand(),
                new RegionsSubCommand(openAudioMcSpigot),
                new PlaySubCommand(openAudioMcSpigot),
                new SpeakersSubCommand(openAudioMcSpigot),
                new StopSubCommand(openAudioMcSpigot),
                new HueSubCommand(openAudioMcSpigot),
                new ShowSubCommand(openAudioMcSpigot),
                new ReloadSubCommand(),
                new StateSubCommand()
        );

        // if it is a older version, register the middleware
        if (openAudioMcSpigot.getServerService().getVersion().getRevision() > ServerVersion.LEGACY.getRevision()) {
            openAudioMcSpigot.getServer().getPluginManager().registerEvents(
                    new CommandTranslationMiddleware(),
                    openAudioMcSpigot
            );
        }
    }

}
