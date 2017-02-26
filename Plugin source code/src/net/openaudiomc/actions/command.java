/*
 * 
 */
package net.openaudiomc.actions;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import net.openaudiomc.socket.Emitter;

// TODO: Auto-generated Javadoc
/**
 * The Class command.
 */
public class command {
	
	/**
	 * Play normal sound.
	 *
	 * @param name the name
	 * @param src the src
	 */
	@SuppressWarnings("unchecked")
	public static void playNormalSound(String name, String src) {
		JSONObject obj = new JSONObject();
		obj.put("command", "play_normal");
		obj.put("src", src);
		String command = obj.toString();
		Emitter.EmitToPlayer(name, getCleanURL(command));
	}
	
	/**
	 * Stop.
	 *
	 * @param name the name
	 */
	@SuppressWarnings("unchecked")
	public static void stop(String name) {
		JSONObject obj = new JSONObject();
		obj.put("command", "stop");
		String command = obj.toString();
		Emitter.EmitToPlayer(name, getCleanURL(command));
	}
	
	/**
	 * Sets the volume.
	 *
	 * @param name the name
	 * @param volume the volume
	 */
	@SuppressWarnings("unchecked")
	public static void setVolume(String name, String volume) {
		JSONObject obj = new JSONObject();
		obj.put("command", "ui");
		obj.put("command", "volume");
		obj.put("volume", volume);
		String command = obj.toString();
		Emitter.EmitToPlayer(name, getCleanURL(command));
	}
	
	/**
	 * Play region.
	 *
	 * @param name the name
	 * @param src the src
	 */
	@SuppressWarnings("unchecked")
	public static void playRegion(String name, String src) {
		JSONObject obj = new JSONObject();
		obj.put("type", "region");
		obj.put("command", "startRegion");
		obj.put("src", src);
		String command = obj.toString();
		Emitter.EmitToPlayer(name, getCleanURL(command));
	}
	
	/**
	 * Stop old region.
	 *
	 * @param name the name
	 */
	@SuppressWarnings("unchecked")
	public static void stopOldRegion(String name) {
		JSONObject obj = new JSONObject();
		obj.put("type", "region");
		obj.put("command", "stopOldRegion");
		String command = obj.toString();
		Emitter.EmitToPlayer(name, getCleanURL(command));
	}
	
	/**
	 * Stop region.
	 *
	 * @param name the name
	 */
	@SuppressWarnings("unchecked")
	public static void stopRegion(String name) {
		JSONObject obj = new JSONObject();
		obj.put("type", "region");
		obj.put("command", "stopRegion");
		String command = obj.toString();
		Emitter.EmitToPlayer(name, getCleanURL(command));
	}
	
	/**
	 * Creates the buffer.
	 *
	 * @param name the name
	 * @param src the src
	 */
	@SuppressWarnings("unchecked")
	public static void createBuffer(String name, String src) {
		JSONObject obj = new JSONObject();
		obj.put("type", "buffer");
		obj.put("command", "create");
		obj.put("src", src);
		String command = obj.toString();
		Emitter.EmitToPlayer(name, getCleanURL(command));
	}
	
	/**
	 * Play buffer.
	 *
	 * @param name the name
	 */
	@SuppressWarnings("unchecked")
	public static void playBuffer(String name) {
		JSONObject obj = new JSONObject();
		obj.put("type", "buffer");
		obj.put("command", "play");
		String command = obj.toString();
		Emitter.EmitToPlayer(name, getCleanURL(command));
	}
	
	/**
	 * Send message.
	 *
	 * @param name the name
	 * @param message the message
	 */
	@SuppressWarnings("unchecked")
	public static void sendMessage(String name, String message) {
		JSONObject obj = new JSONObject();
		obj.put("type", "ui");
		obj.put("command", "message");
		obj.put("string", message);
		String command = obj.toString();
		Emitter.EmitToPlayer(name, getCleanURL(command));
	}
	
	@SuppressWarnings("unchecked")
	public static void enableHue(String name) {
		JSONObject obj = new JSONObject();
		obj.put("command", "hue");
		obj.put("type", "init");
		String command = obj.toString();
		Emitter.EmitToPlayer(name, getCleanURL(command));
	}
	
