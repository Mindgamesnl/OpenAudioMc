package com.craftmend.openaudiomc.api.internal.speaker;

import com.craftmend.openaudiomc.api.internal.AbstractSpeakerNbtUtil;
import de.tr7zw.changeme.nbtapi.NBT;
import de.tr7zw.changeme.nbtapi.NBTItem;
import de.tr7zw.changeme.nbtapi.NbtApiException;
import de.tr7zw.changeme.nbtapi.iface.ReadWriteNBT;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.Server;
import org.bukkit.block.Skull;
import org.bukkit.inventory.ItemStack;
import org.bukkit.inventory.meta.SkullMeta;
import org.bukkit.profile.PlayerProfile;
import org.bukkit.profile.PlayerTextures;

import java.net.URL;
import java.util.Arrays;

public class ModernSpeakerAdapter extends AbstractSpeakerNbtUtil {

    private final URL parsedSkinUrl;

    public ModernSpeakerAdapter(String speakerSkinName, String textureUrl, java.util.UUID speakerUUID, org.bukkit.Material baseSkullMaterial) {
        super(speakerSkinName, textureUrl, speakerUUID, baseSkullMaterial);

        try {
            this.parsedSkinUrl = new URL(this.rawSkinUrl);
        } catch (Exception e) {
            throw new RuntimeException("Invalid skin URL: " + this.rawSkinUrl, e);
        }
    }

    @Override
    public boolean isSpeakerSkull(org.bukkit.block.Block block) {
        if (block.getState() instanceof Skull) {
            Skull skull = (Skull) block.getState();
            PlayerProfile profile = skull.getOwnerProfile();

            if (profile == null || !speakerUUID.equals(profile.getUniqueId())) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    }

    @Override
    public ItemStack getSkull(String source, int radius) {
        ItemStack skull = new ItemStack(baseSkullMaterial);
        skull.setDurability((short) 3);

        SkullMeta sm = (SkullMeta) skull.getItemMeta();
        if (sm != null) {
            sm.setDisplayName(ChatColor.AQUA + "OpenAudioMc Speaker");

            PlayerProfile profile = Bukkit.getServer().createPlayerProfile(speakerUUID, speakerSkinName);
            PlayerTextures textures = profile.getTextures();
            textures.setSkin(parsedSkinUrl);
            profile.setTextures(textures);
            sm.setOwnerProfile(profile);


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

        try {
            NBT.modifyComponents(skull, nbt -> {
                ReadWriteNBT profileNbt = nbt.getOrCreateCompound("minecraft:profile");
                profileNbt.setUUID("id", speakerUUID);
                ReadWriteNBT propertiesNbt = profileNbt.getCompoundList("properties").addCompound();
                propertiesNbt.setString("name", "textures");
                propertiesNbt.setString("value", textureValue);
            });
        } catch (NbtApiException e) {
            e.printStackTrace();
        }

        NBTItem nbti = new NBTItem(skull);
        nbti.setString("oa-src", source);
        nbti.setInteger("oa-radius", radius);
        nbti.applyNBT(skull);

        return nbti.getItem();
    }
}
