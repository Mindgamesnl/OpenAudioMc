package me.mindgamesnl.openaudiomc.players;

import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.event.player.PlayerQuitEvent;

import me.mindgamesnl.openaudiomc.main.Main;

public class Events implements Listener{
	
	    public static Main plugin;
	    public void MyBlockListener(Main instance){plugin = instance;}
	    
	
	@EventHandler
	  public void onPlayerJoin(PlayerJoinEvent event) {
		  Player p = event.getPlayer();
		  me.mindgamesnl.openaudiomc.websocket.WsSender.Send_Ws_Packet_To_Client(p, "{\"command\":\"connect\"}");
	    }
	  @EventHandler
	  public void onPlayerQuit(PlayerQuitEvent event) {
		  Player p = event.getPlayer();
	    	me.mindgamesnl.openaudiomc.websocket.WsSender.Send_Ws_Packet_To_Client_offline(p.getName(), "{\"command\":\"disconnect\"}");
	    }
}
