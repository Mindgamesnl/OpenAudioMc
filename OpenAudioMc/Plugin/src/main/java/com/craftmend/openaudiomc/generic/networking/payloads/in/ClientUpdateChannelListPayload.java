package com.craftmend.openaudiomc.generic.networking.payloads.in;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.networking.payloads.in.objects.MixerTrack;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper=false)
@AllArgsConstructor
@NoArgsConstructor
public class ClientUpdateChannelListPayload extends AbstractPacketPayload {

    private UUID client;
    private List<MixerTrack> tracks;

}
