package net.openaudiomc.commands.admin;

import net.openaudiomc.actions.Command;
import net.openaudiomc.commands.OpenAudioCommand;
import net.openaudiomc.core.Main;
import net.openaudiomc.speakersystem.managers.AudioSpeakerManager;
import net.openaudiomc.syncedsound.managers.UserManager;
import net.openaudiomc.utils.Selector;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;

public class CommandStopAll implements OpenAudioCommand {

    @Override
    public String getSubCommand() {
        return "stopall";
    }

    @Override
    public boolean isPlayerCommand() {
        return false;
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        if (args.length == 1) {
            Selector.playerSelector(sender, args[0]).forEach(player -> {
                Command.stop(player.getName());
                Command.stopAllRegions(player.getName());
                Command.hueStopEffect(player.getName());
                AudioSpeakerManager.get().stopForPlayer(player.getName());
                UserManager.getPlayer(Bukkit.getPlayer(player.getName())).removeAllSyncedSounds();
            });
        } else {
            sender.sendMessage(Main.PREFIX + "Invalid usage, please use /openaudio stopall <player>");
        }
    }
}
