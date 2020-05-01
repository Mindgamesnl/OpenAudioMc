package com.craftmend.openaudiomc.generic.voice.objects;

import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
public class RoomPrototype {

    private List<ClientConnection> members = new ArrayList<>();
    private List<ClientConnection> failedMembers = new ArrayList<>();

}
