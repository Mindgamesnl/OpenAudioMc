package com.craftmend.openaudiomc.generic.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.subcommands.AcceptSubCommand;
import com.craftmend.openaudiomc.generic.commands.subcommands.NotificationSubCommand;
import com.craftmend.openaudiomc.generic.commands.subcommands.PlusSubCommand;
import com.craftmend.openaudiomc.generic.commands.subcommands.ReloadSubCommand;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.platform.Platform;
import lombok.Getter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CommandModule {

    private final Map<String, SubCommand> subCommands = new HashMap<>();
    @Getter private final List<String> aliases = new ArrayList<>();
    @Getter private final String commandPrefix = Platform.translateColors("&3[&bOA&3] &7");

    public CommandModule(OpenAudioMc openAudioMc) {
        registerSubCommands(
                new NotificationSubCommand(this),
                new PlusSubCommand(),
                new ReloadSubCommand()
        );

        // add accept sub command if the player is new
        if (!openAudioMc.getConfiguration().getBoolean(StorageKey.LEGAL_ACCEPTED_TOS_AND_PRIVACY)) {
            registerSubCommands(new AcceptSubCommand());
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

    public void registerSubCommands(SubCommand... commandList) {
        for (SubCommand subCommand : commandList) {
            subCommands.put(subCommand.getCommand(), subCommand);
        }
    }

    /**
     * @param argument get the sub command from a name
     * @return returns the handler, can be null
     */
    public SubCommand getSubCommand(String argument) {
        return subCommands.get(argument);
    }

}
