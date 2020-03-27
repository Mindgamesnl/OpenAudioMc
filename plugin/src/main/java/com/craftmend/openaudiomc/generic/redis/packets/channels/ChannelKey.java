package com.craftmend.openaudiomc.generic.redis.packets.channels;

import com.craftmend.openaudiomc.generic.redis.packets.ExecuteCommandPacket;
import com.craftmend.openaudiomc.generic.redis.packets.interfaces.OARedisPacket;
import lombok.Getter;

public enum ChannelKey {

    TRIGGER_COMMAND("oa-show-trigger", ExecuteCommandPacket.class);

    @Getter private String redisChannelName;
    @Getter private Class<? extends OARedisPacket> packetClass;

    ChannelKey(String channel, Class<? extends OARedisPacket> packetClass) {
        this.redisChannelName = channel;
        this.packetClass = packetClass;
    }


}
