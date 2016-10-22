package me.mindgamesnl.mcwebsocket.main.Mc_Websocket;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.util.Collection;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import org.bukkit.Bukkit;

import org.bukkit.entity.Player;
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
       // Bukkit.getLogger().info(me.mindgamesnl.mcwebsocket.main.config.Config.Chat_Header + conn.getRemoteSocketAddress().getAddress().getHostName() + " Is nu niet meer verbonden met websocket!");
       }
 
    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        WsSessionMan.getSessionManager().endSession(conn.getRemoteSocketAddress().getAddress().getHostAddress());
     // Bukkit.getLogger().info(me.mindgamesnl.mcwebsocket.main.config.Config.Chat_Header + conn + " Is no longer connected!");
        }
 
    @Override
    public void onMessage(WebSocket conn, String message) {
      //  Bukkit.getLogger().info(me.mindgamesnl.mcwebsocket.main.config.Config.Chat_Header + "Websocket packet ontvangen! - " + conn + ":" + message);
        
        JsonObject jsonObject = new JsonParser().parse(message).getAsJsonObject();


      
        
        
        
        
        if (jsonObject.get("command").getAsString().equalsIgnoreCase("connect")) {
            WsSessionMan.getSessionManager().addSessionUsername(conn.getRemoteSocketAddress().getAddress().getHostAddress(), jsonObject.get("user").getAsString());
            Player player=Bukkit.getPlayer(jsonObject.get("user").getAsString());
            player.sendMessage(me.mindgamesnl.mcwebsocket.main.config.Config.Chat_Header_audio + me.mindgamesnl.mcwebsocket.main.config.Config.Connected_message);
            
       
            WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(jsonObject.get("user").getAsString()), "{\"command\":\"verbonden\",\"line\":\"play\"}");
        } else {}
        
        
        
      
        
        
       
                
    }
 
    public static void runServer() throws InterruptedException, IOException {
        WebSocketImpl.DEBUG = false;
        int port = me.mindgamesnl.mcwebsocket.main.Mc_Websocket.Main.getPL().getConfig().getInt("config.ws_host_port");
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
                    //Bukkit.getLogger().info(config.Config.Chat_Header + "Json verzonden naar client! Json value: " + data);
                	//Bukkit.getLogger().info(me.mindgamesnl.mcwebsocket.main.config.Config.Chat_Header + "Json verzonden naar client! Dat verdient een feestje want de plugin werkt dus optimaal! :-)");
                    c.send(data);
                }
            }
        }
    }
}