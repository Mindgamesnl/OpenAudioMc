package me.mindgamesnl.openaudiomc.publicApi;

import org.bukkit.Bukkit;
import org.bukkit.entity.Player;

import com.sk89q.worldguard.bukkit.WGBukkit;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;

import me.mindgamesnl.openaudiomc.sessionKeyManager.skm;
import me.mindgamesnl.openaudiomc.websocket.WsSender;

public class OpenAudioApi {
	
	public static void playSound(Player p, String source) {
		WsSender.Send_Ws_Packet_To_Client(p, "{\"command\":\"play\",\"line\":\"play\",\"src\":\"" + source + "\"}");
	}
	
	public static void stopSound(Player p) {
		WsSender.Send_Ws_Packet_To_Client(p, "{\"command\":\"stop\"}");
	}
	
	public static void sendMessage(Player p, String message) {
		WsSender.Send_Ws_Packet_To_Client(p, "{\"command\":\"puush_meld\",\"message\":\"" + message + "\"}");
	}
	
	public static void switchServer(Player p, String newhost) {
		WsSender.Send_Ws_Packet_To_Client(p, "{\"command\":\"reconnect\",\"line\":\"loop\",\"code\":\"" + newhost + "\"}");
	}
	
	public static void kickPlayer(Player p) {
		WsSender.Send_Ws_Packet_To_Client(p, "{\"command\":\"kick\"}");
	}
	
	public static void setBg(Player p, String bg) {
		WsSender.Send_Ws_Packet_To_Client(p, "{\"command\":\"setbg\",\"line\":\"loop\",\"code\":\"" + bg + "\"}");
	}
	
	public static void setVolume(Player p, Integer volume) {	
		if (volume > 100 || volume < -1) {
		} else {
			WsSender.Send_Ws_Packet_To_Client(p, "{\"command\":\"setvolume\",\"target\":\"" + volume + "\"}");
		}
	}
	
	public static String getSessionKey(Player p) {
		return skm.getSession(p.getName());
	}
	
	public static void playRegion(String region_name, String sourcefile) {
		if (me.mindgamesnl.openaudiomc.detectors.checkDependencies.dependenciesComplete == true) {
			for (Player p : Bukkit.getOnlinePlayers()) {
				for(ProtectedRegion r : WGBukkit.getRegionManager(p.getWorld()).getApplicableRegions(p.getLocation())) {
					if (region_name.equalsIgnoreCase(r.getId())) {
						WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(p.getName()), "{\"command\":\"play\",\"line\":\"play\",\"src\":\"" + sourcefile + "\"}");
					}
				}
			}			
		}
	}
	
	
}
