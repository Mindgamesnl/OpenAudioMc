package com.craftmend.openaudiomc.generic.proxy;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.event.ApiEventDriver;
import com.craftmend.openaudiomc.api.impl.event.events.TimeServiceUpdateEvent;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
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
import com.craftmend.openaudiomc.generic.user.User;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class ProxyHostService extends Service {

    private UserHooks userHooks;

    @Inject
    public ProxyHostService(UserHooks adapter) {
        // syncronize task updates
        this.userHooks = adapter;
        ApiEventDriver driver = AudioApi.getInstance().getEventDriver();
        if (driver.isSupported(TimeServiceUpdateEvent.class)) {
            driver.on(TimeServiceUpdateEvent.class)
                    .setHandler(service -> {
                        for (ProxyNode node : adapter.getNodes()) {
                            node.sendPacket(new ServerUpdateTimePacket(service.getTimeService()));
                        }
                    });
        }
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
                        new ClientUpdateStatePacket(
                                user.getUniqueId(),
                                connection.getRtcSessionManager().getStreamKey(),
                                connection.getSession().isConnectedToRtc(),
                                connection.getRtcSessionManager().isMicrophoneEnabled(),
                                connection.getAuth().getStaticToken()
                        )
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
            OpenAudioMc.getService(NetworkingService.class).getClient(from.getUniqueId()).getRtcSessionManager().allowSpeaking(p.isCanSpeak());
            return;
        }
    }

}
