package net.openaudiomc.jclient.utils.config;

import lombok.Getter;
import lombok.ToString;

import net.openaudiomc.jclient.OpenAudioMc;

import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CopyOnWriteArrayList;

@Getter @ToString
public class Config {

    private ConfigMessages messages;
    private ConfigCommands commands;
    private ConfigWeb web;
    private ConfigKey keys;
    private ConfigStorage storage;

    private String lineSeparator = System.getProperty("line.separator");

    public void save() {
        try {
            List<String> lines = new ArrayList<>();
            lines.addAll(messages.serialize());
            lines.add(lineSeparator);
            lines.addAll(commands.serialize());
            lines.add(lineSeparator);
            lines.addAll(web.serialize());
            lines.add(lineSeparator);
            lines.addAll(keys.serialize());
            lines.add(lineSeparator);
            lines.addAll(storage.serialize());
            Path file = Paths.get(OpenAudioMc.getInstance().getDataFolder() + "/config.yml");
            Files.write(file, lines, Charset.forName("UTF-8"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void load() {
        File configFile = new File(OpenAudioMc.getInstance().getDataFolder() + "/config.yml");
        if(!configFile.exists()) {
            configFile.getParentFile().mkdirs();
            saveDefaultConfig();
            save();
        } else {
            FileConfiguration config = YamlConfiguration.loadConfiguration(configFile);

            this.messages = new ConfigMessages();

            this.messages.setProvideUrl(config.getString("messages.provide_url"));
            this.messages.setConnected(config.getString("messages.connected"));
            this.messages.setDisconnected(config.getString("messages.disconnected"));
            this.messages.setSetvolumefail(config.getString("messages.setvolumefail"));
            this.messages.setSetvolume(config.getString("messages.setvolume"));

            this.commands = new ConfigCommands();
            this.commands.setCommands(config.getStringList("commands"));

            this.web = new ConfigWeb();
            this.web.setUrl(config.getString("web.url"));
            this.web.setTitle(config.getString("web.title"));
            this.web.setBackground(config.getString("web.background"));
            this.web.setStartSound(config.getString("web.startsound"));
            this.web.setAmbianceSound(config.getString("web.ambiancesound"));
            this.web.setSpeakerRadius(config.getLong("web.speaker_radius"));

            this.keys = new ConfigKey();
            this.keys.setPublicKey(config.getString("key.public"));
            this.keys.setPrivateKey(config.getString("key.private"));

            this.storage = new ConfigStorage();
            List<ConfigStorageSpeakerMedia> speakerMediaList = new CopyOnWriteArrayList<>();
            if(config.get("storage.speakermedia") != null) {
                for(String speakerMediasConfig : config.getConfigurationSection("storage.speakermedia").getKeys(false)) {
                    ConfigStorageSpeakerMedia speakerMedia = new ConfigStorageSpeakerMedia();
                    speakerMedia.setName(speakerMediasConfig);
                    speakerMedia.setSource(config.getString("storage.speakermedia." + speakerMediasConfig + ".src"));
                    speakerMediaList.add(speakerMedia);
                }
            }
            this.storage.setSpeakerMedias(speakerMediaList);

            List<ConfigStorageSpeakerLocation> speakerLocations = new CopyOnWriteArrayList<>();
            if(config.get("storage.speakerlocations") != null) {
                for (String speakerLocationsConfig : config.getConfigurationSection("storage.speakerlocations").getKeys(false)) {
                    ConfigStorageSpeakerLocation speakerLocation = new ConfigStorageSpeakerLocation();
                    speakerLocation.setId(UUID.fromString(speakerLocationsConfig));
                    speakerLocation.setWorld(config.getString("storage.speakerlocations." + speakerLocationsConfig + ".world"));
                    speakerLocation.setX(config.getDouble("storage.speakerlocations." + speakerLocationsConfig + ".x"));
                    speakerLocation.setY(config.getDouble("storage.speakerlocations." + speakerLocationsConfig + ".y"));
                    speakerLocation.setZ(config.getDouble("storage.speakerlocations." + speakerLocationsConfig + ".z"));
                    speakerLocation.setSound(config.getString("storage.speakerlocations." + speakerLocationsConfig + ".sound"));
                    speakerLocations.add(speakerLocation);
                }
            }
            this.storage.setSpeakerLocations(speakerLocations);

            List<ConfigStorageRegion> regionList = new CopyOnWriteArrayList<>();
            if(config.get("storage.regions") != null) {
                for (String regionConfig : config.getConfigurationSection("storage.regions").getKeys(false)) {
                    ConfigStorageRegion region = new ConfigStorageRegion();
                    region.setName(regionConfig);
                    region.setSource(config.getString("storage.regions." + regionConfig + ".src"));
                    regionList.add(region);
                }
            }
            this.storage.setRegions(regionList);

            List<ConfigStorageMedia> mediaList = new CopyOnWriteArrayList<>();
            if(config.get("storage.media") != null) {
                for (String mediaConfig : config.getConfigurationSection("storage.media").getKeys(false)) {
                    ConfigStorageMedia media = new ConfigStorageMedia();
                    media.setName(mediaConfig);
                    media.setLength(config.getLong("storage.media." + mediaConfig + ".length"));
                    mediaList.add(media);
                }
            }
            this.storage.setMedias(mediaList);

            setHeaders();
        }
    }

    private void saveDefaultConfig() {
        this.messages = new ConfigMessages();
        this.messages.setProvideUrl("&2Click here to connect to our audio server!");
        this.messages.setConnected("&7You are now &2connected&7! yeey!");
        this.messages.setDisconnected("&7You are now &4disconnected&7! cya next time!");
        this.messages.setSetvolumefail("&4Invalid volume! please use a number between 0 and 100");
        this.messages.setSetvolume("&2Your volume has been set to %volume%");

        this.commands = new ConfigCommands();
        this.commands.setCommands(Arrays.asList("/getlink", "/icanhazaudio", "/gimmesoundplz"));

        this.web = new ConfigWeb();
        this.web.setUrl("https://app.openaudiomc.net/");
        this.web.setTitle("OpenAudioMc");
        this.web.setBackground("-");
        this.web.setStartSound("-");
        this.web.setAmbianceSound("-");
        this.web.setSpeakerRadius(10L);

        this.keys = new ConfigKey();
        this.keys.setPublicKey("-");
        this.keys.setPrivateKey("-");

        this.storage = new ConfigStorage();
        this.storage.speakerMedias = new CopyOnWriteArrayList<>();
        this.storage.speakerLocations = new CopyOnWriteArrayList<>();
        this.storage.regions = new CopyOnWriteArrayList<>();
        this.storage.medias = new CopyOnWriteArrayList<>();

        setHeaders();
    }

    private void setHeaders() {
        this.messages.setHeader("############################################################" + lineSeparator +
                                "# +------------------------------------------------------+ #" + lineSeparator +
                                "# |                      Messages                        | #" + lineSeparator +
                                "# |      Messages that the player will see in chat       | #" + lineSeparator +
                                "# |       (can be disabled by using '-' as value)        | #" + lineSeparator +
                                "# +------------------------------------------------------+ #" + lineSeparator +
                                "############################################################");

        this.commands.setHeader("############################################################" + lineSeparator +
                                "# +------------------------------------------------------+ #" + lineSeparator +
                                "# |                      Commands                        | #" + lineSeparator +
                                "# |       Custom commands to give the user a link        | #" + lineSeparator +
                                "# +------------------------------------------------------+ #" + lineSeparator +
                                "############################################################");

        this.web.setHeader("############################################################" + lineSeparator +
                            "# +------------------------------------------------------+ #" + lineSeparator +
                            "# |                    Web Client                        | #" + lineSeparator +
                            "# |         Configuration for your web client!           | #" + lineSeparator +
                            "# |       (can be disabled by using '-' as value)        | #" + lineSeparator +
                            "# +------------------------------------------------------+ #" + lineSeparator +
                            "############################################################");

        this.keys.setHeader("############################################################" + lineSeparator +
                            "# +------------------------------------------------------+ #" + lineSeparator +
                            "# |                       Data                           | #" + lineSeparator +
                            "# | Data that makes this server this server! (dont edit) | #" + lineSeparator +
                            "# |            (really tho, dont touch it)               | #" + lineSeparator +
                            "# +------------------------------------------------------+ #" + lineSeparator +
                            "############################################################" + lineSeparator +
                            "# Key storage! NEVER SHERE THIS WITH ANYONE! NEVER CHANGE THIS DATA! (it won't work, trust me)");

        this.storage.setHeader("# Storage for regions, speakers and all that stuff!");
    }
}
