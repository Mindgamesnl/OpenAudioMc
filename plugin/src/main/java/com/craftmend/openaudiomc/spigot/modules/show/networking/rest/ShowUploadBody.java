package com.craftmend.openaudiomc.spigot.modules.show.networking.rest;

import com.craftmend.openaudiomc.generic.networking.client.objects.plus.PlusSocketSession;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShowUploadBody {

    private String playerUuid;         // player uuid
    private String playerName;         // player name
    private String name;               // show name
    private String showData;           // serialized show
    private PlusSocketSession session; // for socket authentication

}
