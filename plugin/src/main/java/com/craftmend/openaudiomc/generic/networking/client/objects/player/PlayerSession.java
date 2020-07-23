package com.craftmend.openaudiomc.generic.networking.client.objects.player;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PlayerSession {

    private ClientConnection client;
    private String key;


}
