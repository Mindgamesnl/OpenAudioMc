package me.mindgamesnl.openaudiomc.sessionKeyManager;

import java.util.HashMap;
import java.util.Random;

public class skm {
	
	
	static HashMap<String, String> sessions = new HashMap<String, String>();
	
	
	public static void generateSessionForPlayer(String player) {
		char[] chars = "abcdefghijklmnopqrstuvwxyz".toCharArray();
		StringBuilder sb = new StringBuilder();
		Random random = new Random();
		for (int i = 0; i < 5; i++) {
		    char c = chars[random.nextInt(chars.length)];
		    sb.append(c);
		}
		sessions.put(player, sb.toString());	
	}
	
	
	public static String getSession(String player) {
		if (sessions.get(player) != null) {
			return sessions.get(player);
		} else {
			generateSessionForPlayer(player);
			return sessions.get(player);
		}
	}
	
	
	public static boolean isSessionCorrect(String player, String requestSession) {
		if (sessions.get(player) != null) {
			if (sessions.get(player).equals(requestSession)) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	
	
	
}
