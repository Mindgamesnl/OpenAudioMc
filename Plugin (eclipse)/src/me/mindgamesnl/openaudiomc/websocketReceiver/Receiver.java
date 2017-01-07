package me.mindgamesnl.openaudiomc.websocketReceiver;

import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.java_websocket.WebSocket;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sk89q.worldguard.bukkit.WGBukkit;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;

import me.mindgamesnl.openaudiomc.websocket.WsSender;
import me.mindgamesnl.openaudiomc.websocket.WsSessionMan;
import me.mindgamesnl.openaudiomc.main.Main;
import me.mindgamesnl.openaudiomc.sessionKeyManager.*;

public class Receiver {
	
	public static boolean Decode(WebSocket conn, String message) {
		
		
		
		  JsonObject jsonObject = new JsonParser().parse(message).getAsJsonObject();
	        
	      if (jsonObject.get("command").getAsString().equalsIgnoreCase("connect")) {
	    	  WsSessionMan.getSessionManager().addSessionUsername(conn.getRemoteSocketAddress().getAddress().getHostAddress(), jsonObject.get("user").getAsString());
	    	  Player player=Bukkit.getPlayer(jsonObject.get("user").getAsString());
	    	  
	    	  
	    	  if (Main.getPL().getConfig().getBoolean("config.enableSessions") == true) {
		    	  if (skm.isSessionCorrect(player.getName(), jsonObject.get("sessionkey").getAsString()) == true) {
		    		  //key is correct
		    		  //start
			    	  player.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Chat_Header_audio + me.mindgamesnl.openaudiomc.main.config.Config.Connected_message);
			    	  WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(jsonObject.get("user").getAsString()), "{\"command\":\"verbonden\",\"line\":\"play\"}");
			    	  if (me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("config.startsound").equalsIgnoreCase("none") || me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("config.startsound").equalsIgnoreCase("off")) {
			    	  } else {
			    		  WsSender.Send_Ws_Packet_To_Client(player, "{\"command\":\"play\",\"line\":\"play\",\"src\":\"" + me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("config.startsound") + "\"}");
			    	  }

			    	  if (Main.getPL().getConfig().getBoolean("config.enableMotd") == true) {
			    		  WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(jsonObject.get("user").getAsString()), "{\"command\":\"setmotd\",\"line\":\"play\",\"src\":\"" + Bukkit.getServer().getMotd() + "\"}");
			    	  }
			    	  
			    	  if (me.mindgamesnl.openaudiomc.main.config.Config.sream_live == true) {
			    		  WsSender.Send_Ws_Packet_To_Client(player, "{\"command\":\"startlive\",\"line\":\"loop\",\"src\":\"" + me.mindgamesnl.openaudiomc.main.config.Config.stream_source + "\"}");
			    	  }
			            
			    	  if (me.mindgamesnl.openaudiomc.detectors.checkDependencies.dependenciesComplete == true) {
			    		  for(ProtectedRegion r : WGBukkit.getRegionManager(player.getWorld()).getApplicableRegions(player.getLocation())) {				
			    			  if (me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getBoolean("region.isvalid." + r.getId()) == true) {
			    				  WsSender.Send_Ws_Packet_To_Client(player, "{\"command\":\"play\",\"line\":\"region\",\"src\":\"" + me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("region.src." + r.getId()) + "\"}");
			    			  }
			    		  }
			    	  }
			    	  return true;
		    	  } else {
		    		 return false;
		    	  }
	    	  } else {  
		    	  player.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Chat_Header_audio + me.mindgamesnl.openaudiomc.main.config.Config.Connected_message);
		    	  WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(jsonObject.get("user").getAsString()), "{\"command\":\"verbonden\",\"line\":\"play\"}");
		    	  if (me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("config.startsound").equalsIgnoreCase("none") || me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("config.startsound").equalsIgnoreCase("off")) {
		    	  } else {
		    		  WsSender.Send_Ws_Packet_To_Client(player, "{\"command\":\"play\",\"line\":\"play\",\"src\":\"" + me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("config.startsound") + "\"}");
		    	  }
		    	  
		    	  if (Main.getPL().getConfig().getBoolean("config.enableMotd") == true) {
		    		  WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(jsonObject.get("user").getAsString()), "{\"command\":\"setmotd\",\"line\":\"play\",\"src\":\"" + Bukkit.getServer().getMotd() + "\"}");
		    	  }
		    	  
		    	  if (me.mindgamesnl.openaudiomc.main.config.Config.sream_live == true) {
		    		  WsSender.Send_Ws_Packet_To_Client(player, "{\"command\":\"startlive\",\"line\":\"loop\",\"src\":\"" + me.mindgamesnl.openaudiomc.main.config.Config.stream_source + "\"}");
		    	  }
		            
		    	  if (me.mindgamesnl.openaudiomc.detectors.checkDependencies.dependenciesComplete == true) {
		    		  for(ProtectedRegion r : WGBukkit.getRegionManager(player.getWorld()).getApplicableRegions(player.getLocation())) {				
		    			  if (me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getBoolean("region.isvalid." + r.getId()) == true) {
		    				  WsSender.Send_Ws_Packet_To_Client(player, "{\"command\":\"play\",\"line\":\"region\",\"src\":\"" + me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("region.src." + r.getId()) + "\"}");
		    			  }
		    		  }
		    	  }
		    	  return true;
	    	  }
	      } else {
	    	  return true;
	      }
	}
	
	
}
