package com.craftmend.openaudiomc.services.networking.payloads;

import com.craftmend.openaudiomc.modules.configuration.objects.ClientSettings;
import com.craftmend.openaudiomc.services.networking.abstracts.AbstractPacketPayload;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class ClientSettingsPayload extends AbstractPacketPayload {

    private ClientSettings clientSettings;

}
