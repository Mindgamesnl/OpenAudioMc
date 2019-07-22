package com.craftmend.openaudiomc.generic.networking.payloads;

import com.craftmend.openaudiomc.generic.configuration.objects.ClientSettings;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class ClientSettingsPayload extends AbstractPacketPayload {

    private ClientSettings clientSettings;

}
