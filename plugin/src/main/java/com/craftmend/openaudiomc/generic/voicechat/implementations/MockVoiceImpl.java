package com.craftmend.openaudiomc.generic.voicechat.implementations;

import com.craftmend.openaudiomc.generic.voicechat.api.models.MinecraftAccount;
import com.craftmend.openaudiomc.generic.voicechat.api.util.Task;
import com.craftmend.openaudiomc.generic.voicechat.interfaces.VoiceManagerImplementation;
import com.craftmend.openaudiomc.generic.voicechat.room.objects.VoiceRoom;

import java.util.List;
import java.util.UUID;

public class MockVoiceImpl implements VoiceManagerImplementation {
    @Override
    public Task<VoiceRoom> requestVoiceRoomAsync(List<MinecraftAccount> members) {
        throw new IllegalStateException("This server doesn't have a voice manager.");
    }

    @Override
    public VoiceRoom findRoomByPlayer(UUID playerUuid) {
        throw new IllegalStateException("This server doesn't have a voice manager.");
    }
}
