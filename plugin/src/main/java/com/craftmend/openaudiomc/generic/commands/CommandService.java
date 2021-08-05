package com.craftmend.openaudiomc.generic.commands;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.subcommands.*;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import lombok.Getter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CommandService extends Service {

    @Inject
    private Configuration configuration;

    private final Map<String, SubCommand> subCommands = new HashMap<>();
    @Getter private final List<String> aliases = new ArrayList<>();

    // TODO: This should be a constant
    @Getter private final String commandPrefix = Platform.translateColors("&3[&bOA&3] &7");

    public CommandService() {
        registerSubCommands(
                new NotificationSubCommand(this),
                new LinkSubCommand(),
                new ReloadSubCommand(),
                new StateSubCommand(),
                new VoiceSubCommand()
        );
    }

    @Override
    public void onEnable() {
        // add accept sub command if the player is new
        if (!configuration.getBoolean(StorageKey.LEGAL_ACCEPTED_TOS_AND_PRIVACY)) {
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
    public Map<String, SubCommand> getSubCommandHandlers() {
        return subCommands;
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

            for (String alias : subCommand.getAliases()) {
                subCommands.put(alias, subCommand);
            }
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
