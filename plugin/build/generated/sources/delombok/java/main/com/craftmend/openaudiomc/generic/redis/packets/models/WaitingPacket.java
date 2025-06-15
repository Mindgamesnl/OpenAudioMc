package com.craftmend.openaudiomc.generic.redis.packets.models;

import com.craftmend.openaudiomc.generic.redis.packets.channels.ChannelKey;
import com.craftmend.openaudiomc.generic.redis.packets.interfaces.OARedisPacket;

public class WaitingPacket {
    private ChannelKey channel;
    private OARedisPacket packet;

    public ChannelKey getChannel() {
        return this.channel;
    }

    public OARedisPacket getPacket() {
        return this.packet;
    }

    public void setChannel(final ChannelKey channel) {
        this.channel = channel;
    }

    public void setPacket(final OARedisPacket packet) {
        this.packet = packet;
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof WaitingPacket)) return false;
        final WaitingPacket other = (WaitingPacket) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$channel = this.getChannel();
        final Object other$channel = other.getChannel();
        if (this$channel == null ? other$channel != null : !this$channel.equals(other$channel)) return false;
        final Object this$packet = this.getPacket();
        final Object other$packet = other.getPacket();
        if (this$packet == null ? other$packet != null : !this$packet.equals(other$packet)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof WaitingPacket;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $channel = this.getChannel();
        result = result * PRIME + ($channel == null ? 43 : $channel.hashCode());
        final Object $packet = this.getPacket();
        result = result * PRIME + ($packet == null ? 43 : $packet.hashCode());
        return result;
    }

    @Override
    public String toString() {
        return "WaitingPacket(channel=" + this.getChannel() + ", packet=" + this.getPacket() + ")";
    }

    public WaitingPacket(final ChannelKey channel, final OARedisPacket packet) {
        this.channel = channel;
        this.packet = packet;
    }
}
