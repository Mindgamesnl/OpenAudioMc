package com.craftmend.openaudiomc.generic.voice.packets.subtypes;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RoomMember {

    private String name;
    private UUID uuid;
    private boolean isReady = false;

}
