package com.craftmend.openaudiomc.velocity.modules.player.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.craftmend.CraftmendService;
import com.craftmend.openaudiomc.generic.craftmend.enums.CraftmendTag;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.packets.client.media.PacketClientDestroyMedia;
import com.craftmend.openaudiomc.generic.networking.packets.client.voice.PacketClientDropVoiceStream;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceDropPayload;
import com.craftmend.openaudiomc.generic.node.packets.ClientConnectedPacket;
import com.craftmend.openaudiomc.generic.node.packets.ClientDisconnectedPacket;
import com.craftmend.openaudiomc.generic.node.packets.ClientSyncHueStatePacket;
import com.craftmend.openaudiomc.generic.node.packets.ClientUpdateStatePacket;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.player.adapters.VelocityUserAdapter;
import com.craftmend.openaudiomc.velocity.OpenAudioMcVelocity;
import com.velocitypowered.api.event.Subscribe;
import com.velocitypowered.api.event.connection.DisconnectEvent;
import com.velocitypowered.api.event.connection.PostLoginEvent;
import com.velocitypowered.api.event.player.ServerConnectedEvent;
import com.velocitypowered.api.proxy.Player;
import lombok.SneakyThrows;
import com.craftmend.openaudiomc.velocity.messages.PacketPlayer;
import com.craftmend.openaudiomc.velocity.messages.StandardPacket;

public class PlayerConnectionListener {

    @SneakyThrows
    @Subscribe
    public void onPostLogin(PostLoginEvent e) {
        OpenAudioMc.getService(NetworkingService.class).register(new VelocityUserAdapter(e.getPlayer()), null);
    }

    @Subscribe
    public void onLogout(DisconnectEvent event) {
        OpenAudioMc.getService(NetworkingService.class).remove(event.getPlayer().getUniqueId());
    }

    @Subscribe
    public void onSwitch(ServerConnectedEvent event) {
        ClientConnection connection = OpenAudioMc.getService(NetworkingService.class).getClient(event.getPlayer().getUniqueId());
        OpenAudioMc.getService(NetworkingService.class).send(connection, new PacketClientDestroyMedia(null, true));

        OpenAudioMc.resolveDependency(TaskService.class).schduleSyncDelayedTask(() -> {
            Player player = event.getPlayer();

            if (connection.isHasHueLinked()) {
                sendPacket(player, new ClientSyncHueStatePacket(player.getUniqueId()));
            }

            if (connection.isConnectedToRtc()) {
                // drop all peers
                connection.sendPacket(new PacketClientDropVoiceStream(new ClientVoiceDropPayload(null)));
            }

            if (OpenAudioMc.getService(CraftmendService.class).is(CraftmendTag.VOICECHAT)) {
                sendPacket(player,
                        new ClientUpdateStatePacket(
                                player.getUniqueId(),
                                connection.getStreamKey(),
                                connection.isConnectedToRtc(),
                                connection.getClientRtcManager().isMicrophoneEnabled(),
                                connection.getSession().getStaticToken()
                        )
                );
            }

            if (connection.isConnected()) {
                sendPacket(player, new ClientConnectedPacket(player.getUniqueId()));
            } else {
                sendPacket(player, new ClientDisconnectedPacket(player.getUniqueId()));
            }
        }, 20 * 2);
    }

    private void sendPacket(Player player, StandardPacket packet) {
        OpenAudioMcVelocity.getInstance().getNodeManager().getPacketManager().sendPacket(new PacketPlayer(player), packet);
    }

}
