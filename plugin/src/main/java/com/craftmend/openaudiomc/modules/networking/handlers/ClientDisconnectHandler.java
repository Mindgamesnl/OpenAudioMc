package com.craftmend.openaudiomc.modules.networking.handlers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.networking.interfaces.IPacketHandler;
import com.craftmend.openaudiomc.modules.networking.packets.PacketServerConnectClient;
import com.craftmend.openaudiomc.modules.networking.packets.PacketServerDisconnectClient;

public class ClientDisconnectHandler implements IPacketHandler<PacketServerDisconnectClient> {

    public ClientDisconnectHandler(OpenAudioMc openAudioMc) {
    }

    @Override
    public void on(PacketServerDisconnectClient packet) {
        //on disconnect
    }

}
