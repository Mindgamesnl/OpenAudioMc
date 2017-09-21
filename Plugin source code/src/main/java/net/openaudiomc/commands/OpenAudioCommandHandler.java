package net.openaudiomc.commands;

import net.openaudiomc.core.Main;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.util.ArrayList;

public class OpenAudioCommandHandler implements CommandExecutor {

    private ArrayList<OpenAudioCommand> subCommands = new ArrayList<>();

    public void registerCommand(OpenAudioCommand command) {
        subCommands.add(command);
    }

    @Override
    public boolean onCommand(CommandSender sender, Command cmd, String string, String[] args) {
        if(args.length > 0) {
            String[] subArgs = new String[args.length - 1];
            System.arraycopy(args, 1, subArgs, 0, args.length - 1);
            for (OpenAudioCommand command : subCommands) {
                if(args[0].equalsIgnoreCase(command.getSubCommand())) {
                    if(sender.hasPermission("openaudio.command." + command.getSubCommand()) || sender.hasPermission("openaudio.*")) {
                        if(command.isPlayerCommand()) {
                            if(sender instanceof Player) {
                                command.execute(sender, subArgs);
                            } else {
                                sender.sendMessage(Main.PREFIX + "This command can only be used as a player!");
                            }
                        } else {
                            command.execute(sender, subArgs);
                        }
                    } else {
                        sender.sendMessage(Main.PREFIX + "You don't have the permission to execute this command!");
                    }
                    return false;
                }
            }
            sender.sendMessage(Main.PREFIX + "Subcommand " + args[0] + " does not exists! See /openaudio help for all commands");
        } else {
            sender.sendMessage(Main.PREFIX + "OpenAudio made with <3 by Mindgamesnl and the contributors. (you can use '/openaudio help' for help :P) need more help? Contact me!");
        }
        return false;
    }
}
