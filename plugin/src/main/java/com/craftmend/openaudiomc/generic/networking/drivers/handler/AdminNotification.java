package com.craftmend.openaudiomc.generic.networking.drivers.handler;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.drivers.interfaces.NotificationHandler;
import com.craftmend.openaudiomc.generic.networking.drivers.models.BackendNotification;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.Platform;

/**
 * Simple handler for admin notifications
 *
 * these events send simple chat messages to online staff/admins
 */
public class AdminNotification implements NotificationHandler {

    @Override
    public void handle(BackendNotification notificationData) {

        String message = OpenAudioMc.getService(CommandService.class).getCommandPrefix();
        message += Platform.makeColor("RED") + "ADMIN NOTIFICATION: " + Platform.makeColor("YELLOW") + Platform.translateColors(notificationData.getMessage());

        for (ClientConnection client : OpenAudioMc.getService(NetworkingService.class).getClients()) {
            if (client.getPlayer().isAdministrator()) {
                client.getPlayer().sendMessage(message);
            }
        }
    }
}
