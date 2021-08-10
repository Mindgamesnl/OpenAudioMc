package com.craftmend.openaudiomc.generic.networking.client.objects.player;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@AllArgsConstructor
public class PlayerSession implements Serializable {

    private boolean isForced = false;
    @Setter private transient ClientConnection client;
    private String webSessionKey;
    private String staticToken;


}
