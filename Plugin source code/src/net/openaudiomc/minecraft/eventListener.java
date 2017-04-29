package net.openaudiomc.minecraft;

import java.io.File;
import java.util.HashMap;

import net.openaudiomc.socket.cm_callback;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.OfflinePlayer;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.block.BlockPlaceEvent;
import org.bukkit.event.block.BlockBreakEvent;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.event.player.PlayerQuitEvent;
import org.bukkit.event.player.PlayerTeleportEvent;
import org.json.JSONObject;

import com.sk89q.worldguard.bukkit.WGBukkit;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;

import net.openaudiomc.actions.command;
import net.openaudiomc.actions.spy;
import net.openaudiomc.files.Messages;
import net.openaudiomc.internal.events.SocketCommandEvent;
import net.openaudiomc.internal.events.SocketConnectEvent;
import net.openaudiomc.internal.events.SocketDisconnectEvent;
import net.openaudiomc.internal.events.SocketUserConnectEvent;
import net.openaudiomc.internal.events.SocketUserDisconnectEvent;
import net.openaudiomc.internal.events.SocketWhisperEvent;
import net.openaudiomc.syncedSound.managers.userManager;
import net.openaudiomc.players.Sessions;
import net.openaudiomc.regions.regionCrap;
import net.openaudiomc.socket.Emitter;
import net.openaudiomc.socket.timeoutManager;
import net.openaudiomc.speakerSystem.speakerMain;
import net.openaudiomc.speakerSystem.managers.audioSpeakerManager;

public class eventListener implements Listener{    
    
	static HashMap<String, Boolean> isConnected = new HashMap<String, Boolean>();
	
	@EventHandler
    public void onSocketCommandEvent(SocketCommandEvent event) {
    	//System.out.println("Socket command event: " + event.getCommand());
    }
    
	@EventHandler
    public void onSocketWhisperEvent(SocketWhisperEvent event) {
		Player player = Bukkit.getPlayer(event.getPlayerName());
		
		Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.SocketWhisperEvent(Bukkit.getPlayer(event.getPlayerName()), event.getData()));
		
