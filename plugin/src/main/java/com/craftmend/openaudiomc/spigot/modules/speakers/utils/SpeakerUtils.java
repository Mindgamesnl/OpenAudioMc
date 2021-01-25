package com.craftmend.openaudiomc.spigot.modules.speakers.utils;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerModule;
import com.craftmend.openaudiomc.spigot.services.server.enums.ServerVersion;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.OfflinePlayer;
import org.bukkit.block.Block;
import org.bukkit.block.Skull;
import org.bukkit.inventory.ItemStack;
import org.bukkit.inventory.meta.SkullMeta;

import java.util.Arrays;
import java.util.UUID;

public class SpeakerUtils {

    public static final String speakerSkin = "OpenAudioMC";
    public static final UUID speakerUUID = UUID.fromString("c0db149e-d498-4a16-8e35-93d57577589f");
    private static final SpeakerModule speakerModule = OpenAudioMcSpigot.getInstance().getSpeakerModule();

    static {
        //Initialize the offline player one time before using it in the plugin. This caches the skin if it's not present
        //so when someone wants to get a head it actually shows the skin and not a Steve head
        Bukkit.getOfflinePlayer(speakerUUID);
    }

    public static boolean isSpeakerSkull(Block block) {
        if (block.getState() instanceof Skull) {
            Skull skull = (Skull) block.getState();
            if (speakerModule.getVersion() == ServerVersion.MODERN) {
                if(skull.getOwningPlayer() == null) {
                    if (skull.getOwner() == null) return false;

                    boolean valid = skull.getOwner().equals(speakerSkin);
                    if(valid) {
                        //Possible edge case when someone upgrades the server from 1.11 to 1.12 or higher
                        skull.setOwningPlayer(Bukkit.getOfflinePlayer(speakerUUID));
                    }
                    return valid;
                }

                return skull.getOwningPlayer().getUniqueId().equals(speakerUUID);
            } else {
                if (skull.getOwner() == null) return false;
                return skull.getOwner().equals(speakerSkin);
            }
        }
        return false;
    }

    public static ItemStack getSkull() {
        ItemStack skull = new ItemStack(speakerModule.getPlayerSkullItem());
        skull.setDurability((short) 3);
        SkullMeta sm = (SkullMeta) skull.getItemMeta();
        if(sm != null) {
            if(speakerModule.getVersion() == ServerVersion.MODERN) {
                sm.setOwningPlayer(Bukkit.getOfflinePlayer(speakerUUID));
            } else {
                sm.setOwner(speakerSkin);
            }
            sm.setOwner(speakerSkin);
            sm.setDisplayName(ChatColor.AQUA + "OpenAudioMc Speaker");
            sm.setLore(Arrays.asList("",
                    ChatColor.AQUA + "Place me anywhere",
                    ChatColor.AQUA + "in the world to place",
                    ChatColor.AQUA + "a speaker for that area",
                    ""));
            skull.setItemMeta(sm);
        }
        return skull;
    }


}
