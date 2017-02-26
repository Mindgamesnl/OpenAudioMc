package net.openaudiomc.commands;

import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.command.ConsoleCommandSender;
import org.bukkit.entity.Player;

import com.sk89q.worldguard.bukkit.WGBukkit;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;

import net.openaudiomc.actions.command;
import net.openaudiomc.actions.spy;
import net.openaudiomc.files.playlistManager;
import net.openaudiomc.minecraft.Main;
import net.openaudiomc.minecraft.getdDep;
import net.openaudiomc.regions.regionCrap;

public class AdminCommands implements CommandExecutor {
    //Main
    public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
        if (cmd.getName().equalsIgnoreCase("openaudio")) {
            if (sender.hasPermission("openaudio.admin")) {
                if (sender.hasPermission("openaudio.admin")) {


                    if (args.length > 0) {
                            if (args[0].equalsIgnoreCase("help")) {
                                if (args.length == 1 || args[1].equalsIgnoreCase("1")) {
                                	ConsoleCommandSender console = Bukkit.getServer().getConsoleSender();
                                	
                                	//Commands
                                	String audio_help = "/openaudio help audio";
                                	String audioHelpMessage = ChatColor.translateAlternateColorCodes('&', "&c&l(Click here)&r&3 for help with sound.");
                                	
                                	String region_help = "/openaudio help region";
                                	String regionHelpMessage = ChatColor.translateAlternateColorCodes('&', "&c&l(Click here)&r&3 for help with regions.");
                                	
                                	String hue_help = "/openaudio help hue";
                                	String hueHelpMessage = ChatColor.translateAlternateColorCodes('&', "&c&l(Click here)&r&3 for help with philips hue lights.");
                                	
                                	String ui_help = "/openaudio help admin";
                                	String uiHelpMessage = ChatColor.translateAlternateColorCodes('&', "&c&l(Click here)&r&3 for help with the admin commands.");
                                	
                                	String uers_help = "/openaudio help user";
                                	String userHelpMessage = ChatColor.translateAlternateColorCodes('&', "&c&l(Click here)&r&3 for a list of user commands.");
                                	
                                	
                                	
                                	//Execute
                                	sender.sendMessage(Main.prefix + "Help menu.");
                        			String command = "tellraw " + sender.getName() + " " + "[\"\",{\"text\":\"" + audioHelpMessage + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\"" + audio_help +"\"}}]" + "";
                        			Bukkit.dispatchCommand(console, command);
                        			
                        			sender.sendMessage(" ");
                        			String command2 = "tellraw " + sender.getName() + " " + "[\"\",{\"text\":\"" + regionHelpMessage + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\"" + region_help +"\"}}]" + "";
                        			Bukkit.dispatchCommand(console, command2);
                        			
                        			sender.sendMessage(" ");
                        			String command3 = "tellraw " + sender.getName() + " " + "[\"\",{\"text\":\"" + hueHelpMessage + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\"" + hue_help +"\"}}]" + "";
                        			Bukkit.dispatchCommand(console, command3);
                        			
                        			sender.sendMessage(" ");
                        			String command4 = "tellraw " + sender.getName() + " " + "[\"\",{\"text\":\"" + uiHelpMessage + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\"" + ui_help +"\"}}]" + "";
                        			Bukkit.dispatchCommand(console, command4);
                        			
                        			sender.sendMessage(" ");
                        			String command5 = "tellraw " + sender.getName() + " " + "[\"\",{\"text\":\"" + userHelpMessage + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\"" + uers_help +"\"}}]" + "";
                        			Bukkit.dispatchCommand(console, command5);
                                } else if (args[1].equalsIgnoreCase("audio")) {
                                    //help 2
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', Main.prefix + "Help menu / &lAudio"));
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio play <mcname> <url>&r&a Play a sound for a player."));
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio loop <mcname> <url>&r&a Play a loop for a player."));
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio stop <mcname>&r&a Stop the sound for a player."));
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio buffer create <mcname> <url>&r&a Buffer a sound for a player."));
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio buffer play <mcname>&r&a Play sound in buffer for a player."));
                                } else if (args[1].equalsIgnoreCase("region")) {
                                    //help 2
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', Main.prefix + "Help menu / &lRegion"));
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio region create <wg region name> <url>&r&a Add sound to a wg region."));
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio region delete <wg region name>&r&a Remove the sound from a wg region."));
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio playregion <wg region name> <url>&r&a Start sound for players in a region."));
                                } else if (args[1].equalsIgnoreCase("hue")) {
                                    //help 2
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', Main.prefix + "Help menu / &lPhilips Hue"));
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio hue set <mcname> <rgba code> [id]&r&a Set the hue lights for a player."));
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio hue reset <mcname>&r&a Reset the hue lights for a player."));
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio hue effect <mcname> <blink/stop/cycle>&r&a Start a hue effect for a player."));
                                } else if (args[1].equalsIgnoreCase("admin")) {
                                    //help 2
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', Main.prefix + "Help menu / &lAdmin commands"));
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio setbg <mcname> <url/reset>&r&a Set the background image for a player."));
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio spy&r&a Toggle connection spy."));
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio send <mcname> <message>&r&a Send a push notification."));
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio json <mcname> <json>&r&a Send a custom json string."));
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio openaudio playlist set <list> <id> <url>&r&a Set a song in a playlist."));
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio openaudio playlist play <list> <mcname>&r&a Start the playlist for a player."));
                                } else if (args[1].equalsIgnoreCase("user")) {
                                    //help 2
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(" ");
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', Main.prefix + "Help menu / &lUser Commands"));
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/volume <number>&r&a Set your own volume."));
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/audio&r&a Give the url for the web client."));
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/connect&r&a Give the url for the web client."));
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/music&r&a Give the url for the web client."));
                                	sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/sound&r&a Give the url for the web client."));
                                } else {
                                	sender.sendMessage(Main.prefix + "Invalid help page.");
                                }
                            }
                            else if (args[0].equalsIgnoreCase("play"))
                            {
                            	//Play commands
                            	if (args.length == 3 || args.length > 3) {
                            		if (args.length > 3) {
                            			if (args[3].equalsIgnoreCase("stop")) {
                            				command.stop(args[1]);
                            				command.playNormalSound(args[1], args[2]);
                                    		sender.sendMessage(Main.prefix + "Started a sound for " + args[1]);
                            			} else {
                            				sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio play <mc name> <url>");
                            			}
                            		} else {
                            			command.playNormalSound(args[1], args[2]);
                                		sender.sendMessage(Main.prefix + "Started a sound for " + args[1]);
                            		}
                            	} else {
                            		sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio play <mc name> <url>");
                            	}
                            }
                            else if (args[0].equalsIgnoreCase("spy"))
                            {
                            	spy.Toggle((Player) sender);
                            }
                            else if (args[0].equalsIgnoreCase("loop"))
                            {
                            	//Play commands
                            	if (args.length == 3 || args.length > 3) {
                            		if (args.length > 3) {
                            			if (args[3].equalsIgnoreCase("stop")) {
                            				command.stop(args[1]);
                            				command.playLoop(args[1], args[2]);
                                    		sender.sendMessage(Main.prefix + "Started a loop for " + args[1]);
                            			} else {
                            				sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio loop <mc name> <url>");
                            			}
                            		} else {
                            			command.playLoop(args[1], args[2]);
                                		sender.sendMessage(Main.prefix + "Started a loop for " + args[1]);
                            		}
                            	} else {
                            		sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio loop <mc name> <url>");
                            	}
                            }
                            else if (args[0].equalsIgnoreCase("region"))
                            {
                            	if (getdDep.getStatus()) {
                            		//region gezijk
                                	//Play commands
                                	if (args.length == 4 || args.length > 4) {
                                		if (args[1].equalsIgnoreCase("create")) {
                                			regionCrap.registerRegion(args[2], args[3]);
                                			sender.sendMessage(Main.prefix + "Changed the sound of " + args[2] + " to " + args[3]);
                                		} else {
                                			sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio region <sub command> [values]");
                                		}
                                	} else if (args.length == 3 || args.length > 3) {
                                		if (args[1].equalsIgnoreCase("delete")) {
                                			regionCrap.deleteRegion(args[2]);
                                			sender.sendMessage(Main.prefix + "Removed the sound off" + args[2]);
                                		} else {
                                			sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio region <sub command> [values]");
                                		}
                                	} else {
                                		sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio region <sub command> [values]");
                                	}
                            	} else {
                            		sender.sendMessage(Main.prefix + "Could not find wg region events, please install the WgRegionEvents plugin.");
                            	}
                            	
                            }
                            else if (args[0].equalsIgnoreCase("playlist"))
                            {
      
                            	if (args.length == 5 || args.length > 5) {
                            		if (args[1].equalsIgnoreCase("set")) {
                            			playlistManager.set(args[2], args[3], args[4]);
                            			sender.sendMessage(Main.prefix + "Changed the sound of " + args[2] + " in " + args[3] + " to " + args[4]);
                            		} else {
                            			sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio playlist set <list> <id> <url>");
                            		}
                            	} else if (args.length == 4 || args.length > 4) {
                            		if (args[1].equalsIgnoreCase("play")) {
                            			if (playlistManager.getAllFilesInOneBigBulcCuzThatIsPrettyAwesome(args[2]) != null) {
                            				command.playList(args[3], playlistManager.getAllFilesInOneBigBulcCuzThatIsPrettyAwesome(args[2]));
                                			sender.sendMessage(Main.prefix + "Started playlist for " + args[3]);
                            			} else {
                            				sender.sendMessage(Main.prefix + "Invalid playlist :(");
                            			}
                            		} else {
                            			sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio playlist <sub command> [values]");
                            		}
                            	} else {
                            		sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio playlist <sub command> [values]");
                            	}
                     
                            	
                            }
                            else if (args[0].equalsIgnoreCase("playregion"))
                            {
                            	if (getdDep.getStatus()) {
                            		if (args.length == 3) {
										for (Player p : Bukkit.getOnlinePlayers()) {
											for(ProtectedRegion r : WGBukkit.getRegionManager(p.getWorld()).getApplicableRegions(p.getLocation())) {
												if (args[1].equalsIgnoreCase(r.getId())) {
													command.playNormalSound(p.getName(), args[2]);
												}
										    }
										}
                                    	sender.sendMessage(Main.prefix + "Started a sound for players in region " + args[1]);
                                	} else {
                                		sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio playregion <region name> <url>");
                                	}
                            	} else {
                            		sender.sendMessage(Main.prefix + "Could not find wg region events, please install the WgRegionEvents plugin.");
                            	}
                            }
                            else if (args[0].equalsIgnoreCase("stop"))
                            {  	
                        		if (args.length == 2) {
                        			command.stop(args[1]);
                                	sender.sendMessage(Main.prefix + "Stopped sound of " + args[1]);
                            	} else {
                            		sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio stop <mc name>");
                            	}
                            }
                            else if (args[0].equalsIgnoreCase("buffer"))
                            {
                            	if (args.length == 4 || args.length > 4) {
                            		if (args[1].equalsIgnoreCase("create")) {
                            			command.createBuffer(args[2], args[3]);
                            			sender.sendMessage(Main.prefix + "Buffering " + args[3] + " for " + args[2]);
                            		} else {
                            			sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio buffer <sub command> [values]");
                            		}
                            	} else if (args.length == 3 || args.length > 3) {
                            		if (args[1].equalsIgnoreCase("play")) {
                            			command.playBuffer(args[2]);
                            			sender.sendMessage(Main.prefix + "Started buffer for " + args[2]);
                            		} else {
                            			sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio buffer <sub command> [values]");
                            		}
                            	} else {
                            		sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio buffer <sub command> <player> [url]");
                            	}
                            }
                            else if (args[0].equalsIgnoreCase("send"))
                            {  	
                        		if (args.length == 3 || args.length > 3) {
                        			String myString = "";
									for(int i = 2; i < args.length; i++){
									    String arg = args[i] + " ";
									    myString = myString + arg;
									}
                        			command.sendMessage(args[1], myString);
                                	sender.sendMessage(Main.prefix + "Message send to " + args[1]);
                            	} else {
                            		sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio send <mc name> <awesome text message>");
                            	}
                            }
                            else if (args[0].equalsIgnoreCase("json"))
                            {  	
                        		if (args.length == 3 || args.length > 3) {
                        			String myString = "";
									for(int i = 2; i < args.length; i++){
									    String arg = args[i] + " ";
									    myString = myString + arg;
									}
                        			command.sendJSON(args[1], myString);
                                	sender.sendMessage(Main.prefix + "Json send to " + args[1]);
                            	} else {
                            		sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio json <mc name> <json>");
                            	}
                            }
                            else if (args[0].equalsIgnoreCase("setbg"))
                            {  	
                        		if (args.length == 3 || args.length > 3) {
                        			if (args[2].equalsIgnoreCase("reset")) {
                        				command.resetBg(args[1]);
                        			} else {
                        				command.setBg(args[1], args[2]);
                        			}
                                	sender.sendMessage(Main.prefix + "Changed background of " + args[1]);
                            	} else {
                            		sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio setbg <mcname> <url to image>");
                            	}
                            }
                            else if (args[0].equalsIgnoreCase("hue"))
                            {
                            	if (args.length == 4 || args.length > 4) {
                            		//set and effect
                            		if (args[1].equalsIgnoreCase("set")) {
                            			
                            			if (args.length > 4) {
                            				String color = args[3] + ":" + args[4];
                            				command.hueSet(args[2], color);
                            				sender.sendMessage(Main.prefix + "Changed room color of " + args[2]);
                            			} else {
                            				String color = args[3];
                            				command.hueSet(args[2], color);
                            				sender.sendMessage(Main.prefix + "Changed room color of " + args[2]);
                            			}
                            		} else if (args[1].equalsIgnoreCase("effect")) {
                            			if (args[2].equalsIgnoreCase("blink")) {
                            				command.hueBlink(args[3]);
                            				sender.sendMessage(Main.prefix + "Enabled hue blink effect for " + args[3]);
                            			} else if (args[2].equalsIgnoreCase("cycle")) {
                            				command.hueCycle(args[3]);
                            				sender.sendMessage(Main.prefix + "Enabled hue cycle effect for " + args[3]);
                            			} else if (args[2].equalsIgnoreCase("stop")) {
                            				command.hueStopEffect(args[3]);
                            				sender.sendMessage(Main.prefix + "Stopped all hue effects for " + args[3]);
                            			} else {
                            				sender.sendMessage(Main.prefix + "Sorry, that's an invalid command :(");
                            			}
                            		}
                            	} else {
                            		if (args.length == 3) {
                            			if (args[1].equalsIgnoreCase("reset")) {
                            				command.hueReset(args[2]);
                            			} else {
                            				sender.sendMessage(Main.prefix + "Sorry, that's an invalid command :(");
                            			}
                            		} else {
                            			sender.sendMessage(Main.prefix + "Sorry, that's an invalid command :(");
                            		}
                            	}
                            }
                        } else {
                        	 sender.sendMessage(Main.prefix + "OpenAudio made with <3 by Mindgamesnl (you can use '/openaudio help' for help :P) need more help? Contact me!");
                        }
                    } else {
                        sender.sendMessage(Main.prefix + "You don't have the permissions to do this.");
                    }
                }
                return true;
            }
            return false;
        }
    }