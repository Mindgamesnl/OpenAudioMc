package net.openaudiomc.actions;

import java.util.HashMap;

import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;

import me.mindgamesnl.openaudiomc.publicApi.WebConnectEvent;
import me.mindgamesnl.openaudiomc.publicApi.WebDisconnectEvent;
import net.openaudiomc.minecraft.Main;

public class spy {
	public static HashMap<Player, Boolean> spyMap = new HashMap<Player, Boolean>();
	
	public static void Toggle(Player sender) {
		if (spyMap.get(sender) != null) {
			if (spyMap.get(sender)) {
				//is on
				spyMap.put(sender, false);
				sender.sendMessage(Main.prefix + "Connection spy is " + ChatColor.RED + "Disabled");
			} else {
				//is off
				spyMap.put(sender, true);
				sender.sendMessage(Main.prefix + "Connection spy is " + ChatColor.GREEN + "Enabled");
			}
		} else {
			spyMap.put(sender, true);
			sender.sendMessage(Main.prefix + "Connection spy is " + ChatColor.GREEN + "Enabled");
		}
	}
	
	@EventHandler
    public void onWebDisconnectEvent(WebDisconnectEvent event) {
		String connector = event.getPlayer().getName();
		for (Player p : Bukkit.getOnlinePlayers()) {
			if (spyMap.get(p) != null) {
				if (spyMap.get(p)) {
					p.sendMessage("" + ChatColor.AQUA + "[" + ChatColor.DARK_RED + "-" + ChatColor.AQUA + "]" + ChatColor.YELLOW + ChatColor.ITALIC + " " +  connector + ChatColor.GRAY + ChatColor.ITALIC + " disconnected from openaudio.");
				}
			}
		}
	}
	
	@EventHandler
    public void onWebConnectEvent(WebConnectEvent event) {
		String user = event.getPlayer().getName();
		for (Player p : Bukkit.getOnlinePlayers()) {
			if (spyMap.get(p) != null) {
				if (spyMap.get(p)) {
					p.sendMessage("" + ChatColor.AQUA + "[" + ChatColor.GREEN + "+" + ChatColor.AQUA + "]" + ChatColor.YELLOW + ChatColor.ITALIC + " " +  user + ChatColor.GRAY + ChatColor.ITALIC + " connected to openaudio.");
				}
			}
		}
	}

}