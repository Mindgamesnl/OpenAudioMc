package com.craftmend.openaudiomc.api.channels.events;

import com.craftmend.openaudiomc.api.channels.VoiceChannel;
import com.craftmend.openaudiomc.api.events.BaseEvent;
import lombok.Getter;

public class ChannelDeletedEvent extends BaseEvent {

    @Getter
    private final VoiceChannel channel;

    public ChannelDeletedEvent(VoiceChannel channel) {
        this.channel = channel;
    }
}
