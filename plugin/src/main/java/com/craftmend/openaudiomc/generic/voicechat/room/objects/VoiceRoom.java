package com.craftmend.openaudiomc.generic.voicechat.room.objects;

import com.craftmend.openaudiomc.generic.voicechat.api.drivers.VoiceRoomDriver;
import lombok.Getter;

import java.util.UUID;

public class VoiceRoom {

    @Getter private UUID roomId;
    @Getter private VoiceRoomDriver driver;

    public VoiceRoom(UUID roomId, VoiceRoomDriver driver) {
        this.roomId = roomId;
        this.driver = driver;
    }

}
