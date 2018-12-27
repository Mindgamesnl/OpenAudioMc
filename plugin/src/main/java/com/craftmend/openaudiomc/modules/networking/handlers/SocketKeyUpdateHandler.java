package com.craftmend.openaudiomc.modules.networking.handlers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.authentication.objects.Key;
import com.craftmend.openaudiomc.modules.networking.interfaces.IPacketHandler;
import com.craftmend.openaudiomc.modules.networking.packets.PacketServerUpdateKeys;

public class SocketKeyUpdateHandler implements IPacketHandler<PacketServerUpdateKeys> {

    public SocketKeyUpdateHandler(OpenAudioMc openAudioMc) {
    }

    @Override
    public void on(PacketServerUpdateKeys packet) {
        OpenAudioMc.getInstance().getAuthenticationModule().getServerKeySet().setPublicKey(new Key(packet.getPublicKey()));
        OpenAudioMc.getInstance().getAuthenticationModule().getServerKeySet().setPrivateKey(new Key(packet.getPrivateKey()));
    }

}
