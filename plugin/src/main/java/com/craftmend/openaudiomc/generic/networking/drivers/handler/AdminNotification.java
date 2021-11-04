package com.craftmend.openaudiomc.generic.networking.drivers.handler;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.enviroment.MagicValue;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.drivers.interfaces.NotificationHandler;
import com.craftmend.openaudiomc.generic.networking.drivers.models.BackendNotification;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;

import java.util.UUID;

/**
 * Simple handler for admin notifications
 *
 * these events send simple chat messages to online staff/admins
 */
public class AdminNotification implements NotificationHandler {

    @Override
    public void handle(BackendNotification notificationData) {
        String message = MagicValue.COMMAND_PREFIX.get(String.class);
        message += Platform.makeColor("RED") + "ADMIN NOTIFICATION: " + Platform.makeColor("YELLOW") + Platform.translateColors(notificationData.getMessage());

        for (ClientConnection client : OpenAudioMc.getService(NetworkingService.class).getClients()) {
            if (client.getPlayer().isAdministrator()) {
                client.getPlayer().sendMessage(message);
            }
        }

        TaskService ts = OpenAudioMc.resolveDependency(TaskService.class);
        NetworkingService ns = OpenAudioMc.getService(NetworkingService.class);

        // schedule a temporary listener to handle notifications post join
        String finalMessage = message;
        UUID subscriber = ns.subscribeToConnections((cc) -> {
            if (cc.getPlayer().isAdministrator()) {
                ts.schduleSyncDelayedTask(() -> {
                    // send the message
                    cc.getPlayer().sendMessage(finalMessage);
                }, 25);
            }
        });

        // remove the listener in like a minute
        ts.schduleSyncDelayedTask(() -> {
            ns.unsubscribeClientEventHandler(subscriber);
        }, 60 * 20);
    }
}
