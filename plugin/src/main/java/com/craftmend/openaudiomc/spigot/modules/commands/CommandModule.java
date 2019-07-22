package com.craftmend.openaudiomc.spigot.modules.commands;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.commands.command.MainCommand;
import com.craftmend.openaudiomc.spigot.modules.commands.command.VolumeCommand;
import com.craftmend.openaudiomc.spigot.modules.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.spigot.modules.commands.middleware.CommandTranslationMiddleware;
import com.craftmend.openaudiomc.spigot.modules.commands.subcommands.*;
import com.craftmend.openaudiomc.spigot.services.server.enums.ServerVersion;
import lombok.Getter;
import org.bukkit.ChatColor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CommandModule {

    private Map<String, SubCommand> subCommands = new HashMap<>();
    @Getter private List<String> aliases = new ArrayList<>();
    @Getter private String commandPrefix = ChatColor.DARK_AQUA + "[" + ChatColor.AQUA + "OpenAudioMc" + ChatColor.DARK_AQUA + "] " + ChatColor.GRAY;

    public CommandModule(OpenAudioMcSpigot openAudioMcSpigot) {
        MainCommand mainCommand = new MainCommand(openAudioMcSpigot, this);
        openAudioMcSpigot.getCommand("openaudiomc").setExecutor(mainCommand);
        openAudioMcSpigot.getCommand("openaudiomc").setTabCompleter(mainCommand);
        openAudioMcSpigot.getCommand("volume").setExecutor(new VolumeCommand(openAudioMcSpigot));

        aliases.addAll(openAudioMcSpigot.getCommand("openaudiomc").getAliases());
        aliases.add("openaudiomc");

        registerSubCommand(new HelpSubCommand(this));
        registerSubCommand(new RegionsSubCommand(openAudioMcSpigot));
        registerSubCommand(new PlaySubCommand(openAudioMcSpigot));
        registerSubCommand(new SpeakersSubCommand(openAudioMcSpigot));
        registerSubCommand(new StopSubCommand(openAudioMcSpigot));
        registerSubCommand(new HueSubCommand(openAudioMcSpigot));
        registerSubCommand(new ReloadSubCommand());
        registerSubCommand(new StateSubCommand());

        // if it is a older version, register the middleware
        if (openAudioMcSpigot.getServerService().getVersion() == ServerVersion.LEGACY) {
            openAudioMcSpigot.getServer().getPluginManager().registerEvents(
                    new CommandTranslationMiddleware(openAudioMcSpigot),
                    openAudioMcSpigot
            );
        }
    }

    /**
     * @return All sub commands as strings
     */
    public List<String> getSubCommands() {
        return new ArrayList<>(subCommands.keySet());
    }

    /**
     * @return All sub command handlers
     */
    public List<SubCommand> getSubCommandHandlers() {
        return new ArrayList<>(subCommands.values());
    }

    /**
     * @param subCommand registers a sub command
     */
    public void registerSubCommand(SubCommand subCommand) {
        subCommands.put(subCommand.getCommand(), subCommand);
    }

    /**
     * @param argument get the sub command from a name
     * @return returns the handler, can be null
     */
    public SubCommand getSubCommand(String argument) {
        return subCommands.get(argument);
    }

}
