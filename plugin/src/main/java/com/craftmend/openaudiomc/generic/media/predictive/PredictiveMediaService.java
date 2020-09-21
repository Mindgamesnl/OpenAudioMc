package com.craftmend.openaudiomc.generic.media.predictive;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingEvents;
import com.craftmend.openaudiomc.generic.networking.payloads.client.interfaces.SourceHolder;
import com.craftmend.openaudiomc.generic.utils.HeatMap;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class PredictiveMediaService {

    @Getter private final HeatMap<String> mostUsedSources = new HeatMap<>(
            60 * 15, // keep entries for 15 minutes
            70           // keep max 70 elements
            );

    public INetworkingEvents getPacketHook() {
        return new INetworkingEvents() {
            @Override
            public void onPacketSend(Authenticatable target, AbstractPacket packet) {
                if (packet instanceof SourceHolder) {
                    String source = ((SourceHolder) packet).getSource();
                    mostUsedSources.bump(source);
                }
            }
        };
    }

}
