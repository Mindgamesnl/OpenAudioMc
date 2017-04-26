package net.openaudiomc.socket;

import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;

import net.openaudiomc.internal.events.SocketConnectEvent;
import net.openaudiomc.internal.events.SocketDisconnectEvent;

import net.openaudiomc.socket.SocketioConnector;

public class timeoutManager implements Listener {
	
	public static Boolean ioconnected = false;
	public static Boolean ioready = false;
	public static Integer onlineplayers = 0;
	
	@EventHandler
    public void onSocketConnected(SocketConnectEvent event) {
		ioconnected = true;
		ioready = true;
    }

    public static void updateCounter() {
		onlineplayers = 0;
		for(Player p : Bukkit.getOnlinePlayers()){
			onlineplayers++;
		}

		if (onlineplayers == 0) {
			if (ioconnected) {
				Bukkit.getLogger().info("[OpenAudio] Closing connection with the socket server.");
				SocketioConnector.close();
			} else {
				Bukkit.getLogger().info("[OpenAudio] Connection with socket server is allready closed, skipping closing thingy.");
			}
		} else {
			try {
				if (!ioconnected) {
					Bukkit.getLogger().info("[OpenAudio] Reconnecting to the openaudiomc socket server.");
					SocketioConnector.connect();
				}
			} catch (Exception e) {
				Bukkit.getLogger().info("[OpenAudio] Failed to connect to the socket.io server, openaudio will not work correctly.");
			}
		}
	}
    
    @EventHandler
    public void onSocketDisconnected(SocketDisconnectEvent event) {
    	ioconnected = false;
    }
}
