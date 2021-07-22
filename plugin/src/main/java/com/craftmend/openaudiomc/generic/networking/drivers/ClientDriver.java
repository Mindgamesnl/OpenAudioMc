package com.craftmend.openaudiomc.generic.networking.drivers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.event.events.ClientPreAuthEvent;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingEvents;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.interfaces.SocketDriver;
import com.craftmend.openaudiomc.generic.networking.io.SocketIoConnector;
import com.craftmend.openaudiomc.generic.networking.payloads.AcknowledgeClientPayload;
import io.socket.client.Ack;
import io.socket.client.Socket;

import java.util.UUID;

public class ClientDriver implements SocketDriver {

    @Override
    public void boot(Socket socket, SocketIoConnector connector) {
        socket.on("acknowledgeClient", args -> {
            AcknowledgeClientPayload payload = (AcknowledgeClientPayload) OpenAudioMc.getGson().fromJson(
                    args[0].toString(),
                    AbstractPacket.class
            ).getData();

            Authenticatable authenticatable = findSession(payload.getUuid());

            Ack callback = (Ack) args[1];

            if (authenticatable == null) {
                callback.call(false);
            } else if (authenticatable.isTokenCorrect(payload.getToken())) {
                callback.call(true);
                authenticatable.onConnect();
                for (INetworkingEvents event : OpenAudioMc.getService(NetworkingService.class).getEvents()) {
                    event.onClientOpen(authenticatable);
                }
            } else {
                ClientPreAuthEvent checkEvent = new ClientPreAuthEvent(authenticatable, payload.getToken());
                AudioApi.getInstance().getEventDriver().fire(checkEvent);

                if (!checkEvent.isCanceled()) {
                    // allow
                    callback.call(true);
                    authenticatable.onConnect();
                    for (INetworkingEvents event : OpenAudioMc.getService(NetworkingService.class).getEvents()) {
                        event.onClientOpen(authenticatable);
                    }
                } else {
                    OpenAudioLogger.toConsole("Closing login attempt for " + authenticatable.getOwnerName() + " because they are already connected.");
                    callback.call(false);
                }
            }
        });

        socket.on("data", args -> {
            try {
                AbstractPacket abstractPacket = OpenAudioMc.getGson().fromJson(args[0].toString(), AbstractPacket.class);
                OpenAudioMc.getService(NetworkingService.class).triggerPacket(abstractPacket);
            } catch (Exception e) {
                OpenAudioLogger.handleException(e);
                OpenAudioLogger.toConsole("An incoming packet was attempted to be parsed but failed horribly and it broke. Please update your plugin, of if this is already the latest version, let me know of this exception. The received data was: " + args[0].toString());
                e.printStackTrace();
            }
        });
    }

    private Authenticatable findSession(UUID id) {
        ClientConnection clientConnection = OpenAudioMc.getService(NetworkingService.class).getClient(id);
        return clientConnection;
    }
}
