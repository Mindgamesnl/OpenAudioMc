package com.craftmend.openaudiomc.generic.redis.packets.models;

import com.craftmend.openaudiomc.generic.redis.packets.channels.ChannelKey;
import com.craftmend.openaudiomc.generic.redis.packets.interfaces.OARedisPacket;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WaitingPacket {

    private ChannelKey channel;
    private OARedisPacket packet;

}
