package net.openaudiomc.commands.admin;

import net.openaudiomc.actions.Command;
import net.openaudiomc.commands.OpenAudioCommand;
import net.openaudiomc.core.Main;
import net.openaudiomc.utils.Selector;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class CommandPlayRegion implements OpenAudioCommand {

    @Override
    public String getSubCommand() {
        return "playregion";
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
                    Command.playNormalSound(p.getName(), args[1]);
                }
                sender.sendMessage(Main.PREFIX + "Started a sound for players in region " + args[0]);
            } else {
                sender.sendMessage(Main.PREFIX + "Invalid command, please use /openaudio playregion <region name> <url>");
            }
        } else {
            sender.sendMessage(Main.PREFIX + "Whoops, you don't have worldguard installed!");
        }
    }
}
