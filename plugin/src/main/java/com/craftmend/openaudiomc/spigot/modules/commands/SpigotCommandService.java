package com.craftmend.openaudiomc.spigot.modules.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.subcommands.HelpSubCommand;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.spigot.modules.commands.command.MicMuteCommand;
import com.craftmend.openaudiomc.spigot.modules.commands.command.SpigotAudioCommand;
import com.craftmend.openaudiomc.spigot.modules.commands.middleware.CommandTranslationMiddleware;
import com.craftmend.openaudiomc.spigot.modules.commands.subcommands.*;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.commands.command.SpigotMainCommand;
import com.craftmend.openaudiomc.spigot.modules.commands.command.VolumeCommand;
import com.craftmend.openaudiomc.spigot.services.server.ServerService;
import com.craftmend.openaudiomc.spigot.services.server.enums.ServerVersion;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class SpigotCommandService extends Service {

    @Inject
    private CommandService commandService;
    @Inject
    private OpenAudioMcSpigot openAudioMcSpigot;

    @Override
    public void onEnable() {
        SpigotMainCommand spigotMainCommand = new SpigotMainCommand(openAudioMcSpigot);
        openAudioMcSpigot.getCommand("audio").setExecutor(new SpigotAudioCommand());
        openAudioMcSpigot.getCommand("openaudiomc").setExecutor(spigotMainCommand);
        openAudioMcSpigot.getCommand("openaudiomc").setTabCompleter(spigotMainCommand);
        openAudioMcSpigot.getCommand("volume").setExecutor(new VolumeCommand());
        openAudioMcSpigot.getCommand("mutemic").setExecutor(new MicMuteCommand());

        commandService.getAliases().addAll(openAudioMcSpigot.getCommand("openaudiomc").getAliases());
        commandService.getAliases().add("openaudiomc");

        commandService.registerSubCommands(
                new HelpSubCommand(),
                new RegionsSubCommand(openAudioMcSpigot),
                new PlaySubCommand(openAudioMcSpigot),
                new SpeakersSubCommand(openAudioMcSpigot),
                new StopSubCommand(openAudioMcSpigot),
                new HueSubCommand(openAudioMcSpigot),
                new ShowSubCommand(openAudioMcSpigot),
                new AliasSubCommand()
        );

        // if it is a older version, register the middleware
        if (OpenAudioMc.getService(ServerService.class).getVersion().getRevision() > ServerVersion.LEGACY.getRevision()) {
            openAudioMcSpigot.getServer().getPluginManager().registerEvents(
                    new CommandTranslationMiddleware(),
                    openAudioMcSpigot
            );
        }
    }

}
