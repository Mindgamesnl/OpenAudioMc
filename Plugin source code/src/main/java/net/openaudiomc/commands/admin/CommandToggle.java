package net.openaudiomc.commands.admin;

import net.openaudiomc.actions.Command;
import net.openaudiomc.commands.OpenAudioCommand;
import net.openaudiomc.core.Main;
import net.openaudiomc.utils.Selector;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class CommandToggle implements OpenAudioCommand {

    @Override
    public String getSubCommand() {
        return "toggle";
    }

    @Override
    public boolean isPlayerCommand() {
        return false;
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        if (args.length == 2) {
            for (Player p : Selector.playerSelector(sender, args[0])) {
                Command.ToggleID(p.getName(), args[1]);
            }
            sender.sendMessage(Main.PREFIX + "Toggled sound for " + args[0]);
        } else {
            sender.sendMessage(Main.PREFIX + "Invalid command, please use /openaudio toggle <mc name> <id>");
        }
    }
}
