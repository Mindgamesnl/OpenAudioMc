package net.openaudiomc.commands.admin;

import net.openaudiomc.actions.Command;
import net.openaudiomc.commands.OpenAudioCommand;
import net.openaudiomc.core.Main;
import net.openaudiomc.utils.Selector;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class CommandLoop implements OpenAudioCommand {

    @Override
    public String getSubCommand() {
        return "loop";
    }

    @Override
    public boolean isPlayerCommand() {
        return false;
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        if (args.length >= 2) {
            if (args.length > 3) {
                if (args[2].equalsIgnoreCase("stop")) {
                    Selector.playerSelector(sender, args[0]).forEach(player -> {
                        Command.stop(player.getName());
                        Command.playLoop(player.getName(), args[1]);
                    });
                    sender.sendMessage(Main.PREFIX + "Started a loop for " + args[0]);
                } else {
                    sender.sendMessage(Main.PREFIX + "Invalid command, please use /openaudio loop <mc name> <url>");
                }
            } else {
                for (Player p : Selector.playerSelector(sender, args[0])) {
                    Command.playLoop(p.getName(), args[1]);
                }
                sender.sendMessage(Main.PREFIX + "Started a loop for " + args[0]);
            }
        } else {
            sender.sendMessage(Main.PREFIX + "Invalid command, please use /openaudio loop <mc name> <url>");
        }
    }
}
