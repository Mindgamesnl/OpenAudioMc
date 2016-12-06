package me.mindgamesnl.openaudiomc.config;

import org.bukkit.plugin.Plugin;

public class Creator {
	
private static Plugin PL;
	

	public static void Setup() {
		setPL(me.mindgamesnl.openaudiomc.main.Main.getPL());
	}
	
	
	public static String wsport;
	public static void SetupDefault() throws Exception{
		
   		try {
			wsport = me.mindgamesnl.openaudiomc.apiConnector.ApiFunctions.getWsPort();
			PL.getConfig().set("config.ws_host_port", wsport);
		} catch (Exception e) {
			e.printStackTrace();
		}
   		
   		try {
			PL.getConfig().set("config.ws_host_adress", me.mindgamesnl.openaudiomc.apiConnector.ApiFunctions.getWsAdress());
		} catch (Exception e) {
			e.printStackTrace();
		}
   		
   		
   		//dump da shizzle to da config file bruh
   		PL.getConfig().set("config.webhost", "&6http://openaudiomcdemo.craftmend.com/?user=%username%&_ExampleServerDetails=" + me.mindgamesnl.openaudiomc.apiConnector.ApiFunctions.getWsAdress() + ":" + wsport + "");
   		PL.getConfig().set("config.startsound", "http://static.craftmend.com/spigot/openaudio/load_sound.mp3");
	    PL.getConfig().set("chat.name.admin", "&3[&6OpenAudio-Admin&3]&7");
	    PL.getConfig().set("chat.name.normal", "&3[&6OpenAudio&3]&7 ");
	    PL.getConfig().set("chat.message.volume_set", "&6Volume set to&b %vol &6%");
	    PL.getConfig().set("chat.message.connected", "&bYou are now &2Connected&b to OpenAudio!");
	    PL.getConfig().set("chat.message.connect", "&6Connect to the openaudio ecample server %client%");
	    PL.getConfig().set("chat.message.volume_error", "&4Nope, only numeric characters are accepted!");
   		PL.getConfig().set("region.isvalid.openaudio_placeholder", "true");
   		PL.getConfig().set("region.src.openaudio_placeholder", "Don't remove me!");
	    PL.getConfig().options().copyDefaults(true);
	    PL.saveConfig();
	    
	}
	
	
	public static Plugin getPL() {
		return PL;
	}


	public static void setPL(Plugin pL) {
		PL = pL;
	}
}
