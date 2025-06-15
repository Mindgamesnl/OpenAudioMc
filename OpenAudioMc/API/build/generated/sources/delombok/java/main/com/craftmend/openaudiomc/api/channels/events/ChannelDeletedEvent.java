package com.craftmend.openaudiomc.api.channels.events;

import com.craftmend.openaudiomc.api.channels.VoiceChannel;
import com.craftmend.openaudiomc.api.events.BaseEvent;

public class ChannelDeletedEvent extends BaseEvent {
    private final VoiceChannel channel;

    public ChannelDeletedEvent(VoiceChannel channel) {
        this.channel = channel;
    }

    public VoiceChannel getChannel() {
        return this.channel;
    }
}
