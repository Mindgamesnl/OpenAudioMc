package com.craftmend.openaudiomc.generic.user;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.interfaces.Client;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import net.md_5.bungee.api.chat.TextComponent;

import java.util.Optional;
import java.util.UUID;

public interface User {

    @Deprecated Object getOriginal();

    String getName();
    UUID getUniqueId();

    boolean isAdministrator();
    boolean hasPermission(String permission);

    void makeExecuteCommand(String command);

    void sendMessage(String message);
    void sendMessage(TextComponent textComponent);
    void sendClickableCommandMessage(String message, String hoverMessage, String command);
    void sendClickableUrlMessage(String message, String hoverMessage, String url);
    default void sendActionbarMessage(String message) {
        sendMessage(message);
    }

    default Optional<Client> findClient() {
        UUID uuid = getUniqueId();
        if (uuid == null) {
            return Optional.empty();
        }

        return Optional.ofNullable(OpenAudioMc.getService(NetworkingService.class).getClient(uuid));
    }

}
