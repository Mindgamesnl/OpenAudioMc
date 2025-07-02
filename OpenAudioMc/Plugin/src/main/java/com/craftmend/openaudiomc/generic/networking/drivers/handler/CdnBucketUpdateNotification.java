package com.craftmend.openaudiomc.generic.networking.drivers.handler;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.drivers.interfaces.NotificationHandler;
import com.craftmend.openaudiomc.generic.networking.drivers.models.BackendNotification;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.uploads.UploadIndexService;

import java.util.UUID;

/**
 * Simple handler for admin notifications
 *
 * these events send simple chat messages to online staff/admins
 */
public class CdnBucketUpdateNotification implements NotificationHandler {

    @Override
    public void handle(BackendNotification notificationData) {
        String[] parts = notificationData.getMessage().split(" ");
        if (parts.length != 2) {
            OpenAudioLogger.warn("Invalid CDN bucket update notification: " + notificationData.getMessage());
            return;
        }

        switch (parts[0]) {
            case "add":
                OpenAudioMc.getService(UploadIndexService.class).add(parts[1]);
                break;
            case "delete":
                OpenAudioMc.getService(UploadIndexService.class).remove(parts[1]);
                break;
            default:
                OpenAudioLogger.warn("Invalid CDN bucket update notification: " + notificationData.getMessage());
                break;
        }
    }
}
