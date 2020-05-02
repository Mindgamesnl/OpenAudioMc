package com.craftmend.openaudiomc.generic.networking.client.objects.plus;

import lombok.Getter;

import java.util.UUID;

@Getter
public class PlusSocketSession {

    private final String name = "OpenAudioMcPlus";
    private final UUID sessionUuid = UUID.randomUUID();
    private final String key = UUID.randomUUID().toString().subSequence(0, 3).toString();

}
