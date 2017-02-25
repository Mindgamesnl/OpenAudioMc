package net.openaudiomc.socket;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.net.URL;

import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
import org.json.JSONException;
import org.json.JSONObject;

public class Authenticator {
	
	public static String getID() {
		FileConfiguration cfg = YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio", "serverData.yml"));
		return cfg.getString("serverID");
	}
	
	public static String getClientID() {
		try {
			JSONObject obj = new JSONObject(getClientToken());
			return obj.getString("cid");
		} catch (JSONException e) {
		} catch (Exception e) {
		}
		return null;
	}
	
	public static JSONObject getNewId() {
		try {
			JSONObject obj = new JSONObject(getClient());
			return obj;
		} catch (JSONException e) {
		} catch (Exception e) {
		}
		return null;
	}
	
	public static String getClientToken() throws Exception {
	    URL url = new URL("http://api.craftmend.com/openaudio/getInfo.php?token="+getID());
	    BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));
	    String str;
	    while ((str = in.readLine()) != null) {
	      return str; 
	    }
	    in.close();
		return str;
	 }
	
	public static String getNodeServer(String url_to_server) throws Exception {
	    URL url = new URL(url_to_server);
	    BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));
	    String str;
	    while ((str = in.readLine()) != null) {
	      return str; 
	    }
	    in.close();
		return str;
	 }
	
	public static String getClient() throws Exception {
	    URL url = new URL("http://api.craftmend.com/openaudio/genKey.php");
	    BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));
	    String str;
	    while ((str = in.readLine()) != null) {
	      return str; 
	    }
	    in.close();
		return str;
	 }
	
}
