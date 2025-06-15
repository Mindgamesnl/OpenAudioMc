package com.craftmend.openaudiomc.api.channels.events;

import com.craftmend.openaudiomc.api.channels.VoiceChannel;
import com.craftmend.openaudiomc.api.events.BaseEvent;

public class ChannelMembersUpdatedEvent extends BaseEvent {
    private final VoiceChannel channel;

    public ChannelMembersUpdatedEvent(VoiceChannel channel) {
        this.channel = channel;
    }

    public VoiceChannel getChannel() {
        return this.channel;
    }
}
