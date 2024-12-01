package com.craftmend.openaudiomc.api.channels.events;

import com.craftmend.openaudiomc.api.channels.VoiceChannel;
import com.craftmend.openaudiomc.api.events.BaseEvent;
import lombok.Getter;

public class ChannelMembersUpdatedEvent extends BaseEvent {

    @Getter
    private final VoiceChannel channel;

    public ChannelMembersUpdatedEvent(VoiceChannel channel) {
        this.channel = channel;
    }
}
