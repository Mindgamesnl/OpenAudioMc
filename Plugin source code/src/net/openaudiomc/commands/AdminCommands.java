package net.openaudiomc.commands;

import net.openaudiomc.speakerSystem.objects.audioSpeaker;
import net.openaudiomc.speakerSystem.objects.audioSpeakerSound;
import net.openaudiomc.utils.selector;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.Location;
import org.bukkit.Material;
import org.bukkit.block.Block;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.command.ConsoleCommandSender;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.entity.Player;

import net.openaudiomc.actions.command;
import net.openaudiomc.socket.cm_callback;
import net.openaudiomc.socket.timeoutManager;
import net.openaudiomc.actions.spy;
import net.openaudiomc.files.playlistManager;
import net.openaudiomc.minecraft.Main;
import net.openaudiomc.minecraft.getDep;
import net.openaudiomc.oauth.oauthConnector;
import net.openaudiomc.regions.regionListener;
import net.openaudiomc.speakerSystem.speakerMain;
import net.openaudiomc.speakerSystem.managers.audioSpeakerManager;
import net.openaudiomc.syncedSound.objects.syncedSound;
import net.openaudiomc.syncedSound.managers.syncedSoundManager;
import net.openaudiomc.syncedSound.managers.userManager;

import java.io.IOException;

