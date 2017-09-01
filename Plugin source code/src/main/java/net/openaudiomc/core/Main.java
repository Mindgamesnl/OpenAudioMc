/*
 * Copyright (C) 2017 Mindgamesnl
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
package net.openaudiomc.core;

import java.io.File;
import java.io.IOException;

import com.google.gson.Gson;
import com.sk89q.worldguard.bukkit.WGBukkit;
import lombok.Getter;
import me.mindgamesnl.openaudiomc.publicApi.OpenAudioApi;
import net.openaudiomc.actions.Command;
import net.openaudiomc.actions.Spy;
import net.openaudiomc.files.WebConfig;
import net.openaudiomc.groups.GroupManager;
import net.openaudiomc.regions.RegionListener;
import net.openaudiomc.socket.SocketioConnector;
import net.openaudiomc.socket.cm_callback;
import net.openaudiomc.speakersystem.SpeakerMain;
import net.openaudiomc.speakersystem.managers.AudioSpeakerManager;
import net.openaudiomc.utils.Reflection;
import net.openaudiomc.utils.WebUtils;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.entity.Player;
import org.bukkit.plugin.Plugin;
import org.bukkit.plugin.java.JavaPlugin;

import ch.njol.skript.Skript;
import com.sk89q.worldguard.bukkit.WorldGuardPlugin;

import net.openaudiomc.socket.Authenticator;
import net.openaudiomc.socket.TimeoutManager;
import net.openaudiomc.commands.AdminCommands;
import net.openaudiomc.commands.AudioCommand;
import net.openaudiomc.commands.VolumeCommand;
import net.openaudiomc.internal.events.SkriptRegistration;
import org.json.JSONObject;

public class Main extends JavaPlugin {

    //CONSTANT
    public static String PREFIX =
            ChatColor.translateAlternateColorCodes('&', "&9[&bOpenAudioMc&9] &3");


    private GroupManager groupManager;

    private static Main instance;
    @Getter
    private boolean regionsEnabled = false;
    @Getter
    private boolean skriptEnabled = false;

    @Getter
    private Reflection reflection;
    @Getter
    private WebConfig webConfig;

    public static Main get() {
        return instance;
    }

    @Override
    public void onEnable() {
        instance = this;

        long start = System.currentTimeMillis();

        getLogger().info("Loading OpenAudioMc by Mindgamesnl/Me_is_mattyh");

    /*  DEPENDENCIES  */
        if (getServer().getPluginManager().isPluginEnabled("WorldGuard")
                && getServer().getPluginManager().isPluginEnabled("WorldEdit")) {
            regionsEnabled = true;
            getLogger().info("All dependencies are detected, regions will be enabled!");

            Bukkit.getServer().getPluginManager().registerEvents(new RegionListener(), this);
            RegionListener.setup(this, getWGPlugin());
        } else {
            regionsEnabled = false;
            getLogger().info("Not all dependencies are installed, the region functions will NOT work! please install WorldEdit and WorldGuard");
        }
        if (getServer().getPluginManager().isPluginEnabled("Skript")) {
            skriptEnabled = true;
            getLogger().info("All dependencies are detected, regions will be enabled!");
            Skript.registerAddon(this);
            SkriptRegistration.load();
        } else {
            skriptEnabled = false;
            getLogger().info("Skript was not found in your server, guess we're not loading the sk-events then.");
        }

        createDataFile();


        reloadWebConfig();

        createRegionsFile();
        createPlaylist();
        cm_callback.update();

        groupManager = new GroupManager();
        reflection = new Reflection(this);

        Bukkit.getServer().getPluginManager().registerEvents(new TimeoutManager(), this);
        Bukkit.getServer().getPluginManager().registerEvents(new EventListener(), this);
        Bukkit.getServer().getPluginManager().registerEvents(new Spy(), this);

        getCommand("connect").setExecutor(new AudioCommand());
        getCommand("volume").setExecutor(new VolumeCommand());
        getCommand("openaudio").setExecutor(new AdminCommands(this));
        TimeoutManager.updateCounter();


        Bukkit.getScheduler().scheduleSyncDelayedTask(this, () -> {
            SpeakerMain.loadSounds();
            SpeakerMain.loadSpeaker();
            AudioSpeakerManager.get().init();
        }, 20 * 5);
        getLogger().info("OpenAudio started in " + (System.currentTimeMillis() - start) + "ms!");
    }

    @Override
    public void onDisable() {
        Bukkit.getOnlinePlayers().forEach(player -> {
            if (OpenAudioApi.isConnected(player)) {
                Command.stopAll(player.getName());
                AudioSpeakerManager.get().stopForPlayer(player.getName());
            }
        });
        SocketioConnector.close();
        instance = null;
    }

    public GroupManager getGroupManager() {
        return groupManager;
    }

    public void createRegionsFile() {
        File regionsFile = new File("plugins/OpenAudio", "regions.yml");
        if (!regionsFile.exists()) {
            try {
                regionsFile.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
            FileConfiguration regionsFileInst = YamlConfiguration.loadConfiguration(regionsFile);
            regionsFileInst.set("Description", "Info like region data will be stored here.");
            try {
                regionsFileInst.save(regionsFile);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void createDataFile() {
        File dataFile = new File("plugins/OpenAudio", "serverData.yml");
        if (!dataFile.exists()) {
            try {
                dataFile.createNewFile();
            } catch (IOException e) {

            }
            FileConfiguration datafileInst = YamlConfiguration.loadConfiguration(dataFile);
            datafileInst.options()
                    .header(
                            "This is identifies the server and should be kept secret, do you have a bungeecord network? just set this id on all your server and bungeecord mode is activated :)");
            datafileInst.set("Description",
                    "This is identifies the server and should be kept secret, do you have a bungeecord network? just set this id on all your server and bungeecord mode is activated :)");
            JSONObject newTokens = Authenticator.getNewId();
            datafileInst.set("serverID", newTokens.getString("server"));
            datafileInst.set("clientId", newTokens.getString("client"));
            try {
                datafileInst.save(dataFile);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void createPlaylist() {
        File dataFile = new File("plugins/OpenAudio", "playlist.yml");
        if (!dataFile.exists()) {
            try {
                dataFile.createNewFile();
            } catch (IOException e) {

            }
            FileConfiguration datafileInst = YamlConfiguration.loadConfiguration(dataFile);
            datafileInst.set("Description", "Playlists are stored here");
            datafileInst.set("demo.1", "https://craftmend.com/api_SSL/openaudio/demo_playlist/1.mp3");
            datafileInst.set("demo.2", "https://craftmend.com/api_SSL/openaudio/demo_playlist/2.mp3");
            datafileInst.set("demo.3", "https://craftmend.com/api_SSL/openaudio/demo_playlist/3.mp3");
            try {
                datafileInst.save(dataFile);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private WorldGuardPlugin getWGPlugin() {
        Plugin plugin = getServer().getPluginManager().getPlugin("WorldGuard");
        if ((plugin == null) || (!(plugin instanceof WorldGuardPlugin))) {
            return null;
        }
        return (WorldGuardPlugin) plugin;
    }

    public static String getFormattedMessage(String message) {
        return ChatColor.translateAlternateColorCodes('&', Main.get().getWebConfig().getPrefix() + message);
    }

    public void handleRegionListener(Player client) {
        if (Main.get().isRegionsEnabled()) {
            WGBukkit.getRegionManager(client.getWorld())
                    .getApplicableRegions(client.getLocation())
                    .forEach(protectedRegion -> {
                        if (RegionListener.isValidRegion(protectedRegion.getId())) {
                            Command.playRegion(client.getName(),
                                    RegionListener.getRegionFile(protectedRegion.getId()));
                        }
                    });
        }
    }

    public void reloadWebConfig() {
        try {
            String id = Authenticator.getID();
            String cliendId = Authenticator.getClientID();
            String configReturn = WebUtils.getText(WebConfig.getUrl().replace("{0}", id).replace("{1}", cliendId));
            webConfig = new Gson().fromJson(configReturn, WebConfig.class);
            getLogger().info("Loading webConfig version " + webConfig.getVersion());
            Main.PREFIX = ChatColor.translateAlternateColorCodes('&', webConfig.getPrefix());
        } catch (IOException e) {
            getLogger().warning("Couldn't load the webConfig or the webMessages! Plugin is not going to work without them!");
            getServer().getPluginManager().disablePlugin(this);
            e.printStackTrace();
        }
    }
}