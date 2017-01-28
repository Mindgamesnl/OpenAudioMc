package me.mindgamesnl.openaudiomc.websocket;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.util.Collection;

import com.google.gson.JsonElement;

import org.java_websocket.WebSocket;
import org.java_websocket.WebSocketImpl;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import me.mindgamesnl.openaudiomc.websocket.OamSessions;

public class WsMain extends WebSocketServer {
	public static JsonElement conn_us_name;
    public static WsMain s;
    public static Object socketserverthing;
   

    public WsMain(int port) throws UnknownHostException {
        super(new InetSocketAddress(port));
    }
 
    public WsMain(InetSocketAddress address) {
        super(address);
    }
    
    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
    }
 
    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        OamSessions.removeSession(conn.getRemoteSocketAddress().getAddress().getHostAddress());
    }

    
    @Override
    public void onMessage(WebSocket conn, String message) {
    	try {
    		if (me.mindgamesnl.openaudiomc.websocketReceiver.Receiver.Decode(conn, message) == true) {
    			//correct and succesfull session
    		} else {
    			//failed to generate session (invalid id/key?)
    			Collection<WebSocket> con = connections();
    	        synchronized (con) {
    	            for (WebSocket c : con) {
    	                if (c.getRemoteSocketAddress().equals(conn.getRemoteSocketAddress())) {
    	                    //NURF THAT F*CKER TO OBLIVION
    	                	c.send("invalidsession");
       	                	//"all the base are belong to us"
    	                    System.out.println("OpenAudio detected a fake user login, blocked possible attack!");
    	                }
    	            }
    	        }
    		}
  		} catch (IndexOutOfBoundsException e) {
  		    System.out.println("OpenAudio detected a fake user login, blocked possible attack");
  		}
    	
    }
 

    

    
    public static void runServer() throws InterruptedException, IOException {
        WebSocketImpl.DEBUG = false;
        int port = Integer.parseInt(me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("config.ws_host_port"));
        s = new WsMain(port);
        s.start();
        socketserverthing = s;
    }
 
    

    
    
    @Override
    public void onError(WebSocket conn, Exception ex) {
        ex.printStackTrace();
        if (conn != null) {
            // some errors like port binding failed may not be assignable to a specific websocket
        }
    }
 
    public void sendToAll(String data) {
        Collection<WebSocket> con = connections();
        synchronized (con) {
            for (WebSocket c : con) {
                c.send(data);
            }
        }
    }
 
    public void sendData(String Host, String data) {
        Collection<WebSocket> con = connections();
        synchronized (con) {
            for (WebSocket c : con) {
                if (c.getRemoteSocketAddress().getAddress().getHostAddress().equalsIgnoreCase(Host)) {
                    c.send(data);
                }
            }
        }
    }
}