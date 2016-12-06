package me.mindgamesnl.openaudiomc.main.mc.mc;

import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import com.sk89q.worldguard.bukkit.WGBukkit;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;

import me.mindgamesnl.openaudiomc.websocket.WsSender;


public class Commands implements CommandExecutor {
	//Main
		public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
			if (me.mindgamesnl.openaudiomc.main.Main.openaudioIsBlocked == false) {
				if (cmd.getName().equalsIgnoreCase("openaudio")) {
					if (sender.hasPermission("openaudio.admin")) {
						if (args.length > 0) {
								if (args[0].equalsIgnoreCase("debug")) {
									sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " Command to: " + args[1]);
									WsSender.playToAll(args[2]);
								} else if (args[0].equalsIgnoreCase("send")) {
									String myString = "";
									for(int i = 2; i < args.length; i++){
									    String arg = args[i] + " ";
									    myString = myString + arg;
									}
									sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " Message to: " + args[1]);
							
									WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(args[1]), "{\"command\":\"puush_meld\",\"message\":\"" + myString + "\"}");
								} else if (args[0].equalsIgnoreCase("play")) {
									sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " Command to: " + args[1]);
									WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(args[1]), "{\"command\":\"play\",\"line\":\"play\",\"src\":\"" + args[2] + "\"}");
								} else if (args[0].equalsIgnoreCase("skript")) {
									WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(args[1]), args[2]);
								} else if (args[0].equalsIgnoreCase("loop")) {
									sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " Command to: " + args[1]);
									WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(args[1]), "{\"command\":\"play\",\"line\":\"loop\",\"src\":\"" + args[2] + "\"}");
								} else if (args[0].equalsIgnoreCase("pause")) {
									sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " Command to: " + args[1]);
									WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(args[1]), "{\"command\":\"pause\",\"line\":\"loop\",\"src\":\"" + args[2] + "\"}");
								} else if (args[0].equalsIgnoreCase("resume")) {
									sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " Command to: " + args[1]);
									WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(args[1]), "{\"command\":\"resume\",\"line\":\"loop\",\"src\":\"" + args[2] + "\"}");
								} else if (args[0].equalsIgnoreCase("setbg")) {
									sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " Command to: " + args[1]);
									WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(args[1]), "{\"command\":\"setbg\",\"line\":\"loop\",\"code\":\"" + args[2] + "\"}");
								} else if (args[0].equalsIgnoreCase("stop")) {
									sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " Command to: " + args[1]);
									WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(args[1]), "{\"command\":\"stop\"}");
									
								} else if (args[0].equalsIgnoreCase("reconnect")) {
									sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " Command to: " + args[1]);
									WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(args[1]), "{\"command\":\"reconnect\",\"line\":\"loop\",\"code\":\"" + args[2] + "\"}");
									
								} else if (args[0].equalsIgnoreCase("kick")) {
									sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " Command to: " + args[1]);
									WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(args[1]), "{\"command\":\"kick\"}");
									
								} else if (args[0].equalsIgnoreCase("install")) {
									
									sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " Please enter the following information in the OpenAudioMc Setup");
									sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " OpenAudio Host: " + ChatColor.GRAY + me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("config.ws_host_adress"));
									sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " OpenAudio Port: " + ChatColor.GRAY + me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("config.ws_host_port"));
									
								} else if (args[0].equalsIgnoreCase("buffer")) {
									
									sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " Command to: " + args[1]);
									WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(args[1]), "{\"command\":\"loadfile\",\"line\":\"loop\",\"src\":\"" + args[2] + "\"}");
									
								} else if (args[0].equalsIgnoreCase("playbuffer")) {
									
									sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " Command to: " + args[1]);
									WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(args[1]), "{\"command\":\"playloaded\"}");
									
								} else if (args[0].equalsIgnoreCase("group")) {
									
									
									if (args[1].equalsIgnoreCase("play")) {
										
										for (Player p : Bukkit.getOnlinePlayers()) {
											if (me.mindgamesnl.openaudiomc.groupManager.groupManager.getPlayerGroup(p.getName()).equalsIgnoreCase(args[2])) {
												WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(p.getName()), "{\"command\":\"play\",\"line\":\"play\",\"src\":\"" + args[3] + "\"}");
											}
								        }
										sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " Played sound for all users in group: " + args[2]);
										
									} 
									
									if (args[1].equalsIgnoreCase("leave")) {
										me.mindgamesnl.openaudiomc.groupManager.groupManager.leavePlayerGroup(args[2]);
										sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " Removed the group of " + args[2]);
									} 
									
									if (args[1].equalsIgnoreCase("join")) {
										me.mindgamesnl.openaudiomc.groupManager.groupManager.addPlayerToGroup(args[2], args[3]);
										sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " Added " + args[2] + " to group " + args[3]);
									} 
									
									if (args[1].equalsIgnoreCase("add")) {
										me.mindgamesnl.openaudiomc.groupManager.groupManager.addGroup(args[2]);
										sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " Created group: " + args[2]);
									}
									
									if (args[1].equalsIgnoreCase("delete")) {
										me.mindgamesnl.openaudiomc.groupManager.groupManager.removeGroup(args[2]);
										sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " Removed group: " + args[2]);
										
									}
									
									
								} else if (args[0].equalsIgnoreCase("playregion")) {
									if (me.mindgamesnl.openaudiomc.detectors.checkDependencies.dependenciesComplete == true) {
										for (Player p : Bukkit.getOnlinePlayers()) {
											for(ProtectedRegion r : WGBukkit.getRegionManager(p.getWorld()).getApplicableRegions(p.getLocation())) {
													if (args[1].equalsIgnoreCase(r.getId())) {
														WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(p.getName()), "{\"command\":\"play\",\"line\":\"play\",\"src\":\"" + args[2] + "\"}");
													}
								                }
								        }
										sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " Started sound for all the players in the region!");
										
									} else {
										sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " Not all dependencies are installed, all the region functions will NOT work! please install WorldEdit, WorldGuard and WgRegionEvents!");
									}
									
							
									
									
								} else if (args[0].equalsIgnoreCase("live")) {
									if (args[1].equalsIgnoreCase("start")) {
										me.mindgamesnl.openaudiomc.main.config.Config.sream_live = true;
										me.mindgamesnl.openaudiomc.main.config.Config.stream_source = args[2];
										for (Player p : Bukkit.getOnlinePlayers()) {
											WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(p.getName()), "{\"command\":\"startlive\",\"line\":\"loop\",\"src\":\"" + me.mindgamesnl.openaudiomc.main.config.Config.stream_source + "\"}");
										}
									}
									
									if (args[1].equalsIgnoreCase("stop")) {
										me.mindgamesnl.openaudiomc.main.config.Config.sream_live = false;
										for (Player p : Bukkit.getOnlinePlayers()) {
											WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(p.getName()), "{\"command\":\"stoplive\",\"line\":\"loop\",\"src\":\"" + p.getName() + "\"}");
										}
									}
									
									
									
								} else if (args[0].equalsIgnoreCase("region")) {
									if (me.mindgamesnl.openaudiomc.detectors.checkDependencies.dependenciesComplete == true) {
										if (args[1].equalsIgnoreCase("delete")) {
											if (args[2] == "") {
												sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " Please enter a region name!");
											} else {
												if (me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getBoolean("region.isvalid.openaudio_" + args[2]) == false) {
													sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " This region does not exist!");
												} else if (me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getString("region.isvalid.openaudio_" + args[2]).isEmpty()) {
													sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " This region does not exist!");
												} else {
													//conplete command
													((Player) sender).chat("/region delete openaudio_" + args[2]);
													me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().set("region.isvalid.openaudio_" + args[2], false);
													me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().set("region.src.openaudio_" + args[2], "Deleted!");
													me.mindgamesnl.openaudiomc.main.Main.getPL().saveConfig();
													sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " This region is now deleted!");
												}
											}
										}
										if (args[1].equalsIgnoreCase("create")) {
											if (args[2] == "") {
												sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " Please enter a region name!");
											} else {
												//region name is given
												if (args[3] == "") {
													sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " Please enter a region file!");
												} else {
													
													if (me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().getBoolean("region.isvalid.openaudio_" + args[2]) == true) {
														sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " This region already has a sound allocated!");
													} else {
														//conplete command
														((Player) sender).chat("/region create openaudio_" + args[2]);
														me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().set("region.isvalid.openaudio_" + args[2], true);
														me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().set("region.src.openaudio_" + args[2], args[3]);
														me.mindgamesnl.openaudiomc.main.Main.getPL().getConfig().options().copyDefaults(true);
														me.mindgamesnl.openaudiomc.main.Main.getPL().saveConfig();
														sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " The value of " + args[2] + " now is " + args[3] + "!");
													}
												}
											}
										}
	
									} else {
										sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " Not all dependencies are installed, all the region functions will NOT work! please install WorldEdit, WorldGuard and WgRegionEvents!");
									}
								} else if (args[0].equalsIgnoreCase("help")) {
									
									if (args.length == 1) {
										
										sender.sendMessage("");
										sender.sendMessage(" ");
										sender.sendMessage("  ");
										sender.sendMessage("   ");
										sender.sendMessage("    ");
										sender.sendMessage("     ");
										sender.sendMessage("========" + me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " (1/6)");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio play <name> <url> " + ChatColor.GRAY + "Plays a file for a player.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio stop <name> " + ChatColor.GRAY + "Stops all sounds for the player.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /volume <0-100> " + ChatColor.GRAY + "Sets the volume.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /audio " + ChatColor.GRAY + "Gives the player a link to open the client.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio help 2 " + ChatColor.GRAY + "Gives you more info.");
										
									} else if (args[1].equalsIgnoreCase("1")) {
										
										sender.sendMessage("");
										sender.sendMessage(" ");
										sender.sendMessage("  ");
										sender.sendMessage("   ");
										sender.sendMessage("    ");
										sender.sendMessage("     ");
										sender.sendMessage("========" + me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " (1/6)");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio play <name> <url> " + ChatColor.GRAY + "Plays a file for a player.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio stop <name> " + ChatColor.GRAY + "Stops all sounds for the player.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /volume <0-100> " + ChatColor.GRAY + "Sets the volume.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /audio " + ChatColor.GRAY + "Gives the player a link to open the client.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio help 2 " + ChatColor.GRAY + "Gives you more info.");
										
									} else if (args[1].equalsIgnoreCase("2")) {
										
										sender.sendMessage("");
										sender.sendMessage(" ");
										sender.sendMessage("  ");
										sender.sendMessage("   ");
										sender.sendMessage("    ");
										sender.sendMessage("     ");
										sender.sendMessage("========" + me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " (2/6)");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio send <name> <message> " + ChatColor.GRAY + "Send a message to a player.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio loop <name> <url> " + ChatColor.GRAY + "Plays a loop for a player.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio region create <name> <url> " + ChatColor.GRAY + "Create a region with music.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio region delete <name> " + ChatColor.GRAY + "Delete a music region.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio help 3 " + ChatColor.GRAY + "Gives you more info.");
										
									} else if (args[1].equalsIgnoreCase("3")) {
										
										sender.sendMessage("");
										sender.sendMessage(" ");
										sender.sendMessage("  ");
										sender.sendMessage("   ");
										sender.sendMessage("    ");
										sender.sendMessage("     ");
										sender.sendMessage("========" + me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " (3/6)");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio setbg <name> <code/url/reset> " + ChatColor.GRAY + "Set a background image/color.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio buffer <name> <url> " + ChatColor.GRAY + "Buffer a sound.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio playbuffer <name> <url> " + ChatColor.GRAY + "Start sound in buffer.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio pause <name> <url/sound> " + ChatColor.GRAY + "Pause a sound.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio resume <name> <url/sound> " + ChatColor.GRAY + "Resume a sound.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio help 4 " + ChatColor.GRAY + "Gives you more info.");
	
									} else if (args[1].equalsIgnoreCase("4")) {
										
										sender.sendMessage("");
										sender.sendMessage(" ");
										sender.sendMessage("  ");
										sender.sendMessage("   ");
										sender.sendMessage("    ");
										sender.sendMessage("     ");
										sender.sendMessage("========" + me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " (4/6)");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio live start <stream> " + ChatColor.GRAY + "Start a live stream.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio live stop " + ChatColor.GRAY + "Stop a live stream.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio playregion <region> <url> " + ChatColor.GRAY + "Start sound for all the players in a region.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio help 5 " + ChatColor.GRAY + "Gives you more info.");
										
									} else if (args[1].equalsIgnoreCase("5")) {
										
										sender.sendMessage("");
										sender.sendMessage(" ");
										sender.sendMessage("  ");
										sender.sendMessage("   ");
										sender.sendMessage("    ");
										sender.sendMessage("     ");
										sender.sendMessage("========" + me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " (5/6)");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio debug <JSON> " + ChatColor.GRAY + "Send json string to all clients.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio kick <name> " + ChatColor.GRAY + "Kick a user from openaudio.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio reconnect <name> <new ws host> " + ChatColor.GRAY + "Connect a user to an other bungeecord server.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio install " + ChatColor.GRAY + "Show setup info.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio help 6 " + ChatColor.GRAY + "Gives you more info.");
										
										
									} else if (args[1].equalsIgnoreCase("6")) {
										
										sender.sendMessage("");
										sender.sendMessage(" ");
										sender.sendMessage("  ");
										sender.sendMessage("   ");
										sender.sendMessage("    ");
										sender.sendMessage("     ");
										sender.sendMessage("========" + me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " (6/6)");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio group add <group name> " + ChatColor.GRAY + "Create a player group.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio group delete <group name> " + ChatColor.GRAY + "Delete a player group.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio group join <player> <group> " + ChatColor.GRAY + "Add a player to a group.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio group leave <player> " + ChatColor.GRAY + "Remove a player to a group.");
										sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio group play <group> <sound> " + ChatColor.GRAY + "Play a sound to a group.");
										
										
										
									}
								}
						} else {
							//geen arguments
							sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " OpenAudio made with <3 by Mindgamesnl (you can use '/openaudio help' for help :P) need more help? Contact me!");
						}
					} else {
						sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " You don't have the required permissions! (openaudio.admin)!");
					}
					return true;
				} else if (cmd.getName().equalsIgnoreCase("audio")) {
					
					sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Chat_Header_audio + me.mindgamesnl.openaudiomc.main.config.Config.Audio_Web_domain.replace("%username%", sender.getName()));
					
					
					return true;
				} else if (cmd.getName().equalsIgnoreCase("connect")) {
					
					sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Chat_Header_audio + me.mindgamesnl.openaudiomc.main.config.Config.Audio_Web_domain.replace("%username%", sender.getName()));
					
					
					return true;
				} else if (cmd.getName().equalsIgnoreCase("volume")) {
					if (args.length > 0) {
						if (isInt(args[0])) {
							
							if (Integer.parseInt(args[0]) > 100 || Integer.parseInt(args[0]) < -1) {
								sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Chat_Header_audio + me.mindgamesnl.openaudiomc.main.config.Config.Chat_Message_Volume_Set_Error);
							} else {
							
							WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(sender.getName()), "{\"command\":\"setvolume\",\"target\":\"" + args[0] + "\"}");
							
							sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Chat_Header_audio + me.mindgamesnl.openaudiomc.main.config.Config.Chat_Message_Volume_Set.replace("%vol", args[0]));
							}
						} else {
						sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Chat_Header_audio + me.mindgamesnl.openaudiomc.main.config.Config.Chat_Message_Volume_Set_Error);
						}
					} else {
						sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Chat_Header_audio + me.mindgamesnl.openaudiomc.main.config.Config.Chat_Message_Volume_Set_Error);
					}
					return true;
				} 
				return false; 
		} else {
			sender.sendMessage(me.mindgamesnl.openaudiomc.main.config.Config.Project_Chat_Name_Prefix_Color + " Openaudio could not start correctly! please restart the server!");
			return true;
			//openaudio dissabled
		}
	}
	
	public static boolean isInt(String s) {
	    try {
	        Integer.parseInt(s);
	    } catch (NumberFormatException nfe) {
	        return false;
	    }
	    return true;
	}

}