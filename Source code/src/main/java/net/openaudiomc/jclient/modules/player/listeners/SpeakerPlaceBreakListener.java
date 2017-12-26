package net.openaudiomc.jclient.modules.player.listeners;

import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.player.objects.AudioListener;
import org.bukkit.ChatColor;
import org.bukkit.Material;
import org.bukkit.SkullType;
import org.bukkit.block.Skull;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.block.BlockBreakEvent;
import org.bukkit.event.block.BlockPlaceEvent;

public class SpeakerPlaceBreakListener implements Listener {

    private String prefix = ChatColor.DARK_GRAY + "[" + ChatColor.AQUA + "OpenAudioMc" + ChatColor.DARK_GRAY + "] " + ChatColor.GRAY;

    @EventHandler
    public void onPlace(BlockPlaceEvent event) {
        if (event.getBlock().getType() == Material.SKULL) {
            Skull skull = (Skull) event.getBlock().getState();
            if (skull.getSkullType() == SkullType.PLAYER) {
                if (skull.hasOwner()) {
                    if (skull.getOwner().equalsIgnoreCase("OpenAudioMc")) {
                        AudioListener l = OpenAudioMc.getInstance().getPlayerModule().getListeners().get(event.getPlayer().getName());
                        if (l.getPlacingSpeaker() != null) {
                            event.getPlayer().sendMessage(prefix + "Regestering speaker...");
                            OpenAudioMc.getInstance().getMediaModule().placeSpeaker(event.getBlock().getLocation(), l.getPlacingSpeaker());
                            event.getPlayer().sendMessage(prefix + "Created a speaker.");
                        }
                    }
                }
            }
        }
    }

    @EventHandler
    public void onDestroy(BlockBreakEvent event) {
        if (event.getBlock().getType() == Material.SKULL) {
            Skull skull = (Skull) event.getBlock().getState();
            if (skull.getSkullType() == SkullType.PLAYER) {
                if (skull.hasOwner()) {
                    if (skull.getOwner().equalsIgnoreCase("OpenAudioMc")) {
                        AudioListener l = OpenAudioMc.getInstance().getPlayerModule().getListeners().get(event.getPlayer().getName());
                        if (l.getPlacingSpeaker() != null) {
                            event.getPlayer().sendMessage(prefix + "Deleting a speaker...");
                            OpenAudioMc.getInstance().getMediaModule().destroySpeaker(event.getBlock().getLocation());
                            event.getPlayer().sendMessage(prefix + "Deleted a speaker.");
                        }
                    }
                }
            }
        }
    }

}
