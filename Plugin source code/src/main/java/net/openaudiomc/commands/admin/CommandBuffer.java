package net.openaudiomc.commands.admin;

import net.openaudiomc.actions.Command;
import net.openaudiomc.commands.OpenAudioCommand;
import net.openaudiomc.core.Main;
import net.openaudiomc.utils.Selector;
import org.bukkit.command.CommandSender;

public class CommandBuffer implements OpenAudioCommand {

    @Override
    public String getSubCommand() {
        return "buffer";
    }

    @Override
    public boolean isPlayerCommand() {
        return false;
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        if (args.length == 3 || args.length > 3) {
            if (args[0].equalsIgnoreCase("create")) {
                Selector.playerSelector(sender, args[1]).forEach(player -> Command.createBuffer(player.getName(), args[2]));
                sender.sendMessage(Main.PREFIX + "Buffering " + args[2] + " for " + args[1]);
            } else {
                sender.sendMessage(Main.PREFIX + "Invalid command, please use /openaudio buffer <sub command> [values]");
            }
        } else if (args.length == 2) {
            if (args[0].equalsIgnoreCase("play")) {
                Selector.playerSelector(sender, args[1]).forEach(player -> Command.playBuffer(player.getName()));
                sender.sendMessage(Main.PREFIX + "Started buffer for " + args[1]);
            } else {
                sender.sendMessage(Main.PREFIX + "Invalid command, please use /openaudio buffer <sub command> [values]");
            }
        } else {
            sender.sendMessage(Main.PREFIX + "Invalid command, please use /openaudio buffer <sub command> <player> [url]");
        }
    }
}
