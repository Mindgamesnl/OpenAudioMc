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
