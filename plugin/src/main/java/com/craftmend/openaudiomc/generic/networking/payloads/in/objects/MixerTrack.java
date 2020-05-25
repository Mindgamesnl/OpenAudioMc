package com.craftmend.openaudiomc.generic.networking.payloads.in.objects;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class MixerTrack {

    private String name;
    private List<String> tags;

}
