package com.craftmend.openaudiomc.generic.networking.handlers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.EventApi;
import com.craftmend.openaudiomc.api.events.client.VoicechatReadyEvent;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.networking.abstracts.PayloadHandler;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
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
                broadcastRtcUpdate(
                        cc.getUser(),
                        true,
                        false,
                        cc.getRtcSessionManager().isVoicechatDeafened(),
                        cc.getRtcSessionManager().getStreamKey(),
                        cc
                );
                break;
            }

            case MICROPHONE_UNMUTE: {
                cc.getRtcSessionManager().setMicrophoneEnabled(true);
                broadcastRtcUpdate(
                        cc.getUser(),
                        true,
                        true,
                        cc.getRtcSessionManager().isVoicechatDeafened(),
                        cc.getRtcSessionManager().getStreamKey(),
                        cc
                );
                break;
            }

            case SELF_DEAFEN: {
                cc.getRtcSessionManager().setVoicechatDeafened(true);
                broadcastRtcUpdate(
                        cc.getUser(),
                        true,
                        cc.getRtcSessionManager().isMicrophoneEnabled(),
                        cc.getRtcSessionManager().isVoicechatDeafened(),
                        cc.getRtcSessionManager().getStreamKey(),
                        cc
                );
                break;
            }

            case SELF_UNDEAFEN: {
                cc.getRtcSessionManager().setVoicechatDeafened(false);
                broadcastRtcUpdate(
                        cc.getUser(),
                        true,
                        cc.getRtcSessionManager().isMicrophoneEnabled(),
                        cc.getRtcSessionManager().isVoicechatDeafened(),
                        cc.getRtcSessionManager().getStreamKey(),
                        cc
                );
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
            cc.getRtcSessionManager().setVoicechatDeafened(false);
            // send a welcome message
            EventApi.getInstance().callEvent(new VoicechatReadyEvent(cc));
            cc.getUser().sendMessage(Platform.translateColors(StorageKey.MESSAGE_VC_SETUP.getString()));
            // notify the proxy, if applicable
            broadcastRtcUpdate(cc.getUser(), true, true, cc.getRtcSessionManager().isVoicechatDeafened(), cc.getRtcSessionManager().getStreamKey(), cc);
        } else {
            // disable their stream
            cc.getRtcSessionManager().setMicrophoneEnabled(false);
            cc.getRtcSessionManager().setVoicechatDeafened(false);
            cc.getSession().setConnectedToRtc(false);
            // notify the proxy, if applicable
            broadcastRtcUpdate(cc.getUser(), false, false, false, cc.getRtcSessionManager().getStreamKey(), cc);
        }
    }

    private void broadcastRtcUpdate(User player, boolean isConnected, boolean isMicOn, boolean isDeafened, String streamKey, ClientConnection cc) {
        // am I a proxy thingy? then send it to my other thingy
        ClientUpdateStatePacket clientUpdateRtcStatePacket = new ClientUpdateStatePacket(player.getUniqueId(), streamKey, isConnected, isMicOn, isDeafened, cc.getAuth().getStaticToken(), cc.getVolume());
        // sends an update to the server, or nothing if its just spigot
        OpenAudioMc.resolveDependency(UserHooks.class).sendPacket(player, clientUpdateRtcStatePacket);
    }
}
