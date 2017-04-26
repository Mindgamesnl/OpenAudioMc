package net.openaudiomc.syncedSound.managers;

import java.util.HashMap;

import org.bukkit.entity.Player;

import net.openaudiomc.syncedSound.objects.userData;

public class userManager {
	
	static HashMap<String, userData> userMap = new HashMap<String, userData>();
	
	public static void addPlayer(Player Player) {
		/*
			//\
			V  \
			 \  \_
			  \,'.`-.
			   |\ `. `.       
			   ( \  `. `-.                        _,.-:\
			    \ \   `.  `-._             __..--' ,-';/
			     \ `.   `-.   `-..___..---'   _.--' ,'/
			      `. `.    `-._        __..--'    ,' /
			        `. `-_     ``--..''       _.-' ,'
			          `-_ `-.___        __,--'   ,'
			             `-.__  `----"""    __.-'
			                  `--..____..--'                      
		 */
		if (userMap.get(Player.getName()) == null) {
			userMap.put(Player.getName(), new userData(Player));
		} else {
			
		}
	}
	
	public static userData getPlayer(Player player) {
		return userMap.get(player.getName());
	}
	
	public static void removePlayer(Player Player) {
		userMap.remove(Player.getName());
	}
    
}
