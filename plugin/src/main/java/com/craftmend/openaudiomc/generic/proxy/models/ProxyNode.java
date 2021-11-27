package com.craftmend.openaudiomc.generic.proxy.models;

import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.velocity.messages.StandardPacket;

import java.util.Collection;

public interface ProxyNode {

    String getName();
    Collection<User> getOnlineUsers();
    void sendPacket(StandardPacket packet);

}
