package com.craftmend.openaudiomc.generic.platform;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.commands.selectors.SelectorTranslator;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.user.User;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class FallbackPlayerSelector implements SelectorTranslator {

    private String selector;
    private User<?> sender;

    @Override
    public void setString(String selector) {
        this.selector = selector;
    }

    @Override
    public void setSender(User sender) {
        this.sender = sender;
    }

    @Override
    public List<User<?>> getResults() {
        // attempt to find all players
        List<User<?>> clients = OpenAudioMc.getService(NetworkingService.class).getClients()
                .stream()
                .map(ClientConnection::getUser)
                .collect(Collectors.toList());

        // does the selector start with an @?
        if (selector.startsWith("@")) {
            // yes, so it's a selector
            // check if it's @a
            if (selector.equals("@a")) {
                // yes, so return all players
                return clients;
            } else {
                // no, so return an empty list and warn
                sender.sendMessage("Warning: selectors are not supported on this platform. Please use a player name, uuid or @a instead.");
                return new ArrayList<>();
            }
        } else {
            // is it a uuid?
            if (selector.length() == 36) {
                // yes, so return the player with that uuid
                return clients.stream()
                        .filter(user -> user.getUniqueId().toString().equals(selector))
                        .collect(Collectors.toList());
            } else {
                // no, so it's a player name
                // check if it's a player name
                if (clients.stream().anyMatch(user -> user.getName().equalsIgnoreCase(selector))) {
                    // yes, so return the player with that name
                    return clients.stream()
                            .filter(user -> user.getName().equalsIgnoreCase(selector))
                            .collect(Collectors.toList());
                } else {
                    // no, so return an empty list and warn
                    sender.sendMessage("Warning: selectors are not supported on this platform. Please use a player name, uuid or @a instead.");
                    return new ArrayList<>();
                }
            }
        }
    }
}
