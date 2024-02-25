package com.craftmend.openaudiomc.generic.networking.payloads.client.speakers.objects;

import com.craftmend.openaudiomc.api.speakers.SpeakerType;
import com.craftmend.openaudiomc.spigot.services.world.Vector3;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class ClientSpeaker implements Serializable {

    private Vector3 location;
    private SpeakerType type;
    private String id;
    private String source;
    private int maxDistance;
    private long startInstant;
    private int obstructions;
    private boolean doLoop = true;
    private boolean doPickup = true;
    private boolean cancelRegions = false;

}
