package com.craftmend.openaudiomc.modules.networking;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.modules.networking.handlers.ClientConnectHandler;

import com.craftmend.openaudiomc.modules.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.modules.networking.abstracts.PayloadHandler;
import com.craftmend.openaudiomc.modules.networking.handlers.ClientDisconnectHandler;
import com.craftmend.openaudiomc.modules.networking.io.SocketIoConnector;
import com.craftmend.openaudiomc.modules.players.objects.Client;
import org.bukkit.Bukkit;

import java.util.HashMap;
import java.util.Map;

public class NetworkingModule {

    private Map<PacketChannel, PayloadHandler> packetHandlerMap = new HashMap<>();
    private SocketIoConnector socketIoConnector;

    public NetworkingModule(OpenAudioMc openAudioMc) {
        //register socket handlers
        registerHandler(PacketChannel.SOCKET_IN_REGISTER_CLIENT, new ClientConnectHandler());
        registerHandler(PacketChannel.SOCKET_IN_UNREGISTER_CLIENT, new ClientDisconnectHandler());

        try {
            socketIoConnector = new SocketIoConnector(openAudioMc);
        } catch (Exception e) {
            Bukkit.getPluginManager().disablePlugin(openAudioMc);
            System.out.println(OpenAudioMc.getLOG_PREFIX() + "The plugin could not start because of a connection problem when requesting the initial private key. Please contact the developers of this plugin.");
            e.printStackTrace();
        }
    }

    public void send(Client client, AbstractPacket packet) {
        if (socketIoConnector.getIsConnected() && client.getIsConnected()) {
            packet.setClient(client.getPlayer().getUniqueId());
            socketIoConnector.getSocket().emit("data", OpenAudioMc.getGson().toJson(packet));
        }
    }

    public void triggerPacket(AbstractPacket abstractPacket) {
        if (packetHandlerMap.get(abstractPacket.getPacketChannel()) == null) {
            System.out.println(OpenAudioMc.getLOG_PREFIX() + "Unknown handler for packet type " + abstractPacket.getClass().getName());
            return;
        }
        packetHandlerMap.get(abstractPacket.getPacketChannel()).trigger(abstractPacket);
    }

    private void registerHandler(PacketChannel type, PayloadHandler handler) {
        packetHandlerMap.put(type, handler);
    }
}
