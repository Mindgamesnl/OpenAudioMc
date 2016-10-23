package me.mindgamesnl.mcwebsocket.main.mc.mc;

import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import com.sk89q.worldguard.bukkit.WGBukkit;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;
import me.mindgamesnl.mcwebsocket.main.Mc_Websocket.WsSender;


public class Commands implements CommandExecutor {
	//Main
		public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
			if (cmd.getName().equalsIgnoreCase("openaudio")) {
				if (sender.hasPermission("openaudio.admin")) {
					if (args.length > 0) {
							if (args[0].equalsIgnoreCase("debug")) {
								sender.sendMessage(me.mindgamesnl.mcwebsocket.main.config.Config.Project_Chat_Name_Prefix_Color + " Command to: " + args[1]);
								WsSender.playToAll(args[2]);
							} else if (args[0].equalsIgnoreCase("send")) {
								sender.sendMessage(me.mindgamesnl.mcwebsocket.main.config.Config.Project_Chat_Name_Prefix_Color + " Command to: " + args[1]);
						
								WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(args[1]), "{\"command\":\"puush_meld\",\"message\":\"" + args[2] + "\"}");
							} else if (args[0].equalsIgnoreCase("play")) {
								sender.sendMessage(me.mindgamesnl.mcwebsocket.main.config.Config.Project_Chat_Name_Prefix_Color + " Command to: " + args[1]);
								WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(args[1]), "{\"command\":\"play\",\"line\":\"play\",\"src\":\"" + args[2] + "\"}");
							} else if (args[0].equalsIgnoreCase("loop")) {
								sender.sendMessage(me.mindgamesnl.mcwebsocket.main.config.Config.Project_Chat_Name_Prefix_Color + " Command to: " + args[1]);
								WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(args[1]), "{\"command\":\"play\",\"line\":\"loop\",\"src\":\"" + args[2] + "\"}");
							} else if (args[0].equalsIgnoreCase("setbg")) {
								sender.sendMessage(me.mindgamesnl.mcwebsocket.main.config.Config.Project_Chat_Name_Prefix_Color + " Command to: " + args[1]);
								WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(args[1]), "{\"command\":\"setbg\",\"line\":\"loop\",\"code\":\"" + args[2] + "\"}");
							} else if (args[0].equalsIgnoreCase("stop")) {
								sender.sendMessage(me.mindgamesnl.mcwebsocket.main.config.Config.Project_Chat_Name_Prefix_Color + " Command to: " + args[1]);
								WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(args[1]), "{\"command\":\"stop\"}");
								
							} else if (args[0].equalsIgnoreCase("buffer")) {
								
								sender.sendMessage(me.mindgamesnl.mcwebsocket.main.config.Config.Project_Chat_Name_Prefix_Color + " Command to: " + args[1]);
								WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(args[1]), "{\"command\":\"loadfile\",\"line\":\"loop\",\"src\":\"" + args[2] + "\"}");
								
							} else if (args[0].equalsIgnoreCase("playbuffer")) {
								
								sender.sendMessage(me.mindgamesnl.mcwebsocket.main.config.Config.Project_Chat_Name_Prefix_Color + " Command to: " + args[1]);
								WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(args[1]), "{\"command\":\"playloaded\"}");
								
							} else if (args[0].equalsIgnoreCase("playregion")) {
								
								for (Player p : Bukkit.getOnlinePlayers()) {
									for(ProtectedRegion r : WGBukkit.getRegionManager(p.getWorld()).getApplicableRegions(p.getLocation())) {
											if (args[1].equalsIgnoreCase(r.getId())) {
												Bukkit.broadcastMessage(" " + p.getName() + " is in de region");
												WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(p.getName()), "{\"command\":\"play\",\"line\":\"play\",\"src\":\"" + args[2] + "\"}");
											}
						                }
						        }
								sender.sendMessage(me.mindgamesnl.mcwebsocket.main.config.Config.Project_Chat_Name_Prefix_Color + " Started sound for all the players in the region!");
								
						
								
								
							} else if (args[0].equalsIgnoreCase("region")) {	
								if (args[1].equalsIgnoreCase("delete")) {
									if (args[2] == "") {
										sender.sendMessage(me.mindgamesnl.mcwebsocket.main.config.Config.Project_Chat_Name_Prefix_Color + " Please enter a region name!");
									} else {
										if (me.mindgamesnl.mcwebsocket.main.Mc_Websocket.Main.getPL().getConfig().getBoolean("region.isvalid.openaudio_" + args[2]) == false) {
											sender.sendMessage(me.mindgamesnl.mcwebsocket.main.config.Config.Project_Chat_Name_Prefix_Color + " This region does not exist!");
										} else if (me.mindgamesnl.mcwebsocket.main.Mc_Websocket.Main.getPL().getConfig().getString("region.isvalid.openaudio_" + args[2]).isEmpty()) {
											sender.sendMessage(me.mindgamesnl.mcwebsocket.main.config.Config.Project_Chat_Name_Prefix_Color + " This region does not exist!");
										} else {
											//conplete command
											((Player) sender).chat("/region delete openaudio_" + args[2]);
											me.mindgamesnl.mcwebsocket.main.Mc_Websocket.Main.getPL().getConfig().set("region.isvalid.openaudio_" + args[2], false);
											me.mindgamesnl.mcwebsocket.main.Mc_Websocket.Main.getPL().getConfig().set("region.src.openaudio_" + args[2], "Deleted!");
											me.mindgamesnl.mcwebsocket.main.Mc_Websocket.Main.getPL().saveConfig();
											sender.sendMessage(me.mindgamesnl.mcwebsocket.main.config.Config.Project_Chat_Name_Prefix_Color + " This region is now deleted!");
										}
									}
								}
								if (args[1].equalsIgnoreCase("create")) {
									if (args[2] == "") {
										sender.sendMessage(me.mindgamesnl.mcwebsocket.main.config.Config.Project_Chat_Name_Prefix_Color + " Please enter a region name!");
									} else {
										//region name is given
										if (args[3] == "") {
											sender.sendMessage(me.mindgamesnl.mcwebsocket.main.config.Config.Project_Chat_Name_Prefix_Color + " Please enter a region file!");
										} else {
											
											if (me.mindgamesnl.mcwebsocket.main.Mc_Websocket.Main.getPL().getConfig().getBoolean("region.isvalid.openaudio_" + args[2]) == true) {
												sender.sendMessage(me.mindgamesnl.mcwebsocket.main.config.Config.Project_Chat_Name_Prefix_Color + " This region already has a sound allocated!");
											} else {
												//conplete command
												((Player) sender).chat("/region create openaudio_" + args[2]);
												me.mindgamesnl.mcwebsocket.main.Mc_Websocket.Main.getPL().getConfig().set("region.isvalid.openaudio_" + args[2], true);
												me.mindgamesnl.mcwebsocket.main.Mc_Websocket.Main.getPL().getConfig().set("region.src.openaudio_" + args[2], args[3]);
												me.mindgamesnl.mcwebsocket.main.Mc_Websocket.Main.getPL().getConfig().options().copyDefaults(true);
												me.mindgamesnl.mcwebsocket.main.Mc_Websocket.Main.getPL().saveConfig();
												sender.sendMessage(me.mindgamesnl.mcwebsocket.main.config.Config.Project_Chat_Name_Prefix_Color + " The value of " + args[2] + " now is " + args[3] + "!");
											}
										}
									}
								}

								
							} else if (args[0].equalsIgnoreCase("help")) {
		
								
								
								
								
					
									sender.sendMessage("");
									sender.sendMessage(" ");
									sender.sendMessage("  ");
									sender.sendMessage("   ");
									sender.sendMessage("    ");
									sender.sendMessage("     ");
									sender.sendMessage("========" + me.mindgamesnl.mcwebsocket.main.config.Config.Project_Chat_Name_Prefix_Color + "========");
									sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio setbg <name> <code/url/reset> " + ChatColor.GRAY + "Set a background image/color.");
									sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio buffer <name> <url> " + ChatColor.GRAY + "Buffer a sound.");
									sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio playbuffer <name> <url> " + ChatColor.GRAY + "Start sound in buffer.");
									sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio playregion <region> <url> " + ChatColor.GRAY + "Start sound for all the players in a region.");
									sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio send <name> <message> " + ChatColor.GRAY + "Send a message to a player.");
									sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio loop <name> <url> " + ChatColor.GRAY + "Plays a loop for a player.");
									sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio region create <name> <url> " + ChatColor.GRAY + "Create a region with music.");
									sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio region delete <name> " + ChatColor.GRAY + "Delete a music region.");
									sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio play <name> <url> " + ChatColor.GRAY + "Plays a file for a player.");
									sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio stop <name> " + ChatColor.GRAY + "Stops all sounds for the player.");
									sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /volume <0-100> " + ChatColor.GRAY + "Sets the volume.");
									sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /audio " + ChatColor.GRAY + "Gives the player a link to open the client.");
									sender.sendMessage(" " + ChatColor.RED + "-" + ChatColor.YELLOW + " /openaudio help 2 " + ChatColor.GRAY + "Gives you more info.");
								    sender.sendMessage("========" + me.mindgamesnl.mcwebsocket.main.config.Config.Project_Chat_Name_Prefix_Color + "========");

								
								
								
								
								
								
								

							}
					} else {
						//geen arguments
						sender.sendMessage(me.mindgamesnl.mcwebsocket.main.config.Config.Project_Chat_Name_Prefix_Color + " OpenAudio made with <3 by Mindgamesnl (you can use '/openaudio help' for help :P) need more help? Contact me!");
					}
				} else {
					sender.sendMessage(me.mindgamesnl.mcwebsocket.main.config.Config.Project_Chat_Name_Prefix_Color + " You don't have the required permissions! (openaudio.admin)!");
				}
				return true;
			} else if (cmd.getName().equalsIgnoreCase("audio")) {
				
				sender.sendMessage(me.mindgamesnl.mcwebsocket.main.config.Config.Chat_Header_audio + me.mindgamesnl.mcwebsocket.main.config.Config.Audio_Web_domain.replace("%username%", sender.getName()));
				
				
				return true;
			} else if (cmd.getName().equalsIgnoreCase("volume")) {
				if (args.length > 0) {
					if (isInt(args[0])) {
					WsSender.Send_Ws_Packet_To_Client(Bukkit.getPlayerExact(sender.getName()), "{\"command\":\"setvolume\",\"target\":\"" + args[0] + "\"}");
					
					sender.sendMessage(me.mindgamesnl.mcwebsocket.main.config.Config.Chat_Header_audio + me.mindgamesnl.mcwebsocket.main.config.Config.Chat_Message_Volume_Set.replace("%vol", args[0]));
					
					} else {
					sender.sendMessage(me.mindgamesnl.mcwebsocket.main.config.Config.Chat_Header_audio + me.mindgamesnl.mcwebsocket.main.config.Config.Chat_Message_Volume_Set_Error);
					}
				} else {
					sender.sendMessage(me.mindgamesnl.mcwebsocket.main.config.Config.Chat_Header_audio + me.mindgamesnl.mcwebsocket.main.config.Config.Chat_Message_Volume_Set_Error);
				}
				return true;
			} 
			return false; 
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

