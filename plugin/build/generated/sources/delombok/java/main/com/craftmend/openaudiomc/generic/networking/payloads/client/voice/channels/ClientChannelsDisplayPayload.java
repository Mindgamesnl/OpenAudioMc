package com.craftmend.openaudiomc.generic.networking.payloads.client.voice.channels;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.voicechat.channels.Channel;
import com.craftmend.openaudiomc.spigot.modules.voicechat.channels.ChannelEnterResponse;
import java.util.*;

public class ClientChannelsDisplayPayload extends AbstractPacketPayload {
    private ClientChannelOperation operation;
    private ClientChannel[] channels;


    public static class ClientChannel {
        private final int otherMembers;
        private final ClientChannelMember[] firstMembers;
        private final boolean joinable;
        private final String name;

        public ClientChannel(int otherMembers, ClientChannelMember[] firstMembers, boolean joinable, String name) {
            this.otherMembers = otherMembers;
            this.firstMembers = firstMembers;
            this.joinable = joinable;
            this.name = name;
        }

        public int getOtherMembers() {
            return this.otherMembers;
        }

        public ClientChannelMember[] getFirstMembers() {
            return this.firstMembers;
        }

        public boolean isJoinable() {
            return this.joinable;
        }

        public String getName() {
            return this.name;
        }
    }


    public static class ClientChannelMember {
        private final String name;
        private final UUID uuid;

        public ClientChannelMember(String name, UUID uniqueId) {
            this.name = name;
            this.uuid = uniqueId;
        }

        public String getName() {
            return this.name;
        }

        public UUID getUuid() {
            return this.uuid;
        }
    }


    public enum ClientChannelOperation {
        ALL, ADD, REMOVE, PATCH;
    }

    private ClientChannel fromVoiceChannel(Channel channel, User<?> user) {
        // test if this user would be able to join
        boolean joinable = channel.attemptEnter(user) == ChannelEnterResponse.OK;
        // attempt to fill first members with max 3 members, then set the other members count to the rest
        List<ClientChannelMember> firstMembers = new ArrayList<>();
        int otherMembers = 0;
        for (Client member : channel.getMembers()) {
            if (firstMembers.size() < 3) {
                firstMembers.add(new ClientChannelMember(member.getActor().getName(), member.getActor().getUniqueId()));
            } else {
                otherMembers++;
            }
        }
        return new ClientChannel(otherMembers, firstMembers.toArray(new ClientChannelMember[0]), joinable, channel.getName());
    }

    public ClientChannelsDisplayPayload(Collection<Channel> channels, User<?> user, ClientChannelOperation operation) {
        List<ClientChannel> clientChannels = new ArrayList<>();
        for (Channel channel : channels) {
            clientChannels.add(fromVoiceChannel(channel, user));
        }
        this.channels = clientChannels.toArray(new ClientChannel[0]);
        this.operation = operation;
    }

    public ClientChannelOperation getOperation() {
        return this.operation;
    }

    public ClientChannel[] getChannels() {
        return this.channels;
    }

    public void setOperation(final ClientChannelOperation operation) {
        this.operation = operation;
    }

    public void setChannels(final ClientChannel[] channels) {
        this.channels = channels;
    }

    @Override
    public String toString() {
        return "ClientChannelsDisplayPayload(operation=" + this.getOperation() + ", channels=" + java.util.Arrays.deepToString(this.getChannels()) + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof ClientChannelsDisplayPayload)) return false;
        final ClientChannelsDisplayPayload other = (ClientChannelsDisplayPayload) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$operation = this.getOperation();
        final Object other$operation = other.getOperation();
        if (this$operation == null ? other$operation != null : !this$operation.equals(other$operation)) return false;
        if (!java.util.Arrays.deepEquals(this.getChannels(), other.getChannels())) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ClientChannelsDisplayPayload;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $operation = this.getOperation();
        result = result * PRIME + ($operation == null ? 43 : $operation.hashCode());
        result = result * PRIME + java.util.Arrays.deepHashCode(this.getChannels());
        return result;
    }

    public ClientChannelsDisplayPayload(final ClientChannelOperation operation, final ClientChannel[] channels) {
        this.operation = operation;
        this.channels = channels;
    }
}
