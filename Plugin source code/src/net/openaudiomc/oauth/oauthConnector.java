package net.openaudiomc.oauth;

import java.io.IOException;

import net.openaudiomc.utils.webUtils;
import net.openaudiomc.socket.Authenticator;

public class oauthConnector {
	
	public static String getToken() {
		String serverid = Authenticator.getID();

		try {
			return webUtils.textFromUrl("http://api.openaudiomc.net/oauth/request_key?serverid="+serverid);
		} catch (IOException e) {
			return "Error while requesting key.";
		}
	}
	
}
