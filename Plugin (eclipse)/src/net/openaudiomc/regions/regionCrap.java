package net.openaudiomc.regions;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;

import org.bukkit.Bukkit;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.plugin.Plugin;

import com.mewin.WGRegionEvents.events.RegionEnterEvent;
import com.mewin.WGRegionEvents.events.RegionLeaveEvent;
import com.sk89q.worldguard.bukkit.WGBukkit;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;

import net.openaudiomc.actions.command;
import net.openaudiomc.minecraft.Main;

public class regionCrap implements Listener {
	
	//setup zooi
	private static Plugin PL;
	HashMap<Player, String> regionHistory = new HashMap<Player, String>();
	
	//enable and create local plugin
	public static void enable() {
		PL = Main.getPL();
	}
	
	
	//region enter event
	@EventHandler
	public void onRegionEnter(RegionEnterEvent e) {
		if (isValidRegion(e.getRegion().getId()) && e.isCancellable() && !e.isCancelled()) {
			regionHistory.put(e.getPlayer(), getRegionFile(e.getRegion().getId()));
			command.playRegion(e.getPlayer().getName(), getRegionFile(e.getRegion().getId()));
			Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.AudioRegionEnterEvent(e.getRegion().getId(), e.getPlayer(), getRegionFile(e.getRegion().getId())));
		}
	}


	//region leave event
	@EventHandler
	public void onRegionLeave(final RegionLeaveEvent e) {
	
		if (e.isCancellable() && !e.isCancelled()) {
			Bukkit.getServer().getScheduler().runTaskLater(PL, new Runnable(){
				public void run(){
					
					String regionNu = "-";
					for(ProtectedRegion r : WGBukkit.getRegionManager(e.getPlayer().getWorld()).getApplicableRegions(e.getPlayer().getLocation())) {
						regionNu = r.getId();
		            }
					if (isValidRegion(e.getRegion().getId()) && e.isCancellable()) {
						if (regionHistory.get(e.getPlayer()) != getRegionFile(regionNu)) {	
							if (regionNu == "-") {
								command.stopRegion(e.getPlayer().getName());
								Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.AudioRegionLeaveEvent(e.getRegion().getId(), e.getPlayer()));
							} else {
								command.stopOldRegion(e.getPlayer().getName());
								Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.AudioRegionLeaveEvent(e.getRegion().getId(), e.getPlayer()));
							}
						} else {
							command.stopRegion(e.getPlayer().getName());
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
			return file.getString("region.src." + regionName);
		} else {
			return "InvalidSource";
		}
	}
	
	
	//check if a region ia know to openaudio (true = valid)
	public static Boolean isValidRegion(String regionName) {
		if (file.getString("region.isvalid." + regionName) !=null && file.getString("region.isvalid." + regionName).equals("true")) {
			return true;
		} else {
			return false;
		}
	}
	
	public static void registerRegion(String regionName, String src) {
		FileConfiguration cfg = YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio", "regions.yml"));
		File regionsFile = new File("plugins/OpenAudio", "regions.yml");
		cfg.set("region.isvalid."+regionName, "true");
		cfg.set("region.src."+regionName, src);
		try {
			cfg.save(regionsFile);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	public static void deleteRegion(String regionName) {
		FileConfiguration cfg = YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio", "regions.yml"));
		File regionsFile = new File("plugins/OpenAudio", "regions.yml");
		cfg.set("region.isvalid."+regionName, "false");
		cfg.set("region.src."+regionName, "<deleted>");
		try {
			cfg.save(regionsFile);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}


}
