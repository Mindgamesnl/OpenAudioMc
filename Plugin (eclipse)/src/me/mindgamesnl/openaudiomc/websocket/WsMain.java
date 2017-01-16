package me.mindgamesnl.openaudiomc.websocket;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.util.Collection;
import java.util.HashMap;

import com.google.gson.JsonElement;

import org.java_websocket.WebSocket;
import org.java_websocket.WebSocketImpl;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

public class WsMain extends WebSocketServer {
	public static JsonElement conn_us_name;
    public static WsMain s;
   
    static HashMap<String, Boolean> onlineLogger = new HashMap<String, Boolean>();
    
    public WsMain(int port) throws UnknownHostException {
        super(new InetSocketAddress(port));
    }
 
    public WsMain(InetSocketAddress address) {
        super(address);
    }
    
    public static Boolean isOnline(String name) {
    	if (onlineLogger.get(me.mindgamesnl.openaudiomc.websocket.WsSessionMan.getSessionByName2(name)) != null) {
    		if (onlineLogger.get(me.mindgamesnl.openaudiomc.websocket.WsSessionMan.getSessionByName2(name)) == true) {
    			//session has not been closed
    			return true;
    		} else {
    			//session has been closed
    			return false;
    		}
    	} else {
    		//never connected
    		return false;
    	}
    }
 
    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
    	WsSessionMan.getSessionManager().openSession(conn.getRemoteSocketAddress().getAddress().getHostAddress());
    	onlineLogger.put(conn.getRemoteSocketAddress().getAddress().getHostAddress(), true);
    }
 
    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        WsSessionMan.getSessionManager().endSession(conn.getRemoteSocketAddress().getAddress().getHostAddress());
        onlineLogger.put(conn.getRemoteSocketAddress().getAddress().getHostAddress(), false);
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
  		    System.err.println("IndexOutOfBoundsException: " + e.getMessage());
  		    System.out.println("OpenAudio detected a fake user login, blocked possible attack");
  		}
    	
    }
 
    public static void runServer() throws InterruptedException, IOException {
        WebSocketImpl.DEBUG = false;
        int port = Integer.parseInt(me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("config.ws_host_port"));
        s = new WsMain(port);
        s.start();
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
 
    public void sendData(WsSession session, String data) {
        Collection<WebSocket> con = connections();
        synchronized (con) {
            for (WebSocket c : con) {
                if (c.getRemoteSocketAddress().getAddress().getHostAddress().equalsIgnoreCase(session.getHost())) {
                    c.send(data);
                }
            }
        }
    }
}