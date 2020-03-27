package com.craftmend.openaudiomc.generic.redis.packets;

import com.craftmend.openaudiomc.generic.redis.packets.interfaces.OARedisPacket;

public class PlaceHolderPacket extends OARedisPacket<PlaceHolderPacket> {

    @Override
    public String serialize() {
        return null;
    }

    @Override
    public PlaceHolderPacket deSerialize(String json) {
        return null;
    }

    @Override
    public void handle(PlaceHolderPacket received) {

    }
}
