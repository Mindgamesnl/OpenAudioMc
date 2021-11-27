package com.craftmend.openaudiomc.generic.proxy;

import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.service.Servicable;
import com.craftmend.openaudiomc.velocity.messages.StandardPacket;

public interface ProxyClientService extends Servicable {

    void sendPacket(User user, StandardPacket packet);
    void onPacketReceive(User from, StandardPacket packet);

}
