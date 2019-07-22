package com.craftmend.openaudiomc.spigot.modules.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
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

    public CommandModule(OpenAudioMc openAudioMc) {
        MainCommand mainCommand = new MainCommand(openAudioMc, this);
        openAudioMc.getCommand("openaudiomc").setExecutor(mainCommand);
        openAudioMc.getCommand("openaudiomc").setTabCompleter(mainCommand);
        openAudioMc.getCommand("volume").setExecutor(new VolumeCommand(openAudioMc));

        aliases.addAll(openAudioMc.getCommand("openaudiomc").getAliases());
        aliases.add("openaudiomc");

        registerSubCommand(new HelpSubCommand(this));
        registerSubCommand(new RegionsSubCommand(openAudioMc));
        registerSubCommand(new PlaySubCommand(openAudioMc));
        registerSubCommand(new SpeakersSubCommand(openAudioMc));
        registerSubCommand(new StopSubCommand(openAudioMc));
        registerSubCommand(new HueSubCommand(openAudioMc));
        registerSubCommand(new ReloadSubCommand());
        registerSubCommand(new StateSubCommand());

        // if it is a older version, register the middleware
        if (openAudioMc.getServerService().getVersion() == ServerVersion.LEGACY) {
            openAudioMc.getServer().getPluginManager().registerEvents(
                    new CommandTranslationMiddleware(openAudioMc),
                    openAudioMc
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
