package com.craftmend.openaudiomc.generic.networking.drivers.handler;

import com.craftmend.openaudiomc.generic.networking.drivers.interfaces.NotificationHandler;
import com.craftmend.openaudiomc.generic.networking.drivers.models.BackendNotification;

/**
 * Simple handler for admin notifications
 *
 * these events send simple chat messages to online staff/admins
 */
public class AdminNotification implements NotificationHandler {

    @Override
    public void handle(BackendNotification notificationData) {

    }
}
