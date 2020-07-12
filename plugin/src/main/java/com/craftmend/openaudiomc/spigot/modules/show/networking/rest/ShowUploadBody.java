package com.craftmend.openaudiomc.spigot.modules.show.networking.rest;

import com.craftmend.openaudiomc.generic.networking.client.objects.plus.PlusSocketSession;
import com.craftmend.openaudiomc.spigot.modules.show.objects.Show;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShowUploadBody {

    private String playerUuid;         // player uuid
    private String playerName;         // player name
    private Show show;                 // serialized show
    private PlusSocketSession session; // for socket authentication
    private String publicKey;             // public key

}
