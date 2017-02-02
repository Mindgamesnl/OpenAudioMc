package me.mindgamesnl.openaudiomc.groupManager;

import java.util.HashMap;

import org.bukkit.Bukkit;
import org.bukkit.entity.Player;

public class groupManager {
	
	public static HashMap<String, String> playerGroupList = new HashMap<String, String>();
	public static HashMap<String, String> playerGroup = new HashMap<String, String>();
	
	public static void setupGroups() {
		
		playerGroupList.put("placholderGroupName", "false");
	}
	
	
	public static void addGroup(String groupName) {
		playerGroupList.put(groupName, "true");
	}
	
	
	public static void removeGroup(String groupName) {
		playerGroupList.put(groupName, "false");
		for (Player p : Bukkit.getOnlinePlayers()) {
			if (me.mindgamesnl.openaudiomc.groupManager.groupManager.getPlayerGroup(p.getName()).equalsIgnoreCase(groupName)) {
				playerGroup.put(p.getName(), "SUPERLANGESTRINGDIENIEMANDOOITZALTYPENDUSIKKANDEZEWELGEBRUIKENALSDEFAULTVALUEHEDIKKEDOEIDOEI");
			}
        }
	}
	
	
	public static void addPlayerToGroup(String playerName, String groupName) {
		if (playerGroupList.get(groupName) != null || playerGroupList.get(groupName) != "false") {
			playerGroup.put(playerName, groupName);
		}
	}
	
	public static void leavePlayerGroup(String playerName) {
		if (playerGroup.get(playerName) != null) {
			if (playerGroupList.get(playerGroup.get(playerName)) != null || playerGroupList.get(playerGroup.get(playerName)) != "false") {
				playerGroup.put(playerName, "SUPERLANGESTRINGDIENIEMANDOOITZALTYPENDUSIKKANDEZEWELGEBRUIKENALSDEFAULTVALUEHEDIKKEDOEIDOEI");
			}
			
		} else {
		}
	}
	
	
	public static String getPlayerGroup(String player) {
		if (playerGroup.get(player) != null) {
			if (playerGroupList.get(playerGroup.get(player)) != null || playerGroupList.get(playerGroup.get(player)) == "true") {
				if (playerGroup.get(player) != "SUPERLANGESTRINGDIENIEMANDOOITZALTYPENDUSIKKANDEZEWELGEBRUIKENALSDEFAULTVALUEHEDIKKEDOEIDOEI") {
					return playerGroup.get(player);
				} else {
					return "SUPERLANGESTRINGDIENIEMANDOOITZALTYPENDUSIKKANDEZEWELGEBRUIKENALSDEFAULTVALUEHEDIKKEDOEIDOEI";
				}
			}
			return "SUPERLANGESTRINGDIENIEMANDOOITZALTYPENDUSIKKANDEZEWELGEBRUIKENALSDEFAULTVALUEHEDIKKEDOEIDOEI";
		} else {
			return "SUPERLANGESTRINGDIENIEMANDOOITZALTYPENDUSIKKANDEZEWELGEBRUIKENALSDEFAULTVALUEHEDIKKEDOEIDOEI";
		}
	}
	
}
