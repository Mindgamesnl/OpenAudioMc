/*
 * 
 * // ""--.._
 * ||  (_)  _ "-._
 * ||    _ (_)    '-.
 * ||   (_)   __..-'
 * \\__..--""
 * 
 */

package net.openaudiomc.minecraft;

import java.io.File;
import java.io.IOException;

import net.openaudiomc.regions.regionListener;
import net.openaudiomc.socket.cm_callback;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.entity.Player;
import org.bukkit.plugin.Plugin;
import org.bukkit.plugin.java.JavaPlugin;

import ch.njol.skript.Skript;
import com.sk89q.worldguard.bukkit.WorldGuardPlugin;

import me.mindgamesnl.openaudiomc.publicApi.OpenAudioApi;

import net.openaudiomc.socket.Authenticator;
import net.openaudiomc.socket.timeoutManager;
import net.openaudiomc.actions.command;
import net.openaudiomc.commands.AdminCommands;
import net.openaudiomc.commands.AudioCommands;
import net.openaudiomc.commands.volumeCommand;
import net.openaudiomc.files.Messages;
import net.openaudiomc.files.dataGetter;
import net.openaudiomc.files.modManager;
import net.openaudiomc.internal.events.SkriptRegistration;
import net.openaudiomc.speakerSystem.speakerMain;
import net.openaudiomc.speakerSystem.managers.audioSpeakerManager;

public class Main extends JavaPlugin {


    public static Main pl;
    public static File MessagesFile;
    public static FileConfiguration MessagesConfig;
    public static String prefix;

    public static Main getPL() {
        return pl;
    }

    public static File fileLoc;

    //Start zooi
    @Override
    public void onEnable() {
        pl = this;
        
        fileLoc = getDataFolder();

        getDep.runCheck();

        createDataFile();
        createRegionsFile();
        createMessagesFile();
        createServerNode();
        createPlaylist();
        cm_callback.update();
        createModsFile();
        Bukkit.getServer().getPluginManager().registerEvents(new timeoutManager(), this);
        Bukkit.getServer().getPluginManager().registerEvents(new eventListener(), this);

        Bukkit.getLogger().info("[OpenAudio] Loading OpenAudioMc by Mindgamesnl/Me_is_mattyh");

        prefix = ChatColor.translateAlternateColorCodes('&', "&9[&bOpenAudioMc&9] &3");

        //Audio commands
        this.getCommand("connect").setExecutor(new AudioCommands());
        this.getCommand("audio").setExecutor(new AudioCommands());
        this.getCommand("music").setExecutor(new AudioCommands());
        this.getCommand("sound").setExecutor(new AudioCommands());
        this.getCommand("muziek").setExecutor(new AudioCommands());
        this.getCommand("audioserver").setExecutor(new AudioCommands());
        this.getCommand("audioclient").setExecutor(new AudioCommands());
        //Volume command
        this.getCommand("volume").setExecutor(new volumeCommand());
        //Main command
        this.getCommand("openaudio").setExecutor(new AdminCommands());
        this.getCommand("oa").setExecutor(new AdminCommands());
        this.getCommand("oam").setExecutor(new AdminCommands());

        modManager.setBg("Moved to https://plus.openaudiomc.net");

        if (getDep.getStatus()) {
            Bukkit.getServer().getPluginManager().registerEvents(new regionListener(), this);
            regionListener.setup(this, getWGPlugin());
        }

        if (getDep.skriptInstalled) {
            Skript.registerAddon(this);
            SkriptRegistration.load();
            Bukkit.getLogger().info("[OpenAudio] Whoah! just like that! loaded the skript events :D");
        } else {
            Bukkit.getLogger().info("[OpenAudio] Skript was not found in your server, gues we're not loading the sk-events then.");
        }

        timeoutManager.updateCounter();

        Bukkit.getLogger().info("[OpenAudio] Loading speakers.");


        Bukkit.getScheduler().scheduleSyncDelayedTask(this, new Runnable() {
            @Override
            public void run() {
                speakerMain.loadSounds();
                speakerMain.loadSpeaker();
                audioSpeakerManager.Init();
            }
        },20*10);
        Bukkit.getLogger().info("[OpenAudio] Started up.");
    }

