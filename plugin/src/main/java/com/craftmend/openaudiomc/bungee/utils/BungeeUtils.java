package com.craftmend.openaudiomc.bungee.utils;

import net.md_5.bungee.UserConnection;
import net.md_5.bungee.api.connection.ProxiedPlayer;

public class BungeeUtils {

    public static boolean doesUserHaveConfigPhase(ProxiedPlayer player) {
        UserConnection connection = (UserConnection) player;
        // check if protocol is 764 or higher
        return connection.getPendingConnection().getVersion() >= 764;
    }

    public static boolean serverSupportsConfigurationPhase() {
        // check if the class net.md_5.bungee.protocol.packet.StartConfiguration exists
        try {
            Class.forName("net.md_5.bungee.protocol.packet.StartConfiguration");
            return true;
        } catch (ClassNotFoundException e) {
            return false;
        }
    }

}
