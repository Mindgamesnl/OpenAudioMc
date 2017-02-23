package net.openaudiomc.commands;

import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;

import net.openaudiomc.actions.command;
import net.openaudiomc.files.Messages;

public class volumeCommand implements CommandExecutor {
	public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
		if (cmd.getName().equalsIgnoreCase("volume")) {
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
				sender.sendMessage(Messages.getColor("volume-error"));
			}
			return true;
		}
		return false; 
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
