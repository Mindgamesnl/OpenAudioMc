package de.snowdns.apps;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.UUID;

public class Auth {

	
	public static String getAppCode(String player) throws IOException {
		String ServerToken = net.openaudiomc.socket.Authenticator.getClientID();
		String PlayerS = net.openaudiomc.players.Sessions.getSession(player);
		
		String durl = "https://api.snowdns.de/oa.php?mode=getCode&ps=%psesion%&st=%servert%";
		String newd = durl.replace("%psession", PlayerS).replace("%servert%", ServerToken);
		String answer = net.openaudiomc.utils.WebUtils.getText(newd);
		return answer;
	}
	public static String createSCode(String NCode,String RID) throws IOException {
		String ServerToken = net.openaudiomc.socket.Authenticator.getClientID();
		
		String durl = "https://api.snowdns.de/oa.php?mode=cSCode&st=%servert%&ncode=%nc%&rid=%rid%";
		String newd = durl.replace("%servert%", ServerToken).replace("%nc%",NCode).replace("%rid%",RID);
		String answer = net.openaudiomc.utils.WebUtils.getText(newd);
		return answer;
	}
	public static String createNID() throws UnknownHostException {
		String hash;
		InetAddress IP=InetAddress.getLocalHost();
		hash = String.valueOf(IP.toString().hashCode());
		return hash;
	}
	public static String createRID() {
		String rid = "RID-SET-#%hrid%#";
		String rnd = String.valueOf(UUID.randomUUID().toString().hashCode());		
		rid = rid.replace("%hrid%",rnd);
		
		return rid;
	}
	
}
