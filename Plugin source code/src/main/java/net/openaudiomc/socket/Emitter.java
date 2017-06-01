package net.openaudiomc.socket;

import io.socket.client.Socket;

import org.bukkit.Bukkit;
import org.bukkit.OfflinePlayer;
import org.bukkit.entity.Player;
import org.json.simple.JSONObject;

public class Emitter {
	
	public static void EmitToPlayer(String player, String message) {
		if (TimeoutManager.ioready) {
			try {
				if (player.equalsIgnoreCase("@a")) {
					for(Player p : Bukkit.getServer().getOnlinePlayers()) {
						JSONObject obj = new JSONObject();
						obj.put("target", p.getName());
						obj.put("commandobj", message);
						((Socket) SocketioConnector.socket).emit("send", obj.toString());
					}
				} else {
					OfflinePlayer p = Bukkit.getOfflinePlayer(player);
					if (p.isOnline()) {
						JSONObject obj = new JSONObject();
						obj.put("target", player);
						obj.put("commandobj", message);
						((Socket) SocketioConnector.socket).emit("send", obj.toString());
					}
				}
			} catch(NullPointerException e) {
			}
			Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.WebsocketSendEvent(Bukkit.getPlayer(player), message));
		}

	}
	
	public static void KickPlayerConnection(String name) {
		((Socket) SocketioConnector.socket).emit("kick", name);		
	}
	
	public static void offlineInServer(String name) {
		if (TimeoutManager.ioready) {
			JSONObject obj = new JSONObject();
			obj.put("target", name);
			obj.put("commandobj", "not_in_server");
			((Socket) SocketioConnector.socket).emit("send", obj.toString());
		}
	}
	
	public static void connectedInServer(String name) {
		if (TimeoutManager.ioready) {
			JSONObject obj = new JSONObject();
			obj.put("target", name);
			obj.put("commandobj", "connectionSuccess");

			((Socket) SocketioConnector.socket).emit("send", obj.toString());
		}
	}

}
