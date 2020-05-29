package com.craftmend.openaudiomc.generic.networking.payloads.client.speakers.objects;

import com.craftmend.openaudiomc.spigot.modules.speakers.enums.SpeakerType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ClientSpeaker {

    private Vector3 location;
    private SpeakerType type;
    private String id;
    private String source;
    private int maxDistance;
    private long startInstant;

}
