package net.openaudiomc.commands.admin;

import net.openaudiomc.actions.Command;
import net.openaudiomc.commands.OpenAudioCommand;
import net.openaudiomc.core.Main;
import net.openaudiomc.utils.Selector;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class CommandSkipTo implements OpenAudioCommand {

    @Override
    public String getSubCommand() {
        return "skipto";
    }

    @Override
    public boolean isPlayerCommand() {
        return false;
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        if (args.length == 3) {
            sender.sendMessage(Main.PREFIX + "Skipped " + args[1] + " to " + args[2] + "seconds for " + args[0]);
            for (Player p : Selector.playerSelector(sender, args[0])) {
                Command.skipTo(p.getName(), args[1], args[2]);
            }
        } else {
            sender.sendMessage(Main.PREFIX + "Invalid command, please use /openaudio skipto <mc name> <id> <time in seconds>");
        }
    }
}
