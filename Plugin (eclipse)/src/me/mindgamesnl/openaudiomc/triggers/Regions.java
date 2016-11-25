package me.mindgamesnl.openaudiomc.triggers;

import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;

import com.mewin.WGRegionEvents.events.RegionEnterEvent;
import com.mewin.WGRegionEvents.events.RegionLeaveEvent;

import me.mindgamesnl.openaudiomc.websocket.WsSender;

public class Regions implements Listener{
	@EventHandler
	public void onRegionEnter(RegionEnterEvent e) {
		
		if (me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getBoolean("region.isvalid." + e.getRegion().getId()) == true) {
			 WsSender.Send_Ws_Packet_To_Client(e.getPlayer(), "{\"command\":\"play\",\"line\":\"region\",\"src\":\"" + me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("region.src." + e.getRegion().getId()) + "\"}");
		}
		

	}
	

	@EventHandler
	public void onRegionLeave(RegionLeaveEvent e)
	{
		
		if (me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("region.isvalid." + e.getRegion().getId()).equals("true")) {
			WsSender.Send_Ws_Packet_To_Client(e.getPlayer(), "{\"command\":\"stopregion\"}");
		}
	  
	}

}
