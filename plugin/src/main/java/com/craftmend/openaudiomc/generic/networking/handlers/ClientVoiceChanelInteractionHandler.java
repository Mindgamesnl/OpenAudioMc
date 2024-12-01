package com.craftmend.openaudiomc.generic.networking.handlers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.abstracts.PayloadHandler;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.payloads.in.ClientVoiceInteractionPayload;
import com.craftmend.openaudiomc.generic.node.packets.ClientUpdateStatePacket;
import com.craftmend.openaudiomc.generic.node.packets.ForwardChannelUserInteractionPacket;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.spigot.modules.voicechat.VoiceChannelService;
import com.craftmend.openaudiomc.spigot.modules.voicechat.channels.Channel;
import com.craftmend.openaudiomc.spigot.modules.voicechat.channels.ChannelEnterResponse;

public class ClientVoiceChanelInteractionHandler extends PayloadHandler<ClientVoiceInteractionPayload> {

    @Override
    public void onReceive(ClientVoiceInteractionPayload payload) {
        Authenticatable authenticatable = findSession(payload.getClient());
        if (authenticatable instanceof ClientConnection) {

            ClientConnection connection = ((ClientConnection) authenticatable);

            if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) {
                UserHooks hooks = OpenAudioMc.getInstance().getInvoker().getUserHooks();
                hooks.sendPacket(connection.getUser(),
                        new ForwardChannelUserInteractionPacket(payload)
                );
                return;
            }

            VoiceChannelService voiceChannelService = OpenAudioMc.getService(VoiceChannelService.class);

            switch (payload.getAction()) {
                case "JOIN_CHANNEL":
                    Channel channel = connection.getRtcSessionManager().getCurrentChannel();
                    if (channel != null) {
                        // already in a channel
                        return;
                    }

                    // try to get the channel by name
                    channel = voiceChannelService.getChannel(payload.getTarget());
                    if (channel == null) {
                        // channel not found
                        return;
                    }

                    // try to join the channel
                    if (channel.attemptEnter(connection.getUser()) == ChannelEnterResponse.OK) {
                        channel.addMember(connection);
                    }
                    break;

                case "LEAVE_CHANNEL":
                    Channel currentChannel = connection.getRtcSessionManager().getCurrentChannel();
                    if (currentChannel != null) {
                        currentChannel.removeMember(connection);
                    }
                    break;
            }
        } else {
            // you don't even have volume
            authenticatable.kickConnection();
        }
    }
}
