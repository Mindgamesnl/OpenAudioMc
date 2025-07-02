package com.craftmend.openaudiomc.spigot.modules.speakers.utils;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.utils.ClassMocker;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerService;
import com.craftmend.openaudiomc.spigot.services.server.enums.ServerVersion;
import de.tr7zw.changeme.nbtapi.NBT;
import de.tr7zw.changeme.nbtapi.NBTItem;
import de.tr7zw.changeme.nbtapi.NbtApiException;
import de.tr7zw.changeme.nbtapi.iface.ReadWriteNBT;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.OfflinePlayer;
import org.bukkit.block.Block;
import org.bukkit.block.Skull;
import org.bukkit.inventory.ItemStack;
import org.bukkit.inventory.meta.SkullMeta;

import java.util.Arrays;
import java.util.Base64;
import java.util.UUID;

import static com.craftmend.openaudiomc.generic.storage.enums.StorageKey.*;

public class SpeakerUtils {

    public static final String speakerSkin = SETTINGS_SPEAKER_SKIN_NAME.getString();
    public static final UUID speakerUUID = UUID.fromString(SETTINGS_SPEAKER_SKIN_UUID.getString());
    public static final String textureValue;
    private static OfflinePlayer FAKE_SKULL_OWNER = new ClassMocker<OfflinePlayer>(OfflinePlayer.class)
            .addReturnValue("getUniqueId", speakerUUID)
            .addReturnValue("getName", speakerSkin)
            .createProxy();

    static {
        String rawUrl = SETTINGS_SPEAKER_SKIN_TEXTURE.getString();
        // convert to http instead of https, don't know if its important, but lets stick with what our
        // mojang gods decided
        rawUrl = rawUrl.replace("https://", "http://");

        // turn it into the json format, our gods have also decided this is the way to go
        String json = "{textures:{SKIN:{url:\"" + rawUrl + "\"}}}";
        textureValue = Base64.getEncoder().encodeToString(json.getBytes());
    }

    private static final SpeakerService SPEAKER_SERVICE = OpenAudioMc.getService(SpeakerService.class);

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
            sm.setDisplayName(ChatColor.AQUA + "OpenAudioMc Speaker");
            sm.setOwningPlayer(FAKE_SKULL_OWNER);
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

        // For Minecraft 1.20.4 and below
        NBT.modify(skull, nbt -> {
            ReadWriteNBT skullOwnerCompound = nbt.getOrCreateCompound("SkullOwner");
            skullOwnerCompound.setUUID("Id", speakerUUID);

            skullOwnerCompound.getOrCreateCompound("Properties")
                    .getCompoundList("textures")
                    .addCompound()
                    .setString("Value", textureValue);
        });

        try {
            NBT.modifyComponents(skull, nbt -> {
                ReadWriteNBT profileNbt = nbt.getOrCreateCompound("minecraft:profile");
                profileNbt.setUUID("id", speakerUUID);
                ReadWriteNBT propertiesNbt = profileNbt.getCompoundList("properties").addCompound();
                propertiesNbt.setString("name", "textures");
                propertiesNbt.setString("value", textureValue);
            });
        } catch (NbtApiException e) {
            if (e.getMessage().contains("only works for")) {
                OpenAudioLogger.info("Failed to use modern speaker NBT, this server version does not support it.");
            } else {
                e.printStackTrace();
            }
        }

        NBTItem nbti = new NBTItem(skull);
        nbti.setString("oa-src", source);
        nbti.setInteger("oa-radius", radius);
        nbti.applyNBT(skull);

        return nbti.getItem();
    }


}
