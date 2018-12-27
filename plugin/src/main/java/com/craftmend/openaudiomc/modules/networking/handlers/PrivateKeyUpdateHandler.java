package com.craftmend.openaudiomc.modules.networking.handlers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.authentication.objects.Key;
import com.craftmend.openaudiomc.modules.networking.interfaces.IPacketHandler;
import com.craftmend.openaudiomc.modules.networking.packets.PacketServerUpdatePublicKey;

public class PrivateKeyUpdateHandler implements IPacketHandler<PacketServerUpdatePublicKey> {

    public PrivateKeyUpdateHandler(OpenAudioMc openAudioMc) {
    }

    @Override
    public void on(PacketServerUpdatePublicKey packet) {
        OpenAudioMc.getInstance().getAuthenticationModule().getServerKeySet().setPublicKey(new Key(packet.getKey()));
    }

}
