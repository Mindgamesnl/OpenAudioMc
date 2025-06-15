package com.craftmend.openaudiomc.generic.networking.payloads.client.voice.channels;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.voicechat.channels.Channel;
import com.craftmend.openaudiomc.spigot.modules.voicechat.channels.ChannelEnterResponse;
import lombok.Getter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

public class ClientChannelStatusPayload extends AbstractPacketPayload {
    // null if the user is not in a channel
    private String currentChannel;

    public String getCurrentChannel() {
        return this.currentChannel;
    }

    public void setCurrentChannel(final String currentChannel) {
        this.currentChannel = currentChannel;
    }

    @Override
    public String toString() {
        return "ClientChannelStatusPayload(currentChannel=" + this.getCurrentChannel() + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof ClientChannelStatusPayload)) return false;
        final ClientChannelStatusPayload other = (ClientChannelStatusPayload) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$currentChannel = this.getCurrentChannel();
        final Object other$currentChannel = other.getCurrentChannel();
        if (this$currentChannel == null ? other$currentChannel != null : !this$currentChannel.equals(other$currentChannel)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ClientChannelStatusPayload;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $currentChannel = this.getCurrentChannel();
        result = result * PRIME + ($currentChannel == null ? 43 : $currentChannel.hashCode());
        return result;
    }

    public ClientChannelStatusPayload(final String currentChannel) {
        this.currentChannel = currentChannel;
    }
}
