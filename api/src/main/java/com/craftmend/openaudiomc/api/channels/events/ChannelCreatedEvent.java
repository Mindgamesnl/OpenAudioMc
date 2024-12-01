package com.craftmend.openaudiomc.api.channels.events;

import com.craftmend.openaudiomc.api.channels.VoiceChannel;
import com.craftmend.openaudiomc.api.events.BaseEvent;
import lombok.Getter;

public class ChannelCreatedEvent extends BaseEvent {

    @Getter
    private final VoiceChannel channel;

    public ChannelCreatedEvent(VoiceChannel channel) {
        this.channel = channel;
    }
}
