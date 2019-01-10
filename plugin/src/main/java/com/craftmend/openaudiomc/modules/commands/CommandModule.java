package com.craftmend.openaudiomc.modules.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.commands.command.MainCommand;
import com.craftmend.openaudiomc.modules.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.modules.commands.subcommands.*;
import lombok.Getter;
import org.bukkit.ChatColor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CommandModule {

    private Map<String, SubCommand> subCommands = new HashMap<>();
    @Getter private String commandPrefix = ChatColor.DARK_AQUA + "[" + ChatColor.AQUA + "OpenAudioMc" + ChatColor.DARK_AQUA + "] " + ChatColor.GRAY;

    public CommandModule(OpenAudioMc openAudioMc) {
        MainCommand mainCommand = new MainCommand(openAudioMc, this);
        openAudioMc.getCommand("openaudiomc").setExecutor(mainCommand);
        openAudioMc.getCommand("openaudiomc").setTabCompleter(mainCommand);

        registerSubCommand(new HelpSubCommand(this));
        registerSubCommand(new RegionsSubCommand(openAudioMc));
        registerSubCommand(new PlaySubCommand(openAudioMc));
        registerSubCommand(new SpeakersSubCommand(openAudioMc));
        registerSubCommand(new StopSubCommand(openAudioMc));
        registerSubCommand(new HueSubCommand(openAudioMc));
    }

    public List<String> getSubCommands() {
        return new ArrayList<>(subCommands.keySet());
    }

    public List<SubCommand> getSubCommandHandlers() {
        return new ArrayList<>(subCommands.values());
    }

    public void registerSubCommand(SubCommand subCommand) {
        subCommands.put(subCommand.getCommand(), subCommand);
    }

    public SubCommand getSubCommand(String argument) {
        return subCommands.get(argument);
    }

}
