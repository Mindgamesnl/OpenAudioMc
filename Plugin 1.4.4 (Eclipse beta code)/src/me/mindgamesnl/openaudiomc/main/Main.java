package me.mindgamesnl.openaudiomc.main;

import java.io.IOException;

import org.bukkit.Bukkit;
import org.bukkit.event.Listener;
import org.bukkit.plugin.PluginManager;
import org.bukkit.plugin.java.JavaPlugin;

import me.mindgamesnl.openaudiomc.websocket.WsMain;

public class Main extends JavaPlugin implements Listener{
	
	public static Main pl;
	public static Main getPL(){
		return pl;
	}
	
	//Start zooi 
	@Override
	public void onEnable(){
		//config file stuff and setup crap
		me.mindgamesnl.openaudiomc.config.Creator.Setup();
		me.mindgamesnl.openaudiomc.config.configManager.Setup();
		me.mindgamesnl.openaudiomc.config.configManager.Manager();
		me.mindgamesnl.openaudiomc.main.config.Config.Load();
		me.mindgamesnl.openaudiomc.detectors.checkDependencies.runCheck();
		
		
		Bukkit.getLogger().info("[OpenAudio] Loading OpenAudioMc by Mindgamesnl/Me_is_mattyh");
		pl = this;

		
		//start websocket server
		try {WsMain.runServer();} catch (InterruptedException | IOException e) {e.printStackTrace();}
		
		
		//create and register listeners
		this.getCommand("openaudio").setExecutor(new me.mindgamesnl.openaudiomc.main.mc.mc.Commands());
		this.getCommand("audio").setExecutor(new me.mindgamesnl.openaudiomc.main.mc.mc.Commands());
		this.getCommand("volume").setExecutor(new me.mindgamesnl.openaudiomc.main.mc.mc.Commands());
		getServer().getPluginManager().registerEvents(this, this);
		PluginManager pm = Bukkit.getServer().getPluginManager();
        pm.registerEvents(this, this);
        Bukkit.getServer().getPluginManager().registerEvents(new me.mindgamesnl.openaudiomc.players.Events(),this);
        
        
        //check if regions are enabled and if they are enable the region listeners
        if (me.mindgamesnl.openaudiomc.detectors.checkDependencies.dependenciesComplete == true) {
        	me.mindgamesnl.openaudiomc.regions.regionManager.enable();
        	Bukkit.getServer().getPluginManager().registerEvents(new me.mindgamesnl.openaudiomc.regions.regionManager(),this);
        }
        
	}	
	
	
	//Sluit zooi
	@Override
	public void onDisable(){	
	}
}