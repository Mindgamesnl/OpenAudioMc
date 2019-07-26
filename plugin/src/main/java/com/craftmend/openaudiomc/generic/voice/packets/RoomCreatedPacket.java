package com.craftmend.openaudiomc.generic.voice.packets;

import com.craftmend.openaudiomc.generic.voice.packets.subtypes.RoomMember;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RoomCreatedPacket {

    private UUID roomId;
    private List<RoomMember> members = new ArrayList<>();

}
