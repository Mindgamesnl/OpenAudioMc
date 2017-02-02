package me.mindgamesnl.openaudiomc.regions;

import java.io.File;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Logger;

import org.bukkit.Bukkit;
import org.bukkit.Server;
import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.generator.ChunkGenerator;
import org.bukkit.plugin.Plugin;
import org.bukkit.plugin.PluginDescriptionFile;
import org.bukkit.plugin.PluginLoader;

import com.avaje.ebean.EbeanServer;
import com.mewin.WGRegionEvents.events.RegionEnterEvent;
import com.mewin.WGRegionEvents.events.RegionLeaveEvent;

import me.mindgamesnl.openaudiomc.websocket.WsSender;

public class regionManager implements Listener, Plugin {
	
	//setup zooi
	private static Plugin PL;
	HashMap<Player, String> regionHistory = new HashMap<Player, String>();
	
	//enable and create local plugin
	public static void enable() {
		PL = me.mindgamesnl.openaudiomc.main.Main.getPL();
	}
	
	
	//region enter event
	@EventHandler
	public void onRegionEnter(RegionEnterEvent e) {
		if (isValidRegion(e.getRegion().getId()) && e.isCancellable() && !e.isCancelled()) {
			regionHistory.put(e.getPlayer(), getRegionFile(e.getRegion().getId()));
			WsSender.Send_Ws_Packet_To_Client(e.getPlayer(), "{\"command\":\"play\",\"line\":\"region\",\"src\":\"" + me.mindgamesnl.openaudiomc.regions.regionManager.getRegionFile(e.getRegion().getId()) + "\"}");
			Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.AudioRegionEnterEvent(e.getRegion().getId(), e.getPlayer(), me.mindgamesnl.openaudiomc.regions.regionManager.getRegionFile(e.getRegion().getId())));
		}
	}


	//region leave event
	@EventHandler
	public void onRegionLeave(final RegionLeaveEvent e) {
	
		if (e.isCancellable() && !e.isCancelled()) {
			Bukkit.getServer().getScheduler().runTaskLater(PL, new Runnable(){
				public void run(){
					if (isValidRegion(e.getRegion().getId()) && e.isCancellable()) {
						if (regionHistory.get(e.getPlayer()) != getRegionFile(e.getRegion().getId())) {		
							WsSender.Send_Ws_Packet_To_Client(e.getPlayer(), "{\"command\":\"stopoldregion\"}");
						} else {
							WsSender.Send_Ws_Packet_To_Client(e.getPlayer(), "{\"command\":\"stopregion\"}");
							Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.AudioRegionLeaveEvent(e.getRegion().getId(), e.getPlayer()));
						}
					}
				}
			},10);
		}
	}
	
	
	//returns file of a region
	public static String getRegionFile(String regionName) {
		if (isValidRegion(regionName) == true) {
			return PL.getConfig().getString("region.src." + regionName);
		} else {
			return "InvalidSource";
		}
	}
	
	
	//check if a region ia know to openaudio (true = valid)
	public static Boolean isValidRegion(String regionName) {
		if (PL.getConfig().getString("region.isvalid." + regionName) !=null && PL.getConfig().getString("region.isvalid." + regionName).equals("true")) {
			return true;
		} else {
			return false;
		}
	}


	@Override
	public List<String> onTabComplete(CommandSender arg0, Command arg1, String arg2, String[] arg3) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public boolean onCommand(CommandSender arg0, Command arg1, String arg2, String[] arg3) {
		// TODO Auto-generated method stub
		return false;
	}


	@Override
	public FileConfiguration getConfig() {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public File getDataFolder() {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public EbeanServer getDatabase() {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public ChunkGenerator getDefaultWorldGenerator(String arg0, String arg1) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public PluginDescriptionFile getDescription() {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public Logger getLogger() {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public PluginLoader getPluginLoader() {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public InputStream getResource(String arg0) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public Server getServer() {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return false;
	}


	@Override
	public boolean isNaggable() {
		// TODO Auto-generated method stub
		return false;
	}


	@Override
	public void onDisable() {
		// TODO Auto-generated method stub
		
	}


	@Override
	public void onEnable() {
		// TODO Auto-generated method stub
		
	}


	@Override
	public void onLoad() {
		// TODO Auto-generated method stub
		
	}


	@Override
	public void reloadConfig() {
		// TODO Auto-generated method stub
		
	}


	@Override
	public void saveConfig() {
		// TODO Auto-generated method stub
		
	}


	@Override
	public void saveDefaultConfig() {
		// TODO Auto-generated method stub
		
	}


	@Override
	public void saveResource(String arg0, boolean arg1) {
		// TODO Auto-generated method stub
		
	}


	@Override
	public void setNaggable(boolean arg0) {
		// TODO Auto-generated method stub
		
	}
}
