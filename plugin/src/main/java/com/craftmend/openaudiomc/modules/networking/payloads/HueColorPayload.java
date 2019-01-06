package com.craftmend.openaudiomc.modules.networking.payloads;

import com.craftmend.openaudiomc.modules.hue.objects.HueColor;
import com.craftmend.openaudiomc.modules.networking.abstracts.AbstractPacketPayload;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HueColorPayload extends AbstractPacketPayload {

    private int[] lights;
    private HueColor hueColor;

}
