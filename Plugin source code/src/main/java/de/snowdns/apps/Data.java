package de.snowdns.apps;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
//import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
public class Data {

	
	public static String getSCode() {
		FileConfiguration cfg =
                YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio", "snowd.yml"));
        return cfg.getString("SCode");
		
	}
	public static String getRID() {
		FileConfiguration cfg =
                YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio", "snowd.yml"));
        return cfg.getString("RID");
		
	}
	public static String getNID() {
		FileConfiguration cfg =
                YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio", "snowd.yml"));
        return cfg.getString("NID");
		
	}
	
	
	public static String datarequest(String url2) throws IOException {
		String FMCurl = url2;     

		URL url = new URL(FMCurl);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();

		conn.setUseCaches(false);
		conn.setDoInput(true);
		conn.setDoOutput(true);

		conn.setRequestMethod("GET");
		//System.out.println(json.toString());

		//OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());
		InputStreamReader ir = new 	InputStreamReader(conn.getInputStream());
		BufferedReader br = new BufferedReader(ir);
		return br.readLine();
	}
}
