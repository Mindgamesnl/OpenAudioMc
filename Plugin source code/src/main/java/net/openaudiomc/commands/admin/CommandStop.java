package net.openaudiomc.commands.admin;

import net.openaudiomc.actions.Command;
import net.openaudiomc.commands.OpenAudioCommand;
import net.openaudiomc.core.Main;
import net.openaudiomc.syncedsound.managers.SyncedSoundManager;
import net.openaudiomc.syncedsound.managers.UserManager;
import net.openaudiomc.utils.Selector;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class CommandStop implements OpenAudioCommand {

    @Override
    public String getSubCommand() {
        return "stop";
    }

    @Override
    public boolean isPlayerCommand() {
        return false;
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        if (args.length >= 1) {
            if (args.length == 2) {
                for (Player p : Selector.playerSelector(sender, args[0])) {
                    Command.StopID(p.getName(), args[1]);
                    try {
                        UserManager.getPlayer(Bukkit.getPlayer(p.getName())).removeSyncedSound(SyncedSoundManager.getBySoundId(args[1]).getId());
                    } catch (NullPointerException e) {
                    }
                }
                sender.sendMessage(Main.PREFIX + "Stopped sound id " + args[1] + " of " + args[0]);
            } else {
                for (Player p : Selector.playerSelector(sender, args[0])) {
                    try {
                        UserManager.getPlayer(Bukkit.getPlayer(p.getName())).removeAllSyncedSounds();
                    } catch (NullPointerException e) {
                    }
                    Command.stop(p.getName());
                }
                sender.sendMessage(Main.PREFIX + "Stopped sound of " + args[0]);
            }
        } else {
            sender.sendMessage(Main.PREFIX + "Invalid command, please use /openaudio stop <mc name>");
        }
    }
}
