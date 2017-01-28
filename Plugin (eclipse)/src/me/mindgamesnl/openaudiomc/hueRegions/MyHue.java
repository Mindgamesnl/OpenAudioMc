package me.mindgamesnl.openaudiomc.hueRegions;

import java.util.HashMap;

import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.plugin.Plugin;

import com.mewin.WGRegionEvents.events.RegionEnterEvent;
import com.mewin.WGRegionEvents.events.RegionLeaveEvent;

import me.mindgamesnl.openaudiomc.websocket.WsSender;

public class MyHue implements Listener {
	
	//setup zooi
	private static Plugin PL;
	HashMap<Player, String> hueRegionHistory = new HashMap<Player, String>();
	
	//enable and create local plugin
	public static void enable() {
		PL = me.mindgamesnl.openaudiomc.main.Main.getPL();
		PL.getConfig().set("hueRegion.isvalid.openaudio_placeholder", "true");
   		PL.getConfig().set("hueRegion.hue.openaudio_placeholder", "Don't remove me!");
	    PL.getConfig().options().copyDefaults(true);
	    PL.saveConfig();
	}
	
	
	public static void addHueRegion(String name, String hue) {
		PL.getConfig().set("hueRegion.isvalid." + name, true);
   		PL.getConfig().set("hueRegion.hue." + name, hue);
	    PL.saveConfig();
	}
	
	
	public static void removeHueRegion(String name) {
		PL.getConfig().set("hueRegion.isvalid." + name, false);
   		PL.getConfig().set("hueRegion.hue." + name, "rgba(255,255,255,255)");
	    PL.saveConfig();
	}
	
	
	//hueRegion enter event
	@EventHandler
	public void onhueRegionEnter(RegionEnterEvent e) {
		if (isValidhueRegion(e.getRegion().getId()) && e.isCancellable()) {
			hueRegionHistory.put(e.getPlayer(), gethueRegionFile(e.getRegion().getId()));
			String targetRGBA = gethueRegionFile(e.getRegion().getId());
			WsSender.sendSmartJson(e.getPlayer().getName(), "{\"command\":\"hue\",\"atribute\":\"set\",\"target\":\"" + targetRGBA + "\"}");
		}
	}
	

	//hueRegion leave event
	@EventHandler
	public void onhueRegionLeave(final RegionLeaveEvent e) {
		if (e.isCancellable()) {
			Bukkit.getServer().getScheduler().runTaskLater(PL, new Runnable(){
				public void run(){
					if (isValidhueRegion(e.getRegion().getId()) && e.isCancellable()) {
						if (hueRegionHistory.get(e.getPlayer()) != gethueRegionFile(e.getRegion().getId())) {		
							String niks = "Nothing";
							WsSender.sendSmartJson(e.getPlayer().getName(), "{\"command\":\"hue\",\"atribute\":\"reset\",\"target\":\"" + niks + "\"}");
						} else {
							String niks = "Nothing";
							WsSender.sendSmartJson(e.getPlayer().getName(), "{\"command\":\"hue\",\"atribute\":\"reset\",\"target\":\"" + niks + "\"}");
						}
					}
				}
			},10);
		}
	}
	
	
	//returns file of a hueRegion
	public static String gethueRegionFile(String hueRegionName) {
		if (isValidhueRegion(hueRegionName) == true) {
			return PL.getConfig().getString("hueRegion.hue." + hueRegionName);
		} else {
			return "InvalidSource";
		}
	}
	
	
	//check if a hueRegion ia know to openaudio (true = valid)
	public static Boolean isValidhueRegion(String hueRegionName) {
		if (PL.getConfig().getString("hueRegion.isvalid." + hueRegionName) !=null && PL.getConfig().getString("hueRegion.isvalid." + hueRegionName).equals("true")) {
			return true;
		} else {
			return false;
		}
	}

}
