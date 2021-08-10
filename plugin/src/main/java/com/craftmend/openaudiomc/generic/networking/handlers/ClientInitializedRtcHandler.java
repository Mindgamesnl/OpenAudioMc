package com.craftmend.openaudiomc.generic.networking.handlers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.event.events.PlayerConnectVoicechatEvent;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.bungee.modules.node.NodeManager;
import com.craftmend.openaudiomc.velocity.messages.PacketPlayer;
import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.generic.networking.abstracts.PayloadHandler;
import com.craftmend.openaudiomc.generic.networking.client.interfaces.PlayerContainer;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.payloads.in.ClientOpenedRtcPayload;
import com.craftmend.openaudiomc.generic.node.packets.ClientUpdateStatePacket;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.player.ProxiedPlayerAdapter;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.velocity.OpenAudioMcVelocity;
import com.craftmend.openaudiomc.velocity.generic.player.VelocityPlayerAdapter;
import com.velocitypowered.api.proxy.Player;
import net.md_5.bungee.api.connection.ProxiedPlayer;

public class ClientInitializedRtcHandler extends PayloadHandler<ClientOpenedRtcPayload> {

    /*
     * This entire class is just a mess and should probably be divided into two separate packets
     * One for state switching and one for remote events
     *
     * Guess tomorrow me will have to do that cuz I'm honestly too lazy rn
     *
     * By the way, if you are reading this past 28 march, 2021
     * then I forgot
     */

    @Override
    public void onReceive(ClientOpenedRtcPayload payload) {
        Authenticatable authenticatable = findSession(payload.getClient());
        if (authenticatable instanceof ClientConnection) {
            ClientConnection cc = ((ClientConnection) authenticatable);

            // is it an event, or general?
            if (payload.getEvent() == null) {
                handleState(cc, payload);
            } else {
                // handle event
                handleEvents(cc, payload);
            }
        } else {
            // you don't even have volume
            authenticatable.kickConnection();
        }
    }

    private void handleEvents(ClientConnection cc, ClientOpenedRtcPayload payload) {
        switch (payload.getEvent()) {

            case MICROPHONE_MUTED: {
                cc.getClientRtcManager().setMicrophoneEnabled(false);
                broadcastRtcUpdate(cc.getPlayer(), true, false, cc.getStreamKey(), cc);
                break;
            }

            case MICROPHONE_UNMUTE: {
                cc.getClientRtcManager().setMicrophoneEnabled(true);
                broadcastRtcUpdate(cc.getPlayer(), true, true, cc.getStreamKey(), cc);
                break;
            }
        }
    }

    private void handleState(ClientConnection cc, ClientOpenedRtcPayload payload) {
        // the user just enabled their voice chat
        if (payload.isEnabled()) {
            // update our local state to start peer finding and reset their mute state
            cc.setConnectedToRtc(true);
            cc.getClientRtcManager().setMicrophoneEnabled(true);
            // send a welcome message
            AudioApi.getInstance().getEventDriver().fire(new PlayerConnectVoicechatEvent(cc));
            cc.getPlayer().sendMessage(Platform.translateColors(StorageKey.MESSAGE_VC_SETUP.getString()));
            // notify the proxy, if applicable
            broadcastRtcUpdate(cc.getPlayer(), true, true, cc.getStreamKey(), cc);
        } else {
            // disable their stream
            cc.getClientRtcManager().setMicrophoneEnabled(false);
            cc.setConnectedToRtc(false);
            // notify the proxy, if applicable
            broadcastRtcUpdate(cc.getPlayer(), false, false, cc.getStreamKey(), cc);
        }
    }

    private void broadcastRtcUpdate(PlayerContainer player, boolean isConnected, boolean isMicOn, String streamKey, ClientConnection cc) {
        // am I a proxy thingy? then send it to my other thingy
        ClientUpdateStatePacket clientUpdateRtcStatePacket = new ClientUpdateStatePacket(player.getUniqueId(), streamKey, isConnected, isMicOn, cc.getSessionTokens().getStaticToken());
        switch (OpenAudioMc.getInstance().getPlatform()) {
            case BUNGEE:
                ProxiedPlayer proxiedPlayer = ((ProxiedPlayerAdapter) player).getPlayer();
                OpenAudioMc.getService(NodeManager.class).getPacketManager().sendPacket(new PacketPlayer(proxiedPlayer), clientUpdateRtcStatePacket);
                break;
            case VELOCITY:
                Player velocityPlayer = ((VelocityPlayerAdapter) player).getPlayer();
                OpenAudioMcVelocity.getInstance().getNodeManager().getPacketManager().sendPacket(new PacketPlayer(velocityPlayer), clientUpdateRtcStatePacket);
                break;
        }
    }
}
