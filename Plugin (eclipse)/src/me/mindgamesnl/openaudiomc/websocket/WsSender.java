package me.mindgamesnl.openaudiomc.websocket;

import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import me.mindgamesnl.openaudiomc.websocket.OamSessions;
 
public class WsSender {
    public static void Send_Ws_Packet_To_Client(Player p, String data) {
        if (OamSessions.getSessionByName(p.getName()) != null) {
            WsMain.s.sendData(OamSessions.getSessionByName(p.getName()), data);
            Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.WebsocketSendEvent(p, data));
        }
    }
    
    public static void Send_Ws_Packet_To_Client_offline(String name, String data) {
        if (OamSessions.getSessionByName(name) != null) {
            WsMain.s.sendData(OamSessions.getSessionByName(name), data);
        }
    }
    
    public static void sendSmartJson(String requestplayer, String data) {
    	if (requestplayer.equalsIgnoreCase("@a")) {
			for (Player p : Bukkit.getOnlinePlayers()) {
				Send_Ws_Packet_To_Client(p, data);
			}
		} else {
			Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(requestplayer), data);
		}
    }
}