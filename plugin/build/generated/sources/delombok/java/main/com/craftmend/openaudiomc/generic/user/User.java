package com.craftmend.openaudiomc.generic.user;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.basic.Actor;
import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import net.md_5.bungee.api.chat.TextComponent;

import java.util.Optional;
import java.util.UUID;

public interface User<T> extends Actor {

    // Please check inherited methods from Actor

    T getOriginal();

    String getIpAddress();

    void makeExecuteCommand(String command);

    void sendTitle(String title, String subtitle, int fadeIn, int stay, int fadeOut);

    // todo: this can be private where needed, should not be inherited
    void sendMessage(TextComponent textComponent);

    void sendClickableCommandMessage(String message, String hoverMessage, String command);
    void sendClickableUrlMessage(String message, String hoverMessage, String url);
    default void sendActionbarMessage(String message) {
        sendMessage(message);
    }

    default String getWorld() {
        return StorageKey.SETTINGS_DEFAULT_WORLD_NAME.getString();
    }

    default Optional<Client> findClient() {
        UUID uuid = getUniqueId();
        if (uuid == null) {
            return Optional.empty();
        }

        return Optional.ofNullable(OpenAudioMc.getService(NetworkingService.class).getClient(uuid));
    }

    default boolean isGeyser() {
        // It should be save to assume that the configuration provider is loaded for the platform
        // whenever we interact with a user. If it isn't, we have a bigger problem.
        return this.getName().startsWith(StorageKey.SETTINGS_BEDROCK_PREFIX.getString())
                || this.getUniqueId().getMostSignificantBits() == 0; // From https://github.com/GeyserMC/Floodgate/blob/227858930d98dc8e89054b38edebc3b432c0a5eb/core/src/main/java/org/geysermc/floodgate/api/SimpleFloodgateApi.java#L115C21-L115C43
    }

}
