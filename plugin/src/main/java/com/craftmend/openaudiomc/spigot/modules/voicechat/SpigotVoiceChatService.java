package com.craftmend.openaudiomc.spigot.modules.voicechat;

import com.craftmend.openaudiomc.api.impl.event.ApiEventDriver;
import com.craftmend.openaudiomc.api.impl.event.enums.TickEventType;
import com.craftmend.openaudiomc.api.impl.event.events.*;
import com.craftmend.openaudiomc.api.impl.event.enums.VoiceEventCause;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.client.session.RtcSessionManager;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.spigot.modules.voicechat.filters.PeerFilter;
import com.craftmend.openaudiomc.spigot.modules.voicechat.tasks.PlayerProximityTicker;
import com.craftmend.openaudiomc.spigot.modules.voicechat.tasks.TickVoicePacketQueue;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.UUID;

@NoArgsConstructor
public class SpigotVoiceChatService extends Service {

    @Inject
    private TaskService taskService;
    @Inject
    private NetworkingService networkingService;

    @Getter
    private PlayerProximityTicker proximityTicker;
    private boolean firstRun = true;
    private int broadcastTickLoop = 0;

    @Override
    public void onEnable() {
        ApiEventDriver eventDriver = AudioApi.getInstance().getEventDriver();

        // enable voice chat when the tag gets added
        eventDriver.on(AccountAddTagEvent.class)
                .setHandler(handler -> {
                    if (firstRun) {
                        int maxDistance = StorageKey.SETTINGS_VC_RADIUS.getInt();

                        // tick every second
                        proximityTicker = new PlayerProximityTicker(maxDistance, new PeerFilter());
                        taskService.scheduleAsyncRepeatingTask(proximityTicker, 20, 20);
                        taskService.scheduleAsyncRepeatingTask(new TickVoicePacketQueue(), 3, 3);
                    }
                    firstRun = false;
                });

        // register events to notify players when player enter, leave, and whatever
        eventDriver.on(PlayerEnterVoiceProximityEvent.class).setHandler(event -> {
            // skip if this is disabled in the settings
            if (!StorageKey.SETTINGS_VC_ANNOUNCEMENTS.getBoolean()) return;

            // only notify normal events, we don't really care about special things
            if (event.getCause() != VoiceEventCause.NORMAL) return;

            event.getSpeaker().getRtcSessionManager().getRecentPeerAdditions().add(event.getListener().getOwner().getUniqueId());
            event.getSpeaker().getRtcSessionManager().getRecentPeerRemovals().remove(event.getListener().getOwner().getUniqueId());
        });

        eventDriver.on(PlayerLeaveVoiceProximityEvent.class).setHandler(event -> {
            // skip if this is disabled in the settings
            if (!StorageKey.SETTINGS_VC_ANNOUNCEMENTS.getBoolean()) return;

            // only notify normal events, we don't really care about special things
            if (event.getCause() != VoiceEventCause.NORMAL) return;

            event.getSpeaker().getRtcSessionManager().getRecentPeerRemovals().add(event.getListener().getOwner().getUniqueId());
            event.getSpeaker().getRtcSessionManager().getRecentPeerAdditions().remove(event.getListener().getOwner().getUniqueId());
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
            for (ClientConnection client : networkingService.getClients()) {
                RtcSessionManager manager = client.getRtcSessionManager();
                // handle their join messages, if any
                if (!manager.getRecentPeerAdditions().isEmpty()) {
                    // do these
                    if (manager.getRecentPeerAdditions().size() == 1) {
                        // do single
                        ClientConnection other = clientFromId(manager.getRecentPeerAdditions().stream().findFirst().get());
                        if (other != null) {
                            sendMessage(client.getUser(), Platform.translateColors(
                                    StorageKey.MESSAGE_VC_USER_ADDED.getString()
                                            .replace("%name", other.getOwner().getName())
                            ));
                        }
                    } else {
                        // do multiple
                        MultiNameReference mnr = new MultiNameReference(manager.getRecentPeerAdditions());
                        sendMessage(client.getUser(), Platform.translateColors(
                                StorageKey.MESSAGE_VC_USERS_ADDED.getString()
                                        .replace("%count", mnr.getOtherCount() + "")
                                        .replace("%name", mnr.getFirstName()))
                        );
                    }
                    manager.getRecentPeerAdditions().clear();
                }

                if (!manager.getRecentPeerRemovals().isEmpty()) {
                    // do these
                    if (manager.getRecentPeerRemovals().size() == 1) {
                        // do single
                        ClientConnection other = clientFromId(manager.getRecentPeerRemovals().stream().findFirst().get());
                        if (other != null) {
                            sendMessage(client.getUser(), Platform.translateColors(
                                    StorageKey.MESSAGE_VC_USER_LEFT.getString()
                                            .replace("%name", other.getOwner().getName())
                            ));
                        }
                    } else {
                        // do multiple
                        MultiNameReference mnr = new MultiNameReference(manager.getRecentPeerRemovals());
                        sendMessage(client.getUser(), Platform.translateColors(
                                StorageKey.MESSAGE_VC_USERS_LEFT.getString()
                                        .replace("%count", mnr.getOtherCount() + "")
                                        .replace("%name", mnr.getFirstName()))
                        );
                    }
                    manager.getRecentPeerRemovals().clear();
                }
            }
        });

        // mute messages
        eventDriver.on(MicrophoneMuteEvent.class).setHandler(event -> {
            if (!event.getClient().isConnected()) return;
            sendMessage(event.getClient().getUser(), Platform.translateColors(StorageKey.MESSAGE_VC_MIC_MUTE.getString()));
        });

        eventDriver.on(MicrophoneUnmuteEvent.class).setHandler(event -> {
            if (!event.getClient().isConnected()) return;
            sendMessage(event.getClient().getUser(), Platform.translateColors(StorageKey.MESSAGE_VC_MIC_UNMUTE.getString()));
        });
    }

    private void sendMessage(User player, String message) {
        if (StorageKey.SETTINGS_VC_USE_HOTBAR.getBoolean()) {
            // use hotbar
            player.sendActionbarMessage(message);
        } else {
            // normal
            player.sendMessage(message);
        }
    }

    @Getter
    @AllArgsConstructor
    private class MultiNameReference {

        private String firstName;
        private int otherCount = -1;

        public MultiNameReference(Set<UUID> others) {
            for (UUID other : others) {
                ClientConnection c = clientFromId(other);
                if (c != null) {
                    if (otherCount == -1) {
                        firstName = c.getOwner().getName();
                    }
                    otherCount++;
                }
            }
        }

    }

    private ClientConnection clientFromId(UUID id) {
        return networkingService.getClient(id);
    }
}
