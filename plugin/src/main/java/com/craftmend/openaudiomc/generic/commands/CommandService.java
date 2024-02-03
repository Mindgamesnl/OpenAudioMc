package com.craftmend.openaudiomc.generic.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.enums.CommandContext;
import com.craftmend.openaudiomc.generic.commands.helpers.CommandMiddewareExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchCrashMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchLegalBindingMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CleanStateCheckMiddleware;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
import com.craftmend.openaudiomc.generic.commands.subcommands.*;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.user.User;
import lombok.Getter;

import java.util.*;

public class CommandService extends Service {

    @Inject
    private Configuration configuration;

    private final Map<CommandContext, Map<String, SubCommand>> subCommands = new EnumMap<>(CommandContext.class);
    @Getter private final List<String> aliases = new ArrayList<>();

    private final CommandMiddleware[] defaultCommandMiddleware = new CommandMiddleware[] {
            new CatchLegalBindingMiddleware(),
            new CatchCrashMiddleware(),
            new CleanStateCheckMiddleware()
    };

    public CommandService() {
        // initialize default
        MagicValue.overWrite(MagicValue.COMMAND_PREFIX, Platform.translateColors("&3[&bOA&3] &7"));

        // register default sub commands for the admin command
        registerSubCommands(
                CommandContext.OPENAUDIOMC,
                new HelpSubCommand(CommandContext.OPENAUDIOMC, true),
                new LinkSubCommand(),
                new ReloadSubCommand(),
                new StateSubCommand(),
                new ModulesSubCommand(),
                new ClientsSubCommand(),
                new StopSubCommand(),
                new PlaySubCommand(),
                new PreloadSubCommand()
        );

        // add accept sub command if the player is new
        if (!OpenAudioMc.getInstance().getConfiguration().getBoolean(StorageKey.LEGAL_ACCEPTED_TOS_AND_PRIVACY)) {
            registerSubCommands(CommandContext.OPENAUDIOMC, new AcceptSubCommand());
        }
    }

    @Override
    public void onEnable() {
        // add accept sub command if the player is new
        if (!configuration.getBoolean(StorageKey.LEGAL_ACCEPTED_TOS_AND_PRIVACY)) {
            registerSubCommands(CommandContext.OPENAUDIOMC, new AcceptSubCommand());
        }
    }

    /**
     * @param context the context to get the sub commands from
     * @return All sub commands as strings
     */
    public List<String> getSubCommands(CommandContext context) {
        return new ArrayList<>(subCommands.getOrDefault(context, new HashMap<>()).keySet());
    }

    /**
     * @param context the context to get the sub commands from
     * @return All sub command handlers
     */
    public Map<String, SubCommand> getSubCommandHandlers(CommandContext context) {
        return subCommands.getOrDefault(context, new HashMap<>());
    }

    /**
     * @param context the context to get the sub commands from
     * @param commandList registers one or more sub commands
     */
    public void registerSubCommands(CommandContext context, SubCommand... commandList) {
        subCommands.computeIfAbsent(context, k -> new HashMap<>());
        for (SubCommand subCommand : commandList) {
            subCommands.get(context).put(subCommand.getCommand(), subCommand);
            for (String alias : subCommand.getAliases()) {
                subCommands.get(context).put(alias, subCommand);
            }
        }
    }

    /**
     * @param context the context to get the sub commands from
     * @param argument get the sub command from a name
     * @return returns the handler, can be null
     */
    public SubCommand getSubCommand(CommandContext context, String argument) {
        return subCommands.getOrDefault(context, new HashMap<>()).get(argument);
    }

    public void invokeCommand(User<?> sender, CommandContext context, String[] args) {
        if (args.length == 0) {
            getSubCommand(context, "help").onExecute(sender, args);
            return;
        }

        SubCommand subCommand = getSubCommand(context, args[0].toLowerCase());

        if (CommandMiddewareExecutor.shouldBeCanceled(sender, subCommand, defaultCommandMiddleware)) return;

        if (subCommand != null) {
            if (subCommand.isAllowed(sender)) {
                String[] subArgs = new String[args.length - 1];
                /*
                 * Move the arguments for the sub command framework
                 */
                if (args.length != 1) System.arraycopy(args, 1, subArgs, 0, args.length - 1);
                try {
                    /*
                     * execute the sub command
                     */
                    subCommand.onExecute(sender, subArgs);
                } catch (Exception e) {
                    /*
                     * It's more dead inside then i am
                     */
                    if (e instanceof CommandError) {
                        sender.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + e.getMessage());
                    } else {
                        sender.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "Something went wrong while executing this command, please check the console for more information.");
                        e.printStackTrace();
                    }
                }
            } else {
                sender.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "You dont have the permissions to do this, sorry! (spigot)");
            }
        } else {
            sender.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "Unknown sub command: " + args[0].toLowerCase());
            getSubCommand(context, "help").onExecute(sender, args);
        }
    }

    public List<String> getTabCompletions(CommandContext context, String[] args) {
        List<String> completions = new ArrayList<>();
        for (String subCommand : getSubCommands(context)) {
            if (args.length <= 1 && subCommand.startsWith(args[0])) completions.add(subCommand);
        }
        if (args.length == 2) {
            SubCommand subCommand = getSubCommand(context, args[0].toLowerCase());
            if (subCommand == null) return new ArrayList<>();
            for (Argument argument : subCommand.getArguments()) {
                if (argument.getSyntax().startsWith(args[1].toLowerCase())) {
                    completions.add(argument.getSyntax());
                }
            }
        }
        return completions;
    }

}
