package com.craftmend.openaudiomc.api.channels.events;

import com.craftmend.openaudiomc.api.channels.VoiceChannel;
import com.craftmend.openaudiomc.api.events.BaseEvent;

public class ChannelCreatedEvent extends BaseEvent {
    private final VoiceChannel channel;

    public ChannelCreatedEvent(VoiceChannel channel) {
        this.channel = channel;
    }

    public VoiceChannel getChannel() {
        return this.channel;
    }
}
