package com.craftmend.openaudiomc.generic.voicechat.room.objects;

import com.craftmend.openaudiomc.generic.voicechat.api.drivers.VoiceRoomDriver;
import com.craftmend.openaudiomc.generic.voicechat.api.models.MinecraftAccount;
import lombok.Getter;

import java.util.List;
import java.util.UUID;

public class VoiceRoom {

    @Getter private List<MinecraftAccount> members;
    @Getter private String roomId;
    @Getter private VoiceRoomDriver driver;

    public VoiceRoom(String roomId, VoiceRoomDriver driver, List<MinecraftAccount> members) {
        if (members.isEmpty()) throw new IllegalStateException("A room must have some members, might as well do nothing.");
        this.roomId = roomId;
        this.driver = driver;
        this.members = members;
    }

}
