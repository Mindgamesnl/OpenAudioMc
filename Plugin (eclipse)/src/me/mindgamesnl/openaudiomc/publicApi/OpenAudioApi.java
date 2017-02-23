<<<<<<< HEAD
package me.mindgamesnl.openaudiomc.publicApi;

import org.bukkit.entity.Player;

import net.openaudiomc.actions.command;
import net.openaudiomc.regions.regionCrap;
import net.openaudiomc.socket.SocketListener;

public class OpenAudioApi {
	
	public static void playSound(Player p, String source) {
		command.playNormalSound(p.getName(), source);
	}
	
	public static void stopSound(Player p) {
		command.stop(p.getName());
	}
	
	public static void sendMessage(Player p, String message) {
		command.sendMessage(p.getName(), message);
	}
	
	public static void switchServer(Player p, String newhost) {
		//for backwards compatibilety
	}
	
	public static void setHue(Player p, String rgba) {
		command.hueSet(p.getName(), rgba);
	}
	
	public static void kickPlayer(Player p) {
		//for backwards compatibilety
	}
	
	public static void setBg(Player p, String bg) {
		command.setBg(p.getName(), bg);
	}
	
	public static void setVolume(Player p, Integer volume) {	
		if (volume > 100 || volume < -1) {
		} else {
			String vol = volume.toString();
			command.setVolume(p.getName(), vol);
		}
	}
	
	public static Boolean isConnected(Player p) {
		return SocketListener.isConnected(p.getName());
	}
	
	public static String getRegionSound(String region) {
		return regionCrap.getRegionFile(region);
	}
	
	public static String getSessionKey(Player p) {
		//for backwards compatibilety
		return null;
	}
	
	public static String getHost(Player p) {
		//for backwards compatibilety
		return null;
	}
	
	public static void playRegion(String region_name, String sourcefile) {
		command.playRegion(region_name, sourcefile);
	}
	
	public static void playLoop(Player p, String src) {
		command.playLoop(p.getName(), src);
	}
	
=======
package me.mindgamesnl.openaudiomc.publicApi;

import org.bukkit.Bukkit;
import org.bukkit.entity.Player;

import com.sk89q.worldguard.bukkit.WGBukkit;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;

import me.mindgamesnl.openaudiomc.sessionKeyManager.skm;
import me.mindgamesnl.openaudiomc.websocket.WsSender;

import me.mindgamesnl.openaudiomc.regions.regionManager;

import me.mindgamesnl.openaudiomc.websocket.OamSessions;

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
	
	public static void setHue(Player p, String rgba) {
		WsSender.sendSmartJson(p.getName(), "{\"command\":\"hue\",\"atribute\":\"set\",\"target\":\"" + rgba + "\"}");
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
	
	public static Boolean isConnected(Player p) {
		return OamSessions.isConnected(p.getName());
	}
	
	public static String getRegionSound(String region) {
		return regionManager.getRegionFile(region);
	}
	
	public static String getSessionKey(Player p) {
		return skm.getSession(p.getName());
	}
	
	public static String getHost(Player p) {
		return OamSessions.getSessionByName(p.getName());
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
	
>>>>>>> origin/master
}