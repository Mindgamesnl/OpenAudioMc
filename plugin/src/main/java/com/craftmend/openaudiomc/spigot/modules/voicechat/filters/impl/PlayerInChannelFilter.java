package com.craftmend.openaudiomc.spigot.modules.voicechat.filters.impl;

import com.craftmend.openaudiomc.api.voice.CustomPlayerFilter;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import lombok.AllArgsConstructor;
import org.bukkit.entity.Player;

@AllArgsConstructor
public class PlayerInChannelFilter implements CustomPlayerFilter {

    private final NetworkingService networkingService;

    @Override
    public boolean isPlayerValidListener(Player listener, Player possibleSpeaker) {
        ClientConnection playerA = networkingService.getClient(listener.getUniqueId());
        ClientConnection playerB = networkingService.getClient(possibleSpeaker.getUniqueId());

        if (playerA == null || playerB == null) {
            // unknown state, should not be handled here
            return true;
        }

        boolean playerAHasChannel = playerA.getRtcSessionManager().getCurrentChannel() != null;
        boolean playerBHasChannel = playerB.getRtcSessionManager().getCurrentChannel() != null;

        // only allow if both players are not in a channel
        return !playerAHasChannel && !playerBHasChannel;
    }
}
