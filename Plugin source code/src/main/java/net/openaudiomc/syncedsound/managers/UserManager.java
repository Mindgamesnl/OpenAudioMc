package net.openaudiomc.syncedsound.managers;

import java.util.HashMap;

import org.bukkit.entity.Player;

import net.openaudiomc.syncedsound.objects.UserData;

public class UserManager {
	
	static HashMap<String, UserData> userMap = new HashMap<String, UserData>();
	
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
			userMap.put(Player.getName(), new UserData(Player));
		} else {
			
		}
	}
	
	public static UserData getPlayer(Player player) {
		return userMap.get(player.getName());
	}
	
	public static void removePlayer(Player Player) {
		userMap.remove(Player.getName());
	}
    
}
