package com.craftmend.openaudiomc.generic.networking.drivers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.drivers.models.NetworkUpdatePayload;
import com.craftmend.openaudiomc.generic.networking.interfaces.SocketDriver;
import com.craftmend.openaudiomc.generic.networking.io.SocketIoConnector;
import io.socket.client.Socket;

public class EventDiver implements SocketDriver {

    @Override
    public void boot(Socket socket, SocketIoConnector connector) {
        socket.on("special-update", args -> {
            NetworkUpdatePayload payload = OpenAudioMc.getGson().fromJson(((String) args[args.length - 1]), NetworkUpdatePayload.class);

        });
    }
}
