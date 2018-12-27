package com.craftmend.openaudiomc.modules.networking;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.modules.networking.enums.PacketType;
import com.craftmend.openaudiomc.modules.networking.handlers.ClientConnectHandler;
import com.craftmend.openaudiomc.modules.networking.handlers.ClientDisconnectHandler;
import com.craftmend.openaudiomc.modules.networking.handlers.PrivateKeyUpdateHandler;
import com.craftmend.openaudiomc.modules.networking.interfaces.IPacketHandler;

import java.util.HashMap;
import java.util.Map;

public class NetworkingModule {

    private Map<PacketType, IPacketHandler> packetHandlerMap = new HashMap<>();

    public NetworkingModule(OpenAudioMc openAudioMc) {
        //register socket handlers
        registerHandler(PacketType.SERVER_UPDATE_PUBLIC_TOKEN, new PrivateKeyUpdateHandler(openAudioMc));
        registerHandler(PacketType.SERVER_CLIENT_WEB_CONNECT, new ClientConnectHandler(openAudioMc));
        registerHandler(PacketType.SERVER_CLIENT_WEB_DISCONNECT, new ClientDisconnectHandler(openAudioMc));
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
