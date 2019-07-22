package com.craftmend.openaudiomc.generic.networking.packets;

import com.craftmend.openaudiomc.generic.configuration.objects.ClientSettings;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.ClientSettingsPayload;

public class PacketClientPushSettings extends AbstractPacket {

    public PacketClientPushSettings(ClientSettings settings) {
        super(
                new ClientSettingsPayload(settings),
                PacketChannel.CLIENT_OUT_SET_SETTINGS,
                null
        );
    }

}
