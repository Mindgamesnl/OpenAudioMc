package com.craftmend.openaudiomc.spigot.modules.placeholderapi;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import me.clip.placeholderapi.expansion.PlaceholderExpansion;
import org.bukkit.OfflinePlayer;
import org.jetbrains.annotations.NotNull;

public class PlaceholderModule extends PlaceholderExpansion {

    private final OpenAudioMcSpigot spigot;

    public PlaceholderModule(OpenAudioMcSpigot spigot) {
        this.spigot = spigot;
    }

    @Override
    public @NotNull String getIdentifier() {
        return "oa";
    }

    @Override
    public @NotNull String getAuthor() {
        return spigot.getDescription().getAuthors().get(0);
    }

    @Override
    public @NotNull String getVersion() {
        return "1.0.0";
    }

    @Override
    public String onRequest(OfflinePlayer player, @NotNull String params) {
        return "TODO Implement";
    }

}
