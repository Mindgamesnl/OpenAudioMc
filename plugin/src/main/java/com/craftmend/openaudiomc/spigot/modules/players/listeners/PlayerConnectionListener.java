package com.craftmend.openaudiomc.spigot.modules.players.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.packets.client.voice.PacketClientToggleMicrophone;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceChatToggleMicrophonePayload;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.spigot.modules.players.PlayerService;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.event.player.PlayerQuitEvent;
import org.bukkit.event.player.PlayerSwapHandItemsEvent;

import java.time.Duration;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class PlayerConnectionListener implements Listener {

    private Map<UUID, Instant> playerMuteTimeout = new HashMap<>();
    private final Instant BOOT = Instant.now();

    @EventHandler
    public void onJoin(PlayerJoinEvent event) {
        OpenAudioMc.getService(PlayerService.class).register(event.getPlayer());
    }

    @EventHandler
    public void onQuit(PlayerQuitEvent event) {
        OpenAudioMc.getService(PlayerService.class).remove(event.getPlayer());
        playerMuteTimeout.remove(event.getPlayer().getUniqueId());
    }

    @EventHandler
    public void onShort(PlayerSwapHandItemsEvent event) {
        if (event.getPlayer().isSneaking() && StorageKey.SETTINGS_VC_TOGGLE_MIC_SWAP.getBoolean()) {

            if (Math.abs(Duration.between(playerMuteTimeout.getOrDefault(event.getPlayer().getUniqueId(), BOOT), Instant.now()).toMillis() / 1000) < 0.8) {
                // disable
                return;
            }

            playerMuteTimeout.put(event.getPlayer().getUniqueId(), Instant.now());
            SpigotConnection spigotConnection = OpenAudioMc.getService(PlayerService.class).getClient(event.getPlayer().getUniqueId());

            if (!spigotConnection.getClientConnection().isConnectedToRtc()) {
                String message = Platform.translateColors(StorageKey.MESSAGE_VC_NOT_CONNECTED.getString());
                event.getPlayer().sendMessage(message);
            }

            spigotConnection.getClientConnection().sendPacket(new PacketClientToggleMicrophone(new ClientVoiceChatToggleMicrophonePayload()));
        }
    }

}
