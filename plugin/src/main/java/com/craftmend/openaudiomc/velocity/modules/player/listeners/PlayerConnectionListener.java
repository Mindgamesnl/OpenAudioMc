package com.craftmend.openaudiomc.velocity.modules.player.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.craftmend.enums.CraftmendTag;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.packets.client.media.PacketClientDestroyMedia;
import com.craftmend.openaudiomc.generic.networking.packets.client.voice.PacketClientDropVoiceStream;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceDropPayload;
import com.craftmend.openaudiomc.generic.node.packets.ClientConnectedPacket;
import com.craftmend.openaudiomc.generic.node.packets.ClientDisconnectedPacket;
import com.craftmend.openaudiomc.generic.node.packets.ClientSyncHueStatePacket;
import com.craftmend.openaudiomc.generic.node.packets.ClientUpdateStatePacket;
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
        OpenAudioMc.getInstance().getNetworkingService().register(e.getPlayer());
    }

    @Subscribe
    public void onLogout(DisconnectEvent event) {
        OpenAudioMc.getInstance().getNetworkingService().remove(event.getPlayer().getUniqueId());
    }

    @Subscribe
    public void onSwitch(ServerConnectedEvent event) {
        ClientConnection connection = OpenAudioMc.getInstance().getNetworkingService().getClient(event.getPlayer().getUniqueId());
        OpenAudioMc.getInstance().getNetworkingService().send(connection, new PacketClientDestroyMedia(null, true));

        OpenAudioMc.getInstance().getTaskProvider().schduleSyncDelayedTask(() -> {
            Player player = event.getPlayer();

            if (connection.isHasHueLinked()) {
                sendPacket(player, new ClientSyncHueStatePacket(player.getUniqueId()));
            }

            if (connection.isConnectedToRtc()) {
                // drop all peers
                connection.sendPacket(new PacketClientDropVoiceStream(new ClientVoiceDropPayload(null)));
            }

            if (OpenAudioMc.getInstance().getCraftmendService().is(CraftmendTag.VOICECHAT)) {
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
