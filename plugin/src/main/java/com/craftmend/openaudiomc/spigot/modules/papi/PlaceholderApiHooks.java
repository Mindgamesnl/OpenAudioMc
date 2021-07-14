package com.craftmend.openaudiomc.spigot.modules.papi;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import me.clip.placeholderapi.expansion.PlaceholderExpansion;
import org.bukkit.entity.Player;

/**
 * TODO: This should perhaps just be an addon :thinking:
 */
public class PlaceholderApiHooks extends PlaceholderExpansion {
    @Override
    public String getIdentifier() {
        return "oam";
    }

    @Override
    public String getAuthor() {
        return OpenAudioMc.BUILD.getBuildAuthor();
    }

    @Override
    public boolean persist(){
        return true;
    }

    @Override
    public boolean canRegister(){
        return true;
    }

    @Override
    public String getVersion() {
        return OpenAudioMc.BUILD.getBuildNumber() + "-" + OpenAudioMc.BUILD.getBuildCommit();
    }

    @Override
    public String onPlaceholderRequest(Player player, String identifier) {

        if (player == null) {
            return "";
        }

        SpigotConnection connection = OpenAudioMcSpigot.getInstance().getPlayerModule().getClient(player);

        switch (identifier) {
            case "token":
                // token request
                break;

            case "url":
                // requested the full url
                break;

            case "is_connected":
                // simple Yes or No if the client is connected
                break;

            case "is_voice":
                // simple Yes or No if voice is connected
                break;

            case "is_speaking":
                // Yes or No if the client is currently speaking
                break;

            case "voice_state":
                // Offline, Muted, Talking or Listening
                break;

            case "voice_peers":
                // a number like 5, which counts how many people you are currently talking with
                break;
        }

        return "?";
    }
}
