package me.mindgamesnl.openaudiomc.websocket;

import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
 
public class WsSender {
    public static void Send_Ws_Packet_To_Client(Player p, String data) {
        if (WsSessionMan.getSessionManager().getSessionByName(p.getName()) != null) {
            WsMain.s.sendData(WsSessionMan.getSessionManager().getSessionByName(p.getName()), data);
        }
    }
    
    public static void Send_Ws_Packet_To_Client_offline(String name, String data) {
        if (WsSessionMan.getSessionManager().getSessionByName(name) != null) {
            WsMain.s.sendData(WsSessionMan.getSessionManager().getSessionByName(name), data);
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
 
    public static void playToAll(String data) {
        for (Player p : Bukkit.getOnlinePlayers()) {
            if (WsSessionMan.getSessionManager().getSessionByName(p.getName()) != null) {
                WsMain.s.sendData(WsSessionMan.getSessionManager().getSessionByName(p.getName()), data);
            }
        }
    }
}