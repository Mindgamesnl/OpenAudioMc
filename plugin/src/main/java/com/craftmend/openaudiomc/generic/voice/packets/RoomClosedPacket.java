package com.craftmend.openaudiomc.generic.voice.packets;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RoomClosedPacket {

    private UUID roomId;

}
