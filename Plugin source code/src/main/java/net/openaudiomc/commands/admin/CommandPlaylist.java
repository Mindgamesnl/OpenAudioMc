package net.openaudiomc.commands.admin;

import net.openaudiomc.actions.Command;
import net.openaudiomc.commands.OpenAudioCommand;
import net.openaudiomc.core.Main;
import net.openaudiomc.files.PlaylistManager;
import net.openaudiomc.utils.Selector;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class CommandPlaylist implements OpenAudioCommand {

    @Override
    public String getSubCommand() {
        return "playlist";
    }

    @Override
    public boolean isPlayerCommand() {
        return false;
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        if (args.length == 4) {
            if (args[0].equalsIgnoreCase("set")) {
                PlaylistManager.set(args[1], args[2], args[3]);
                sender.sendMessage(Main.PREFIX + "Changed the sound of " + args[1] + " in " + args[2] + " to " + args[3]);
            } else {
                sender.sendMessage(Main.PREFIX + "Invalid command, please use /openaudio playlist set <list> <id> <url>");
            }
        } else if (args.length == 3) {
            if (args[0].equalsIgnoreCase("play")) {
                if (PlaylistManager.getAll(args[1]) != null) {
                    for (Player p : Selector.playerSelector(sender, args[2])) {
                        Command.playList(p.getName(), PlaylistManager.getAll(args[1]));
                    }
                    sender.sendMessage(Main.PREFIX + "Started playlist for " + args[2]);
                } else {
                    sender.sendMessage(Main.PREFIX + "Invalid playlist :(");
                }
            } else {
                sender.sendMessage(Main.PREFIX + "Invalid command, please use /openaudio playlist <sub command> [values]");
            }
        } else {
            sender.sendMessage(Main.PREFIX + "Invalid command, please use /openaudio playlist <sub command> [values]");
        }
    }
}
