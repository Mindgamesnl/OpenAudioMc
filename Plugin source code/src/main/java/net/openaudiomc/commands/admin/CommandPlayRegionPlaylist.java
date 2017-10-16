package net.openaudiomc.commands.admin;

import net.openaudiomc.actions.Command;
import net.openaudiomc.commands.OpenAudioCommand;
import net.openaudiomc.core.Main;
import net.openaudiomc.files.PlaylistManager;
import net.openaudiomc.utils.Selector;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class CommandPlayRegionPlaylist implements OpenAudioCommand {
    @Override
    public String getSubCommand() {
        return "playregionplaylist";
    }

    @Override
    public boolean isPlayerCommand() {
        return false;
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        if (Main.get().isRegionsEnabled()) {
            if (args.length == 2) {
                for (Player p : Selector.playerSelector(sender, "region:" + args[0])) {
                    Command.playList(p.getName(), PlaylistManager.getAll(args[1]));
                }
                sender.sendMessage(Main.PREFIX + "Started a sound for players in region " + args[0]);
            } else {
                sender.sendMessage(Main.PREFIX + "Invalid command, please use /openaudio playregionplaylist <region name> <playlist name>");
            }
        } else {
            sender.sendMessage(Main.PREFIX + "Whoops, you don't have worldguard installed!");
        }
    }
}
