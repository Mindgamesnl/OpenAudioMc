package com.craftmend.openaudiomc.generic.networking.client.interfaces;

import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import net.md_5.bungee.api.chat.TextComponent;

import java.util.UUID;

public interface PlayerContainer {

    void sendMessage(String string);
    void sendMessage(TextComponent textComponent);
    boolean isAdministrator();
    UUID getUniqueId();
    String getName();

    default GenericExecutor asExecutor() {
        return new GenericExecutor() {
            @Override
            public void sendMessage(String message) {
                PlayerContainer.this.sendMessage(message);
            }

            @Override
            public boolean hasPermission(String permission) {
                throw new UnsupportedOperationException("This isn't actually a executor");
            }

            @Override
            public void sendMessage(TextComponent message) {
                // do nothing
            }

            @Override
            public UUID getUuid() {
                return PlayerContainer.this.getUniqueId();
            }

            @Override
            public String getName() {
                return PlayerContainer.this.getName();
            }

            @Override
            public Object getOriginal() {
                throw new UnsupportedOperationException("This isn't actually a executor");
            }
        };
    }

}
