package com.craftmend.openaudiomc.spigot.modules.voicechat;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.packets.client.voice.PacketClientDropVoiceStream;
import com.craftmend.openaudiomc.generic.networking.packets.client.voice.PacketClientUpdateVoiceLocations;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceDropPayload;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceUpdatePeerLocationsPayload;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.player.SpigotPlayerAdapter;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public class SpigotVoiceChatModule {

    private int maxDistance;

    public SpigotVoiceChatModule(OpenAudioMcSpigot openAudioMcSpigot) {
        if (!OpenAudioMc.getInstance().getVoiceService().isEnabled()) {
            OpenAudioLogger.toConsole("VoiceChat isn't enabled. Skipping the Spigot module.");
            return;
        }

        maxDistance = StorageKey.SETTINGS_VC_RADIUS.getInt();

        // tick every second
        OpenAudioMc.getInstance().getTaskProvider().scheduleAsyncRepeatingTask(this::tickPlayers, 20, 20);
        OpenAudioMc.getInstance().getTaskProvider().scheduleAsyncRepeatingTask(this::tickUpdateQueue, 3, 3);
    }

    private void tickUpdateQueue() {
        // handle queue
        for (ClientConnection client : OpenAudioMc.getInstance().getNetworkingService().getClients()) {
            if (!client.getClientRtcManager().getLocationUpdateQueue().isEmpty()) {
                client.sendPacket(new PacketClientUpdateVoiceLocations(
                        new ClientVoiceUpdatePeerLocationsPayload(
                                new HashSet<>(client.getClientRtcManager().getLocationUpdateQueue())
                        )
                ));
                client.getClientRtcManager().getLocationUpdateQueue().clear();
            }
        }
    }

    private void tickPlayers() {
        for (ClientConnection client : OpenAudioMc.getInstance().getNetworkingService().getClients()) {
            // am I valid? no? do nothing.
            if (!client.getClientRtcManager().isReady()) continue;

            Player player = ((SpigotPlayerAdapter) client.getPlayer()).getPlayer();

            // find clients in this world, in radius and that are connected with RTC
            Set<ClientConnection> applicableClients = Bukkit.getOnlinePlayers()
                    .stream()
                    .filter(p -> !p.getName().equals(client.getOwnerName()))
                    .filter(onlinePlayer -> onlinePlayer.getWorld().getName().equals(player.getWorld().getName()))
                    .filter(onlinePlayer -> onlinePlayer.getLocation().distance(player.getLocation()) < maxDistance)
                    .map(onlinePlayer -> OpenAudioMc.getInstance().getNetworkingService().getClient(onlinePlayer.getUniqueId()))
                    .filter(cc -> cc.getClientRtcManager().isReady())
                    .collect(Collectors.toSet());

            // find players that we don't have yet
            applicableClients
                    .stream()
                    .filter(peer -> !client.getClientRtcManager().getSubscriptions().contains(peer.getOwnerUUID()))
                    .forEach(peer -> {
                        // connect with these
                        client.getClientRtcManager().linkTo(peer);
                    });

            // check if we have any peers that are no longer applicable
            for (UUID uuid : client.getClientRtcManager().getSubscriptions()
                    .stream()
                    .filter(p -> p != client.getOwnerUUID())
                    .filter(uuid -> !applicableClients.stream().anyMatch(apc -> apc.getOwnerUUID() == uuid))
                    .collect(Collectors.toSet())) {

                // unsubscribe these
                ClientConnection peer = OpenAudioMc.getInstance().getNetworkingService().getClient(uuid);

                client.sendPacket(new PacketClientDropVoiceStream(new ClientVoiceDropPayload(peer.getStreamKey())));
                peer.sendPacket(new PacketClientDropVoiceStream(new ClientVoiceDropPayload(client.getStreamKey())));

                peer.getClientRtcManager().getSubscriptions().remove(client.getOwnerUUID());
                client.getClientRtcManager().getSubscriptions().remove(peer.getOwnerUUID());

                /*
                peer.getPlayer().sendMessage(Platform.translateColors(
                        StorageKey.MESSAGE_VC_USER_LEFT.getString()
                                .replace("%name", client.getOwnerName())
                ));

                client.getPlayer().sendMessage(Platform.translateColors(
                        StorageKey.MESSAGE_VC_USER_LEFT.getString()
                                .replace("%name", peer.getOwnerName())
                ));

                 */

                client.getClientRtcManager().updateLocationWatcher();
                peer.getClientRtcManager().updateLocationWatcher();
            }
        }
    }
}
