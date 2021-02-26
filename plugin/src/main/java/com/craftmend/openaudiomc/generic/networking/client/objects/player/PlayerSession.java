package com.craftmend.openaudiomc.generic.networking.client.objects.player;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
public class PlayerSession {

    @Setter private boolean isForced = false;

    private ClientConnection client;
    private String webSessionKey;
    private String staticToken;


}
