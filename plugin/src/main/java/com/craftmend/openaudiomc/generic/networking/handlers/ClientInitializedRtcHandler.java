package com.craftmend.openaudiomc.generic.networking.handlers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.velocitypluginmessageframework.PacketPlayer;
import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.generic.networking.abstracts.PayloadHandler;
import com.craftmend.openaudiomc.generic.networking.client.interfaces.PlayerContainer;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.payloads.in.ClientOpenedRtcPayload;
import com.craftmend.openaudiomc.generic.node.packets.ClientConnectedPacket;
import com.craftmend.openaudiomc.generic.node.packets.ClientUpdateRtcStatePacket;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.player.ProxiedPlayerAdapter;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.velocity.OpenAudioMcVelocity;
import com.craftmend.openaudiomc.velocity.generic.player.VelocityPlayerAdapter;
import com.velocitypowered.api.proxy.Player;
import net.md_5.bungee.api.connection.ProxiedPlayer;

public class ClientInitializedRtcHandler extends PayloadHandler<ClientOpenedRtcPayload> {

    @Override
    public void onReceive(ClientOpenedRtcPayload payload) {
        Authenticatable authenticatable = findSession(payload.getClient());
        if (authenticatable instanceof ClientConnection) {
            ClientConnection cc = ((ClientConnection) authenticatable);

            // is it an event, or general?
            if (payload.getEvent() == null) {
                // general status
                if (payload.isEnabled()) {
                    cc.setConnectedToRtc(true);
                    cc.getClientRtcManager().setMicrophoneEnabled(true);
                    cc.getPlayer().sendMessage(Platform.translateColors(StorageKey.MESSAGE_VC_SETUP.getString()));
                    broadcastRtcUpdate(cc.getPlayer(), true, true, cc.getStreamKey());
                } else {
                    cc.getClientRtcManager().setMicrophoneEnabled(false);
                    cc.setConnectedToRtc(false);
                    broadcastRtcUpdate(cc.getPlayer(), false, false, cc.getStreamKey());
                }
            } else {
                // handle event
                switch (payload.getEvent()) {
                    case MICROPHONE_MUTED: {
                        cc.getPlayer().sendMessage(Platform.translateColors(StorageKey.MESSAGE_VC_MIC_MUTE.getString()));
                        cc.getClientRtcManager().setMicrophoneEnabled(false);
                        broadcastRtcUpdate(cc.getPlayer(), true, false, cc.getStreamKey());
                        break;
                    }

                    case MICROPHONE_UNMUTE: {
                        cc.getPlayer().sendMessage(Platform.translateColors(StorageKey.MESSAGE_VC_MIC_UNMUTE.getString()));
                        cc.getClientRtcManager().setMicrophoneEnabled(true);
                        broadcastRtcUpdate(cc.getPlayer(), true, true, cc.getStreamKey());
                        break;
                    }
                }
            }
        } else {
            // you don't even have volume
            authenticatable.kickConnection();
        }
    }

    private void broadcastRtcUpdate(PlayerContainer player, boolean isConnected, boolean isMicOn, String streamKey) {
        // am I a proxy thingy? then send it to my other thingy
        ClientUpdateRtcStatePacket clientUpdateRtcStatePacket = new ClientUpdateRtcStatePacket(player.getUniqueId(), streamKey, isConnected, isMicOn);
        switch (OpenAudioMc.getInstance().getPlatform()){
            case BUNGEE:
                ProxiedPlayer proxiedPlayer = ((ProxiedPlayerAdapter) player).getPlayer();
                OpenAudioMcBungee.getInstance().getNodeManager().getPacketManager().sendPacket(new PacketPlayer(proxiedPlayer), clientUpdateRtcStatePacket);
                break;
            case VELOCITY:
                Player velocityPlayer = ((VelocityPlayerAdapter) player).getPlayer();
                OpenAudioMcVelocity.getInstance().getNodeManager().getPacketManager().sendPacket(new PacketPlayer(velocityPlayer), clientUpdateRtcStatePacket);
                break;
        }
    }
}
