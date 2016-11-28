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

public class WsMain extends WebSocketServer {
	public static JsonElement conn_us_name;
    public static WsMain s;
   
    public WsMain(int port) throws UnknownHostException {
        super(new InetSocketAddress(port));
    }
 
    public WsMain(InetSocketAddress address) {
        super(address);
    }
 
    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
    	WsSessionMan.getSessionManager().openSession(conn.getRemoteSocketAddress().getAddress().getHostAddress());
    }
 
    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        WsSessionMan.getSessionManager().endSession(conn.getRemoteSocketAddress().getAddress().getHostAddress());
    }
 
    @Override
    public void onMessage(WebSocket conn, String message) {
    	me.mindgamesnl.openaudiomc.websocketReceiver.Receiver.Decode(conn, message);
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