    //Sluit zooi
    @Override
    public void onDisable() {
        for (Player p : Bukkit.getOnlinePlayers()) {
            if (OpenAudioApi.isConnected(p)) {
                command.stopAll(p.getName());
                audioSpeakerManager.stopForPlayer(p.getName());
            }
        }
    }

    public void createMessagesFile() {

        MessagesFile = new File("plugins/OpenAudio", "messages.yml");
        if (!MessagesFile.exists()) {
            try {
                MessagesFile.createNewFile();
            } catch (IOException e) {

            }
            MessagesConfig = YamlConfiguration.loadConfiguration(MessagesFile);
            MessagesConfig.set("Description", "This is the place to change the messges, host url and more :)");
            MessagesConfig.set("start-sound", "https://craftmend.com/api_SSL/openaudio/load_sound.mp3");
            MessagesConfig.set("website-url", "http://client.openaudiomc.net/?name=%name%&session=%session%");
            MessagesConfig.set("connect-message", "&9[&bOpenAudioMc&9] &3Click &ehere&3 to connect to our audio server!");
            MessagesConfig.set("disconnect-message", "&9[&bOpenAudioMc&9] &3You are now &4Disconnected&3 from our audio server!");
            MessagesConfig.set("connected-message", "&9[&bOpenAudioMc&9] &3You are now &aConnected&3 to our audio server!");
            MessagesConfig.set("hue-connected-message", "&9[&bOpenAudioMc&9] &3You are now &aConnected&3 with your philips &dh&bu&ae&3!");
            MessagesConfig.set("volume-set", "&9[&bVolume&9] &3Your volume has been set to &a%volume%&3%");
            MessagesConfig.set("volume-error", "&9[&bVolume&9] &4Invalid arguments.");
            MessagesConfig.set("volume-hotbar-on", "&9[&bVolume&9] &3Hotbar volume is &2Enabled&2.");
            MessagesConfig.set("volume-hotbar-off", "&9[&bVolume&9] &3Hotbar volume is &4Disabled&2.");
            MessagesConfig.set("need-connected", "&9[&bOpenAudioMc&9] &3You need to be connected to do this command.");
            MessagesConfig.set("socketio-loading", "&eOur audio client is starting up. Please try again in a few seconds.");

            try {
                MessagesConfig.save(MessagesFile);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        if (Messages.get("website-url").contains("http://client.openaudiomc.net")) {
            MessagesFile = new File("plugins/OpenAudio", "messages.yml");
            MessagesConfig = YamlConfiguration.loadConfiguration(MessagesFile);
            MessagesConfig.set("website-url", "http://client.openaudiomc.net/?name=%name%&session=%session%");
            try {
                MessagesConfig.save(MessagesFile);
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

        if (Messages.get("disconnect-message") == null) {
            MessagesFile = new File("plugins/OpenAudio", "messages.yml");
            MessagesConfig = YamlConfiguration.loadConfiguration(MessagesFile);
            MessagesConfig.set("disconnect-message", "&9[&bOpenAudioMc&9] &3You are now &4Disconnected&3 from our audio server!");
            try {
                MessagesConfig.save(MessagesFile);
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

        if (Messages.get("socketio-loading") == null) {
            MessagesFile = new File("plugins/OpenAudio", "messages.yml");
            MessagesConfig = YamlConfiguration.loadConfiguration(MessagesFile);
            MessagesConfig.set("socketio-loading", "&eOur audio client is starting up. Please try again in a few seconds.");
            try {
                MessagesConfig.save(MessagesFile);
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

        if (Messages.get("background-image") == null) {
            MessagesFile = new File("plugins/OpenAudio", "messages.yml");
            MessagesConfig = YamlConfiguration.loadConfiguration(MessagesFile);
            MessagesConfig.set("background-image", "<none>");
            try {
                MessagesConfig.save(MessagesFile);
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

        if (Messages.get("stop-on-teleport") == null) {
            MessagesFile = new File("plugins/OpenAudio", "messages.yml");
            MessagesConfig = YamlConfiguration.loadConfiguration(MessagesFile);
            MessagesConfig.set("stop-on-teleport", false);
            try {
                MessagesConfig.save(MessagesFile);
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

        if (Messages.get("volume-hotbar-on") == null) {
            MessagesFile = new File("plugins/OpenAudio", "messages.yml");
            MessagesConfig = YamlConfiguration.loadConfiguration(MessagesFile);
            MessagesConfig.set("volume-hotbar-on", "&9[&bVolume&9] &3Hotbar volume is &2Enabled&2.");
            MessagesConfig.set("volume-hotbar-off", "&9[&bVolume&9] &3Hotbar volume is &4Disabled&2.");
            try {
                MessagesConfig.save(MessagesFile);
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }




        if (Messages.get("need-connected") == null) {
            MessagesFile = new File("plugins/OpenAudio", "messages.yml");
            MessagesConfig = YamlConfiguration.loadConfiguration(MessagesFile);
            MessagesConfig.set("need-connected", "&9[&bOpenAudioMc&9] &3You need to be connected to do this command.");
            try {
                MessagesConfig.save(MessagesFile);
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

        if (Messages.get("hue-connected-message") == null) {
            MessagesFile = new File("plugins/OpenAudio", "messages.yml");
            MessagesConfig = YamlConfiguration.loadConfiguration(MessagesFile);
            MessagesConfig.set("hue-connected-message", "&9[&bOpenAudioMc&9] &3You are now &aConnected&3 with your philips &dh&bu&ae&3!");
            try {
                MessagesConfig.save(MessagesFile);
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

    }

    public void createRegionsFile() {
        File regionsFile = new File("plugins/OpenAudio", "regions.yml");
        if (!regionsFile.exists()) {
            try {
                regionsFile.createNewFile();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            FileConfiguration regionsFileInst = YamlConfiguration.loadConfiguration(regionsFile);
            regionsFileInst.set("Description", "Info like region data will be stored here.");
            try {
                regionsFileInst.save(regionsFile);
            } catch (IOException e) {
                // TODO Auto-generated catch block
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
            datafileInst.set("Description", "This is identifies the server and should be kept secret, do you have a bungeecord network? just set this id on all your server and bungeecord mode is activated :)");
            datafileInst.set("serverID", Authenticator.getNewId().getString("server"));
            datafileInst.set("clientID", Authenticator.getClientID());
            try {
                datafileInst.save(dataFile);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void createServerNode() {
        File dataFile = new File("plugins/OpenAudio/advanced", "advancedConfig.yml");
        if (!dataFile.exists()) {
            try {
                dataFile.createNewFile();
            } catch (IOException e) {

            }
            FileConfiguration datafileInst = YamlConfiguration.loadConfiguration(dataFile);
            datafileInst.set("Description", "Advanced settings (only for networking )");
            datafileInst.set("host", "http://api.openaudiomc.net/host.php");
            datafileInst.set("Description-ssl", "WARNING!!! PHILIPS HUE WON'T WORK WHEN SSL IS ENABLED");
            datafileInst.set("ssl-enabled", "false");
            try {
                datafileInst.save(dataFile);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        
        if (
        
        if (Messages.get("disconnect-message") == null) {
            MessagesFile = new File("plugins/OpenAudio", "messages.yml");
            MessagesConfig = YamlConfiguration.loadConfiguration(MessagesFile);
            MessagesConfig.set("disconnect-message", "&9[&bOpenAudioMc&9] &3You are now &4Disconnected&3 from our audio server!");
            try {
                MessagesConfig.save(MessagesFile);
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }

    public void disableSslConfig() {
        File dataFile = new File("plugins/OpenAudio/advanced", "advancedConfig.yml");
        if (!dataFile.exists()) {
            try {
                dataFile.createNewFile();
            } catch (IOException e) {

            }
            FileConfiguration datafileInst = YamlConfiguration.loadConfiguration(dataFile);
            datafileInst.set("Description", "Advanced settings (only for networking )");
            datafileInst.set("host", "http://api.openaudiomc.net/host.php");
            datafileInst.set("Description-ssl", "Dear user, ssl settings + hue settings have been moved to https://plus.openaudimc.net/");
            datafileInst.set("ssl-enabled", "deprecated");
            try {
                datafileInst.save(dataFile);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        
        if (dataGetter.get("host") == "https://craftmend.com/openaudio.json") {
            MessagesFile = new File("plugins/OpenAudio/advanced", "advancedConfig.yml");
            MessagesConfig = YamlConfiguration.loadConfiguration(MessagesFile);
            MessagesConfig.set("host", "http://api.openaudiomc.net/host.php");
            try {
                MessagesConfig.save(MessagesFile);
            } catch (IOException e) {
                // TODO Auto-generated catch block
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
        return (WorldGuardPlugin)plugin;
    }
}
