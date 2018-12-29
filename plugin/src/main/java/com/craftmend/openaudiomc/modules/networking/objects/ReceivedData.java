package com.craftmend.openaudiomc.modules.networking.objects;

import com.craftmend.openaudiomc.modules.networking.enums.PacketChannel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReceivedData {

    private PacketChannel channel;
    private Object data;

}
