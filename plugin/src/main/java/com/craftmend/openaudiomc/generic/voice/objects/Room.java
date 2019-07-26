package com.craftmend.openaudiomc.generic.voice.objects;

import com.craftmend.openaudiomc.generic.voice.packets.subtypes.RoomMember;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@AllArgsConstructor
public class Room {

    private UUID roomId;
    private List<RoomMember> members = new ArrayList<>();

}
