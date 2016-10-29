package me.mindgamesnl.mcwebsocket.main.Mc_Websocket;

import java.io.File;
import java.io.IOException;

import org.bukkit.Bukkit;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.plugin.java.JavaPlugin;
import com.mewin.WGRegionEvents.events.RegionEnterEvent;
import com.mewin.WGRegionEvents.events.RegionLeaveEvent;




public class Main extends JavaPlugin implements Listener{
	
	public static Main pl;
	public static Main getPL(){
		return pl;
	}
		

	//Start zooi 
	@Override
	public void onEnable(){
		
		File configFile = new File(this.getDataFolder(), "config.yml");
		 if (configFile.exists()) {
			 Bukkit.broadcastMessage("[OpenAudio] Config found!");
			
			 if (this.getConfig().getString("config.startsound") == null) {
				 Bukkit.broadcastMessage("[OpenAudio] Old config file found! installing update...");
				 this.getConfig().set("config.startsound", "http://static.craftmend.com/spigot/openaudio/load_sound.mp3");
				 this.getConfig().options().copyDefaults(true);
				 this.saveConfig();
			 } else {
			 }
			 
			 
		 } else {
			 Bukkit.broadcastMessage("[OpenAudio] No config found! lets make one shall we?");
			 loadConfiguration();
		 }

		 
		 

		 
		 
		 

		 
		 
		 
		 
		 Bukkit.getLogger().info("[OpenAudio] Loading OpenAudioMc by Mindgamesnl/Me_is_mattyh");
		
		pl = this;
		this.getCommand("openaudio").setExecutor(new me.mindgamesnl.mcwebsocket.main.mc.mc.Commands());
		this.getCommand("audio").setExecutor(new me.mindgamesnl.mcwebsocket.main.mc.mc.Commands());
		this.getCommand("volume").setExecutor(new me.mindgamesnl.mcwebsocket.main.mc.mc.Commands());
		getServer().getPluginManager().registerEvents(this, this);
		try {
			WsMain.runServer();
		} catch (InterruptedException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		me.mindgamesnl.mcwebsocket.main.config.Config.Load();
	}	
	
	
	
	//Sluit zooi
	@Override
	public void onDisable(){
		
	}
	

	
	

	
	
	@EventHandler
	public void onRegionEnter(RegionEnterEvent e) {
		
		if (getConfig().getBoolean("region.isvalid." + e.getRegion().getId()) == true) {
			 WsSender.Send_Ws_Packet_To_Client(e.getPlayer(), "{\"command\":\"play\",\"line\":\"region\",\"src\":\"" + getConfig().getString("region.src." + e.getRegion().getId()) + "\"}");
		}
		

	}
	

	@EventHandler
	public void onRegionLeave(RegionLeaveEvent e)
	{
		
		if (getConfig().getString("region.isvalid." + e.getRegion().getId()).equals("true") && e.isCancellable()) {
			WsSender.Send_Ws_Packet_To_Client(e.getPlayer(), "{\"command\":\"stopregion\"}");
		}
	  
	}

	
	
	


	
	
	
	
	public void loadConfiguration(){
   		this.getConfig().set("config.ws_host_port", 1185);
   		this.getConfig().set("config.webhost", "&6<url to webserver>/index.php?user=%username%");
   		this.getConfig().set("config.startsound", "http://static.craftmend.com/spigot/openaudio/load_sound.mp3");
	    this.getConfig().set("chat.name.admin", "&3[&6OpenAudio-Admin&3]&7");
	    this.getConfig().set("chat.name.normal", "&3[&6OpenAudio&3]&7 ");
	    this.getConfig().set("chat.message.volume_set", "&6Volume set to&b %vol &6%");
	    this.getConfig().set("chat.message.connected", "&bYou are now &2Connected&b to OpenAudio!");
	    this.getConfig().set("chat.message.connect", "&6Ya boi, ya want sound? click here! %client%");
	    this.getConfig().set("chat.message.volume_error", "&4Nope, only numeric characters are accepted!");
	    
   		this.getConfig().set("region.isvalid.openaudio_placeholder", "true");
   		this.getConfig().set("region.src.openaudio_placeholder", "Don't remove me!");
   		
	    this.getConfig().options().copyDefaults(true);
	    this.saveConfig();
	}
	
	

	
	
}