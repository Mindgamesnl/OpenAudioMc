package com.craftmend.openaudiomc.spigot.modules.players.objects;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.configuration.SpigotConfigurationModule;
import com.craftmend.openaudiomc.generic.configuration.enums.StorageKey;
import com.craftmend.openaudiomc.generic.configuration.objects.ClientSettings;
import com.craftmend.openaudiomc.generic.media.objects.Media;
import com.craftmend.openaudiomc.spigot.modules.players.handlers.RegionHandler;
import com.craftmend.openaudiomc.spigot.modules.players.handlers.SpeakerHandler;
import com.craftmend.openaudiomc.generic.networking.packets.*;
import com.craftmend.openaudiomc.spigot.modules.players.events.ClientConnectEvent;
import com.craftmend.openaudiomc.spigot.modules.players.events.ClientDisconnectEvent;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.IRegion;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.ApplicableSpeaker;

import com.craftmend.openaudiomc.spigot.services.server.enums.ServerVersion;
import com.craftmend.openaudiomc.spigot.services.utils.DataWatcher;
import lombok.Getter;
import lombok.Setter;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.Location;
import org.bukkit.entity.Player;

import java.util.*;

public class Client extends WebConnection {

    // optional regions and speakers
    @Setter private List<IRegion> currentRegions = new ArrayList<>();
    @Setter private List<ApplicableSpeaker> currentSpeakers = new ArrayList<>();

    // data watcher that watches for changes in the location, every 5 ticks.
    // If the server version is MODERN (so 1.13 or higher) the task will run sync
    private DataWatcher<Location> locationDataWatcher = new DataWatcher<>(
            OpenAudioMcSpigot.getInstance(),
            (OpenAudioMcSpigot.getInstance().getServerService().getVersion() == ServerVersion.MODERN),
            5
    );

    // Speaker and region handles. Region handler can be null if the feature is disabled
    private SpeakerHandler speakerHandler;
    private RegionHandler regionHandler;

    //ongoing sounds
    private List<Media> ongoingMedia = new ArrayList<>();

    //plugin data
    @Setter @Getter private String selectedSpeakerSource = null;

    /**
     * @param player client startup logic
     */
    public Client(Player player) {
        super(player);
        // send the url on join, if that is configured
        if (OpenAudioMcSpigot.getInstance().getConfig().getBoolean("options.send-on-join")) publishUrl();

        // if the region system is enabled, then load the handler
        if (OpenAudioMcSpigot.getInstance().getRegionModule() != null) this.regionHandler = new RegionHandler(player, this);
        // register the speaker handler
        this.speakerHandler = new SpeakerHandler(player, this);

        // code that fires when the location has been changed
        locationDataWatcher.setTask(updatedLocation -> {
            // if the client is not connected, then dont do shit, they wont hear it anyway
            if (!this.isConnected) return;

            // tick the regions, if the regions are enabled
            if (this.regionHandler != null) this.regionHandler.tick();

            // tick the speakers to force them to update
            this.speakerHandler.tick();
        });

        // the feeder, how the data watcher gets its new fed data
        locationDataWatcher.setFeeder(() -> player.getLocation());
    }

    /**
     * Called before the Client object is destroyed
     */
    public void onDestroy() {
        // shutdown the data watcher
        this.locationDataWatcher.stop();
    }

    /**
     * player connect logic, for when authenticated.
     */
    public void onConnect() {
        SpigotConfigurationModule spigotConfigurationModule = OpenAudioMcSpigot.getInstance().getConfigurationModule();
        String connectedMessage = spigotConfigurationModule.getString(StorageKey.MESSAGE_CLIENT_OPENED);
        String startSound = spigotConfigurationModule.getString(StorageKey.SETTINGS_CLIENT_START_SOUND);


        this.isConnected = true;

        player.sendMessage(ChatColor.translateAlternateColorCodes('&', connectedMessage));
        currentRegions.clear();
        currentSpeakers.clear();

        // wait a bit before sending settings and curent media
        Bukkit.getScheduler().scheduleAsyncDelayedTask(OpenAudioMcSpigot.getInstance(), () -> {
            // sync ongoing media
            ongoingMedia.forEach(this::sendMedia);

            // check and send settings, if any
            ClientSettings settings = OpenAudioMcSpigot.getInstance().getConfigurationModule().getClientSettings();
            if (!settings.equals(new ClientSettings())) {
                OpenAudioMcSpigot.getInstance().getNetworkingService().send(this, new PacketClientPushSettings(settings));
            }

            // if a start sound is configured, send it
            if (startSound != null && !startSound.equals("none")) {
                playMedia(new Media(startSound));
            }
        }, 20);

        // trigger a sync connect event
        Bukkit.getScheduler().runTask(OpenAudioMcSpigot.getInstance(), () -> Bukkit.getServer().getPluginManager().callEvent(new ClientConnectEvent(player, this)));
    }

    /**
     * player disconnect logic, if a problem with socket occurs or the client closes the web client
     */
    public void onDisconnect() {
        this.isConnected = false;
        player.sendMessage(ChatColor.translateAlternateColorCodes('&', OpenAudioMcSpigot.getInstance().getConfig().getString("messages.client-closed")));
        Bukkit.getScheduler().runTask(OpenAudioMcSpigot.getInstance(), () -> Bukkit.getServer().getPluginManager().callEvent(new ClientDisconnectEvent(player)));
    }

    /**
     * @return regions that the player is a part of
     */
    @Override
    public List<IRegion> getRegions() {
        return currentRegions;
    }

    /**
     * @return speakers in range of the player
     */
    @Override
    public List<ApplicableSpeaker> getSpeakers() {
        return currentSpeakers;
    }

    /**
     * @param media start media for the client
     */
    @Override
    public void playMedia(Media media) {
        sendMedia(media);
    }
}
