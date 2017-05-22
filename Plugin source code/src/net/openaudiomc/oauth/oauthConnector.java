package net.openaudiomc.oauth;

import java.io.IOException;

import net.openaudiomc.utils.webUtils;
import net.openaudiomc.socket.Authenticator;

public class oauthConnector {
	
	public static String getToken() {
		String serverid = Authenticator.getID();

		try {
		    String value = webUtils.textFromUrl("http://api.openaudiomc.net/oauth/request_key?serverid="+serverid);
			if (value == null) {
		        return "Our auth server reached it's maximum load, please contact us.";
            }
            return value;
		} catch (IOException e) {
			return "Error while requesting key.";
		}
	}
	
}
