package com.craftmend.openaudiomc.generic.networking.client.objects.player;

import com.craftmend.openaudiomc.generic.networking.client.interfaces.PlayerContainer;
import net.md_5.bungee.api.chat.TextComponent;

import java.util.UUID;

public class MockedClientConnection extends ClientConnection {

    private UUID uuid;

    public MockedClientConnection(UUID uuid, String name) {
        super(new PlayerContainer() {
            @Override
            public void sendMessage(String string) {
                // do nothing
            }

            @Override
            public void sendMessage(TextComponent textComponent) {
                // do nothing
            }

            @Override
            public UUID getUniqueId() {
                return uuid;
            }

            @Override
            public String getName() {
                return name;
            }
        });
        this.uuid = uuid;
    }

    @Override
    public boolean isConnected() {
        return true;
    }

}
