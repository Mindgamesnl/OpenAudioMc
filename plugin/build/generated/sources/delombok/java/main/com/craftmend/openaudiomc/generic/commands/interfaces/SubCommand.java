package com.craftmend.openaudiomc.generic.commands.interfaces;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
import com.craftmend.openaudiomc.generic.commands.selectors.SelectorTranslator;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.user.User;
import org.bukkit.Bukkit;
import org.bukkit.permissions.Permission;
import java.util.*;

public abstract class SubCommand {
    private final String command;
    protected boolean listed = true;
    private List<String> aliases = new ArrayList<>();
    private final List<Argument> arguments = new ArrayList<>();
    private final Map<String, SubCommand> moreSubCommands = new HashMap<>();
    protected boolean trimArguments = false;
    protected boolean ignorePermissions = false;
    protected CommandService commandService;
    protected String permissionScope = "openaudiomc.commands.";

    /**
     * @param argument Your command name. For example "select"
     */
    public SubCommand(String argument) {
        this.command = argument;
        if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT) {
            // try, could already be registered
            try {
                Permission permission = new Permission(permissionScope + command);
                permission.setDescription("Allows access to the " + command + " command");
                Bukkit.getPluginManager().addPermission(permission);
            } catch (IllegalArgumentException e) {
            }
        }
        // ignored
    }

    public SubCommand(String argument, String... aliases) {
        this(argument);
        this.aliases = Arrays.asList(aliases);
    }

    /**
     * send a openaudiomc styled message
     *
     * @param sender Command sender
     * @param message Your message
     */
    protected void message(User<?> sender, String message) {
        sender.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + Platform.translateColors(message));
    }

    /**
     * check if the sender has permissions to execute this command.
     * you do not need to run this check itself, its used by the framework.
     *
     * @param commandSender Command sender
     * @return true if the player is allowed to execute a command
     */
    public boolean isAllowed(User<?> commandSender) {
        if (ignorePermissions) return true;
        return commandSender.hasPermission(permissionScope + command) || commandSender.hasPermission(permissionScope + "*") || commandSender.hasPermission("openaudiomc.*") || commandSender.isAdministrator();
    }

    protected void registerSubCommands(SubCommand... commands) {
        for (SubCommand subCommand : commands) {
            moreSubCommands.put(subCommand.getCommand(), subCommand);
        }
    }

    /**
     * @param subCommand Another sub command to use, like a sub sub command!
     * @param user User
     * @param args Arguments
     */
    protected void delegateTo(String subCommand, User<?> user, String[] args) {
        SubCommand sci = moreSubCommands.get(subCommand);
        if (sci.trimArguments) {
            String[] subArgs = new String[args.length - 1];
            if (args.length != 1) System.arraycopy(args, 1, subArgs, 0, args.length - 1);
            sci.onExecute(user, subArgs);
        } else {
            sci.onExecute(user, args);
        }
    }

    protected String getColor(String color) {
        return Platform.makeColor(color);
    }

    /**
     * Register one or more arguments.
     * used for auto complete and the help menu
     *
     * @param args one or more arguments
     */
    protected void registerArguments(Argument... args) {
        arguments.addAll(Arrays.asList(args));
    }

    /**
     * @param sender the sender that executed the commands
     * @param args the arguments after your command, starting at index 0
     */
    public abstract void onExecute(User<?> sender, String[] args);

    protected boolean isInteger(String s) {
        return isInteger(s, 10);
    }

    private boolean isInteger(String s, int radix) {
        if (s.isEmpty()) return false;
        for (int i = 0; i < s.length(); i++) {
            if (i == 0 && s.charAt(i) == '-') {
                if (s.length() == 1) return false;
                 else continue;
            }
            if (Character.digit(s.charAt(i), radix) < 0) return false;
        }
        return true;
    }


    public static class CommandArguments {
        private String[] args;

        public String getSaveString(int index) {
            if (args.length >= (index + 1)) {
                return args[index];
            }
            return "";
        }

        public CommandArguments(final String[] args) {
            this.args = args;
        }
    }

    public <T> T resolveDependency(Class<T> d) {
        return d.cast(OpenAudioMc.getInstance().getServiceManager().resolve(d));
    }

    protected <T extends Service> T getService(Class<T> service) {
        return service.cast(OpenAudioMc.getInstance().getServiceManager().loadService(service));
    }

    protected List<User<?>> resolveSelector(User<?> sender, String selector) {
        SelectorTranslator<?> translator = Platform.getSelectorTranslator();
        translator.setString(selector);
        translator.setSenderGeneric(sender);
        return translator.getResultsGeneric();
    }

    public int catchInt(String data) {
        try {
            try {
                return Integer.parseInt(data);
            } catch (NumberFormatException e) {
                throw new CommandError("Please provide an integer");
            }
        } catch (final java.lang.Throwable $ex) {
            throw lombok.Lombok.sneakyThrow($ex);
        }
    }

    public String getCommand() {
        return this.command;
    }

    public boolean isListed() {
        return this.listed;
    }

    public List<String> getAliases() {
        return this.aliases;
    }

    public List<Argument> getArguments() {
        return this.arguments;
    }

    public void setCommandService(final CommandService commandService) {
        this.commandService = commandService;
    }
}
