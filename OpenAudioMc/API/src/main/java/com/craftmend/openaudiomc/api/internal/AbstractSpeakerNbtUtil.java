package com.craftmend.openaudiomc.api.internal;

import org.bukkit.Material;
import org.bukkit.block.Block;
import org.bukkit.inventory.ItemStack;

import java.util.Base64;
import java.util.UUID;

public abstract class AbstractSpeakerNbtUtil {

    protected UUID speakerUUID;
    protected String speakerSkinName;
    protected String textureValue;
    protected String rawSkinUrl;
    protected Material baseSkullMaterial;

    public AbstractSpeakerNbtUtil(String speakerSkinName, String speakerSkinUrl, UUID speakerUUID, Material baseSkullMaterial) {
        this.speakerSkinName = speakerSkinName;
        this.speakerUUID = speakerUUID;
        this.baseSkullMaterial = baseSkullMaterial;

        String rawUrl = speakerSkinUrl;
        // convert to http instead of https, don't know if its important, but lets stick with what our
        // mojang gods decided
        rawUrl = rawUrl.replace("https://", "http://");
        this.rawSkinUrl = rawUrl;

        // turn it into the json format, our gods have also decided this is the way to go
        String json = "{textures:{SKIN:{url:\"" + rawUrl + "\"}}}";
        this.textureValue = Base64.getEncoder().encodeToString(json.getBytes());
    }

    /**
     * Checks if a placed block is *likely* to be an OpenAudioMc speaker skull
     * @param block the block to check
     * @return true if it is likely an OpenAudioMc speaker skull, false otherwise
     */
    public abstract boolean isSpeakerSkull(Block block);

    /**
     * Generates a skull itemstack with the OpenAudioMc speaker skin and embeds the source and radius in its metadata
     * @param source the source identifier to embed in the skull metadata
     * @param radius the radius identifier to embed in the skull metadata
     * @return the skull itemstack
     */
    public abstract ItemStack getSkull(String source, int radius);

    public String getSpeakerSkinName() {
        return speakerSkinName;
    }

}
