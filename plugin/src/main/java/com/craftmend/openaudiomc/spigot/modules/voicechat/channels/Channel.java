package com.craftmend.openaudiomc.spigot.modules.voicechat.channels;

import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.user.User;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class Channel {

    private User creator;
    private String name;
    private Map<UUID, ClientConnection> members = new HashMap<>();

    public Channel(User creator, String name) {
        this.creator = creator;
        this.name = name;
    }

    public void addMember(User user) {
        ClientConnection client = (ClientConnection) user.findClient().get();
        members.put(user.getUniqueId(), client);
        client.getRtcSessionManager().setCurrentChannel(this);


    }



}
