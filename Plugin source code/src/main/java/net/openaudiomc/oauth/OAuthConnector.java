package net.openaudiomc.oauth;

import net.openaudiomc.socket.Authenticator;
import net.openaudiomc.utils.WebUtils;

import java.io.IOException;

public class OAuthConnector {

    public static String getToken() {
        String serverid = Authenticator.getID();

        try {
            String value = WebUtils.textFromUrl("http://api.openaudiomc.net/oauth/request_key?serverid=" + serverid);
            if (value == null) {
                return "Our auth server reached it's maximum load, please contact us.";
            }
            return value;
        } catch (IOException e) {
            return "Error while requesting key.";
        }
    }

}
