package com.craftmend.openaudiomc.spigot.modules.commands.command;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.adapters.BungeeCommandSenderAdapter;
import com.craftmend.openaudiomc.generic.commands.adapters.SpigotCommandSenderAdapter;
import com.craftmend.openaudiomc.generic.commands.helpers.CommandMiddewareExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchCrashMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CleanStateCheckMiddleware;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.commands.CommandModule;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.command.TabCompleter;

import java.util.ArrayList;
import java.util.List;

public class SpigotMainCommand implements CommandExecutor, TabCompleter {

    private OpenAudioMcSpigot openAudioMcSpigot;
    private CommandModule commandModule = OpenAudioMc.getInstance().getCommandModule();
    private CommandMiddleware[] commandMiddleware = new CommandMiddleware[] {
            new CatchCrashMiddleware(),
            new CleanStateCheckMiddleware()
    };

    public SpigotMainCommand(OpenAudioMcSpigot openAudioMcSpigot) {
        this.openAudioMcSpigot = openAudioMcSpigot;
    }

    @Override
    public boolean onCommand(CommandSender originalSender, Command command, String label, String[] args) {
        GenericExecutor sender = new SpigotCommandSenderAdapter(originalSender);

        if (args.length == 0) {
            sender.sendMessage(commandModule.getCommandPrefix() + "OpenAudioMc version " + openAudioMcSpigot.getDescription().getVersion() + ". For help, please use /openaudio help");
            return true;
        }

        SubCommand subCommand = commandModule.getSubCommand(args[0].toLowerCase());

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
                    sender.sendMessage(commandModule.getCommandPrefix() + "An error occurred while executing the command. Please check your command. Type: " + e.getClass().getSimpleName());
                }
                return true;
            } else {
                sender.sendMessage(commandModule.getCommandPrefix() + "You dont have the permissions to do this, sorry!");
                return true;
            }
        } else {
            sender.sendMessage(commandModule.getCommandPrefix() + "Unknown sub command: " + args[0].toLowerCase());
            commandModule.getSubCommand("help").onExecute(sender, args);
            return true;
        }
    }

    @Override
    public List<String> onTabComplete(CommandSender commandSender, Command command, String s, String[] args) {
        List<String> completions = new ArrayList<>();
        for (String subCommand : commandModule.getSubCommands()) {
            if (args.length <= 1 && subCommand.startsWith(args[0])) completions.add(subCommand);
        }
        if (args.length == 2) {
            SubCommand subCommand = commandModule.getSubCommand(args[0].toLowerCase());
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
