package me.mindgamesnl.openaudiomc.websocket;

import java.util.ArrayList;
import java.util.List;
 
public class WsSessionMan {
    private static WsSessionMan sessionManager;
 
    private static List<WsSession> sessions = new ArrayList<WsSession>();
 
    public static WsSessionMan getSessionManager() {
        if (sessionManager == null) {
            sessionManager = new WsSessionMan();
        }
        return sessionManager;
    }
 
    public List<WsSession> getSessions() {
        return sessions;
    }
 
    public void openSession(String host) {
        sessions.add(new WsSession(host));
       // Bukkit.getLogger().info("Opened Websocket session: " + getSessionByHost(host));
    }
 
    public void endSession(String host) {

        sessions.remove(getSessionByHost(host));
    }
 
    public void endSessionByName(String name) {
        sessions.remove(getSessionByName(name));
    }
 
    public WsSession getSessionByHost(String host) {
        for (WsSession s : sessions) {
            if (s.getHost() == host)
                return s;
        }
        return null;
    }
 
    public WsSession getSessionByName(String name) {
        for (int i = 0; i < sessions.size(); i++) {
            //Bukkit.getLogger().info("Session gotten:" + sessions.get(i));
            if (sessions.get(i).getName().equalsIgnoreCase(name))
                return sessions.get(i);
        }
        return null;
    }
 
    
    public static String getSessionFromName(String host) {
        for (int i = 0; i < sessions.size(); i++) {
            if (sessions.get(i).getHost().equalsIgnoreCase(host)) {
            	return sessions.get(i).getName();
            }
        }
		return host;
    }
    
    
    public void addSessionUsername(String host, String name) {
       // Bukkit.getLogger().info("Attemption to update session with data: " + name + " and a host of: " + host);
        for (int i = 0; i < sessions.size(); i++) {
            if (sessions.get(i).getHost().equalsIgnoreCase(host)) {
                sessions.get(i).setName(name);
               // Bukkit.getLogger().info("Updated Websocket session information: " + sessions.get(i));
            }
        }
    }
}