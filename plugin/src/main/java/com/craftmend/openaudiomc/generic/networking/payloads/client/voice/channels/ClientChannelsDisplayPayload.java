package com.craftmend.openaudiomc.generic.networking.payloads.client.voice.channels;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.voicechat.channels.Channel;
import com.craftmend.openaudiomc.spigot.modules.voicechat.channels.ChannelEnterResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.util.*;

@Data
@AllArgsConstructor
public class ClientChannelsDisplayPayload extends AbstractPacketPayload {

    private ClientChannelOperation operation;
    private ClientChannel[] channels;

    @Getter
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
    }

    @Getter
    public static class ClientChannelMember {
        private final String name;
        private final UUID uuid;

        public ClientChannelMember(String name, UUID uniqueId) {
            this.name = name;
            this.uuid = uniqueId;
        }
    }

    public enum ClientChannelOperation {
        ALL,
        ADD,
        REMOVE,
        PATCH
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

}
