package com.craftmend.openaudiomc.generic.proxy;

import com.craftmend.openaudiomc.generic.proxy.models.ProxyNode;
import com.craftmend.openaudiomc.generic.service.Servicable;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.velocity.messages.StandardPacket;

public interface ProxyHostService extends Servicable {

    void onUserSwitch(User user, ProxyNode from, ProxyNode to);
    void onPacketReceive(User from, StandardPacket packet);

}
