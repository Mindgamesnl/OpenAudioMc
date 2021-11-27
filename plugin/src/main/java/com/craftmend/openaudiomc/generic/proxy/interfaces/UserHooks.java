package com.craftmend.openaudiomc.generic.proxy.interfaces;

import com.craftmend.openaudiomc.generic.proxy.messages.StandardPacket;
import com.craftmend.openaudiomc.generic.proxy.models.ProxyNode;
import com.craftmend.openaudiomc.generic.service.Servicable;
import com.craftmend.openaudiomc.generic.user.User;

import java.util.Collection;
import java.util.UUID;

public interface UserHooks extends Servicable {

    Collection<ProxyNode> getNodes();
    Collection<User> getOnlineUsers();
    void sendPacket(User user, StandardPacket packet);
    User byUuid(UUID uuid);

}
