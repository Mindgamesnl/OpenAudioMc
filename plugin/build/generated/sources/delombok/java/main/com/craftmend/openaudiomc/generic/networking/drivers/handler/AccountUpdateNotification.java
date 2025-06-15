package com.craftmend.openaudiomc.generic.networking.drivers.handler;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.oac.OpenaudioAccountService;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.drivers.interfaces.NotificationHandler;
import com.craftmend.openaudiomc.generic.networking.drivers.models.BackendNotification;

/**
 * Simple handler for account notifications
 *
 * this event fires whenever the owning craftmend account pushed an update
 * so we'll need to reset/pull our data whenever it fires
 */
public class AccountUpdateNotification implements NotificationHandler {

    @Override
    public void handle(BackendNotification notificationData) {
        OpenAudioLogger.info("Updating OpenAudioMc account state due to update push..");
        OpenAudioMc.getService(OpenaudioAccountService.class).syncAccount();
    }
}
