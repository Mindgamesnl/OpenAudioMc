package com.craftmend.openaudiomc.velocity.modules.player.events;

import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ClientDisconnectEvent {

    private final Authenticatable disconnectedClient;

}
