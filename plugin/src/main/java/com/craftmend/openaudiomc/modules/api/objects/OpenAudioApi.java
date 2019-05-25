package com.craftmend.openaudiomc.modules.api.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.modules.media.interfaces.UrlMutation;
import com.craftmend.openaudiomc.modules.players.interfaces.ClientConnection;
import com.craftmend.openaudiomc.modules.regions.objects.IRegion;
import com.craftmend.openaudiomc.modules.speakers.objects.SimpleLocation;
import com.craftmend.openaudiomc.modules.speakers.objects.Speaker;
import org.bukkit.Location;
import org.bukkit.entity.Player;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class OpenAudioApi {

    /**
     * Every player has a ClientConnection to manage the web interaction.
     * Used method to get it based on a Player.
     *
     * @param uuid Get the client based on Mojang UUID
     * @return instance of ClientConnection
     */
    public ClientConnection getClient(UUID uuid) {
        return OpenAudioMc.getInstance().getPlayerModule().getClient(uuid);
    }

    /**
     * Every player has a ClientConnection to manage the web interaction.
     * Used method to get it based on a Player.
     *
     * @param player Get client that's linked with a Player
     * @return instance of ClientConnection
     */
    public ClientConnection getClient(Player player) {
        return OpenAudioMc.getInstance().getPlayerModule().getClient(player.getUniqueId());
    }

    /**
     * A mutation is a proxy for url's starting with a prefix so you can manipulate them before they are send to
     * the client
     *
     * @param host The starting part of an url. Example: https://soundcloud.com/
     * @param urlMutation Your UrlMutation implementation
     */
    public void registerMutation(String host, UrlMutation urlMutation) {
        OpenAudioMc.getInstance().getMediaModule().registerMutation(host, urlMutation);
    }

    /**
     * Register a SucCommand and list it in the openaudio command and help menu
     *
     * @param subCommand your sub command
     */
    public void registerAddonCommand(SubCommand subCommand) {
        OpenAudioMc.getInstance().getCommandModule().registerSubCommand(subCommand);
    }

    /**
     * get all the region (and their properties) from a specific location on a world.
     * Returns an empty list if the module is disabled.
     *
     * @param location the location
     * @return A list of openaudiomc regions
     */
    public List<IRegion> getRegion(Location location) {
        if (OpenAudioMc.getInstance().getRegionModule() == null) return new ArrayList<>();
        return OpenAudioMc.getInstance().getRegionModule().getRegionAdapter().getAudioRegions(location);
    }

    /**
     * check if there is a speaker on a specific location
     * returns null if there is none
     *
     * @param location the location
     * @return Speaker
     */
    public Speaker getSpeaker(Location location) {
        return OpenAudioMc.getInstance().getSpeakerModule().getSpeaker(new SimpleLocation(location));
    }

}
