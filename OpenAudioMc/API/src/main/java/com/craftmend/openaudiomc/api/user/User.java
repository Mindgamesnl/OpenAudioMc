package com.craftmend.openaudiomc.api.user;

import com.craftmend.openaudiomc.api.ClientApi;
import com.craftmend.openaudiomc.api.basic.Actor;
import com.craftmend.openaudiomc.api.clients.Client;

import java.util.Optional;
import java.util.UUID;

public interface User<T> extends Actor {

    T getOriginal();

    String getIpAddress();

    String getWorld();

    void makeExecuteCommand(String command);

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

        return Optional.ofNullable(ClientApi.getInstance().getClient(uuid));
    }

}
