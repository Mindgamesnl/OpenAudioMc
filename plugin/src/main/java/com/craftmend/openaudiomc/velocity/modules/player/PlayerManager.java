package com.craftmend.openaudiomc.velocity.modules.player;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingEvents;
import com.craftmend.openaudiomc.velocity.OpenAudioMcVelocity;
import com.craftmend.openaudiomc.velocity.modules.player.events.ClientConnectEvent;
import com.craftmend.openaudiomc.velocity.modules.player.events.ClientDisconnectEvent;
import com.craftmend.openaudiomc.velocity.modules.player.listeners.PlayerConnectionListener;

public class PlayerManager {

    public PlayerManager(OpenAudioMcVelocity plugin) {
        plugin.getServer().getEventManager().register(plugin, new PlayerConnectionListener());

        OpenAudioMc.getInstance().getNetworkingService().addEventHandler(new INetworkingEvents() {
            @Override
            public void onClientOpen(Authenticatable target) {
                plugin.getServer().getEventManager().fireAndForget(new ClientConnectEvent(target));
            }

            @Override
            public void onClientClose(Authenticatable target) {
                plugin.getServer().getEventManager().fireAndForget(new ClientDisconnectEvent(target));
            }
        });
    }

}
