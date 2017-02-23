package net.openaudiomc.players;

import java.util.HashMap;
import java.util.Random;

import net.openaudiomc.socket.Authenticator;

public class Sessions {
	
	static HashMap<String, String> sessions = new HashMap<String, String>();
	
	public static String get(String player) {
		
		char[] chars = "abcdefghijklmnopqrstuvwxyz".toCharArray();
		StringBuilder sb = new StringBuilder();
		Random random = new Random();
		for (int i = 0; i < 5; i++) {
		    char c = chars[random.nextInt(chars.length)];
		    sb.append(c);
		}
		
		String key = sb.toString();
		String clientID = Authenticator.getClientID();
		
		String total = clientID + ":" + key;
		
		sessions.put(player, key);
		
		
		return total;		
	}
	
	public static String getOld(String player) {
		if (sessions.get(player) != null) {
			return sessions.get(player);
		} else {
			return get(player);
		}
	}

}
