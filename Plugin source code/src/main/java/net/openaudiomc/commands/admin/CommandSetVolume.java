package net.openaudiomc.commands.admin;

import net.openaudiomc.actions.Command;
import net.openaudiomc.commands.OpenAudioCommand;
import net.openaudiomc.core.Main;
import net.openaudiomc.utils.Selector;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class CommandSetVolume implements OpenAudioCommand {

    @Override
    public String getSubCommand() {
        return "setvolume";
    }

    @Override
    public boolean isPlayerCommand() {
        return false;
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        if (args.length >= 2) {
            if (args.length == 3) {
                for (Player p : Selector.playerSelector(sender, args[0])) {
                    Command.setVolumeID(p.getName(), args[1], args[2]);
                }
                sender.sendMessage(Main.PREFIX + "Volume for sound with id:" + args[2] + " for:" + args[0] + " is now set.");
            } else {
                for (Player p : Selector.playerSelector(sender, args[0])) {
                    Command.setVolume(p.getName(), args[1]);
                }
                sender.sendMessage(Main.PREFIX + "volume of " + args[0] + " is now set to " + args[1]);
            }
        } else {
            sender.sendMessage(Main.PREFIX + "Invalid command, please use /openaudio setvolume <mc name> <volume>");
        }
    }
}
