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

import java.util.List;
import java.util.UUID;

public class OpenAudioApi {

    /**
     * @param uuid Get the client based on Mojang UUID
     * @return instance of ClientConnection
     */
    public ClientConnection getClient(UUID uuid) {
        return OpenAudioMc.getInstance().getPlayerModule().getClient(uuid);
    }

    /**
     * @param player Get client that's linked with a Player
     * @return instance of ClientConnection
     */
    public ClientConnection getClient(Player player) {
        return OpenAudioMc.getInstance().getPlayerModule().getClient(player.getUniqueId());
    }

    /**
     * @param host The starting part of an url. Example: https://soundcloud.com/
     * @param urlMutation Your UrlMutation implementation
     */
    public void registerMutation(String host, UrlMutation urlMutation) {
        OpenAudioMc.getInstance().getMediaModule().registerMutation(host, urlMutation);
    }

    /**
     * @param subCommand Register a SucCommand and list it in the openaudio command and help menu
     */
    public void registerAddonCommand(SubCommand subCommand) {
        OpenAudioMc.getInstance().getCommandModule().registerSubCommand(subCommand);
    }

    /**
     * @param location Get all regions on a specific location
     * @return A list of openaudiomc regions
     */
    public List<IRegion> getRegion(Location location) {
        return OpenAudioMc.getInstance().getRegionModule().getRegions(location);
    }

    /**
     * @param location Get the speaker thats standing on a location
     * @return Speaker
     */
    public Speaker getSpeaker(Location location) {
        return OpenAudioMc.getInstance().getSpeakerModule().getSpeaker(new SimpleLocation(location));
    }

}
