package com.craftmend.openaudiomc.services.networking;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.services.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.services.networking.handlers.ClientConnectHandler;

import com.craftmend.openaudiomc.services.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.services.networking.abstracts.PayloadHandler;
import com.craftmend.openaudiomc.services.networking.handlers.ClientDisconnectHandler;
import com.craftmend.openaudiomc.services.networking.io.SocketIoConnector;
import com.craftmend.openaudiomc.modules.players.objects.Client;
import org.bukkit.Bukkit;

import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

public class NetworkingService {

    private Map<PacketChannel, PayloadHandler> packetHandlerMap = new HashMap<>();
    private SocketIoConnector socketIoConnector;

    public NetworkingService(OpenAudioMc openAudioMc) {
        //register socket handlers
        registerHandler(PacketChannel.SOCKET_IN_REGISTER_CLIENT, new ClientConnectHandler());
        registerHandler(PacketChannel.SOCKET_IN_UNREGISTER_CLIENT, new ClientDisconnectHandler());

        try {
            socketIoConnector = new SocketIoConnector();
        } catch (Exception e) {
            Bukkit.getPluginManager().disablePlugin(openAudioMc);
            System.out.println(OpenAudioMc.getLOG_PREFIX() + "The plugin could not start because of a connection problem when requesting the initial private key. Please contact the developers of this plugin.");
            e.printStackTrace();
        }
    }

    public void connectIfDown() throws URISyntaxException {
        socketIoConnector.setupConnection();
    }

    public void send(Client client, AbstractPacket packet) {
        socketIoConnector.send(client, packet);
    }

    public void triggerPacket(AbstractPacket abstractPacket) {
        if (packetHandlerMap.get(abstractPacket.getPacketChannel()) == null) {
            System.out.println(OpenAudioMc.getLOG_PREFIX() + "Unknown handler for packet type " + abstractPacket.getClass().getName());
            return;
        }
        packetHandlerMap.get(abstractPacket.getPacketChannel()).trigger(abstractPacket);
    }

    public Boolean isConnected() {
        return socketIoConnector.getIsConnected();
    }

    public Boolean isConnecting() {
        return socketIoConnector.getIsConnecting();
    }

    private void registerHandler(PacketChannel type, PayloadHandler handler) {
        packetHandlerMap.put(type, handler);
    }
}
