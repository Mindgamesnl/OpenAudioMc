package com.craftmend.openaudiomc.generic.networking.client.objects.plus;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import lombok.Getter;

import java.util.UUID;

@Getter
public class PlusSocketSession implements Authenticatable {

    private final UUID sessionUuid = UUID.randomUUID();
    private final String key = UUID.randomUUID().toString().subSequence(0, 3).toString();
    private ClientConnection owner;
    private boolean isConnected = false;

    public PlusSocketSession(ClientConnection owner) {
        this.owner = owner;
    }

    public void sendPacket(AbstractPacket packet) {
        // only send the packet if the client is online, valid and the plugin is connected
        OpenAudioMc.getInstance().getNetworkingService().send(this, packet);
    }

    @Override
    public boolean isTokenCorrect(String token) {
        return key.equals(token);
    }

    @Override
    public void onConnect() {
        this.isConnected = true;
    }

    @Override
    public void onDisconnect() {
        this.isConnected = false;
    }

    @Override
    public boolean getIsConnected() {
        return this.isConnected;
    }

    @Override
    public UUID getOwnerUUID() {
        return sessionUuid;
    }
}