		if (event.getData().equals("hueConnected")) {
			player.sendMessage(Messages.getColor("hue-connected-message"));
			Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.HueConnectEvent(Bukkit.getPlayer(event.getPlayerName())));
		} else {
			JSONObject jsonObject = new JSONObject(event.getData());
			if (jsonObject.getString("command").equals("SoundEnded")) {
				Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.SoundEndEvent(Bukkit.getPlayer(event.getPlayerName()), jsonObject.getString("id")));
			}
		}
	}
	
    @EventHandler
    public void onSocketUserConnectEvent(SocketUserConnectEvent event) {
		OfflinePlayer player = Bukkit.getOfflinePlayer(event.getName());
		if (player.isOnline()) {			
	    	if (event.getKey().equals(Sessions.getOld(event.getName()))) {
	    		//good client
	    		
	    			Player client = Bukkit.getPlayer(event.getName());
	    			userManager.addPlayer(client);
	    			client.sendMessage(Messages.getColor("connected-message"));
	    			if (Messages.get("start-sound") != null && Messages.get("start-sound") != "") {
	    				command.playNormalSound(event.getName(), Messages.get("start-sound"));
	    			}
	    			
	    			Emitter.connectedInServer(event.getName());
	    			isConnected.put(client.getName(), true);
	    			userManager.getPlayer(client).syncSounds();
	    			String connector = event.getName();
	    			for (Player p : Bukkit.getOnlinePlayers()) {
	    				if (spy.spyMap.get(p) != null) {
	    					if (spy.spyMap.get(p)) {
	    						p.sendMessage("" + ChatColor.AQUA + "[" + ChatColor.GREEN + "+" + ChatColor.AQUA + "]" + ChatColor.YELLOW + ChatColor.ITALIC + " " +  connector + ChatColor.GRAY + ChatColor.ITALIC + " connected to openaudio.");
	    					}
	    				}
	    			}
	    			
	    			
	    			
	    			if (getDep.getStatus()) {
	    	    		String regionNu = "-";
	    				for(ProtectedRegion r : WGBukkit.getRegionManager(client.getWorld()).getApplicableRegions(client.getLocation())) {
	    					regionNu = r.getId();
	    	            }
	    				if (regionCrap.isValidRegion(regionNu)) {
	    					command.playRegion(client.getName(), regionCrap.getRegionFile(regionNu));
	    				}
	    	    	}
	    		Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.WebConnectEvent(Bukkit.getPlayer(event.getName())));
	    	} else {
	    		Emitter.KickPlayerConnection(event.getName());
	    	}
		}
    }
    
    
    @EventHandler
    public void onSocketUserDisconnectEvent(SocketUserDisconnectEvent event) {
    	isConnected.put(event.getName(), false);
    	Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.WebDisconnectEvent(Bukkit.getPlayer(event.getName())));
    	
    	String connector = event.getName();
    	@SuppressWarnings("deprecation")
		OfflinePlayer player = Bukkit.getOfflinePlayer(event.getName());
		if (player.isOnline()) {
			Bukkit.getPlayer(connector).sendMessage(Messages.getColor("disconnect-message"));
		}
		
		audioSpeakerManager.stopForPlayer(event.getName());
		
		for (Player p : Bukkit.getOnlinePlayers()) {
			if (spy.spyMap.get(p) != null) {
				if (spy.spyMap.get(p)) {
					p.sendMessage("" + ChatColor.AQUA + "[" + ChatColor.DARK_RED + "-" + ChatColor.AQUA + "]" + ChatColor.YELLOW + ChatColor.ITALIC + " " +  connector + ChatColor.GRAY + ChatColor.ITALIC + " disconnected from openaudio.");
				}
			}
		}
    }


    @EventHandler
    public void onSocketConnected(SocketConnectEvent event) {
    	System.out.println("[OpenAudio] Socket.io connected");
    	Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.SocketIoConnectEvent());
    }
    
    
    @EventHandler
    public void onSocketDisconnected(SocketDisconnectEvent event) {
    	System.out.println("[OpenAudio] Socket.io disconnected");
    	Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.SocketIoDisconnectEvent());
    }
    
    @EventHandler
	  public void onPlayerJoin(final PlayerJoinEvent event) {
    	//delay for if the player joined via bungee
    	timeoutManager.updateCounter();
    	Main.getPL().getServer().getScheduler().scheduleSyncDelayedTask(Main.getPL(), new Runnable() { public void run() {
    		Emitter.connectedInServer(event.getPlayer().getName());
    		userManager.addPlayer(event.getPlayer());
    		userManager.getPlayer(event.getPlayer()).syncSounds();
    		if (getDep.getStatus()) {
        		String regionNu = "-";
    			for(ProtectedRegion r : WGBukkit.getRegionManager(event.getPlayer().getWorld()).getApplicableRegions(event.getPlayer().getLocation())) {
    				regionNu = r.getId();
                }
    			
    			if (regionCrap.isValidRegion(regionNu)) {
    				command.playRegion(event.getPlayer().getName(), regionCrap.getRegionFile(regionNu));
    			}
        	}

        	if(event.getPlayer().isOp()) {
    			if (Bukkit.getVersion() != cm_callback.lastVersion) {
    				String thisversion = Main.getPL().getDescription().getVersion();
    				String newversion = cm_callback.lastVersion;
    				String updateTitle = cm_callback.updateTitle;
    				String broadcast = cm_callback.broadcast;
    				String message = Main.prefix + ChatColor.DARK_AQUA + "[UPDATE]" + ChatColor.RESET + " Update is avalible! "+ChatColor.AQUA+" your version:"+thisversion+" new version:"+newversion+ChatColor.RESET+ " Updating is recomended";
    				event.getPlayer().sendMessage(message);

    				if (broadcast != "") {
    					event.getPlayer().sendMessage(Main.prefix+"Important message: " + ChatColor.RESET + broadcast);
					}
				}
			}
    	} }, 20);
    }
    
    @EventHandler
	 public void onBlockPlaceEvent(BlockPlaceEvent event){
    	speakerMain.onPlace(event);
	 }
    
    @EventHandler
	 public void BlockBreakEvent(BlockBreakEvent event){
    	speakerMain.onBreak(event);
	 }
    
    
    @EventHandler
	  public void onPlayerQuit(PlayerQuitEvent event) {
    	Player p = event.getPlayer();	
    	command.stop(p.getName());
    	command.stopRegion(p.getName());
    	Emitter.offlineInServer(p.getName());
    	audioSpeakerManager.stopForPlayer(event.getPlayer().getName());
		
    	Main.getPL().getServer().getScheduler().scheduleAsyncDelayedTask(Main.getPL(), new Runnable() { public void run() {
    		timeoutManager.updateCounter();
    	} }, 5);
    }
    
    
    @EventHandler
    public void onPlayerTeleport(PlayerTeleportEvent event){
        Player p = event.getPlayer();
        FileConfiguration cfg = YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio", "messages.yml"));
		if (cfg.getBoolean("stop-on-teleport")) {
			command.stopAll(p.getName());
		}
    }
    
    
    public static Boolean isConnected(String name) {
		if (isConnected.get(name) != null) {
			if (isConnected.get(name) != true) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}

}
