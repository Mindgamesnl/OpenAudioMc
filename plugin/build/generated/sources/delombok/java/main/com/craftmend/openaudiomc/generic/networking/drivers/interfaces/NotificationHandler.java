package com.craftmend.openaudiomc.generic.networking.drivers.interfaces;

import com.craftmend.openaudiomc.generic.networking.drivers.models.BackendNotification;

public interface NotificationHandler {

    void handle(BackendNotification notificationData);

}
