package me.mindgamesnl.openaudiomc.websocket;

import java.util.HashMap;

public class OamSessions {
	
	 //NAME - HOST
	static HashMap<String, String> sessionTable = new HashMap<String, String>();
	
	//NAME - CONNECTED
	static HashMap<String, Boolean> connectedTable = new HashMap<String, Boolean>();
	
	
	public static void registerSession(String playername, String host) {
		sessionTable.put(host, playername);
		connectedTable.put(host, true);
	}
	
	
	public static void endSession(String host) {
		//sessionTable.put(key, )
	}
	

}