	/**
	 * Hue set.
	 *
	 * @param name the name
	 * @param color the color
	 */
	@SuppressWarnings("unchecked")
	public static void hueSet(String name, String color) {
		JSONObject obj = new JSONObject();
		obj.put("command", "hue");
		obj.put("type", "set");
		obj.put("target", color);
		String command = obj.toString();
		Emitter.EmitToPlayer(name, getCleanURL(command));
	}
	
	/**
	 * Hue reset.
	 *
	 * @param name the name
	 */
	@SuppressWarnings("unchecked")
	public static void hueReset(String name) {
		JSONObject obj = new JSONObject();
		obj.put("command", "hue");
		obj.put("type", "reset");
		String command = obj.toString();
		Emitter.EmitToPlayer(name, getCleanURL(command));
	}
	
	/**
	 * Hue blink.
	 *
	 * @param name the name
	 */
	@SuppressWarnings("unchecked")
	public static void hueBlink(String name) {
		JSONObject obj = new JSONObject();
		obj.put("command", "hue");
		obj.put("type", "blink");
		String command = obj.toString();
		Emitter.EmitToPlayer(name, getCleanURL(command));
	}
	
	/**
	 * Hue cycle.
	 *
	 * @param name the name
	 */
	@SuppressWarnings("unchecked")
	public static void hueCycle(String name) {
		JSONObject obj = new JSONObject();
		obj.put("command", "hue");
		obj.put("type", "cyclecolors");
		String command = obj.toString();
		Emitter.EmitToPlayer(name, getCleanURL(command));
	}
	
	/**
	 * Hue stop effect.
	 *
	 * @param name the name
	 */
	@SuppressWarnings("unchecked")
	public static void hueStopEffect(String name) {
		JSONObject obj = new JSONObject();
		obj.put("command", "hue");
		obj.put("type", "stop");
		String command = obj.toString();
		Emitter.EmitToPlayer(name, getCleanURL(command));
	}
	
	/**
	 * Sets the bg.
	 *
	 * @param name the name
	 * @param target the target
	 */
	@SuppressWarnings("unchecked")
	public static void setBg(String name, String target) {
		JSONObject obj = new JSONObject();
		obj.put("command", "setbg");
		obj.put("type", "set");
		obj.put("target", target);
		String command = obj.toString();
		Emitter.EmitToPlayer(name, getCleanURL(command));
	}
	
	/**
	 * Reset bg.
	 *
	 * @param name the name
	 */
	@SuppressWarnings("unchecked")
	public static void resetBg(String name) {
		JSONObject obj = new JSONObject();
		obj.put("command", "setbg");
		obj.put("type", "reset");
		String command = obj.toString();
		Emitter.EmitToPlayer(name, getCleanURL(command));
	}
	
	@SuppressWarnings("unchecked")
	public static void playLoop(String name, String src) {
		JSONObject obj = new JSONObject();
		obj.put("command", "loop");
		obj.put("src", src);
		String command = obj.toString();
		Emitter.EmitToPlayer(name, getCleanURL(command));
	}
	
	@SuppressWarnings("unchecked")
	public static void sendJSON(String name, String src) {
		JSONObject obj = new JSONObject();
		obj.put("command", "custom");
		obj.put("string", src);
		String command = obj.toString();
		Emitter.EmitToPlayer(name, getCleanURL(command));
	}
	
	@SuppressWarnings("unchecked")
	public static void playList(String name, JSONArray jsonArray) {
		
		//HAHA GET IT? CUZ ITS A PLAY LIST :D
		//AND THE FUNCTION NAME IS PLAY LIST :D
		//NO? ok :(
		
		JSONObject obj = new JSONObject();
		obj.put("command", "playlist");
		obj.put("array", jsonArray);
		String command = obj.toString();
		Emitter.EmitToPlayer(name, getCleanURL(command));
	}
	
	/**
	 * Gets the clean URL.
	 *
	 * @param url the url
	 * @return the clean URL
	 */
	public static String getCleanURL(String url){
        return url.replaceAll("\\\\", "").trim();
    }

}
