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
		userMap.put(Player, new userData(Player));
	}
	
	public static void removePlayer(Player Player) {
		userMap.remove(Player);
	}
    
}
