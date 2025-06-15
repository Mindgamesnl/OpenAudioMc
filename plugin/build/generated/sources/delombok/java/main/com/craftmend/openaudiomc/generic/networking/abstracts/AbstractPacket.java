package com.craftmend.openaudiomc.generic.networking.abstracts;

import java.util.UUID;

public class AbstractPacket {
    /**
     * AbstractPacket
     *
     * Used by the openaudiomc packet lib
     */
    private AbstractPacketPayload data;
    private PacketChannel packetChannel;
    private UUID client;

    public AbstractPacket(AbstractPacketPayload data, PacketChannel packetChannel, UUID client) {
        this.data = data;
        this.packetChannel = packetChannel;
        this.client = client;
    }

    protected transient boolean queueableIfReconnecting = false;

    /**
     * AbstractPacket
     *
     * Used by the openaudiomc packet lib
     */
    public AbstractPacketPayload getData() {
        return this.data;
    }

    public PacketChannel getPacketChannel() {
        return this.packetChannel;
    }

    public UUID getClient() {
        return this.client;
    }

    public boolean isQueueableIfReconnecting() {
        return this.queueableIfReconnecting;
    }

    public AbstractPacket() {
    }

    public void setClient(final UUID client) {
        this.client = client;
    }
}
