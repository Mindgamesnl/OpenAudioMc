package com.craftmend.openaudiomc.generic.objects;
import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.media.interfaces.UrlMutation;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.PlayerSession;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.IRegion;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import org.bukkit.Location;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Deprecated
public class OpenAudioApi {

    /**
     * Every player has a ClientConnection to manage the web interaction.
     * Used method to get it based on a Player.
     *
     * @param uuid Get the client based on Mojang UUID
     * @return instance of ClientConnection
     */
    @Deprecated
    public ClientConnection getClient(UUID uuid) {
        return OpenAudioMc.getInstance().getNetworkingService().getClient(uuid);
    }

    /**
     * A mutation is a proxy for url's starting with a prefix so you can manipulate them before they are send to
     * the client
     *
     * @param host The starting part of an url. Example: https://soundcloud.com/
     * @param urlMutation Your UrlMutation implementation
     */
    @Deprecated
    public void registerMutation(String host, UrlMutation urlMutation) {
        OpenAudioMc.getInstance().getMediaModule().registerMutation(host, urlMutation);
    }

    /**
     * Register a SucCommand and list it in the openaudio command and help menu
     *
     * @param subCommand your sub command
     */
    @Deprecated
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
    @Deprecated
    public List<IRegion> getRegion(Location location) {
        if (OpenAudioMc.getInstance().getPlatform() == Platform.BUNGEE) throw new IllegalStateException("Region modification is only for spigot plugins");
        if (OpenAudioMcSpigot.getInstance().getRegionModule() == null) return new ArrayList<>();
        return OpenAudioMcSpigot.getInstance().getRegionModule().getRegionAdapter().getAudioRegions(location);
    }

    /**
     * check if there is a speaker on a specific location
     * returns null if there is none
     *
     * @param location the location
     * @return Speaker
     */
    @Deprecated
    public Speaker getSpeaker(Location location) {
        if (OpenAudioMc.getInstance().getPlatform() == Platform.BUNGEE) throw new IllegalStateException("Speaker modification is only for spigot plugins");
        return OpenAudioMcSpigot.getInstance().getSpeakerModule().getSpeaker(new MappedLocation(location));
    }

    /**
     * Get the current session token for a player
     *
     * @param player
     * @return the session
     */
    @Deprecated
    public PlayerSession getSession(UUID player) {
        return getClient(player).getSession();
    }

}
