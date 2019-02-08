package com.craftmend.openaudiomc.modules.commands.command;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.commands.CommandModule;
import com.craftmend.openaudiomc.modules.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.modules.commands.objects.Argument;
import lombok.AllArgsConstructor;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.command.TabCompleter;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
public class MainCommand implements CommandExecutor, TabCompleter {

    private OpenAudioMc openAudioMc;
    private CommandModule commandModule;

    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {

        if (args.length == 0) {
            sender.sendMessage(commandModule.getCommandPrefix() + "OpenAudioMc version " + openAudioMc.getDescription().getVersion() + ". For help, please use /openaudio help");
            return true;
        }

        SubCommand subCommand = commandModule.getSubCommand(args[0].toLowerCase());
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
                    sender.sendMessage(commandModule.getCommandPrefix() + "An error occurred while executing the command. Please check your command.");
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
            for (Argument argument : subCommand.getArguments()) {
                if (argument.getSyntax().startsWith(args[1].toLowerCase())) {
                    completions.add(argument.getSyntax());
                }
            }
        }
        return completions;
    }
}
