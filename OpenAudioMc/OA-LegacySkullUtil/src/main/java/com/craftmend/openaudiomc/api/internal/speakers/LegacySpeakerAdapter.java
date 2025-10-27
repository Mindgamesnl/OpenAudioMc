package com.craftmend.openaudiomc.api.internal.speakers;

import de.tr7zw.changeme.nbtapi.NBT;
import de.tr7zw.changeme.nbtapi.NBTItem;
import de.tr7zw.changeme.nbtapi.NbtApiException;
import de.tr7zw.changeme.nbtapi.iface.ReadWriteNBT;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.Material;
import com.craftmend.openaudiomc.api.internal.AbstractSpeakerNbtUtil;
import org.bukkit.OfflinePlayer;
import org.bukkit.block.Skull;
import org.bukkit.inventory.ItemStack;
import org.bukkit.inventory.meta.SkullMeta;

import java.util.Arrays;
import java.util.UUID;

public class LegacySpeakerAdapter extends AbstractSpeakerNbtUtil {

    private final OfflinePlayer proxiedFakePlayer;
    private final boolean isModern;

    public LegacySpeakerAdapter(String speakerSkinName, String speakerSkinTextureUrl, UUID speakerSkinUUID, Material baseSkullMaterial, boolean isModern, OfflinePlayer proxiedFakePlayer) {
        super(speakerSkinName, speakerSkinTextureUrl, speakerSkinUUID, baseSkullMaterial);
        this.proxiedFakePlayer = proxiedFakePlayer;
        this.isModern = isModern;
    }

    @Override
    public boolean isSpeakerSkull(org.bukkit.block.Block block) {
        if (block.getState() instanceof Skull) {
            Skull skull = (Skull) block.getState();
            if (isModern) {
                if (skull.getOwningPlayer() == null) {
                    if (skull.getOwner() == null) return false;
                    boolean valid = skull.getOwner().equalsIgnoreCase(speakerSkinName);
                    if (valid) {
                        //Possible edge case when someone upgrades the server from 1.11 to 1.12 or higher
                        skull.setOwningPlayer(Bukkit.getOfflinePlayer(speakerUUID));
                    }
                    return valid;
                }
                return skull.getOwningPlayer().getUniqueId().equals(speakerUUID);
            } else {
                if (skull.getOwner() == null) return false;
                return skull.getOwner().equalsIgnoreCase(speakerSkinName);
            }
        }
        return false;
    }

    @Override
    public org.bukkit.inventory.ItemStack getSkull(String source, int radius) {
        ItemStack skull = new ItemStack(baseSkullMaterial);
        skull.setDurability((short) 3);

        SkullMeta sm = (SkullMeta) skull.getItemMeta();
        if (sm != null) {
            sm.setDisplayName(ChatColor.AQUA + "OpenAudioMc Speaker");
            sm.setOwningPlayer(proxiedFakePlayer);
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
                System.out.println("Failed to use modern speaker NBT, this server version does not support it.");
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
