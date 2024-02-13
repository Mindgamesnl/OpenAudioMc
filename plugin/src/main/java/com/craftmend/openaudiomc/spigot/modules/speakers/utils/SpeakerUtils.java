package com.craftmend.openaudiomc.spigot.modules.speakers.utils;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.utils.ClassMocker;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerService;
import com.craftmend.openaudiomc.spigot.services.server.enums.ServerVersion;
import de.tr7zw.changeme.nbtapi.NBTItem;
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

    public static final String speakerSkin = "OpenAudioMc";
    public static final UUID speakerUUID = UUID.fromString("c0db149e-d498-4a16-8e35-93d57577589f");
    private static final SpeakerService SPEAKER_SERVICE = OpenAudioMc.getService(SpeakerService.class);

    private static OfflinePlayer proxiedPlayer;

    static {
        // attempt to create a offline player instance
        try {
            proxiedPlayer = new ClassMocker<OfflinePlayer>(OfflinePlayer.class)
                    .addReturnValue("getUniqueId", speakerUUID)
                    .addReturnValue("getName", speakerSkin)
                    .createProxy();
        } catch (Exception e) {
            OpenAudioLogger.warn("Failed to create a OfflinePlayer proxy class. This will cause issues with speakers on servers running post 1.20.2");
        }
    }

    public static boolean isSpeakerSkull(Block block) {
        if (block.getState() instanceof Skull) {
            Skull skull = (Skull) block.getState();
            if (SPEAKER_SERVICE.getVersion() == ServerVersion.MODERN) {
                if (skull.getOwningPlayer() == null) {
                    if (skull.getOwner() == null) return false;

                    boolean valid = skull.getOwner().equalsIgnoreCase(speakerSkin);
                    if (valid) {
                        //Possible edge case when someone upgrades the server from 1.11 to 1.12 or higher
                        skull.setOwningPlayer(Bukkit.getOfflinePlayer(speakerUUID));
                    }
                    return valid;
                }

                return skull.getOwningPlayer().getUniqueId().equals(speakerUUID);
            } else {
                if (skull.getOwner() == null) return false;
                return skull.getOwner().equalsIgnoreCase(speakerSkin);
            }
        }
        return false;
    }

    public static ItemStack getSkull(String source, int radius) {
        ItemStack skull = new ItemStack(SPEAKER_SERVICE.getPlayerSkullItem());
        skull.setDurability((short) 3);
        SkullMeta sm = (SkullMeta) skull.getItemMeta();
        if (sm != null) {
            if (SPEAKER_SERVICE.getVersion() == ServerVersion.MODERN) {
                if (proxiedPlayer != null) {
                    sm.setOwningPlayer(proxiedPlayer);
                } else {
                    // fallback for servers that don't support the proxy class
                    sm.setOwningPlayer(Bukkit.getOfflinePlayer(speakerUUID));
                }
            }

            sm.setOwner(speakerSkin);
            sm.setDisplayName(ChatColor.AQUA + "OpenAudioMc Speaker");
            sm.setLore(Arrays.asList(
                    ChatColor.AQUA + "I'm a super cool speaker!",
                    ChatColor.AQUA + "Simply place me in your world",
                    ChatColor.AQUA + "and I'll play your customized music",
                    "",
                    ChatColor.AQUA + "SRC: " + ChatColor.GREEN + source,
                    ChatColor.AQUA + "Radius: " + ChatColor.GREEN + radius
            ));
            skull.setItemMeta(sm);
        }

        NBTItem nbti = new NBTItem(skull);
        nbti.setString("oa-src", source);
        nbti.setInteger("oa-radius", radius);
        nbti.applyNBT(skull);

        return nbti.getItem();
    }


}
