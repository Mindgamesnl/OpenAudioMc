package net.openaudiomc.commands;

import me.mindgamesnl.openaudiomc.publicApi.OpenAudioApi;
import org.bukkit.Bukkit;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;

import net.openaudiomc.actions.command;
import net.openaudiomc.files.Messages;
import org.bukkit.entity.Player;
import org.bukkit.event.player.PlayerItemHeldEvent;

import java.util.HashMap;

public class volumeCommand implements CommandExecutor {

	public static HashMap<Player, Boolean> volumebar = new HashMap<Player, Boolean>();

	public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
		if (cmd.getName().equalsIgnoreCase("volume") && OpenAudioApi.isConnected((Player) sender)) {
			if (args.length > 0) {
				if (isInt(args[0])) {
					if (Integer.parseInt(args[0]) > 100 || Integer.parseInt(args[0]) < -1) {
						sender.sendMessage(Messages.getColor("volume-error"));
					} else {
						String bericht = Messages.getColor("volume-set");
						bericht = bericht.replace("%volume%", args[0]);
						sender.sendMessage(bericht);
						command.setVolume(sender.getName(), args[0]);						
					}
				} else {
					sender.sendMessage(Messages.getColor("volume-error"));
				}
			} else {
				if (volumebar.get((Player) sender) == null || !volumebar.get((Player) sender)) {
					sender.sendMessage(Messages.getColor("volume-hotbar-on"));
					volumebar.put((Player) sender, true);
				} else {
					sender.sendMessage(Messages.getColor("volume-hotbar-off"));
					volumebar.put((Player) sender, false);
				}
			}

		} else {
			sender.sendMessage(Messages.getColor("need-connected"));
		}
		return true;
	}

	public static void PlayerItemHeldEvent(PlayerItemHeldEvent event) {

		if (volumebar.get(event.getPlayer()) != null && volumebar.get(event.getPlayer())) {
			Integer slot = event.getNewSlot();
			slot = slot*11;
			String bericht = Messages.getColor("volume-set");
			bericht = bericht.replace("%volume%", slot+"");
			command.forcevolume(event.getPlayer().getName(), slot+"");
			event.getPlayer().sendMessage(bericht);
		}



	}
	
	public static boolean isInt(String s) {
	    try {
	        Integer.parseInt(s);
	    } catch (NumberFormatException nfe) {
	        return false;
	    }
	    return true;
	}
	
}
