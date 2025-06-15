package com.craftmend.openaudiomc.bungee.utils;

import lombok.SneakyThrows;
import net.md_5.bungee.ServerConnection;
import net.md_5.bungee.UserConnection;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import net.md_5.bungee.netty.ChannelWrapper;
import net.md_5.bungee.protocol.MinecraftDecoder;
import net.md_5.bungee.protocol.MinecraftEncoder;

import java.lang.reflect.Method;

public class BungeeUtils {

    public static boolean BUNGEE_SUPPORTS_CONFIG_PHASE = serverSupportsConfigurationPhase();

    private static final Method conChannelGetter;
    private static final Method conChannelHandleGetter;
    private static final Method serverConnectionChannelGetter;
    private static final Method serverConnectionChannelHandleGetter;
    private static final Method channelPipelineGetter;
    private static final Method channelPipelineGetEncoder;

    static {
        try {
            conChannelGetter = UserConnection.class.getDeclaredMethod("getCh");
            conChannelGetter.setAccessible(true);

            conChannelHandleGetter = ChannelWrapper.class.getDeclaredMethod("getHandle");
            conChannelHandleGetter.setAccessible(true);

            serverConnectionChannelGetter = ServerConnection.class.getDeclaredMethod("getCh");
            serverConnectionChannelGetter.setAccessible(true);

            serverConnectionChannelHandleGetter = ChannelWrapper.class.getDeclaredMethod("getHandle");
            serverConnectionChannelHandleGetter.setAccessible(true);

            // obfuscate netty package so maven relocation doesn't break during vistas compilation
            StringBuilder nettyPackage = new StringBuilder();
            nettyPackage.append("io");
            nettyPackage.append(".");
            nettyPackage.append("netty");
            nettyPackage.append(".");
            nettyPackage.append("channel.");
            String nettyPackageString = nettyPackage.toString();

            Class<?> channelClass = Class.forName(nettyPackageString + "Channel");
            channelPipelineGetter = channelClass.getDeclaredMethod("pipeline");
            channelPipelineGetter.setAccessible(true);

            Class<?> pipelineClass = Class.forName(nettyPackageString + "ChannelPipeline");
            channelPipelineGetEncoder = pipelineClass.getDeclaredMethod("get", Class.class);
            channelPipelineGetEncoder.setAccessible(true);

            // check if nothing is null as a sanity check
            if (conChannelGetter == null || conChannelHandleGetter == null || serverConnectionChannelGetter == null || serverConnectionChannelHandleGetter == null || channelPipelineGetter == null || channelPipelineGetEncoder == null) {
                throw new RuntimeException("A fatal exception occurred while preparing reflection for bungeecord.");
            } else {
                System.out.println("[OpenAudioMc] BungeeCord reflection was successfully prepared with targeted class: " + channelClass.getName() + " and " + pipelineClass.getName() + ".");
            }
        } catch (Exception e) {
            throw new RuntimeException("A fatal exception occurred while preparing reflection for bungeecord.", e);
        }
    }

    public static boolean doesUserHaveConfigPhase(ProxiedPlayer player) {
        UserConnection connection = (UserConnection) player;
        // check if protocol is 764 or higher
        return connection.getPendingConnection().getVersion() >= 764;
    }

    @SneakyThrows
    public static boolean areEncodersReady(ProxiedPlayer player) {
        if (!BUNGEE_SUPPORTS_CONFIG_PHASE) return true;

        UserConnection connection = (UserConnection) player;

        if (connection.getServer() == null) return false;

        ServerConnection serverConnection = connection.getServer();

        Object userChannelWrapper = conChannelGetter.invoke(connection);
        Object userChannelHandle = conChannelHandleGetter.invoke(userChannelWrapper);
        Object userChannelPipeline = channelPipelineGetter.invoke(userChannelHandle);

        Object serverChannelWrapper = serverConnectionChannelGetter.invoke(serverConnection);
        Object serverChannelHandle = serverConnectionChannelHandleGetter.invoke(serverChannelWrapper);
        Object serverChannelPipeline = channelPipelineGetter.invoke(serverChannelHandle);

        // check if the channel is ready for both the player and server
        return channelPipelineGetEncoder.invoke(userChannelPipeline, MinecraftDecoder.class) != null
                && channelPipelineGetEncoder.invoke(userChannelPipeline, MinecraftEncoder.class) != null
                && channelPipelineGetEncoder.invoke(serverChannelPipeline, MinecraftDecoder.class) != null
                && channelPipelineGetEncoder.invoke(serverChannelPipeline, MinecraftEncoder.class) != null;
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
