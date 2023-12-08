package com.craftmend.openaudiomc.bungee.utils;

import io.netty.channel.Channel;
import net.md_5.bungee.ServerConnection;
import net.md_5.bungee.UserConnection;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import net.md_5.bungee.protocol.MinecraftDecoder;
import net.md_5.bungee.protocol.MinecraftEncoder;

public class BungeeUtils {

    public static boolean BUNGEE_SUPPORTS_CONFIG_PHASE = serverSupportsConfigurationPhase();

    public static boolean doesUserHaveConfigPhase(ProxiedPlayer player) {
        UserConnection connection = (UserConnection) player;
        // check if protocol is 764 or higher
        return connection.getPendingConnection().getVersion() >= 764;
    }

    public static boolean areEncodersReady(ProxiedPlayer player) {
        if (!BUNGEE_SUPPORTS_CONFIG_PHASE) return true;

        UserConnection connection = (UserConnection) player;

        if (connection.getServer() == null) return false;

        ServerConnection serverConnection = connection.getServer();

        Channel userChannel = connection.getCh().getHandle();
        Channel serverChannel = serverConnection.getCh().getHandle();

        // check if the channel is ready for both the player and server
        return userChannel.pipeline().get(MinecraftDecoder.class) != null
                && userChannel.pipeline().get(MinecraftEncoder.class) != null
                && serverChannel.pipeline().get(MinecraftDecoder.class) != null
                && serverChannel.pipeline().get(MinecraftEncoder.class) != null;
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
