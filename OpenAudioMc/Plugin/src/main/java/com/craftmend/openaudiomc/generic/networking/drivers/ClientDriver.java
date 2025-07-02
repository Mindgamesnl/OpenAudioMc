package com.craftmend.openaudiomc.generic.networking.drivers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.EventApi;
import com.craftmend.openaudiomc.api.events.client.ClientAuthenticationEvent;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingEvents;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.interfaces.SocketDriver;
import com.craftmend.openaudiomc.generic.networking.io.SocketConnection;
import com.craftmend.openaudiomc.generic.networking.payloads.AcknowledgeClientPayload;
import io.socket.client.Ack;
import io.socket.client.Socket;

import java.util.UUID;

public class ClientDriver implements SocketDriver {

    @Override
    public void boot(Socket socket, SocketConnection connector) {
        socket.on("acknowledgeClient", args -> {
            AcknowledgeClientPayload payload = (AcknowledgeClientPayload) OpenAudioMc.getGson().fromJson(
                    args[0].toString(),
                    AbstractPacket.class
            ).getData();

            Authenticatable authenticatable = findSession(payload.getUuid());

            Ack callback = (Ack) args[1];

            if (authenticatable == null) {
                callback.call(false);
            } else {
                ClientAuthenticationEvent checkEvent = new ClientAuthenticationEvent(authenticatable.getOwner(), payload.getToken());
                EventApi.getInstance().callEvent(checkEvent);

                if (!checkEvent.isCancelled()) {
                    // allow
                    callback.call(true);
                    authenticatable.onConnect();
                    for (INetworkingEvents event : OpenAudioMc.getService(NetworkingService.class).getEvents()) {
                        event.onClientOpen(authenticatable);
                    }
                } else {
                    OpenAudioLogger.info("Closing login attempt for " + authenticatable.getOwner().getName() + " because they are already connected.");
                    callback.call(false);
                }
            }
        });

        socket.on("data", args -> {
            try {
                AbstractPacket abstractPacket = OpenAudioMc.getGson().fromJson(args[0].toString(), AbstractPacket.class);
                OpenAudioMc.getService(NetworkingService.class).triggerPacket(abstractPacket);
            } catch (Exception e) {
                // ignore when we're shutting down
                if (OpenAudioMc.getInstance().isDisabled()) return;
                OpenAudioLogger.error(e, "An incoming packet was attempted to be parsed but failed horribly and it broke. Please update your plugin, of if this is already the latest version, let me know of this exception. The received data was: " + args[0].toString());
            }
        });
    }

    private Authenticatable findSession(UUID id) {
        return OpenAudioMc.getService(NetworkingService.class).getClient(id);
    }
}
