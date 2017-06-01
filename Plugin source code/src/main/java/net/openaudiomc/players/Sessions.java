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
package net.openaudiomc.players;

import com.google.common.collect.Maps;
import java.util.Map;
import java.util.Random;

import net.openaudiomc.socket.Authenticator;

public class Sessions {
	
	private static Map<String, String> sessions = Maps.newHashMap();
	
	public static String get(String player) {
		char[] chars = "abcdefghijklmnopqrstuvwxyz".toCharArray();
		StringBuilder sb = new StringBuilder();
		Random random = new Random();
		for (int i = 0; i < 5; i++) {
		    char c = chars[random.nextInt(chars.length)];
		    sb.append(c);
		}
		String key = sb.toString();
		String clientID = Authenticator.getClientID();
		String total = clientID + ":" + key;
		sessions.put(player, key);
		return total;		
	}
	
	public static String getOld(String player) {
		if (sessions.get(player) != null) {
			return sessions.get(player);
		} else {
			return get(player);
		}
	}
}