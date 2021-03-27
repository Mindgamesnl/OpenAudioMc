package com.craftmend.openaudiomc.bungee.modules.player.events;

import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import net.md_5.bungee.api.plugin.Event;

@Deprecated
/**
 * Deprecated bungeecord event for client connections.
 *
 * This has been replaced with the internal event api and might be removed at some point.
 */

@Getter
@AllArgsConstructor
public class ClientDisconnectEvent extends Event {

    private Authenticatable disconnectedClient;

}
