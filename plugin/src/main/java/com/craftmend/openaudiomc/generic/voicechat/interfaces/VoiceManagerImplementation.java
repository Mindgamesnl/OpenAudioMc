package com.craftmend.openaudiomc.generic.voicechat.interfaces;

import com.craftmend.openaudiomc.generic.voicechat.api.models.MinecraftAccount;
import com.craftmend.openaudiomc.generic.voicechat.api.util.Task;
import com.craftmend.openaudiomc.generic.voicechat.room.objects.VoiceRoom;

import java.util.List;
import java.util.UUID;

public interface VoiceManagerImplementation {

    Task<VoiceRoom> requestVoiceRoomAsync(List<MinecraftAccount> members);
    VoiceRoom findRoomByPlayer(UUID playerUuid);

}
