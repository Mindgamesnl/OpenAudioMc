package com.craftmend.openaudiomc.generic.redis.packets.channels;

import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.redis.packets.ExecuteBulkCommandsPacket;
import com.craftmend.openaudiomc.generic.redis.packets.ExecuteCommandPacket;
import com.craftmend.openaudiomc.generic.redis.packets.interfaces.OARedisPacket;

public enum ChannelKey {
    TRIGGER_BULK_COMMANDS(Platform.SPIGOT, "oa-show-bulk", ExecuteBulkCommandsPacket.class), TRIGGER_COMMAND(Platform.SPIGOT, "oa-show-trigger", ExecuteCommandPacket.class);
    private final Platform targetPlatform;
    private final String redisChannelName;
    private final Class<? extends OARedisPacket> packetClass;

    ChannelKey(Platform targetPlatform, String channel, Class<? extends OARedisPacket> packetClass) {
        this.targetPlatform = targetPlatform;
        this.redisChannelName = channel;
        this.packetClass = packetClass;
    }

    public Platform getTargetPlatform() {
        return this.targetPlatform;
    }

    public String getRedisChannelName() {
        return this.redisChannelName;
    }

    public Class<? extends OARedisPacket> getPacketClass() {
        return this.packetClass;
    }
}
