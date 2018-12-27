package com.craftmend.openaudiomc.modules.networking;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.modules.networking.enums.PacketType;
import com.craftmend.openaudiomc.modules.networking.handlers.ClientConnectHandler;
import com.craftmend.openaudiomc.modules.networking.handlers.ClientDisconnectHandler;
import com.craftmend.openaudiomc.modules.networking.handlers.SocketKeyUpdateHandler;
import com.craftmend.openaudiomc.modules.networking.interfaces.IPacketHandler;
import com.craftmend.openaudiomc.modules.networking.io.SocketIoConnector;
import org.bukkit.Bukkit;

import java.util.HashMap;
import java.util.Map;

public class NetworkingModule {

    private Map<PacketType, IPacketHandler> packetHandlerMap = new HashMap<>();
    private SocketIoConnector socketIoConnector;

    public NetworkingModule(OpenAudioMc openAudioMc) {
        //register socket handlers
        registerHandler(PacketType.SERVER_UPDATE_TOKENS, new SocketKeyUpdateHandler(openAudioMc));
        registerHandler(PacketType.SERVER_CLIENT_WEB_CONNECT, new ClientConnectHandler(openAudioMc));
        registerHandler(PacketType.SERVER_CLIENT_WEB_DISCONNECT, new ClientDisconnectHandler(openAudioMc));

        try {
            socketIoConnector = new SocketIoConnector(openAudioMc);
        } catch (Exception e) {
            Bukkit.getPluginManager().disablePlugin(openAudioMc);
            System.out.println(OpenAudioMc.getLOG_PREFIX() + "The plugin could not start because of a connection problem when requesting the initial private key. Please contact the developers of this plugin.");
            e.printStackTrace();
        }
    }

    public void triggerPacket(AbstractPacket abstractPacket) {
        if (packetHandlerMap.get(abstractPacket.getPacketType()) == null) {
            System.out.println(OpenAudioMc.getLOG_PREFIX() + "Unknown handler for packet type " + abstractPacket.getClass().getName());
            return;
        }
        packetHandlerMap.get(abstractPacket.getPacketType()).on(abstractPacket);
    }

    private void registerHandler(PacketType type, IPacketHandler handler) {
        packetHandlerMap.put(type, handler);
    }
}
