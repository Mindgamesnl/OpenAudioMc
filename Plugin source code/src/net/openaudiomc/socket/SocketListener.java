package net.openaudiomc.socket;

import java.io.File;
import java.util.HashMap;

import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.OfflinePlayer;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.event.player.PlayerQuitEvent;

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
import net.openaudiomc.minecraft.getdDep;
import net.openaudiomc.players.Sessions;
import net.openaudiomc.regions.regionCrap;
import net.openaudiomc.socket.Emitter;

public class SocketListener implements Listener{    
    
	static HashMap<String, Boolean> isConnected = new HashMap<String, Boolean>();
	
	@EventHandler
    public void onSocketCommandEvent(SocketCommandEvent event) {
    	System.out.println("Socket command event: " + event.getCommand());
    }
    
    
    @EventHandler
    public void onSocketUserConnectEvent(SocketUserConnectEvent event) {
    	if (event.getKey().equals(Sessions.getOld(event.getName()))) {
    		//good client
    		
    		
    		
    		@SuppressWarnings("deprecation")
			OfflinePlayer player = Bukkit.getOfflinePlayer(event.getName());
    		if (player.isOnline()) {
    			Player client = Bukkit.getPlayer(event.getName());
    			client.sendMessage(Messages.getColor("connected-message"));
    			command.playNormalSound(event.getName(), Messages.get("start-sound"));
    			Emitter.connectedInServer(event.getName());
    			isConnected.put(client.getName(), true);
    			
    			String connector = event.getName();
    			for (Player p : Bukkit.getOnlinePlayers()) {
    				if (spy.spyMap.get(p) != null) {
    					if (spy.spyMap.get(p)) {
    						p.sendMessage("" + ChatColor.AQUA + "[" + ChatColor.GREEN + "+" + ChatColor.AQUA + "]" + ChatColor.YELLOW + ChatColor.ITALIC + " " +  connector + ChatColor.GRAY + ChatColor.ITALIC + " connected to openaudio.");
    					}
    				}
    			}
    			
    			FileConfiguration cfg = YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio/advanced", "advancedConfig.yml"));
    			try {
					String status = cfg.getString("ssl-enabled");
					if (status == "true") {
						command.enableHue(client.getName());
					}
				} catch (Exception e) {
				}
    			
    			if (getdDep.getStatus()) {
    	    		String regionNu = "-";
    				for(ProtectedRegion r : WGBukkit.getRegionManager(client.getWorld()).getApplicableRegions(client.getLocation())) {
    					regionNu = r.getId();
    	            }
    				if (regionCrap.isValidRegion(regionNu)) {
    					command.playRegion(client.getName(), regionCrap.getRegionFile(regionNu));
    				}
    	    	}
    		} else {
    			Emitter.offlineInServer(event.getName());
    		}
    		Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.WebConnectEvent(Bukkit.getPlayer(event.getName())));
    	} else {
    		Emitter.KickPlayerConnection(event.getName());
    	}
    }
    
    
    @EventHandler
    public void onSocketUserDisconnectEvent(SocketUserDisconnectEvent event) {
    	isConnected.put(event.getName(), false);
    	Bukkit.getServer().getPluginManager().callEvent(new me.mindgamesnl.openaudiomc.publicApi.WebDisconnectEvent(Bukkit.getPlayer(event.getName())));
    	
    	String connector = event.getName();
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
	  public void onPlayerJoin(PlayerJoinEvent event) {
    	Player p = event.getPlayer();
    	
    	Emitter.connectedInServer(p.getName());
    	
    	
    	if (getdDep.getStatus()) {
    		String regionNu = "-";
			for(ProtectedRegion r : WGBukkit.getRegionManager(event.getPlayer().getWorld()).getApplicableRegions(event.getPlayer().getLocation())) {
				regionNu = r.getId();
            }
			
			if (regionCrap.isValidRegion(regionNu)) {
				command.playRegion(event.getPlayer().getName(), regionCrap.getRegionFile(regionNu));
			}
    	}
    }
    
    
    @EventHandler
	  public void onPlayerQuit(PlayerQuitEvent event) {
    	Player p = event.getPlayer();
    	
    	command.stop(p.getName());
    	command.stopRegion(p.getName());
    	Emitter.offlineInServer(p.getName());
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
