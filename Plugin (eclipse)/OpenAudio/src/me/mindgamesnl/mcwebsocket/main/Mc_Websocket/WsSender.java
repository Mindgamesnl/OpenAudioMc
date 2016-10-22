package me.mindgamesnl.mcwebsocket.main.Mc_Websocket;

import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
 
public class WsSender {
    public static void Send_Ws_Packet_To_Client(Player p, String data) {
        if (WsSessionMan.getSessionManager().getSessionByName(p.getName()) != null) {
            WsMain.s.sendData(WsSessionMan.getSessionManager().getSessionByName(p.getName()), data);
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