package net.openaudiomc.commands.admin;

import net.openaudiomc.actions.Command;
import net.openaudiomc.commands.OpenAudioCommand;
import net.openaudiomc.core.Main;
import net.openaudiomc.syncedsound.managers.SyncedSoundManager;
import net.openaudiomc.utils.Selector;
import org.bukkit.ChatColor;
import org.bukkit.command.CommandSender;

public class CommandPlay implements OpenAudioCommand {

    @Override
    public String getSubCommand() {
        return "player";
    }

    @Override
    public boolean isPlayerCommand() {
        return false;
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        if (args.length >= 2) {
            if (args.length > 2) {
                if (args.length > 3) {
                    if (args[3].equalsIgnoreCase("sync")) {
                        try {
                            Selector.playerSelector(sender, args[0]).forEach(player -> SyncedSoundManager.create(args[1], args[2], player.getName()));
                            sender.sendMessage(Main.PREFIX + "Started synced sound for: " + args[0]);
                        } catch (NullPointerException e) {
                            sender.sendMessage(Main.PREFIX + "User is not connected!");
                        }
                    } else {
                        sender.sendMessage(Main.PREFIX + "Possible modes: " + ChatColor.RESET + "sync");
                    }
                } else {
                    Selector.playerSelector(sender, args[0]).forEach(player -> Command.playNormalSoundID(player.getName(), args[1], args[2]));
                    sender.sendMessage(Main.PREFIX + "Started a sound for " + args[0]);
                }
            } else {
                Selector.playerSelector(sender, args[0]).forEach(player -> Command.playNormalSound(player.getName(), args[1]));
                sender.sendMessage(Main.PREFIX + "Started a sound for " + args[0]);
            }
        } else {
            sender.sendMessage(Main.PREFIX + "Invalid command, please use /openaudio play <mc name> <url> [ID]");
        }
    }
}
