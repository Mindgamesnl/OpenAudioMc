package com.craftmend.openaudiomc.generic.proxy;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.EventApi;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.events.events.TimeServiceUpdateEvent;
import com.craftmend.openaudiomc.generic.oac.OpenaudioAccountService;
import com.craftmend.openaudiomc.generic.oac.enums.CraftmendTag;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.packets.client.media.PacketClientDestroyMedia;
import com.craftmend.openaudiomc.generic.networking.packets.client.voice.PacketClientBlurVoiceUi;
import com.craftmend.openaudiomc.generic.networking.packets.client.voice.PacketClientDropVoiceStream;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceBlurUiPayload;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceDropPayload;
import com.craftmend.openaudiomc.generic.node.packets.*;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.proxy.messages.StandardPacket;
import com.craftmend.openaudiomc.generic.proxy.models.ProxyNode;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.api.user.User;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class ProxyHostService extends Service {

    private UserHooks userHooks;

    @Inject
    public ProxyHostService(UserHooks adapter) {
        // syncronize task updates
        this.userHooks = adapter;
        EventApi.getInstance().registerHandler(TimeServiceUpdateEvent.class, event -> {
            for (ProxyNode node : adapter.getNodes()) {
                node.sendPacket(new ServerUpdateTimePacket(event.getTimeService()));
            }
        });
    }

    public void onServerSwitch(User user, ProxyNode from, ProxyNode to) {
        ClientConnection connection = OpenAudioMc.getService(NetworkingService.class).getClient(user.getUniqueId());

        // bungeecord might fire this before player join, as they are technically connecting still, so we need to ignore it
        if (connection == null) return;

        OpenAudioMc.getService(NetworkingService.class).send(connection, new PacketClientDestroyMedia(null, true));

        OpenAudioMc.resolveDependency(TaskService.class).schduleSyncDelayedTask(() -> {
            if (connection.getSession().isConnectedToRtc()) {
                // drop all peers
                connection.sendPacket(new PacketClientBlurVoiceUi(new ClientVoiceBlurUiPayload(false)));
                connection.sendPacket(new PacketClientDropVoiceStream(ClientVoiceDropPayload.dropAll()));
            }

            if (OpenAudioMc.getService(OpenaudioAccountService.class).is(CraftmendTag.VOICECHAT)) {
                this.userHooks.sendPacket(user,
                        ClientUpdateStatePacket.of(connection)
                );
            }

            if (connection.isConnected()) {
                this.userHooks.sendPacket(user, new ClientConnectedPacket(user.getUniqueId()));
            } else {
                this.userHooks.sendPacket(user, new ClientDisconnectedPacket(user.getUniqueId()));
            }
        }, 20 * 2);
    }

    // received packets from spigot
    public void onPacketReceive(User from, StandardPacket packet) {
        if (packet instanceof ForwardSocketPacket) {
            ForwardSocketPacket p = (ForwardSocketPacket) packet;
            ClientConnection clientConnection = OpenAudioMc.getService(NetworkingService.class).getClient(from.getUniqueId());
            if (clientConnection == null) return;
            if (!clientConnection.isConnected()) return;

            OpenAudioMc.getService(NetworkingService.class).send(clientConnection, p.getPayload());
            return;
        }

        if (packet instanceof ForceMuteMicrophonePacket) {
            ForceMuteMicrophonePacket p = (ForceMuteMicrophonePacket) packet;
            OpenAudioMc.getService(NetworkingService.class).getClient(from.getUniqueId()).getRtcSessionManager().preventSpeaking(p.isCanSpeak());
            return;
        }
    }

}
