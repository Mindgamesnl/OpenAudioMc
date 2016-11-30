package me.mindgamesnl.openaudiomc.regions;

import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.plugin.Plugin;

import com.mewin.WGRegionEvents.events.RegionEnterEvent;
import com.mewin.WGRegionEvents.events.RegionLeaveEvent;

import me.mindgamesnl.openaudiomc.websocket.WsSender;

public class regionManager implements Listener {
	
	//setup zooi
	private static Plugin PL;
	
	
	//enable and create local plugin
	public static void enable() {
		PL = me.mindgamesnl.openaudiomc.main.Main.getPL();
	}
	
	
	//region enter event
	@EventHandler
	public void onRegionEnter(RegionEnterEvent e) {
		if (isValidRegion(e.getRegion().getId())) {
			 WsSender.Send_Ws_Packet_To_Client(e.getPlayer(), "{\"command\":\"play\",\"line\":\"region\",\"src\":\"" + me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("region.src." + e.getRegion().getId()) + "\"}");
		}
	}
	

	//region leave event
	@EventHandler
	public void onRegionLeave(RegionLeaveEvent e) {
		if (isValidRegion(e.getRegion().getId())) {
			WsSender.Send_Ws_Packet_To_Client(e.getPlayer(), "{\"command\":\"stopregion\"}");
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
		if (PL.getConfig().getString("region.isvalid." + regionName).equals("true")) {
			return true;
		} else {
			return false;
		}
	}
}
