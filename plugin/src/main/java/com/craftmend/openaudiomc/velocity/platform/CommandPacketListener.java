package com.craftmend.openaudiomc.velocity.platform;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.node.packets.ClientRunAudioPacket;
import com.craftmend.openaudiomc.generic.proxy.messages.PacketListener;
import com.craftmend.openaudiomc.generic.proxy.messages.ProxyPacketHandler;
import com.craftmend.openaudiomc.generic.user.User;

public class CommandPacketListener implements PacketListener {

    @ProxyPacketHandler
    public void onCommandRun(User user, ClientRunAudioPacket packet) {
        OpenAudioMc.getService(NetworkingService.class).getClient(user.getUniqueId()).getAuth().publishSessionUrl();
    }

}
