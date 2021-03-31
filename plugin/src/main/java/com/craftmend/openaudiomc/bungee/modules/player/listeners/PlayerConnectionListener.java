package com.craftmend.openaudiomc.bungee.modules.player.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.packets.client.media.PacketClientDestroyMedia;
import com.craftmend.openaudiomc.generic.networking.packets.client.voice.PacketClientDropVoiceStream;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceDropPayload;
import com.craftmend.openaudiomc.generic.node.packets.ClientConnectedPacket;
import com.craftmend.openaudiomc.generic.node.packets.ClientDisconnectedPacket;
import com.craftmend.openaudiomc.generic.node.packets.ClientSyncHueStatePacket;
import com.craftmend.openaudiomc.velocity.messages.PacketPlayer;
import com.craftmend.openaudiomc.velocity.messages.StandardPacket;
import com.craftmend.openaudiomc.generic.node.packets.ClientUpdateStatePacket;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import net.md_5.bungee.api.event.PlayerDisconnectEvent;
import net.md_5.bungee.api.event.PostLoginEvent;
import net.md_5.bungee.api.event.ServerSwitchEvent;
import net.md_5.bungee.api.plugin.Listener;
import net.md_5.bungee.event.EventHandler;

/**
 * This implements all player based interactions on the bungeecord network
 * (session tracking, descriptions, packet routing and state synchronization)
 */
public class PlayerConnectionListener implements Listener {

    @EventHandler
    public void onPostLogin(PostLoginEvent event) {
        OpenAudioMc.getInstance().getNetworkingService().register(event.getPlayer());
    }

    @EventHandler
    public void onLogout(PlayerDisconnectEvent event) {
        OpenAudioMc.getInstance().getNetworkingService().remove(event.getPlayer().getUniqueId());
    }

    @EventHandler
    public void onSwitch(ServerSwitchEvent event) {
        ClientConnection connection = OpenAudioMc.getInstance().getNetworkingService().getClient(event.getPlayer().getUniqueId());
        OpenAudioMc.getInstance().getNetworkingService().send(connection, new PacketClientDestroyMedia(null, true));

        OpenAudioMc.getInstance().getTaskProvider().schduleSyncDelayedTask(() -> {
            ProxiedPlayer player = event.getPlayer();
            PacketPlayer packetPlayer = new PacketPlayer(player);

            if (connection.isHasHueLinked()) {
                sendPacket(packetPlayer, new ClientSyncHueStatePacket(player.getUniqueId()));
            }

            if (connection.isConnectedToRtc()) {
                // drop all peers
                connection.sendPacket(new PacketClientDropVoiceStream(new ClientVoiceDropPayload(null)));
            }

            sendPacket(packetPlayer,
                    new ClientUpdateStatePacket(
                            player.getUniqueId(),
                            connection.getStreamKey(),
                            connection.isConnectedToRtc(),
                            connection.getClientRtcManager().isMicrophoneEnabled(),
                            connection.getSession().getStaticToken()
                    )
            );

            if (connection.isConnected()) {
                sendPacket(packetPlayer, new ClientConnectedPacket(player.getUniqueId()));
            } else {
                sendPacket(packetPlayer, new ClientDisconnectedPacket(player.getUniqueId()));
            }
        }, 20 * 2);
    }

    private void sendPacket(PacketPlayer packetPlayer, StandardPacket packet){
        OpenAudioMcBungee.getInstance().getNodeManager().getPacketManager().sendPacket(packetPlayer, packet);
    }

}
