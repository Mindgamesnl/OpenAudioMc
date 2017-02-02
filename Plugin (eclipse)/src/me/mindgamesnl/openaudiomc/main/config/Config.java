package me.mindgamesnl.openaudiomc.main.config;


import org.bukkit.Bukkit;
import org.bukkit.ChatColor;


/**
 * Created by mats on 29-9-2016.
 */
public class Config {
	public static Integer Server_Ws_Host_Port_Int;
	public static String Chat_Message_Volume_Set;
	public static String Chat_Header;
	public static String Chat_Header_audio;
	public static String Project_Chat_Name_Prefix_Color;
	public static String Project_Chat_Error_Color;
	public static String Chat_Message_Volume_Set_Error;
	public static String Audio_Web_domain;
	public static String Connected_message;
	public static String Connect_sound;
	public static Boolean sream_live;
	public static String stream_source;
	public static String web_url;
	
	
	public static void Load() {
		
		sream_live = false;
		stream_source = "";
		
		
		
		Project_Chat_Error_Color = "" + ChatColor.RED + "WHOOPSY, das een error ~Mats";
		
		
		//load chat for /openaudio command
		String message_admin = me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("chat.name.admin");
		message_admin = ChatColor.translateAlternateColorCodes('&', message_admin);
		message_admin = ChatColor.translateAlternateColorCodes('$', message_admin);
		Project_Chat_Name_Prefix_Color = message_admin;
		
		
		
		
		String message_normal = me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("chat.name.normal");
		message_normal = ChatColor.translateAlternateColorCodes('&', message_normal);
		message_normal = ChatColor.translateAlternateColorCodes('$', message_normal);
		Chat_Header_audio = message_normal;
		
		
		String message_vol = me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("chat.message.volume_set");
		message_vol = ChatColor.translateAlternateColorCodes('&', message_vol);
		message_vol = ChatColor.translateAlternateColorCodes('$', message_vol);
		Chat_Message_Volume_Set = message_vol;
		
		
		
		String message_vol_error = me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("chat.message.volume_error");
		message_vol_error = ChatColor.translateAlternateColorCodes('&', message_vol_error);
		message_vol_error = ChatColor.translateAlternateColorCodes('$', message_vol_error);
		Chat_Message_Volume_Set_Error = message_vol_error;
		
		
		String AudioConnectSource = me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("config.webhost");
		AudioConnectSource = ChatColor.translateAlternateColorCodes('&', AudioConnectSource);
		AudioConnectSource = ChatColor.translateAlternateColorCodes('$', AudioConnectSource);
		AudioConnectSource = ChatColor.stripColor(AudioConnectSource);
		web_url = AudioConnectSource.replace("%client%", "");
		
		
		String AudioConnect = me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("chat.message.connect");
		AudioConnect = ChatColor.translateAlternateColorCodes('&', AudioConnect);
		AudioConnect = ChatColor.translateAlternateColorCodes('$', AudioConnect);
		AudioConnect = AudioConnect.replace("%client%", "");
		Audio_Web_domain = AudioConnect;
		
		
		
		String conmessage = me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("chat.message.connected");
		conmessage = ChatColor.translateAlternateColorCodes('&', conmessage);
		conmessage = ChatColor.translateAlternateColorCodes('$', conmessage);
		Connected_message = conmessage;
		
		Bukkit.broadcastMessage("[OpenAudio] Config loaded!");
			
		
	}
	
	
	
	
	
	
	
	

	
	
	
	
	
}
