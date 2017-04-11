package net.openaudiomc.managers;

import java.util.HashMap;

import org.bukkit.entity.Player;

import net.openaudiomc.objects.userData;

public class userManager {
	
	static HashMap<Player, userData> userMap = new HashMap<Player, userData>();
	
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
		if (userMap.get(Player) != null) {
			userMap.put(Player, new userData(Player));
		}
	}
	
	public static userData getPlayer(Player player) {
		return userMap.get(player);
	}
	
	public static void removePlayer(Player Player) {
		userMap.remove(Player);
	}
    
}
