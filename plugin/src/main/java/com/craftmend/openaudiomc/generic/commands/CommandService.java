package com.craftmend.openaudiomc.generic.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.enums.CommandContext;
import com.craftmend.openaudiomc.generic.commands.helpers.CommandMiddewareExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.interfaces.TabCompleteProvider;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchCrashMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchLegalBindingMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CleanStateCheckMiddleware;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
import com.craftmend.openaudiomc.generic.commands.subcommands.*;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.user.User;
import lombok.Getter;

import java.util.*;
import java.util.function.Consumer;

public class CommandService extends Service {

    @Inject
    private Configuration configuration;

    private final Map<CommandContext, Map<String, SubCommand>> subCommands = new EnumMap<>(CommandContext.class);
    @Getter
    private final List<String> aliases = new ArrayList<>();

    private final CommandMiddleware[] defaultCommandMiddleware = new CommandMiddleware[]{
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
                new PreloadSubCommand(),
                new SetKvSubCommand()
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
     * @param context     the context to get the sub commands from
     * @param commandList registers one or more sub commands
     */
    public void registerSubCommands(CommandContext context, SubCommand... commandList) {
        subCommands.computeIfAbsent(context, k -> new HashMap<>());
        for (SubCommand subCommand : commandList) {
            subCommand.setCommandService(this);
            subCommands.get(context).put(subCommand.getCommand(), subCommand);
            for (String alias : subCommand.getAliases()) {
                subCommands.get(context).put(alias, subCommand);
            }
        }
    }

    /**
     * @param context  the context to get the sub commands from
     * @param argument get the sub command from a name
     * @return returns the handler, can be null
     */
    public SubCommand getSubCommand(CommandContext context, String argument) {
        return subCommands.getOrDefault(context, new HashMap<>()).get(argument);
    }

    public void invokeCommand(User<?> sender, CommandContext context, String[] args, Consumer<String> errorConsumer) {
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
                        errorConsumer.accept(e.getMessage());
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

    public List<String> getTabCompletions(CommandContext context, String[] args, User sender) {
        try {
            Set<String> completions = new HashSet<>();
            for (String subCommand : getSubCommands(context)) {
                if (args.length <= 1 && subCommand.toLowerCase(Locale.ROOT).startsWith(args[0].toLowerCase(Locale.ROOT))) {
                    // Not typing yet, add the entire damn thing
                    completions.add(subCommand);
                }
            }

            // do we not have anything yet?
            if (completions.isEmpty()) {
                SubCommand subCommand = getSubCommand(context, args[0].toLowerCase());
                if (subCommand == null) return new ArrayList<>();

                if (!subCommand.isAllowed(sender)) {
                    sender.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "You dont have the permissions to complete this command. Sorry!");
                    return new ArrayList<>();
                }

                for (Argument argument : subCommand.getArguments()) {
                    String[] argumentSyntaxParts = argument.getSyntax().split(" ");
                    int localArgIndex = args.length - 2;

                    boolean isMatch = true;

                    for (int i = 0; i < localArgIndex; i++) {
                        if (args.length - 1 < i + 1 || argumentSyntaxParts.length < i + 1) {
                            isMatch = false;
                            break;
                        };

                        boolean wasCustomProvider = argument.getTabCompleteProvider(i) != null;
                        if (!args[i + 1].equalsIgnoreCase(argumentSyntaxParts[i]) && !wasCustomProvider) {
                            isMatch = false;
                            break;
                        }
                    }

                    if (!isMatch) continue;

                    TabCompleteProvider customProvider = argument.getTabCompleteProvider(localArgIndex);

                    if (customProvider != null) {
                        for (String val : customProvider.getOptions(sender)) {
                            if (val.toLowerCase().startsWith(args[args.length - 1].toLowerCase())) {
                                completions.add(val);
                            }
                        }
                    } else {
                        // ensure that this argument is actually from our last argument
                        if (args.length <= argumentSyntaxParts.length + 1) {
                            completions.add(argumentSyntaxParts[localArgIndex]);
                        }
                    }
                }
            }

            List<String> s = new ArrayList<>();
            s.addAll(completions);
            return s;
        } catch (Exception e) {
            String message = "Error while tab-completing command " + context.name() + " with args " + Arrays.toString(args);
            sender.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "An error occurred while tab-completing this command. Please check the console for more information.");
            OpenAudioLogger.error(e, message);
            return new ArrayList<>();
        }
    }

}
