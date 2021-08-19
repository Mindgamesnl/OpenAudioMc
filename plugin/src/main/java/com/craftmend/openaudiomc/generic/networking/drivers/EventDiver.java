package com.craftmend.openaudiomc.generic.networking.drivers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.craftmend.CraftmendService;
import com.craftmend.openaudiomc.generic.craftmend.enums.CraftmendTag;
import com.craftmend.openaudiomc.generic.networking.drivers.models.NetworkUpdatePayload;
import com.craftmend.openaudiomc.generic.networking.interfaces.SocketDriver;
import com.craftmend.openaudiomc.generic.networking.io.SocketIoConnector;
import io.socket.client.Socket;

import java.util.Set;

public class EventDiver implements SocketDriver {

    @Override
    public void boot(Socket socket, SocketIoConnector connector) {
        socket.on("special-update", args -> {
            NetworkUpdatePayload payload = OpenAudioMc.getGson().fromJson(((String) args[args.length - 1]), NetworkUpdatePayload.class);

            // do we support this event?
            if (!supportsTags(payload.getRequiredTags())) return;

            // handle
        });
    }

    private boolean supportsTags(Set<String> tagsToComplyWith) {
        for (CraftmendTag tag : OpenAudioMc.getService(CraftmendService.class).getTags()) {
            tagsToComplyWith.remove(tag.compareTo());
        }
        return tagsToComplyWith.isEmpty();
    }

}
