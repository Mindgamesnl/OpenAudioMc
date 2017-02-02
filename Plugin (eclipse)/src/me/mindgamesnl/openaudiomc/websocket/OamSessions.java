package me.mindgamesnl.openaudiomc.websocket;

import java.util.HashMap;
import java.util.Map.Entry;

import org.bukkit.Bukkit;

import me.mindgamesnl.openaudiomc.players.spy;

public class OamSessions {
	
	 //NAME - HOST
	static HashMap<String, String> sessionTable = new HashMap<String, String>();
	
	//NAME - CONNECTED
	static HashMap<String, Boolean> connectedTable = new HashMap<String, Boolean>();
	
	
	public static void registerSession(String playername, String host) {
		sessionTable.put(playername, host);
		connectedTable.put(playername, true);
	}
	
	
	public static String getSessionByName(String name) {
		
		return sessionTable.get(name);

	}
	
	
	public static Boolean isConnected(String name) {
		if (connectedTable.get(name) != null) {
			if (connectedTable.get(name) != true) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
		
	}
	
	
	public static void removeSession(String host) {
		for(Entry<String, String> entry : sessionTable.entrySet()){
			if (entry.getValue().equalsIgnoreCase(host)) {
				connectedTable.put(entry.getKey(), false);
				Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.WebDisconnectEvent(Bukkit.getPlayerExact(entry.getKey())));
				spy.onDisconnect(Bukkit.getPlayerExact(entry.getKey()));
			}
		}
	}
	

}
