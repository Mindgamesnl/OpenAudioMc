package com.craftmend.openaudiomc.spigot.modules.voicechat;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.event.ApiEventDriver;
import com.craftmend.openaudiomc.api.impl.event.enums.TickEventType;
import com.craftmend.openaudiomc.api.impl.event.events.*;
import com.craftmend.openaudiomc.api.impl.event.enums.VoiceEventCause;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientRtcManager;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.voicechat.filters.PeerFilter;
import com.craftmend.openaudiomc.spigot.modules.voicechat.tasks.PlayerProximityTicker;
import com.craftmend.openaudiomc.spigot.modules.voicechat.tasks.TickVoicePacketQueue;
import lombok.Getter;

import java.util.UUID;

public class SpigotVoiceChatModule {

    @Getter
    private PlayerProximityTicker proximityTicker;
    private boolean firstRun = true;
    private int broadcastTickLoop = 0;

    public SpigotVoiceChatModule(OpenAudioMcSpigot openAudioMcSpigot) {
        ApiEventDriver eventDriver = AudioApi.getInstance().getEventDriver();

        // enable voice chat when the tag gets added
        eventDriver.on(AccountAddTagEvent.class)
                .setHandler(handler -> {
                    if (firstRun) {
                        int maxDistance = StorageKey.SETTINGS_VC_RADIUS.getInt();

                        // tick every second
                        proximityTicker = new PlayerProximityTicker(maxDistance, new PeerFilter(maxDistance));
                        OpenAudioMc.getInstance().getTaskProvider().scheduleAsyncRepeatingTask(proximityTicker, 20, 20);
                        OpenAudioMc.getInstance().getTaskProvider().scheduleAsyncRepeatingTask(new TickVoicePacketQueue(), 3, 3);
                    }
                    firstRun = false;
                });

        // register events to notify players when player enter, leave, and whatever
        eventDriver.on(PlayerEnterVoiceProximityEvent.class).setHandler(event -> {
            // skip if this is disabled in the settings
            if (!StorageKey.SETTINGS_VC_ANNOUNCEMENTS.getBoolean()) return;

            // only notify normal events, we don't really care about special things
            if (event.getCause() != VoiceEventCause.NORMAL) return;

            event.getSpeaker().getClientRtcManager().getRecentPeerAdditions().add(event.getListener().getOwnerUUID());
            event.getSpeaker().getClientRtcManager().getRecentPeerRemovals().remove(event.getListener().getOwnerUUID());
        });

        eventDriver.on(PlayerLeaveVoiceProximityEvent.class).setHandler(event -> {
            // skip if this is disabled in the settings
            if (!StorageKey.SETTINGS_VC_ANNOUNCEMENTS.getBoolean()) return;

            // only notify normal events, we don't really care about special things
            if (event.getCause() != VoiceEventCause.NORMAL) return;

            event.getSpeaker().getClientRtcManager().getRecentPeerRemovals().add(event.getListener().getOwnerUUID());
            event.getSpeaker().getClientRtcManager().getRecentPeerAdditions().remove(event.getListener().getOwnerUUID());
        });

        // do vc tick loop
        eventDriver.on(VoiceChatPeerTickEvent.class).setHandler(event -> {
            if (event.getWhen() == TickEventType.BEFORE_TICK) return;
            if (broadcastTickLoop > 2) {
                broadcastTickLoop = 0;
                return;
            }
            broadcastTickLoop++;

            // go over every player and handle their message queue
            for (ClientConnection client : OpenAudioMc.getInstance().getNetworkingService().getClients()) {
                ClientRtcManager manager = client.getClientRtcManager();
                // handle their join messages, if any
                if (!manager.getRecentPeerAdditions().isEmpty()) {
                    // do these
                    if (manager.getRecentPeerRemovals().size() == 1) {
                        // do single
                        ClientConnection other = clientFromId(manager.getRecentPeerAdditions().stream().findFirst().get());
                        if (other != null) {
                            client.getPlayer().sendMessage(Platform.translateColors(
                                    StorageKey.MESSAGE_VC_USER_ADDED.getString()
                                            .replace("%name", other.getOwnerName())
                            ));
                        }
                    } else {
                        // do multiple
                    }
                }

                if (!manager.getRecentPeerRemovals().isEmpty()) {
                    // do these
                    if (manager.getRecentPeerRemovals().size() == 1) {
                        // do single
                        ClientConnection other = clientFromId(manager.getRecentPeerRemovals().stream().findFirst().get());
                        if (other != null) {
                            client.getPlayer().sendMessage(Platform.translateColors(
                                    StorageKey.MESSAGE_VC_USER_LEFT.getString()
                                            .replace("%name", other.getOwnerName())
                            ));
                        }
                    } else {
                        // do multiple
                    }
                }

            }
        });

        // mute messages
        eventDriver.on(MicrophoneMuteEvent.class).setHandler(event -> {
            if (!event.getClient().isConnected()) return;
            event.getClient().getPlayer().sendMessage(Platform.translateColors(StorageKey.MESSAGE_VC_MIC_MUTE.getString()));
        });

        eventDriver.on(MicrophoneUnmuteEvent.class).setHandler(event -> {
            if (!event.getClient().isConnected()) return;
            event.getClient().getPlayer().sendMessage(Platform.translateColors(StorageKey.MESSAGE_VC_MIC_UNMUTE.getString()));
        });
    }

    private ClientConnection clientFromId(UUID id) {
        return OpenAudioMc.getInstance().getNetworkingService().getClient(id);
    }
}
