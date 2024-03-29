package com.craftmend.openaudiomc.generic.client.objects;

import com.craftmend.openaudiomc.api.voice.VoicePeerOptions;
import com.craftmend.openaudiomc.generic.networking.packets.client.voice.PacketClientDropVoiceStream;
import com.craftmend.openaudiomc.generic.networking.packets.client.voice.PacketClientSubscribeToVoice;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceDropPayload;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceSubscribePayload;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class PeerQueue {

    private final Set<String> dropQueue = new HashSet<>();
    private final Set<ClientVoiceSubscribePayload.SerializedPeer> subscribeQueue = new HashSet<>();

    private final Lock lock = new ReentrantLock();

    public void drop(String streamKey) {
        lock.lock();
        dropQueue.add(streamKey);

        // do we have a sub queued? if so, remove it
        subscribeQueue.removeIf(clientVoiceSubscribePayload -> clientVoiceSubscribePayload.getStreamKey().equals(streamKey));
        lock.unlock();
    }

    public void addSubscribe(
            ClientConnection toListenTo,
            ClientConnection originLocation,
            VoicePeerOptions options
    ) {
        ClientVoiceSubscribePayload.SerializedPeer peer = ClientVoiceSubscribePayload.SerializedPeer.fromClient(toListenTo, originLocation, options);
        lock.lock();

        // remove old, if present, its possible for this to be called twice with different options
        subscribeQueue.removeIf(clientVoiceSubscribePayload -> clientVoiceSubscribePayload.getStreamKey().equals(peer.getStreamKey()));

        subscribeQueue.add(peer);

        // do we have a drop queued? if so, remove it
        dropQueue.removeIf(sk -> sk.equals(peer.getStreamKey()));
        lock.unlock();
    }

    public void flushDropsAndSubscriptions(ClientConnection toSendTo) {
        lock.lock();
        if (!dropQueue.isEmpty()) {
            String[] streamKeys = dropQueue.toArray(new String[0]);
            toSendTo.sendPacket(new PacketClientDropVoiceStream(
                    new ClientVoiceDropPayload(streamKeys)
            ));
            dropQueue.clear();
        }

        if (!subscribeQueue.isEmpty()) {
            ClientVoiceSubscribePayload.SerializedPeer[] peers = subscribeQueue.toArray(new ClientVoiceSubscribePayload.SerializedPeer[0]);
            toSendTo.sendPacket(new PacketClientSubscribeToVoice(
                    new ClientVoiceSubscribePayload(peers)
            ));
            subscribeQueue.clear();
        }
        lock.unlock();
    }

}
