package com.craftmend.openaudiomc.generic.networking.drivers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.drivers.handler.CdnBucketUpdateNotification;
import com.craftmend.openaudiomc.generic.oac.OpenaudioAccountService;
import com.craftmend.openaudiomc.generic.oac.enums.CraftmendTag;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.drivers.handler.AccountUpdateNotification;
import com.craftmend.openaudiomc.generic.networking.drivers.handler.AdminNotification;
import com.craftmend.openaudiomc.generic.networking.drivers.interfaces.NotificationHandler;
import com.craftmend.openaudiomc.generic.networking.drivers.models.BackendNotification;
import com.craftmend.openaudiomc.generic.networking.interfaces.SocketDriver;
import com.craftmend.openaudiomc.generic.networking.io.SocketConnection;
import io.socket.client.Socket;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class NotificationDriver implements SocketDriver {

    private static final Map<String, NotificationHandler> handlers = new HashMap<String, NotificationHandler>(){{

            // Handlers for notifications, by event name
            put("admin-message", new AdminNotification());
            // Handlers for craftmend accounts
            put("craftmend-update", new AccountUpdateNotification());
            // cdn updates
            put("cdn-bucket-update", new CdnBucketUpdateNotification());

    }};

    @Override
    public void boot(Socket socket, SocketConnection connector) {
        socket.on("oa-notification", args -> {
            BackendNotification payload = OpenAudioMc.getGson().fromJson(((String) args[args.length - 1]), BackendNotification.class);

            // do we support this event?
            if (!supportsTags(payload.getRequiredTags())) return;

            // handle type
            NotificationHandler handler = handlers.get(payload.getNotificationType());
            if (handler == null) {
                OpenAudioLogger.warn("Received notification " + payload.getNotificationType() + " but it doesn't have a handler. Is this plugin outdated?");
            } else {
                handler.handle(payload);
            }
        });
    }

    private boolean supportsTags(Set<String> tagsToComplyWith) {
        for (CraftmendTag tag : OpenAudioMc.getService(OpenaudioAccountService.class).getTags()) {
            tagsToComplyWith.remove(tag.toString());
        }
        return tagsToComplyWith.isEmpty();
    }

}
