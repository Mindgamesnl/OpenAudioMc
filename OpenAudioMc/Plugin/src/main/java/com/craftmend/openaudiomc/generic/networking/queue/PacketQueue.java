package com.craftmend.openaudiomc.generic.networking.queue;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.DefaultNetworkingService;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.state.StateService;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

public class PacketQueue {

    private Map<UUID, List<AbstractPacket>> packetQueue = new ConcurrentHashMap<>();

    public void addPacket(UUID uuid, AbstractPacket packet) {
        if (!packetQueue.containsKey(uuid)) {
            packetQueue.put(uuid, new LinkedList<>());
        }
        packetQueue.get(uuid).add(packet);
    }

    public void clearAll() {
        packetQueue.clear();
    }

    public void flush(DefaultNetworkingService networkingService) {
        if (packetQueue.isEmpty()) return;

        // gradually flush
        new Thread(() -> {
            boolean cancelled = false;
            List<UUID> toRemove = new LinkedList<>();
            for (Map.Entry<UUID, List<AbstractPacket>> entry : packetQueue.entrySet()) {
                // is this user still connected?
                ClientConnection clientConnection = networkingService.getClient(entry.getKey());
                if (clientConnection != null && clientConnection.isConnected()) {
                    // send all packets
                    int flushed = 0;
                    for (AbstractPacket packet : entry.getValue()) {
                        networkingService.send(clientConnection, packet);
                        flushed++;
                    }

                    if (flushed > 0) {
                        OpenAudioLogger.info("Flushed " + flushed + " packets for " + entry.getKey());
                        // wait 15 MS before flushing the next user
                        try {
                            Thread.sleep(15);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                    toRemove.add(entry.getKey());
                }

                // check if the connection is still OK before we continue
                if (!OpenAudioMc.getService(StateService.class).getCurrentState().isConnected()) {
                    OpenAudioLogger.warn("Connection was lost, stopping packet flush");
                    cancelled = true;
                    break;
                }
            }

            if (cancelled) {
                // only remove the ones we already flushed
                for (UUID uuid : toRemove) {
                    packetQueue.remove(uuid);
                }
            } else {
                clearAll();
            }
        }).start();
    }
}
