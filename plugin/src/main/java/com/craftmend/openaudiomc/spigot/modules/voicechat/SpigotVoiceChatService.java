package com.craftmend.openaudiomc.spigot.modules.voicechat;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.EventApi;
import com.craftmend.openaudiomc.api.basic.Actor;
import com.craftmend.openaudiomc.api.events.client.*;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.client.session.RtcSessionManager;
import com.craftmend.openaudiomc.generic.events.events.AccountAddTagEvent;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.players.SpigotPlayerService;
import com.craftmend.openaudiomc.spigot.modules.voicechat.filters.FilterService;
import com.craftmend.openaudiomc.spigot.modules.voicechat.filters.PeerFilter;
import com.craftmend.openaudiomc.spigot.modules.voicechat.filters.impl.GamemodeFilterCustom;
import com.craftmend.openaudiomc.spigot.modules.voicechat.filters.impl.PlayerInChannelFilter;
import com.craftmend.openaudiomc.spigot.modules.voicechat.filters.impl.TeamFilterCustom;
import com.craftmend.openaudiomc.spigot.modules.voicechat.tasks.PlayerPeerTicker;
import com.craftmend.openaudiomc.spigot.modules.voicechat.tasks.PlayerVicinityMessageTask;
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
    private PlayerPeerTicker peerTicker;
    private boolean firstRun = true;
    private int broadcastTickLoop = 0;

    @Override
    public void onEnable() {
        EventApi eventApi = EventApi.getInstance();

        if (StorageKey.SETTINGS_VOICECHAT_VICINITY_REMINDER_ENABLED.getBoolean()) {
            taskService.scheduleAsyncRepeatingTask(
                    new PlayerVicinityMessageTask(OpenAudioMc.getService(SpigotPlayerService.class)),
                    40,
                    40
            );
        }

        // enable voice chat when the tag gets added
        eventApi.registerHandler(AccountAddTagEvent.class, handler -> {
            if (firstRun) {
                int maxDistance = StorageKey.SETTINGS_VC_RADIUS.getInt();

                // tick every second
                peerTicker = new PlayerPeerTicker(maxDistance, new PeerFilter());
                taskService.scheduleAsyncRepeatingTask(peerTicker, 20, 20);
                taskService.scheduleAsyncRepeatingTask(new TickVoicePacketQueue(), 3, 3);
            }
            firstRun = false;
        });

        eventApi.registerHandler(ClientPeerAddEvent.class, event -> {
            // skip if this is disabled in the settings
            if (!event.getOptions().isSpatialAudio()) return; // exclude non-spatial audio clients
            if (!StorageKey.SETTINGS_VC_ANNOUNCEMENTS.getBoolean()) return;

            if (event.getClient().isModerating() && !event.getPeer().isModerating()) {
                return;
            }

            ClientConnection listener = (ClientConnection) event.getClient();

            listener.getRtcSessionManager().getCurrentProximityAdditions().add(event.getPeer().getActor().getUniqueId());
            listener.getRtcSessionManager().getCurrentProximityDrops().remove(event.getPeer().getActor().getUniqueId());
        });

        eventApi.registerHandler(ClientPeerRemovedEvent.class, event -> {
            // skip if this is disabled in the settings
            if (!StorageKey.SETTINGS_VC_ANNOUNCEMENTS.getBoolean()) return;

            if (event.getClient().isModerating() && !event.getPeer().isModerating()) {
                return;
            }

            ClientConnection peer = (ClientConnection) event.getPeer();
            ClientConnection listener = (ClientConnection) event.getClient();

            listener.getRtcSessionManager().getCurrentProximityAdditions().remove(peer.getActor().getUniqueId());
            listener.getRtcSessionManager().getCurrentProximityDrops().add(peer.getActor().getUniqueId());
        });

        // do vc tick loop
        eventApi.registerHandler(VoicechatPeerTickEvent.class, handler -> {
            if (broadcastTickLoop > 2) {
                broadcastTickLoop = 0;
                return;
            }
            broadcastTickLoop++;

            // go over every player and handle their message queue
            for (ClientConnection client : networkingService.getClients()) {
                RtcSessionManager manager = client.getRtcSessionManager();

                // remove mods
                manager.getCurrentProximityAdditions()
                        .removeIf(uuid -> clientFromId(uuid).isModerating());
                manager.getCurrentProximityDrops()
                        .removeIf(uuid -> clientFromId(uuid).isModerating());

                // handle their join messages, if any
                if (!manager.getCurrentProximityAdditions().isEmpty()) {
                    // do these
                    if (manager.getCurrentProximityAdditions().size() == 1) {
                        // do single
                        ClientConnection other = clientFromId(manager.getCurrentProximityAdditions().stream().findFirst().get());
                        if (other != null) {
                            sendMessage(client.getUser(), Platform.translateColors(
                                    StorageKey.MESSAGE_VC_USER_ADDED.getString()
                                            .replace("%name", other.getOwner().getName())
                            ));
                        }
                    } else {
                        // do multiple
                        MultiNameReference mnr = new MultiNameReference(manager.getCurrentProximityAdditions());
                        sendMessage(client.getUser(), Platform.translateColors(
                                StorageKey.MESSAGE_VC_USERS_ADDED.getString()
                                        .replace("%count", mnr.getOtherCount() + "")
                                        .replace("%name", mnr.getFirstName()))
                        );
                    }
                    manager.getCurrentProximityAdditions().clear();
                }

                if (!manager.getCurrentProximityDrops().isEmpty()) {
                    // do these
                    if (manager.getCurrentProximityDrops().size() == 1) {
                        // do single
                        ClientConnection other = clientFromId(manager.getCurrentProximityDrops().stream().findFirst().get());
                        if (other != null) {
                            sendMessage(client.getUser(), Platform.translateColors(
                                    StorageKey.MESSAGE_VC_USER_LEFT.getString()
                                            .replace("%name", other.getOwner().getName())
                            ));
                        }
                    } else {
                        // do multiple
                        MultiNameReference mnr = new MultiNameReference(manager.getCurrentProximityDrops());
                        sendMessage(client.getUser(), Platform.translateColors(
                                StorageKey.MESSAGE_VC_USERS_LEFT.getString()
                                        .replace("%count", mnr.getOtherCount() + "")
                                        .replace("%name", mnr.getFirstName()))
                        );
                    }
                    manager.getCurrentProximityDrops().clear();
                }
            }
        });

        // mute messages
        eventApi.registerHandler(MicrophoneMuteEvent.class, event -> {
            if (!event.getClient().isConnected()) return;
            sendMessage(event.getClient().getActor(), Platform.translateColors(StorageKey.MESSAGE_VC_MIC_MUTE.getString()));
        });

        eventApi.registerHandler(MicrophoneUnmuteEvent.class, event -> {
            if (!event.getClient().isConnected()) return;
            sendMessage(event.getClient().getActor(), Platform.translateColors(StorageKey.MESSAGE_VC_MIC_UNMUTE.getString()));
        });

        eventApi.registerHandler(VoicechatDeafenEvent.class, event -> {
            if (!event.getClient().isConnected()) return;
            sendMessage(event.getClient().getActor(), Platform.translateColors(StorageKey.MESSAGE_VC_DEAFEN.getString()));
        });

        eventApi.registerHandler(VoicechatUndeafenEvent.class, event -> {
            if (!event.getClient().isConnected()) return;
            sendMessage(event.getClient().getActor(), Platform.translateColors(StorageKey.MESSAGE_VC_UNDEAFEN.getString()));
        });

        // enable default rules
        if (StorageKey.SETTINGS_VOICE_FILTERS_GAMEMODE.getBoolean()) {
            OpenAudioLogger.info("Enabling voicechat gamemode filter");
            getService(FilterService.class).addCustomFilter(new GamemodeFilterCustom());
        }

        if (StorageKey.SETTINGS_VOICE_FILTERS_TEAM.getBoolean()) {
            OpenAudioLogger.info("Enabling voicechat team filter");
            getService(FilterService.class).addCustomFilter(new TeamFilterCustom());
        }

        if (StorageKey.SETTINGS_VOICE_FILTERS_CHANNEL.getBoolean()) {
            OpenAudioLogger.info("Enabling voicechat channel filter");
            getService(FilterService.class).addCustomFilter(new PlayerInChannelFilter(networkingService));
        }
    }

    private void sendMessage(Actor player, String message) {
        if (StorageKey.SETTINGS_VC_USE_HOTBAR.getBoolean()) {
            // use hotbar
            User<?> user = (User<?>) player;
            user.sendActionbarMessage(message);
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
