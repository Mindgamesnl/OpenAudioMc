package me.mindgamesnl.openaudiomc.websocket;

public class WsSession {
    String host;
    String name;
 
    public WsSession(String host) {
        this.host = host;
    }
 
    public String getHost() {
        return host;
    }
 
    public String getName() {
        return name;
    }
 
    public void setName(String name) {
        this.name = name;
    }
 
    public String toString() {
        return "WebsocketSession.java - Host: " + host + " Name: " + name;
    }
}