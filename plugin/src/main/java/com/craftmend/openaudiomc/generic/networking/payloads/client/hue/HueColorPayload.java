package com.craftmend.openaudiomc.generic.networking.payloads.client.hue;

import com.craftmend.openaudiomc.generic.hue.SerializedHueColor;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HueColorPayload extends AbstractPacketPayload {

    private String lights;
    private SerializedHueColor hueColor;

}