public class AdminCommands implements CommandExecutor {
	//Main
	public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {


		if (args.length > 0) {
			if (args[0].equalsIgnoreCase("help") && sender.hasPermission("openaudio.admin.help")) {
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

					String admin_help = "/openaudio help modding";
					String adminHelpMessage = ChatColor.translateAlternateColorCodes('&', "&c&l(Click here)&r&3 for help with modding your client.");

					String speaker_help = "/openaudio help speaker";
					String speakerHelpMessage = ChatColor.translateAlternateColorCodes('&', "&c&l(Click here)&r&3 for help with the speaker system.");



					//Execute
					sender.sendMessage(Main.prefix + "Help menu.");
					String command = "tellraw " + sender.getName() + " " + "[\"\",{\"text\":\"" + audioHelpMessage + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\"" + audio_help + "\"}}]" + "";
					Bukkit.dispatchCommand(console, command);

					String command2 = "tellraw " + sender.getName() + " " + "[\"\",{\"text\":\"" + regionHelpMessage + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\"" + region_help + "\"}}]" + "";
					Bukkit.dispatchCommand(console, command2);

					String command3 = "tellraw " + sender.getName() + " " + "[\"\",{\"text\":\"" + hueHelpMessage + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\"" + hue_help + "\"}}]" + "";
					Bukkit.dispatchCommand(console, command3);

					String command4 = "tellraw " + sender.getName() + " " + "[\"\",{\"text\":\"" + uiHelpMessage + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\"" + ui_help + "\"}}]" + "";
					Bukkit.dispatchCommand(console, command4);

					String command6 = "tellraw " + sender.getName() + " " + "[\"\",{\"text\":\"" + adminHelpMessage + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\"" + admin_help + "\"}}]" + "";
					Bukkit.dispatchCommand(console, command6);

					String command5 = "tellraw " + sender.getName() + " " + "[\"\",{\"text\":\"" + userHelpMessage + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\"" + uers_help + "\"}}]" + "";
					Bukkit.dispatchCommand(console, command5);

					String command7 = "tellraw " + sender.getName() + " " + "[\"\",{\"text\":\"" + speakerHelpMessage + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\"" + speaker_help + "\"}}]" + "";
					Bukkit.dispatchCommand(console, command7);
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
					sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio setvolume <mcname> <volume> [id]&r&a Set the volume for a player."));
					sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio skipto <mcname> <id> <seconds>&r&a Skip to a part in a song."));
					sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio play <mcname> <url> [id] [mode]&r&a Play a sound for a player."));
					sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio toggle <mcname> <id>&r&a Toggle play/pause for a sound."));
					sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio loop <mcname> <url>&r&a Play a loop for a player."));
					sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio stop <mcname> [id]&r&a Stop the sound for a player."));
					sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio stopall <mcname>&r&a Stop all sounds for a player."));
					sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio setvolume <mcname> [id]&r&a Set the volume for a player."));
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
					sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio hue effect <blink/stop/cycle> <mcname>&r&a Start a hue effect for a player."));
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
					sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio oauth&a Get a key to use in third party apps."));
					sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio setbg <mcname> <url/reset>&r&a Set the background image for a player."));
					sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio spy&r&a Toggle connection spy."));
					sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio send <mcname> <message>&r&a Send a push notification."));
					sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio json <mcname> <json>&r&a Send a custom json string."));
					sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio playlist set <list> <id> <url>&r&a Set a song in a playlist."));
					sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio playlist play <list> <mcname>&r&a Start the playlist for a player."));
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
				} else if (args[1].equalsIgnoreCase("modding")) {
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
					sender.sendMessage(ChatColor.translateAlternateColorCodes('&', Main.prefix + "Help menu / &lModding"));
					sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&lhttps://plus.openaudiomc.net&r&a Please visit openaudioplus to mod your client."));
				} else if (args[1].equalsIgnoreCase("speaker")) {
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
					sender.sendMessage(ChatColor.translateAlternateColorCodes('&', Main.prefix + "Help menu / &lSpeakers"));
					sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio speaker add <url>&r&a Get a speaker, just place it and you are good to go."));
					sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&lHow to remove a speaker?&r&a Just break the speaker skull."));
					sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio speaker stop&r&a Turn off all speakers."));
					sender.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio speaker start&r&a Turn on all speakers."));
				} else {
					sender.sendMessage(Main.prefix + "Invalid help page.");
				}
			} else if (args[0].equalsIgnoreCase("play") && sender.hasPermission("openaudio.admin.play")) {
				//Play commands
				if (args.length == 3 || args.length > 3) {
					if (args.length > 3) {
						if (args.length > 4) {
							if (args[4].equalsIgnoreCase("sync")) {
								try {
									for (Player p: selector.playerSelector(sender, args[1])) {
										syncedSound targetsound = syncedSoundManager.create(args[2], args[3], p.getName());
									}

									sender.sendMessage(Main.prefix + "Started synced sound for: " + args[1]);
								} catch (NullPointerException e) {
									sender.sendMessage(Main.prefix + "User is not connected!");
								}
							} else {
								sender.sendMessage(Main.prefix + "Possible modes: " + ChatColor.RESET + "sync");
							}
						} else {
							for (Player p: selector.playerSelector(sender, args[1])) {
								command.playNormalSoundID(p.getName(), args[2], args[3]);
							}
							sender.sendMessage(Main.prefix + "Started a sound for " + args[1]);
						}
					} else {
						for (Player p: selector.playerSelector(sender, args[1])) {

							command.playNormalSound(p.getName(), args[2]);
						}
						sender.sendMessage(Main.prefix + "Started a sound for " + args[1]);
					}
				} else {
					sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio play <mc name> <url> [ID]");
				}
			} else if (args[0].equalsIgnoreCase("spy") && sender.hasPermission("openaudio.admin.spy")) {
				spy.Toggle((Player) sender);
			} else if (args[0].equalsIgnoreCase("oauth") || args[0].equalsIgnoreCase("auth") && sender.hasPermission("openaudio.admin.plus")) {
				sender.sendMessage(Main.prefix + "Generating url.");
				sender.sendMessage(Main.prefix + "" + ChatColor.RED + "Please note! this key can only be used ONCE and should only be used on oauth.openaudiomc.net!");
				sender.sendMessage(Main.prefix + "" + ChatColor.RED + "This code will only be valid for 5 minutes:");
				sender.sendMessage(ChatColor.AQUA + "Your key: " + ChatColor.YELLOW + oauthConnector.getToken());
			} else if (args[0].equalsIgnoreCase("stopall") && sender.hasPermission("openaudio.admin.stopall")) {
				if (args.length == 2) {
					for (Player p: selector.playerSelector(sender, args[1])) {
						command.stop(p.getName());
						command.stopAllRegions(p.getName());
						command.hueStopEffect(p.getName());
						audioSpeakerManager.stopForPlayer(p.getName());
						userManager.getPlayer(Bukkit.getPlayer(p.getName())).removeAllSyncedSounds();
					}
				} else {
					sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio stopall <mc name>");
				}
			} else if (args[0].equalsIgnoreCase("loop") && sender.hasPermission("openaudio.admin.loop")) {
				//Play commands
				if (args.length == 3 || args.length > 3) {
					if (args.length > 3) {
						if (args[3].equalsIgnoreCase("stop")) {
							for (Player p: selector.playerSelector(sender, args[1])) {
								command.stop(p.getName());
								command.playLoop(p.getName(), args[2]);
							}
							sender.sendMessage(Main.prefix + "Started a loop for " + args[1]);
						} else {
							sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio loop <mc name> <url>");
						}
					} else {
						for (Player p: selector.playerSelector(sender, args[1])) {
							command.playLoop(p.getName(), args[2]);
						}
						sender.sendMessage(Main.prefix + "Started a loop for " + args[1]);
					}
				} else {
					sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio loop <mc name> <url>");
				}
			} else if ((args[0].equalsIgnoreCase("speaker") || args[0].equalsIgnoreCase("speakers")) && sender.hasPermission("openaudio.admin.speaker")) {
				if (args.length == 3) {
					if (args[1].equalsIgnoreCase("add")) {
						sender.sendMessage(Main.prefix + "You received a speaker! place it anywhere you'd like (you can remove it at any time)");
						speakerMain.giveSpeaker((Player) sender, args[2]);
						if (args[2].contains("soundcloud.com")) {
							sender.sendMessage(ChatColor.DARK_RED + "WARNING!" + ChatColor.YELLOW + " Speakers do not officially have support for soundcloud sounds! please use mp3 files instead.");
						}
					}
				} else if (args.length == 7) {

                    if (args[1].equalsIgnoreCase("set")) {
                        Location target = new Location(Bukkit.getWorld(args[2]), Integer.parseInt(args[3]), Integer.parseInt(args[4]), Integer.parseInt(args[5]));
                        if (audioSpeakerManager.speakers.get(target) != null) {
                          sender.sendMessage(Main.prefix + "This is already a speaker. Replacing");

                        } else {
							if (audioSpeakerManager.sounds.get(args[6]) == null) {
								speakerMain.saveSound(args[6]);
								audioSpeakerManager.createSound(args[6] + "_sound", args[6], null, null, null);
							}

							speakerMain.saveSpeaker(args[6], target.getWorld().getName(), target.getX(), target.getY(), target.getZ());

							sender.sendMessage(Main.prefix + ChatColor.GREEN + "Created speaker on X:" + target.getBlockX() + " Y:" + target.getBlockY() + " Z:" + target.getBlockZ() + ".");

							audioSpeakerManager.createSpeaker(args[6] + "_speaker", args[6] + "_sound", target);


                            Block b = Bukkit.getWorld(args[2]).getBlockAt(target);
                            b.setType(Material.NOTE_BLOCK);

                        }
                    }

                } else if (args.length == 4 || args.length == 3) {

					if (args[1].equalsIgnoreCase("selection")) {

						if (speakerMain.selection.get((Player) sender) != null && speakerMain.selection.get((Player) sender).size() != 0) {

							if (args[2].equalsIgnoreCase("setvolume")) {
								sender.sendMessage("ba " + volumeCommand.isInt(args[3]));

								if (volumeCommand.isInt(args[3])) {
									Boolean suc6 = true;
									for (audioSpeaker speaker: speakerMain.selection.get((Player) sender)) {
										audioSpeakerSound sound = audioSpeakerManager.sounds.get(speaker.getSoundId());
										if (sound.hasFile()) {
											sound.setVolume(Integer.parseInt(args[3]));
											FileConfiguration config = YamlConfiguration.loadConfiguration(sound.getSavedFile());
											config.set("volume", Integer.parseInt(args[3]));
											try {
												config.save(sound.getSavedFile());
											} catch (IOException e) {
												e.printStackTrace();
											}
										} else {
											suc6 = false;
										}
										sound.setVolume(Integer.parseInt(args[3]));

									}
									if (!suc6) {
										sender.sendMessage(Main.prefix + "Whoops! Failed to execute goal, please restart the server before commiting changes to this speaker.");
									}
								} else {
									sender.sendMessage(Main.prefix + "Whoops! volume needs to be a number from 0 to 100");
								}
							} else if (args[2].equalsIgnoreCase("delete")) {


								for (audioSpeaker speaker: speakerMain.selection.get((Player) sender)) {
									if (audioSpeakerManager.speakers.get(speaker.getLoc()) != null) {

										String sound = audioSpeakerManager.sounds.get(speaker.getSoundId()).getFile();
										File speakerfile = new File("plugins/OpenAudio/speakers/speakers/" + speaker.getLoc().getBlockX() + ".0-" + speaker.getLoc().getBlockY() + ".0-" + speaker.getLoc().getBlockZ() + ".0.yml");



										if (speakerfile.delete()) {
											sender.sendMessage(Main.prefix + ChatColor.GREEN + "Successfully removed speaker!");
											audioSpeakerManager.speakers.remove(speaker.getLoc());
											speaker.getLoc().getWorld().getBlockAt(speaker.getLoc()).setType(Material.AIR);
										} else {
											sender.sendMessage(Main.prefix + ChatColor.RED + "Failed to remove speaker!");
										}

									} else {

									}

								}
							}

						} else {
							sender.sendMessage(Main.prefix + "Oh no! You don't have any speakers selected, right click one to get started.");
						}

					}

				} else if (args.length == 2) {
					if (args[1].equalsIgnoreCase("stop")) {
						if (audioSpeakerManager.running) {
							audioSpeakerManager.stop();
							for (Player lp: Bukkit.getOnlinePlayers()) {
								audioSpeakerManager.stopForPlayer(lp.getName());
							}
							sender.sendMessage(Main.prefix + "Stopped all speakers");
						} else {
							sender.sendMessage(Main.prefix + "Speakers are allready disabled.");
						}
					} else if (args[1].equalsIgnoreCase("start")) {
						if (!audioSpeakerManager.running) {
							audioSpeakerManager.Init();
							sender.sendMessage(Main.prefix + "Restarting all speakers...");
						} else {
							sender.sendMessage(Main.prefix + "Speakers are allready started.");
						}
					} else {
						sender.sendMessage(Main.prefix + "Invalid command, please read /openaudio help");
					}
				} else {
					sender.sendMessage(Main.prefix + "Invalid command, please read /openaudio help");
				}
			} else if (args[0].equalsIgnoreCase("region") && sender.hasPermission("openaudio.admin.region")) {
				if (getDep.getStatus()) {
					//region gezijk
					//Play commands
					if (args.length == 4 || args.length > 4) {
						if (args[1].equalsIgnoreCase("create")) {
							regionListener.registerRegion(args[2], args[3], (Player) sender);
							sender.sendMessage(Main.prefix + "Changed the sound of " + args[2] + " to " + args[3]);
						} else {
							sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio region <sub command> [values]");
						}
					} else if (args.length == 3 || args.length > 3) {
						if (args[1].equalsIgnoreCase("delete")) {
							regionListener.deleteRegion(args[2]);
							sender.sendMessage(Main.prefix + "Removed the sound off" + args[2]);
						} else {
							sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio region <sub command> [values]");
						}
					} else {
						sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio region <sub command> [values]");
					}
				} else {
					sender.sendMessage(Main.prefix + "Whoops, that did not go well. Please report this error to the developers,");
				}

			} else if (args[0].equalsIgnoreCase("modding")) {
				sender.sendMessage(Main.prefix + "Modding has been moved to plus.openaudiomc.net");
			} else if (args[0].equalsIgnoreCase("playlist") && sender.hasPermission("openaudio.admin.playlist")) {
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
							for (Player p: selector.playerSelector(sender, args[3])) {
								command.playList(p.getName(), playlistManager.getAllFilesInOneBigBulcCuzThatIsPrettyAwesome(args[2]));
							}
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
			} else if (args[0].equalsIgnoreCase("playregion") && sender.hasPermission("openaudio.admin.playregion")) {
				if (getDep.getStatus()) {
					if (args.length == 3) {
						for (Player p: selector.playerSelector(sender, "region:" + args[1])) {
							command.playNormalSound(p.getName(), args[2]);
						}
						sender.sendMessage(Main.prefix + "Started a sound for players in region " + args[1]);
					} else {
						sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio playregion <region name> <url>");
					}
				} else {
					sender.sendMessage(Main.prefix + "Whoops, you don't have worldguard installed!");
				}
			} else if (args[0].equalsIgnoreCase("debug")) {
				sender.sendMessage("Thisversion:" + Main.getPL().getDescription().getVersion() + " connected:" + timeoutManager.ioconnected + " bukkitver:" + Bukkit.getBukkitVersion() + " st:" + cm_callback.speakerTick + " CC:" + cm_callback.connections_closed + " CM:" + cm_callback.connections_made + " cbs" + cm_callback.callbacks);
			} else if (args[0].equalsIgnoreCase("stop") && sender.hasPermission("openaudio.admin.stop")) {
				if (args.length >= 2) {
					if (args.length == 3) {
						for (Player p: selector.playerSelector(sender, args[1])) {
							command.StopID(p.getName(), args[2]);
							try {
								userManager.getPlayer(Bukkit.getPlayer(p.getName())).removeSyncedSound(syncedSoundManager.getBySoundId(args[2]).getId());
							} catch (NullPointerException e) {}
						}
						sender.sendMessage(Main.prefix + "Stopped sound id " + args[2] + " of " + args[1]);
					} else {
						for (Player p: selector.playerSelector(sender, args[1])) {
							try {
								userManager.getPlayer(Bukkit.getPlayer(p.getName())).removeAllSyncedSounds();
							} catch (NullPointerException e) {}
							command.stop(p.getName());
						}
						sender.sendMessage(Main.prefix + "Stopped sound of " + args[1]);
					}
				} else {
					sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio stop <mc name>");
				}
			} else if (args[0].equalsIgnoreCase("skipto") && sender.hasPermission("openaudio.admin.skipto")) {
				if (args.length == 4) {
					sender.sendMessage(Main.prefix + "Skipped " + args[2] + " to " + args[3] + "seconds for " + args[1]);
					for (Player p: selector.playerSelector(sender, args[1])) {
						command.skipTo(p.getName(), args[2], args[3]);
					}
				} else {
					sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio skipto <mc name> <id> <time in seconds>");
				}
			} else if (args[0].equalsIgnoreCase("toggle") && sender.hasPermission("openaudio.admin.toggle")) {
				if (args.length == 3) {
					for (Player p: selector.playerSelector(sender, args[1])) {
						command.ToggleID(p.getName(), args[2]);
					}
					sender.sendMessage(Main.prefix + "Toggled sound for " + args[1]);
				} else {
					sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio toggle <mc name> <id>");
				}
			} else if (args[0].equalsIgnoreCase("setvolume") && sender.hasPermission("openaudio.admin.setvolume")) {
				if (args.length >= 3) {
					if (args.length == 4) {
						for (Player p: selector.playerSelector(sender, args[1])) {
							command.setVolumeID(p.getName(), args[2], args[3]);
						}
						sender.sendMessage(Main.prefix + "Volume for sound with id:" + args[3] + " for:" + args[1] + " is now set.");
					} else {
						for (Player p: selector.playerSelector(sender, args[1])) {
							command.setVolume(p.getName(), args[2]);
						}
						sender.sendMessage(Main.prefix + "volume of " + args[1] + " is now set to " + args[2]);
					}

				} else {
					sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio setvolume <mc name> <volume>");
				}
			} else if (args[0].equalsIgnoreCase("buffer") && sender.hasPermission("openaudio.admin.buffer")) {
				if (args.length == 4 || args.length > 4) {
					if (args[1].equalsIgnoreCase("create")) {
						for (Player p: selector.playerSelector(sender, args[2])) {
							command.createBuffer(p.getName(), args[3]);
						}
						sender.sendMessage(Main.prefix + "Buffering " + args[3] + " for " + args[2]);
					} else {
						sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio buffer <sub command> [values]");
					}
				} else if (args.length == 3 || args.length > 3) {
					if (args[1].equalsIgnoreCase("play")) {
						for (Player p: selector.playerSelector(sender, args[2])) {
							command.playBuffer(p.getName());
						}
						sender.sendMessage(Main.prefix + "Started buffer for " + args[2]);
					} else {
						sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio buffer <sub command> [values]");
					}
				} else {
					sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio buffer <sub command> <player> [url]");
				}
			} else if (args[0].equalsIgnoreCase("send") && sender.hasPermission("openaudio.admin.send")) {
				if (args.length == 3 || args.length > 3) {
					String myString = "";
					for (int i = 2; i < args.length; i++) {
						String arg = args[i] + " ";
						myString = myString + arg;
					}
					for (Player p: selector.playerSelector(sender, args[1])) {
						command.sendMessage(p.getName(), myString);
					}
					sender.sendMessage(Main.prefix + "Message send to " + args[1]);
				} else {
					sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio send <mc name> <awesome text message>");
				}
			} else if (args[0].equalsIgnoreCase("json") && sender.hasPermission("openaudio.admin.json")) {
				if (args.length == 3 || args.length > 3) {
					String myString = "";
					for (int i = 2; i < args.length; i++) {
						String arg = args[i] + " ";
						myString = myString + arg;
					}
					for (Player p: selector.playerSelector(sender, args[1])) {
						command.sendJSON(p.getName(), myString);
					}
					sender.sendMessage(Main.prefix + "Json send to " + args[1]);
				} else {
					sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio json <mc name> <json>");
				}
			} else if (args[0].equalsIgnoreCase("setbg") && sender.hasPermission("openaudio.admin.setbg")) {
				if (args.length == 3 || args.length > 3) {
					if (args[2].equalsIgnoreCase("reset")) {
						for (Player p: selector.playerSelector(sender, args[1])) {
							command.resetBg(p.getName());
						}

					} else {
						for (Player p: selector.playerSelector(sender, args[1])) {
							command.setBg(p.getName(), args[2]);
						}
					}
					sender.sendMessage(Main.prefix + "Changed background of " + args[1]);
				} else {
					sender.sendMessage(Main.prefix + "Invalid command, please use /openaudio setbg <mcname> <url to image>");
				}
			} else if (args[0].equalsIgnoreCase("hue") && sender.hasPermission("openaudio.admin.hue")) {
				if (args.length == 4 || args.length > 4) {
					//set and effect
					if (args[1].equalsIgnoreCase("set")) {

						if (args.length > 4) {
							String color = args[3] + ":" + args[4];
							for (Player p: selector.playerSelector(sender, args[2])) {
								command.hueSet(p.getName(), color);
							}
							sender.sendMessage(Main.prefix + "Changed room color of " + args[2]);
						} else {
							String color = args[3];
							for (Player p: selector.playerSelector(sender, args[2])) {
								command.hueSet(p.getName(), color);
							}
							sender.sendMessage(Main.prefix + "Changed room color of " + args[2]);
						}
					} else if (args[1].equalsIgnoreCase("effect")) {
						if (args[2].equalsIgnoreCase("blink")) {
							for (Player p: selector.playerSelector(sender, args[3])) {
								command.hueBlink(p.getName());
							}
							sender.sendMessage(Main.prefix + "Enabled hue blink effect for " + args[3]);
						} else if (args[2].equalsIgnoreCase("cycle")) {
							for (Player p: selector.playerSelector(sender, args[3])) {
								command.hueCycle(p.getName());
							}
							sender.sendMessage(Main.prefix + "Enabled hue cycle effect for " + args[3]);
						} else if (args[2].equalsIgnoreCase("stop")) {
							for (Player p: selector.playerSelector(sender, args[3])) {
								command.hueStopEffect(p.getName());
							}
							sender.sendMessage(Main.prefix + "Stopped all hue effects for " + args[3]);
						} else {
							sender.sendMessage(Main.prefix + "Sorry, that's an invalid command :( (unknown effect)");
						}
					}
				} else {
					if (args.length == 3) {
						if (args[1].equalsIgnoreCase("reset")) {
							for (Player p: selector.playerSelector(sender, args[2])) {
								command.hueReset(p.getName());
							}
						} else {
							sender.sendMessage(Main.prefix + "Sorry, that's an invalid command :( (unknown command)");
						}
					} else {
						sender.sendMessage(Main.prefix + "Sorry, that's an invalid command :( (command is to short)");
					}
				}
			}
		} else {
			sender.sendMessage(Main.prefix + "OpenAudio made with <3 by Mindgamesnl (you can use '/openaudio help' for help :P) need more help? Contact me!");
		}

		return true;

	}

	public static boolean isBetween(int a, int b, int c) {
		return b > a ? c > a && c < b : c > b && c < a;
	}

	public static boolean isNumeric(String str) {
		try {
			@SuppressWarnings("unused")
			double d = Double.parseDouble(str);
		} catch (NumberFormatException nfe) {
			return false;
		}
		return true;
	}

	public static boolean isNumeric2(String str) {
		for (char c: str.toCharArray()) {
			if (!Character.isDigit(c)) return false;
		}
		return true;
	}
}