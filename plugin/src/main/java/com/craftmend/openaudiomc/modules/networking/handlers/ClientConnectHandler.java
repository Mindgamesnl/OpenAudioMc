package com.craftmend.openaudiomc.modules.networking.handlers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.networking.interfaces.IPacketHandler;
import com.craftmend.openaudiomc.modules.networking.packets.PacketServerConnectClient;

public class ClientConnectHandler implements IPacketHandler<PacketServerConnectClient> {

    public ClientConnectHandler(OpenAudioMc openAudioMc) {
    }

    @Override
    public void on(PacketServerConnectClient packet) {
        //on connect
    }

}
