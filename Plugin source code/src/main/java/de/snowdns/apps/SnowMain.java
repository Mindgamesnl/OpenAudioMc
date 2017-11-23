package de.snowdns.apps;

import java.io.File;
import java.io.IOException;

import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;

public class SnowMain {

	public static boolean ready = false;
	public static void init() throws IOException {
		System.out.println("[SNOW] OpenAudio App Extension Starting!");
		
		if (isReady())
		{
		 // Start Loading Data Sets
			createDataSet();
		// Setting Public Status
			System.out.println("[SNOW] OpenAudio App: Done Loading!!!");
			ready = true;
			
		} else {
			System.out.println("[SNOW] OpenAudio App Server not Ready! | App Functions will not work!!!");
		}
	}
	
	private static boolean isReady() throws IOException {
		String response = Data.datarequest("http://api.snowdns.de/oa.php?test=true");
		if (response.equalsIgnoreCase("OA SnowFlake Ready")) {
			return true;
		} else {
			return false;
		}
		
	}

	public static void createDataSet() throws IOException {
        File dataFile = new File("plugins/OpenAudio", "snowd.yml");
        if (!dataFile.exists()) {
            try {
                dataFile.createNewFile();
            } catch (IOException e) {

            }
            System.out.println("Generating Config and Config Values!");
            //Generating Network Hash
            String nid = Auth.createNID();
            System.out.println("[SNOW] OpenAudio App: Network Hash => " + nid);
            //Generate Ressource Hash
            String rid = Auth.createRID();
            System.out.println("[SNOW] OpenAudio App: Ressource Hash => " + rid);
            //Register @ AppServer
            String scode = Auth.createSCode(nid,rid);
            System.out.println("[SNOW] OpenAudio App: Server Code => " + scode);
            //Writing DataFile
            FileConfiguration datafileInst = YamlConfiguration.loadConfiguration(dataFile);
            datafileInst.set("Description", "DataSets for the Applikation Made by Snow");
            datafileInst.set("SCode", scode);
            datafileInst.set("NID", nid);
            datafileInst.set("RID", rid);
            try {
                datafileInst.save(dataFile);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
