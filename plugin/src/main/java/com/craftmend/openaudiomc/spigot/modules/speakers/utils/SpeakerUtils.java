package com.craftmend.openaudiomc.spigot.modules.speakers.utils;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerModule;
import com.craftmend.openaudiomc.spigot.services.server.enums.ServerVersion;
import org.bukkit.ChatColor;
import org.bukkit.block.Block;
import org.bukkit.block.Skull;
import org.bukkit.inventory.ItemStack;
import org.bukkit.inventory.meta.SkullMeta;

import java.util.Arrays;

public class SpeakerUtils {

    private static final String speakerSkin = "OpenAudioMc";
    private static final String speakerUUID = "c0db149e-d498-4a16-8e35-93d57577589f";

    public static boolean isSpeakerSkull(Block block) {
        if (block.getState() instanceof Skull) {
            SpeakerModule speakerModule = OpenAudioMcSpigot.getInstance().getSpeakerModule();

            Skull skull = (Skull) block.getState();
            if (speakerModule.getVersion() == ServerVersion.MODERN) {

                try {
                    if (skull.getOwner() == null) return false;
                    return skull.getOwner().equalsIgnoreCase(speakerSkin);
                } catch (Exception e) {
                    // bukkit did remove the method! oh well
                }

                if (skull.getOwningPlayer() == null) return false;
                if (skull.getOwningPlayer().getName() == null) return false;
                return skull.getOwningPlayer().getName().equalsIgnoreCase(speakerSkin) || skull.getOwningPlayer().getUniqueId().toString().equalsIgnoreCase(speakerUUID);
            } else {
                if (skull.getOwner() == null) return false;
                return skull.getOwner().equalsIgnoreCase(speakerSkin);
            }
        }
        return false;
    }

    public static ItemStack getSkull() {
        SpeakerModule speakerModule = OpenAudioMcSpigot.getInstance().getSpeakerModule();
        ItemStack skull = new ItemStack(speakerModule.getPlayerSkullItem());
        skull.setDurability((short) 3);
        SkullMeta sm = (SkullMeta) skull.getItemMeta();
        sm.setOwner("OpenAudioMc");
        sm.setDisplayName(ChatColor.AQUA + "OpenAudioMc Speaker");
        sm.setLore(Arrays.asList("",
                ChatColor.AQUA + "Place me anywhere",
                ChatColor.AQUA + "in the world to place",
                ChatColor.AQUA + "a speaker for that area",
                ""));
        skull.setItemMeta(sm);
        return skull;
    }


}
