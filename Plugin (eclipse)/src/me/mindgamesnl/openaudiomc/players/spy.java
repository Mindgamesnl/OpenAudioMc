package me.mindgamesnl.openaudiomc.players;

import java.util.HashMap;

import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.entity.Player;

import me.mindgamesnl.openaudiomc.main.config.Config;

public class spy {
	static HashMap<Player, Boolean> spyMap = new HashMap<Player, Boolean>();
	
	public static void Toggle(Player sender) {
		if (spyMap.get(sender) != null) {
			if (spyMap.get(sender)) {
				//is on
				spyMap.put(sender, false);
				sender.sendMessage(Config.Project_Chat_Name_Prefix_Color + " Connection spy is " + ChatColor.RED + "Disabled");
			} else {
				//is off
				spyMap.put(sender, true);
				sender.sendMessage(Config.Project_Chat_Name_Prefix_Color + " Connection spy is " + ChatColor.GREEN + "Enabled");
			}
		} else {
			spyMap.put(sender, true);
			sender.sendMessage(Config.Project_Chat_Name_Prefix_Color + " Connection spy is " + ChatColor.GREEN + "Enabled");
		}
	}
	
	public static void onDisconnect(Player Connector) {
		for (Player p : Bukkit.getOnlinePlayers()) {
			if (spyMap.get(p) != null) {
				if (spyMap.get(p)) {
					p.sendMessage("" + ChatColor.AQUA + "[" + ChatColor.DARK_RED + "-" + ChatColor.AQUA + "]" + ChatColor.YELLOW + ChatColor.ITALIC + " " +  Connector.getName() + ChatColor.GRAY + ChatColor.ITALIC + " disconnected from openaudio.");
				}
			}
		}
	}
	
	public static void onConnect(Player Connector) {
		for (Player p : Bukkit.getOnlinePlayers()) {
			if (spyMap.get(p) != null) {
				if (spyMap.get(p)) {
					p.sendMessage("" + ChatColor.AQUA + "[" + ChatColor.GREEN + "+" + ChatColor.AQUA + "]" + ChatColor.YELLOW + ChatColor.ITALIC + " " +  Connector.getName() + ChatColor.GRAY + ChatColor.ITALIC + " connected to openaudio.");
				}
			}
		}
	}

}