package com.craftmend.openaudiomc.generic.voicechat.api.body;

import com.craftmend.openaudiomc.generic.voicechat.api.models.MinecraftAccount;
import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
public class VoiceRoomRequestBody {

    private List<MinecraftAccount> members;

}
