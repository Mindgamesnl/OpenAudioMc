package com.craftmend.openaudiomc.spigot.modules.voicechat.tasks;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.spigot.modules.players.SpigotPlayerService;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import org.bukkit.ChatColor;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collection;

public class PlayerVicinityMessageTask implements Runnable {

    private SpigotPlayerService playerService;

    public PlayerVicinityMessageTask(SpigotPlayerService playerService) {
        this.playerService = playerService;
    }

    private Collection<SpigotConnection> clientListClone() {
        ArrayList<SpigotConnection> cp = new ArrayList<>(playerService.getClients());
        cp.removeIf(p -> p == null);
        return cp;
    }

    @Override
    public void run() {
        int minimumDistance = StorageKey.SETTINGS_VOICECHAT_VICINITY_REMINDER_RADIUS.getInt();

        if (minimumDistance <= 0) {
            return;
        }

        Instant now = Instant.now();
        Collection<SpigotConnection> playersInVoice = clientListClone();
        playersInVoice.removeIf(p -> p == null || !p.getClientConnection().getRtcSessionManager().isReady());
        
        // is no-one connected? then shut up
        if (playersInVoice.isEmpty()) {
            return;
        }
        
        Collection<SpigotConnection> playersWithoutVoice = clientListClone();
        playersWithoutVoice.removeIf(p -> p.getClientConnection().getRtcSessionManager().isReady());
        
        // is everyone already connected? then also shut up
        if (playersWithoutVoice.isEmpty()) {
            return;
        }
        
        // loop for everyone without voice
        for (SpigotConnection client : playersWithoutVoice) {
            if (Duration.between(client.getLastVoiceReminderMessage(), now).getSeconds() < StorageKey.SETTINGS_VOICECHAT_VICINITY_REMINDER_INTERVAL.getInt())
                continue; // we've already sent a message recently, or they just joined
            
            // check if we're in range of someone with voice?
            boolean found = false;
            for (SpigotConnection spigotConnection : playersInVoice) {
                // are we in the same world?
                if (!spigotConnection.getBukkitPlayer().getWorld().equals(client.getBukkitPlayer().getWorld())) continue;

                if (Math.abs(spigotConnection.getBukkitPlayer().getLocation().distanceSquared(client.getBukkitPlayer().getLocation())) <= minimumDistance) {
                    found = true;
                    break;
                }
            }

            if (found) {
                client.getBukkitPlayer().sendMessage(
                        ChatColor.translateAlternateColorCodes('&', StorageKey.MESSAGE_VOICE_IN_VICINITY.getString())
                );
                client.setLastVoiceReminderMessage(now);
            }
        }
    }
    
}
