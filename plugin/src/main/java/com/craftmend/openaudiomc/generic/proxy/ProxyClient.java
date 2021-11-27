package com.craftmend.openaudiomc.generic.proxy;

import com.craftmend.openaudiomc.generic.player.User;
import com.craftmend.openaudiomc.generic.service.Servicable;
import com.craftmend.openaudiomc.velocity.messages.StandardPacket;

public interface ProxyClient extends Servicable {

    void sendPacket(User user, StandardPacket packet);

}
