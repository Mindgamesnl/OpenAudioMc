package net.openaudiomc.socket;

import org.bukkit.Bukkit;
import org.bukkit.OfflinePlayer;
import org.bukkit.entity.Player;
import org.json.JSONObject;

import io.socket.client.Socket;
import net.openaudiomc.socket.Main;

public class Emitter {
	
	public static void EmitToPlayer(String player, String message) {
		if (player.equalsIgnoreCase("@a")) {
			for(Player p : Bukkit.getServer().getOnlinePlayers()) {
				JSONObject obj = new JSONObject();
				obj.put("target", p.getName());
				obj.put("commandobj", message);
				((Socket) Main.socket).emit("send", obj.toString());
			}
		} else {
			@SuppressWarnings("deprecation")
			OfflinePlayer p = Bukkit.getOfflinePlayer(player);
    		if (p.isOnline()) {
    			JSONObject obj = new JSONObject();
    			obj.put("target", player);
    			obj.put("commandobj", message);
    			((Socket) Main.socket).emit("send", obj.toString());
    		}	
		}
		Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.WebsocketSendEvent(Bukkit.getPlayer(player), message));
	}
	
	public static void KickPlayerConnection(String name) {
		((Socket) Main.socket).emit("kick", name);		
	}
	
	public static void offlineInServer(String name) {
		JSONObject obj = new JSONObject();
		obj.put("target", name);
		obj.put("commandobj", "not_in_server");
		((Socket) Main.socket).emit("send", obj.toString());	
	}
	
	public static void connectedInServer(String name) {
		JSONObject obj = new JSONObject();
		obj.put("target", name);
		obj.put("commandobj", "connectionSuccess");
		((Socket) Main.socket).emit("send", obj.toString());	
	}

}
