package com.craftmend.openaudiomc.services.networking.packets;

import com.craftmend.openaudiomc.modules.configuration.objects.ClientSettings;
import com.craftmend.openaudiomc.services.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.services.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.services.networking.payloads.ClientSettingsPayload;

public class PacketClientPushSettings extends AbstractPacket {

    public PacketClientPushSettings(ClientSettings settings) {
        super(
                new ClientSettingsPayload(settings),
                PacketChannel.CLIENT_OUT_SET_SETTINGS,
                null
        );
    }

}
