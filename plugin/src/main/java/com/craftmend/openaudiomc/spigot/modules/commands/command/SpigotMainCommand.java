package com.craftmend.openaudiomc.spigot.modules.commands.command;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.helpers.CommandMiddewareExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;

import com.craftmend.openaudiomc.generic.commands.middleware.CatchCrashMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchLegalBindingMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CleanStateCheckMiddleware;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.user.adapters.SpigotUserAdapter;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.command.TabCompleter;

import java.util.ArrayList;
import java.util.List;

public class SpigotMainCommand implements CommandExecutor, TabCompleter {

    private final OpenAudioMcSpigot openAudioMcSpigot;
    private final CommandService commandService = OpenAudioMc.getService(CommandService.class);
    private final CommandMiddleware[] commandMiddleware = new CommandMiddleware[] {
            new CatchLegalBindingMiddleware(),
            new CatchCrashMiddleware(),
            new CleanStateCheckMiddleware()
    };

    public SpigotMainCommand(OpenAudioMcSpigot openAudioMcSpigot) {
        this.openAudioMcSpigot = openAudioMcSpigot;
    }

    @Override
    public boolean onCommand(CommandSender originalSender, Command command, String label, String[] args) {
        User sender = new SpigotUserAdapter(originalSender);

        if (args.length == 0) {
            sender.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "OpenAudioMc version " + openAudioMcSpigot.getDescription().getVersion() + ". For help, please use /openaudio help");
            return true;
        }

        SubCommand subCommand = commandService.getSubCommand(args[0].toLowerCase());

        if (CommandMiddewareExecutor.shouldBeCanceled(sender, subCommand, commandMiddleware)) return true;

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
                    e.printStackTrace();
                    sender.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "An error occurred while executing the command. Please check your command. Type: " + e.getClass().getSimpleName());
                }
                return true;
            } else {
                sender.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "You dont have the permissions to do this, sorry!");
                return true;
            }
        } else {
            sender.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "Unknown sub command: " + args[0].toLowerCase());
            commandService.getSubCommand("help").onExecute(sender, args);
            return true;
        }
    }

    @Override
    public List<String> onTabComplete(CommandSender commandSender, Command command, String s, String[] args) {
        List<String> completions = new ArrayList<>();
        for (String subCommand : commandService.getSubCommands()) {
            if (args.length <= 1 && subCommand.startsWith(args[0])) completions.add(subCommand);
        }
        if (args.length == 2) {
            SubCommand subCommand = commandService.getSubCommand(args[0].toLowerCase());
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
