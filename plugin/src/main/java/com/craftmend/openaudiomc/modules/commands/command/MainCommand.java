package com.craftmend.openaudiomc.modules.commands.command;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.commands.CommandModule;
import com.craftmend.openaudiomc.modules.commands.interfaces.SubCommand;
import lombok.AllArgsConstructor;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.command.TabCompleter;
import org.bukkit.util.StringUtil;

import java.util.Collections;
import java.util.List;

@AllArgsConstructor
public class MainCommand implements CommandExecutor, TabCompleter {

    private OpenAudioMc openAudioMc;
    private CommandModule commandModule;

    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {

        if (args.length == 0) {
            sender.sendMessage(commandModule.getCommandPrefix() + "OpenAudioMc version " + openAudioMc.getDescription().getVersion() + ".");
            return true;
        }

        SubCommand subCommand = commandModule.getSubCommand(args[0].toLowerCase());
        if (subCommand != null) {
            if (subCommand.isAllowed(sender)) {
                String[] subArgs = new String[args.length - 1];
                if (args.length != 1) System.arraycopy(args, 1, subArgs, 0, args.length - 1);
                subCommand.onExecute(sender, subArgs);
                return true;
            } else {
                sender.sendMessage(commandModule.getCommandPrefix() + "You dont have the permissions to do this, sorry!");
                return true;
            }
        } else {
            sender.sendMessage(commandModule.getCommandPrefix() + "Unknown sub command: " + args[0].toLowerCase());
            return true;
        }
    }

    @Override
    public List<String> onTabComplete(CommandSender commandSender, Command command, String s, String[] strings) {
        final List<String> completions = openAudioMc.getCommandModule().getSubCommands();
        StringUtil.copyPartialMatches(strings[0], openAudioMc.getCommandModule().getSubCommands(), completions);
        Collections.sort(completions);
        return completions;
    }
}
