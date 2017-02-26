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
	
	public static void sendJson(Player p, String json) {	
		command.sendJSON(p.getName(), json);
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
	
}