package com.craftmend.openaudiomc.generic.plus.object;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class PlusPlayer {

    private String name;
    private UUID uuid;
    private boolean connected;

}
