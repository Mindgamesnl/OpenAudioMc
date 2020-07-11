package com.craftmend.openaudiomc.generic.networking.client.objects.plus;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.core.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.PlayerSession;
import com.craftmend.openaudiomc.generic.networking.enums.MediaError;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import lombok.Getter;

import java.util.UUID;

@Getter
public class PlusSocketSession implements Authenticatable {

    private final UUID sessionUuid = UUID.randomUUID();
    private final String key = UUID.randomUUID().toString().subSequence(0, 3).toString();
    private transient ClientConnection owner;
    private transient boolean isConnected = false;

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
        OpenAudioLogger.toConsole(owner.getPlayer().getName() + " opened a real time OpenAudioMc+ session.");
    }

    @Override
    public void onDisconnect() {
        this.isConnected = false;
        OpenAudioLogger.toConsole(owner.getPlayer().getName() + " closed a real time OpenAudioMc+ session.");
    }

    @Override
    public boolean getIsConnected() {
        return this.isConnected;
    }

    @Override
    public String getOwnerName() {
        throw new UnsupportedOperationException("Im not a player");
    }

    @Override
    public UUID getOwnerUUID() {
        // to mock a connection, pretend that it is its own owner
        return sessionUuid;
    }

    @Override
    public PlayerSession getSessionTokens() {
        throw new UnsupportedOperationException("Im not a player");
    }

    @Override
    public void handleError(MediaError error, String source) {
        throw new UnsupportedOperationException("Plus sockets don't play media");
    }
}
