package com.craftmend.openaudiomc.generic.networking.handlers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.event.events.PlayerConnectVoicechatEvent;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.networking.abstracts.PayloadHandler;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.payloads.in.ClientOpenedRtcPayload;
import com.craftmend.openaudiomc.generic.node.packets.ClientUpdateStatePacket;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;

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
                cc.getRtcSessionManager().setMicrophoneEnabled(false);
                broadcastRtcUpdate(cc.getUser(), true, false, cc.getRtcSessionManager().getStreamKey(), cc);
                break;
            }

            case MICROPHONE_UNMUTE: {
                cc.getRtcSessionManager().setMicrophoneEnabled(true);
                broadcastRtcUpdate(cc.getUser(), true, true, cc.getRtcSessionManager().getStreamKey(), cc);
                break;
            }
        }
    }

    private void handleState(ClientConnection cc, ClientOpenedRtcPayload payload) {
        // the user just enabled their voice chat
        if (payload.isEnabled()) {
            // update our local state to start peer finding and reset their mute state
            cc.getSession().setConnectedToRtc(true);
            cc.getRtcSessionManager().setMicrophoneEnabled(true);
            // send a welcome message
            AudioApi.getInstance().getEventDriver().fire(new PlayerConnectVoicechatEvent(cc));
            cc.getUser().sendMessage(Platform.translateColors(StorageKey.MESSAGE_VC_SETUP.getString()));
            // notify the proxy, if applicable
            broadcastRtcUpdate(cc.getUser(), true, true, cc.getRtcSessionManager().getStreamKey(), cc);
        } else {
            // disable their stream
            cc.getRtcSessionManager().setMicrophoneEnabled(false);
            cc.getSession().setConnectedToRtc(false);
            // notify the proxy, if applicable
            broadcastRtcUpdate(cc.getUser(), false, false, cc.getRtcSessionManager().getStreamKey(), cc);
        }
    }

    private void broadcastRtcUpdate(User player, boolean isConnected, boolean isMicOn, String streamKey, ClientConnection cc) {
        // am I a proxy thingy? then send it to my other thingy
        ClientUpdateStatePacket clientUpdateRtcStatePacket = new ClientUpdateStatePacket(player.getUniqueId(), streamKey, isConnected, isMicOn, cc.getAuth().getStaticToken());
        // sends an update to the server, or nothing if its just spigot
        OpenAudioMc.resolveDependency(UserHooks.class).sendPacket(player, clientUpdateRtcStatePacket);
    }
}
