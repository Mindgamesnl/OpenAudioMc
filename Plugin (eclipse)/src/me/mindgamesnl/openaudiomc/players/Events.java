package me.mindgamesnl.openaudiomc.players;

import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.event.player.PlayerQuitEvent;

import com.sk89q.worldguard.bukkit.WGBukkit;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;

import me.mindgamesnl.openaudiomc.main.Main;
import me.mindgamesnl.openaudiomc.websocket.WsSender;

public class Events implements Listener{
	
	    public static Main plugin;
	    public void MyBlockListener(Main instance){plugin = instance;}
	    
	
	@EventHandler
	  public void onPlayerJoin(PlayerJoinEvent event) {
		
		  Player p = event.getPlayer();
		  Player player = event.getPlayer();
		  
		  me.mindgamesnl.openaudiomc.websocket.WsSender.Send_Ws_Packet_To_Client(p, "{\"command\":\"connect\"}");
		  WsSender.Send_Ws_Packet_To_Client(p, "{\"command\":\"stopregion\"}");
    	  if (me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("config.startsound").equalsIgnoreCase("none") || me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("config.startsound").equalsIgnoreCase("off")) {
    	  } else {
    		  WsSender.Send_Ws_Packet_To_Client(player, "{\"command\":\"play\",\"line\":\"play\",\"src\":\"" + me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("config.startsound") + "\"}");
    	  }
         
    	  if (me.mindgamesnl.openaudiomc.main.config.Config.sream_live == true) {
    		  WsSender.Send_Ws_Packet_To_Client(player, "{\"command\":\"startlive\",\"line\":\"loop\",\"src\":\"" + me.mindgamesnl.openaudiomc.main.config.Config.stream_source + "\"}");
    	  }
            
    	  
    	  if (Main.getPL().getConfig().getBoolean("config.enableMotd") == true) {
    		  WsSender.Send_Ws_Packet_To_Client(player, "{\"command\":\"setmotd\",\"line\":\"play\",\"src\":\"" + Bukkit.getServer().getMotd() + "\"}");
    	  }
    	  
    	  
    	  if (me.mindgamesnl.openaudiomc.detectors.checkDependencies.dependenciesComplete == true) {
    		  for(ProtectedRegion r : WGBukkit.getRegionManager(player.getWorld()).getApplicableRegions(player.getLocation())) {				
    			  if (me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getBoolean("region.isvalid." + r.getId()) == true) {
    				  WsSender.Send_Ws_Packet_To_Client(player, "{\"command\":\"play\",\"line\":\"region\",\"src\":\"" + me.mindgamesnl.openaudiomc.regions.regionManager.getRegionFile(r.getId()) + "\"}");
    			  }
    		  }
    	  }
	    }
	
	
	  @EventHandler
	  public void onPlayerQuit(PlayerQuitEvent event) {
		  Player p = event.getPlayer();
	    	me.mindgamesnl.openaudiomc.websocket.WsSender.Send_Ws_Packet_To_Client_offline(p.getName(), "{\"command\":\"disconnect\"}");
	    }
}
