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
	static HashMap<Player, String> regionHistory = new HashMap<Player, String>();
	
	//enable and create local plugin
	public static void enable() {
		PL = Main.getPL();
	}
	
	
	//region enter event
	@EventHandler
	public void onRegionEnter(final RegionEnterEvent e) {
		if (e.isCancellable() && !e.isCancelled()) {
			if (e.getRegion().getParent() != null) {
				if (e.getRegion().getParent().getPriority() > e.getRegion().getPriority() || e.getRegion().getParent().getPriority() == e.getRegion().getPriority()) {
					//parent is more important
					prosessEnter(e.getRegion().getParent(), e.getPlayer(), e);
				} else {
					//child is more important
					prosessEnter(e.getRegion(), e.getPlayer(), e);
				}
			} else {
				//no parent region
				prosessEnter(e.getRegion(), e.getPlayer(), e);
			}
		}
	}
	
	
	static void prosessEnter(final ProtectedRegion protectedRegion, final Player player, final RegionEnterEvent e) {
		if (getRegionWorld(protectedRegion.getId()) != "<none>") {
			if (player.getLocation().getWorld().getName() == getRegionWorld(protectedRegion.getId())) {
				if (isValidRegion(protectedRegion.getId())) {
					regionHistory.put(player, getRegionFile(protectedRegion.getId()));
					command.playRegion(e.getPlayer().getName(), getRegionFile(protectedRegion.getId()));
					Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.AudioRegionEnterEvent(protectedRegion.getId(), e.getPlayer(), getRegionFile(protectedRegion.getId())));
				}
			}
		} else {
			if (isValidRegion(protectedRegion.getId())) {
				regionHistory.put(player, getRegionFile(protectedRegion.getId()));
				command.playRegion(e.getPlayer().getName(), getRegionFile(protectedRegion.getId()));
				Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.AudioRegionEnterEvent(protectedRegion.getId(), e.getPlayer(), getRegionFile(protectedRegion.getId())));
			}
		}
	}


	//region leave event
	@EventHandler
	public void onRegionLeave(final RegionLeaveEvent e) {
		if (e.isCancellable() && !e.isCancelled()) {
			if (e.getRegion().getParent() != null) {
				if (e.getRegion().getParent().getPriority() > e.getRegion().getPriority() || e.getRegion().getParent().getPriority() == e.getRegion().getPriority()) {
					//parant region has higher priorety
					prosessExit(e.getRegion().getParent(), e.getPlayer(), e);
				} else {
					//parant region has lower priorety
					prosessExit(e.getRegion(), e.getPlayer(), e);
				}
			} else {
				//no parant region
				prosessExit(e.getRegion(), e.getPlayer(), e);
			}
		}	
	}
	
	static void prosessExit(final ProtectedRegion protectedRegion, final Player player, final RegionLeaveEvent e) {
		Bukkit.getServer().getScheduler().runTaskLater(PL, new Runnable(){
			public void run(){
				
				String regionNu = "-";
				for(ProtectedRegion r : WGBukkit.getRegionManager(player.getWorld()).getApplicableRegions(player.getLocation())) {
					regionNu = r.getId();
	            }
				if (isValidRegion(protectedRegion.getId()) && e.isCancellable()) {
					if (regionHistory.get(player) != getRegionFile(regionNu)) {	
						if (regionNu == "-") {
							if (getRegionWorld(protectedRegion.getId()) != "<none>") {
								if (player.getLocation().getWorld().getName() == getRegionWorld(protectedRegion.getId())) {
									command.stopRegion(player.getName());
									Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.AudioRegionLeaveEvent(protectedRegion.getId(), player));
								}
							} else {
								command.stopRegion(player.getName());
								Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.AudioRegionLeaveEvent(protectedRegion.getId(), player));
							}
						} else {
							if (getRegionWorld(protectedRegion.getId()) != "<none>") {
								if (player.getLocation().getWorld().getName() == getRegionWorld(protectedRegion.getId())) {
									command.stopOldRegion(player.getName());
									Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.AudioRegionLeaveEvent(protectedRegion.getId(), player));
								}
							} else {
								command.stopOldRegion(player.getName());
								Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.AudioRegionLeaveEvent(protectedRegion.getId(), player));
							}
						}
					} else {
						if (getRegionWorld(protectedRegion.getId()) != "<none>") {
							if (player.getLocation().getWorld().getName() == getRegionWorld(protectedRegion.getId())) {
								command.stopRegion(player.getName());
								Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.AudioRegionLeaveEvent(protectedRegion.getId(), player));
							}
						} else {
							command.stopRegion(player.getName());
							Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.AudioRegionLeaveEvent(protectedRegion.getId(), player));
						}
					}
				}
			}
		},10);
	}
	
	
	//returns file of a region
	public static String getRegionFile(String regionName) {
		if (isValidRegion(regionName) == true) {
			return file.getString("region.src." + regionName);
		} else {
			return "InvalidSource";
		}
	}
	

	public static String getRegionWorld(String regionName) {
		if (file.getString("world." + regionName) !=null && file.getString("region.isvalid." + regionName).equals("true")) {
			return file.getString("world." + regionName);
		} else {
			return "<none>";
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
	
	public static void registerRegion(String regionName, String src, Player p) {
		FileConfiguration cfg = YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio", "regions.yml"));
		File regionsFile = new File("plugins/OpenAudio", "regions.yml");
		cfg.set("region.isvalid."+regionName, "true");
		cfg.set("region.src."+regionName, src);
		cfg.set("world."+regionName, p.getLocation().getWorld().getName());
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
