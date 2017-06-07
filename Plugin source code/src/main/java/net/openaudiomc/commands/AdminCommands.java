/*
 * Copyright (C) 2017 Mindgamesnl
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
package net.openaudiomc.commands;

import net.openaudiomc.actions.Command;
import net.openaudiomc.actions.Spy;
import net.openaudiomc.files.PlaylistManager;
import net.openaudiomc.groups.GroupManager;
import net.openaudiomc.core.GetDep;
import net.openaudiomc.core.Main;
import net.openaudiomc.oauth.OAuthConnector;
import net.openaudiomc.regions.RegionListener;
import net.openaudiomc.socket.TimeoutManager;
import net.openaudiomc.socket.cm_callback;
import net.openaudiomc.speakersystem.SpeakerMain;
import net.openaudiomc.speakersystem.managers.AudioSpeakerManager;
import net.openaudiomc.speakersystem.objects.AudioSpeaker;
import net.openaudiomc.speakersystem.objects.AudioSpeakerSound;
import net.openaudiomc.syncedsound.managers.SyncedSoundManager;
import net.openaudiomc.syncedsound.managers.UserManager;
import net.openaudiomc.syncedsound.objects.SyncedSound;
import net.openaudiomc.utils.Selector;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.Location;
import org.bukkit.Material;
import org.bukkit.block.Block;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.command.ConsoleCommandSender;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.entity.Player;

import java.io.IOException;

public class AdminCommands implements CommandExecutor {

  @Override
  public boolean onCommand(CommandSender sender, org.bukkit.command.Command cmd, String label,
      String[] args) {
    if (args.length > 0) {
      if (args[0].equalsIgnoreCase("help") && sender.hasPermission("openaudio.admin.help")) {
        if (args.length == 1 || args[1].equalsIgnoreCase("1")) {
          ConsoleCommandSender console = Bukkit.getServer().getConsoleSender();

          //Commands
          String audio_help = "/openaudio help audio";
          String audioHelpMessage = ChatColor.translateAlternateColorCodes('&',
              "&c&l(Click here)&r&3 for help with sound.");

          String region_help = "/openaudio help region";
          String regionHelpMessage = ChatColor.translateAlternateColorCodes('&',
              "&c&l(Click here)&r&3 for help with regions.");

          String hue_help = "/openaudio help hue";
          String hueHelpMessage = ChatColor.translateAlternateColorCodes('&',
              "&c&l(Click here)&r&3 for help with philips hue lights.");

          String ui_help = "/openaudio help admin";
          String uiHelpMessage = ChatColor.translateAlternateColorCodes('&',
              "&c&l(Click here)&r&3 for help with the admin commands.");

          String uers_help = "/openaudio help user";
          String userHelpMessage = ChatColor.translateAlternateColorCodes('&',
              "&c&l(Click here)&r&3 for a list of user commands.");

          String admin_help = "/openaudio help modding";
          String adminHelpMessage = ChatColor.translateAlternateColorCodes('&',
              "&c&l(Click here)&r&3 for help with modding your client.");

          String speaker_help = "/openaudio help speaker";
          String speakerHelpMessage = ChatColor.translateAlternateColorCodes('&',
              "&c&l(Click here)&r&3 for help with the speaker system.");
          String group_help = "/openaudio help group";
          String groupHelpMessage = ChatColor.translateAlternateColorCodes('&',
              "&c&l(Click here)&r&3 for help with the group system.");

          sender.sendMessage(Main.PREFIX + "Help menu.");
          String command = "tellraw "
              + sender.getName()
              + " "
              + "[\"\",{\"text\":\""
              + audioHelpMessage
              + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\""
              + audio_help
              + "\"}}]"
              + "";
          Bukkit.dispatchCommand(console, command);

          String command2 = "tellraw "
              + sender.getName()
              + " "
              + "[\"\",{\"text\":\""
              + regionHelpMessage
              + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\""
              + region_help
              + "\"}}]"
              + "";
          Bukkit.dispatchCommand(console, command2);

          String command3 = "tellraw "
              + sender.getName()
              + " "
              + "[\"\",{\"text\":\""
              + hueHelpMessage
              + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\""
              + hue_help
              + "\"}}]"
              + "";
          Bukkit.dispatchCommand(console, command3);

          String command4 = "tellraw "
              + sender.getName()
              + " "
              + "[\"\",{\"text\":\""
              + uiHelpMessage
              + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\""
              + ui_help
              + "\"}}]"
              + "";
          Bukkit.dispatchCommand(console, command4);

          String command6 = "tellraw "
              + sender.getName()
              + " "
              + "[\"\",{\"text\":\""
              + adminHelpMessage
              + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\""
              + admin_help
              + "\"}}]"
              + "";
          Bukkit.dispatchCommand(console, command6);

          String command5 = "tellraw "
              + sender.getName()
              + " "
              + "[\"\",{\"text\":\""
              + userHelpMessage
              + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\""
              + uers_help
              + "\"}}]"
              + "";
          Bukkit.dispatchCommand(console, command5);

          String command7 = "tellraw "
              + sender.getName()
              + " "
              + "[\"\",{\"text\":\""
              + speakerHelpMessage
              + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\""
              + speaker_help
              + "\"}}]"
              + "";
          Bukkit.dispatchCommand(console, command7);

          String command8 = "tellraw "
              + sender.getName()
              + " "
              + "[\"\",{\"text\":\""
              + groupHelpMessage
              + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\""
              + group_help
              + "\"}}]"
              + "";
          Bukkit.dispatchCommand(console, command8);
        } else if (args[1].equalsIgnoreCase("audio")) {
          sender.sendMessage(" ");
          sender.sendMessage(" ");
          sender.sendMessage(" ");
          sender.sendMessage(" ");
          sender.sendMessage(
              ChatColor.translateAlternateColorCodes('&', Main.PREFIX + "Help menu / &lAudio"));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio setvolume <selector/player> <volume> [id]&r&a Set the volume for a player."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio skipto <selector/player> <id> <seconds>&r&a Skip to a part in a song."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio play <selector/player> <url> [id] [mode]&r&a Play a sound for a player."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio toggle <selector/player> <id>&r&a Toggle play/pause for a sound."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio loop <selector/player> <url>&r&a Play a loop for a player."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio stop <selector/player> [id]&r&a Stop the sound for a player."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio stopall <selector/player>&r&a Stop all sounds for a player."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio setvolume <selector/player> [id]&r&a Set the volume for a player."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio buffer create <selector/player> <url>&r&a Buffer a sound for a player."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio buffer play <selector/player>&r&a Play sound in buffer for a player."));
        } else if (args[1].equalsIgnoreCase("region")) {
          sender.sendMessage(" ");
          sender.sendMessage(" ");
          sender.sendMessage(" ");
          sender.sendMessage(" ");
          sender.sendMessage(
              ChatColor.translateAlternateColorCodes('&', Main.PREFIX + "Help menu / &lRegion"));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio region create <wg region name> <url>&r&a Add sound to a wg region."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio region delete <wg region name>&r&a Remove the sound from a wg region."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio playregion <wg region name> <url>&r&a Start sound for players in a region."));
        } else if (args[1].equalsIgnoreCase("hue")) {
          sender.sendMessage(" ");
          sender.sendMessage(" ");
          sender.sendMessage(" ");
          sender.sendMessage(" ");
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              Main.PREFIX + "Help menu / &lPhilips Hue"));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio hue set <selector/player> <rgba code> [id]&r&a Set the hue lights for a player."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio hue reset <selector/player>&r&a Reset the hue lights for a player."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio hue effect <blink/stop/cycle> <selector/player>&r&a Start a hue effect for a player."));
        } else if (args[1].equalsIgnoreCase("admin")) {
          sender.sendMessage(" ");
          sender.sendMessage(" ");
          sender.sendMessage(" ");
          sender.sendMessage(" ");
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              Main.PREFIX + "Help menu / &lAdmin commands"));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio oauth&a Get a key to use in third party apps."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio setbg <selector/player> <url/reset>&r&a Set the background image for a player."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio spy&r&a Toggle connection spy."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio send <selector/player> <message>&r&a Send a push notification."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio json <selector/player> <json>&r&a Send a custom json string."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio playlist set <list> <id> <url>&r&a Set a song in a playlist."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio playlist play <list> <selector/player>&r&a Start the playlist for a player."));
        } else if (args[1].equalsIgnoreCase("user")) {
          sender.sendMessage(" ");
          sender.sendMessage(" ");
          sender.sendMessage(" ");
          sender.sendMessage(" ");
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              Main.PREFIX + "Help menu / &lUser Commands"));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/volume <number>&r&a Set your own volume."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/audio&r&a Give the url for the web client."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/connect&r&a Give the url for the web client."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/music&r&a Give the url for the web client."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/sound&r&a Give the url for the web client."));
        } else if (args[1].equalsIgnoreCase("modding")) {
          sender.sendMessage(" ");
          sender.sendMessage(" ");
          sender.sendMessage(" ");
          sender.sendMessage(" ");
          sender.sendMessage(
              ChatColor.translateAlternateColorCodes('&', Main.PREFIX + "Help menu / &lModding"));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&lhttps://plus.openaudiomc.net&r&a Please visit openaudioplus to mod your client."));
        } else if (args[1].equalsIgnoreCase("speaker")) {
          sender.sendMessage(" ");
          sender.sendMessage(" ");
          sender.sendMessage(" ");
          sender.sendMessage(" ");
          sender.sendMessage(
              ChatColor.translateAlternateColorCodes('&', Main.PREFIX + "Help menu / &lSpeakers"));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio speaker add <url>&r&a Get a speaker, just place it and you are good to go."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&lHow to remove a speaker?&r&a Just break the speaker skull."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio speaker stop&r&a Turn off all speakers."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio speaker start&r&a Turn on all speakers."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio speaker set <url> off&r&a Disable one speaker."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio speaker set <url> on&r&a Enable one speaker."));
        } else if (args[1].equalsIgnoreCase("group")) {
          sender.sendMessage(" ");
          sender.sendMessage(" ");
          sender.sendMessage(" ");
          sender.sendMessage(" ");
          sender.sendMessage(
              ChatColor.translateAlternateColorCodes('&', Main.PREFIX + "Help menu / &lGroup"));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio group set <group name> <selector/player>&r&a Set the players group."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio group remove <selector/player>&r&a Remove a player from a group."));
          sender.sendMessage(ChatColor.translateAlternateColorCodes('&',
              " &c- &3&l/openaudio group list&r&a List players in a group."));
        } else {
          sender.sendMessage(Main.PREFIX + "Invalid help page.");
        }
      } else if (args[0].equalsIgnoreCase("play") && sender.hasPermission("openaudio.admin.play")) {
        //Play commands
        if (args.length == 3 || args.length > 3) {
          if (args.length > 3) {
            if (args.length > 4) {
              if (args[4].equalsIgnoreCase("sync")) {
                try {
                  Selector.playerSelector(sender, args[1])
                      .forEach(
                          player -> SyncedSoundManager.create(args[2], args[3], player.getName()));
                  sender.sendMessage(Main.PREFIX + "Started synced sound for: " + args[1]);
                } catch (NullPointerException e) {
                  sender.sendMessage(Main.PREFIX + "User is not connected!");
                }
              } else {
                sender.sendMessage(Main.PREFIX + "Possible modes: " + ChatColor.RESET + "sync");
              }
            } else {
              Selector.playerSelector(sender, args[1])
                  .forEach(player -> Command.playNormalSoundID(player.getName(), args[2], args[3]));
              sender.sendMessage(Main.PREFIX + "Started a sound for " + args[1]);
            }
          } else {
            Selector.playerSelector(sender, args[1])
                .forEach(player -> Command.playNormalSound(player.getName(), args[2]));

            sender.sendMessage(Main.PREFIX + "Started a sound for " + args[1]);
          }
        } else {
          sender.sendMessage(
              Main.PREFIX + "Invalid command, please use /openaudio play <mc name> <url> [ID]");
        }
      } else if (args[0].equalsIgnoreCase("spy") && sender.hasPermission("openaudio.admin.spy")) {
        Spy.Toggle((Player) sender);
      } else if (args[0].equalsIgnoreCase("oauth")
          || args[0].equalsIgnoreCase("auth") && sender.hasPermission("openaudio.admin.plus")) {
        sender.sendMessage(Main.PREFIX + "Generating url.");
        sender.sendMessage(Main.PREFIX
            + ""
            + ChatColor.RED
            + "Please note! this key can only be used ONCE and should only be used on oauth.openaudiomc.net!");
        sender.sendMessage(
            Main.PREFIX + "" + ChatColor.RED + "This code will only be valid for 5 minutes:");
        sender.sendMessage(
            ChatColor.AQUA + "Your key: " + ChatColor.YELLOW + OAuthConnector.getToken());
      } else if (args[0].equalsIgnoreCase("stopall") && sender.hasPermission(
          "openaudio.admin.stopall")) {
        if (args.length == 2) {
          Selector.playerSelector(sender, args[1]).forEach(player -> {
            Command.stop(player.getName());
            Command.stopAllRegions(player.getName());
            Command.hueStopEffect(player.getName());
            AudioSpeakerManager.get().stopForPlayer(player.getName());
            UserManager.getPlayer(Bukkit.getPlayer(player.getName())).removeAllSyncedSounds();
          });
        } else {
          sender.sendMessage(
              Main.PREFIX + "Invalid command, please use /openaudio stopall <mc name>");
        }
      } else if (args[0].equalsIgnoreCase("loop") && sender.hasPermission("openaudio.admin.loop")) {
        //Play commands
        if (args.length == 3 || args.length > 3) {
          if (args.length > 3) {
            if (args[3].equalsIgnoreCase("stop")) {
              Selector.playerSelector(sender, args[1]).forEach(player -> {
                Command.stop(player.getName());
                Command.playLoop(player.getName(), args[2]);
              });
              sender.sendMessage(Main.PREFIX + "Started a loop for " + args[1]);
            } else {
              sender.sendMessage(
                  Main.PREFIX + "Invalid command, please use /openaudio loop <mc name> <url>");
            }
          } else {
            for (Player p : Selector.playerSelector(sender, args[1])) {
              Command.playLoop(p.getName(), args[2]);
            }
            sender.sendMessage(Main.PREFIX + "Started a loop for " + args[1]);
          }
        } else {
          sender.sendMessage(
              Main.PREFIX + "Invalid command, please use /openaudio loop <mc name> <url>");
        }
      } else if ((args[0].equalsIgnoreCase("speaker") || args[0].equalsIgnoreCase("speakers"))
          && sender.hasPermission("openaudio.admin.speaker")) {
        if (args.length == 3) {
          if (args[1].equalsIgnoreCase("add")) {
            sender.sendMessage(Main.PREFIX
                + "You received a speaker! place it anywhere you'd like (you can remove it at any time)");
            SpeakerMain.giveSpeaker((Player) sender, args[2]);
            if (args[2].contains("soundcloud.com")) {
              sender.sendMessage(ChatColor.DARK_RED
                  + "WARNING!"
                  + ChatColor.YELLOW
                  + " Speakers do not officially have support for soundcloud sounds! please use mp3 files instead.");
            }
          }
        } else if (args.length == 7) {

          if (args[1].equalsIgnoreCase("set")) {
            Location target = new Location(Bukkit.getWorld(args[2]), Integer.parseInt(args[3]),
                Integer.parseInt(args[4]), Integer.parseInt(args[5]));
            if (AudioSpeakerManager.get().getSpeakers().get(target) != null) {
              sender.sendMessage(Main.PREFIX + "This is already a speaker. Replacing");
            } else {
              if (AudioSpeakerManager.get().getSounds().get(args[6]) == null) {
                SpeakerMain.saveSound(args[6]);
                AudioSpeakerManager.get()
                    .createSound(args[6] + "_sound", args[6], null, null, null);
              }

              SpeakerMain.saveSpeaker(args[6], target.getWorld().getName(), target.getX(),
                  target.getY(), target.getZ());

              sender.sendMessage(Main.PREFIX
                  + ChatColor.GREEN
                  + "Created speaker on X:"
                  + target.getBlockX()
                  + " Y:"
                  + target.getBlockY()
                  + " Z:"
                  + target.getBlockZ()
                  + ".");

              AudioSpeakerManager.get()
                  .createSpeaker(args[6] + "_speaker", args[6] + "_sound", target);

              Block b = Bukkit.getWorld(args[2]).getBlockAt(target);
              b.setType(Material.NOTE_BLOCK);
            }
          }
        } else if (args.length == 4 || args.length == 3) {

          if (args[1].equalsIgnoreCase("selection")) {

            if (SpeakerMain.getSelection().get((Player) sender) != null
                && SpeakerMain.getSelection().get((Player) sender).size() != 0) {

              if (args[2].equalsIgnoreCase("setvolume")) {
                sender.sendMessage("ba " + VolumeCommand.isInt(args[3]));

                if (VolumeCommand.isInt(args[3])) {
                  Boolean suc6 = true;
                  for (AudioSpeaker speaker : SpeakerMain.getSelection().get((Player) sender)) {
                    AudioSpeakerSound sound =
                        AudioSpeakerManager.get().getSounds().get(speaker.getSoundid());
                    if (sound.hasFile()) {
                      sound.setVolume(Integer.parseInt(args[3]));
                      FileConfiguration config =
                          YamlConfiguration.loadConfiguration(sound.getConfig());
                      config.set("volume", Integer.parseInt(args[3]));
                      try {
                        config.save(sound.getConfig());
                      } catch (IOException e) {
                        e.printStackTrace();
                      }
                    } else {
                      suc6 = false;
                    }
                    sound.setVolume(Integer.parseInt(args[3]));
                  }
                  if (!suc6) {
                    sender.sendMessage(Main.PREFIX
                        + "Whoops! Failed to execute goal, please restart the server before commiting changes to this speaker.");
                  }
                } else {
                  sender.sendMessage(
                      Main.PREFIX + "Whoops! volume needs to be a number from 0 to 100");
                }
              }
            } else {
              sender.sendMessage(Main.PREFIX
                  + "Oh no! You don't have any speakers selected, right click one to get started.");
            }
          } else if (args[1].equalsIgnoreCase("set")) {
            if (args[3].equalsIgnoreCase("on")) {
              sender.sendMessage(Main.PREFIX + "Unmuted speakers with that url.");
              AudioSpeakerManager.get().getSounds().get(args[2] + "_sound").setEnabled(true);
            } else {
              sender.sendMessage(Main.PREFIX + "Muted speakers with that url.");
              AudioSpeakerManager.get().getSounds().get(args[2] + "_sound").setEnabled(false);
            }
          }
        } else if (args.length == 2) {
          if (args[1].equalsIgnoreCase("stop")) {
            if (AudioSpeakerManager.get().isRunning()) {
              AudioSpeakerManager.get().stop();
              for (Player lp : Bukkit.getOnlinePlayers()) {
                AudioSpeakerManager.get().stopForPlayer(lp.getName());
              }
              sender.sendMessage(Main.PREFIX + "Stopped all speakers");
            } else {
              sender.sendMessage(Main.PREFIX + "Speakers are allready disabled.");
            }
          } else if (args[1].equalsIgnoreCase("start")) {
            if (!AudioSpeakerManager.get().isRunning()) {
              AudioSpeakerManager.get().init();
              sender.sendMessage(Main.PREFIX + "Restarting all speakers...");
            } else {
              sender.sendMessage(Main.PREFIX + "Speakers are allready started.");
            }
          } else if (args[1].equalsIgnoreCase("select")) {
            SpeakerMain.selectPlayer((Player) sender);
          } else {
            sender.sendMessage(Main.PREFIX + "Invalid command, please read /openaudio help");
          }
        } else {
          sender.sendMessage(Main.PREFIX + "Invalid command, please read /openaudio help");
        }
      } else if (args[0].equalsIgnoreCase("region") && sender.hasPermission(
          "openaudio.admin.region")) {
        if (GetDep.getStatus()) {
          if (args.length == 4 || args.length > 4) {
            if (args[1].equalsIgnoreCase("create")) {
              RegionListener.registerRegion(args[2], args[3], (Player) sender);
              sender.sendMessage(
                  Main.PREFIX + "Changed the sound of " + args[2] + " to " + args[3]);
            } else {
              sender.sendMessage(Main.PREFIX
                  + "Invalid command, please use /openaudio region <sub command> [values]");
            }
          } else if (args.length == 3 || args.length > 3) {
            if (args[1].equalsIgnoreCase("delete")) {
              RegionListener.deleteRegion(args[2]);
              sender.sendMessage(Main.PREFIX + "Removed the sound off" + args[2]);
            } else {
              sender.sendMessage(Main.PREFIX
                  + "Invalid command, please use /openaudio region <sub command> [values]");
            }
          } else {
            sender.sendMessage(Main.PREFIX
                + "Invalid command, please use /openaudio region <sub command> [values]");
          }
        } else {
          sender.sendMessage(Main.PREFIX
              + "Whoops, that did not go well. Please report this error to the developers,");
        }
      } else if (args[0].equalsIgnoreCase("modding")) {
        sender.sendMessage(Main.PREFIX + "Modding has been moved to plus.openaudiomc.net");
      } else if (args[0].equalsIgnoreCase("playlist") && sender.hasPermission(
          "openaudio.admin.playlist")) {
        if (args.length == 5 || args.length > 5) {
          if (args[1].equalsIgnoreCase("set")) {
            PlaylistManager.set(args[2], args[3], args[4]);
            sender.sendMessage(Main.PREFIX
                + "Changed the sound of "
                + args[2]
                + " in "
                + args[3]
                + " to "
                + args[4]);
          } else {
            sender.sendMessage(Main.PREFIX
                + "Invalid command, please use /openaudio playlist set <list> <id> <url>");
          }
        } else if (args.length == 4 || args.length > 4) {
          if (args[1].equalsIgnoreCase("play")) {
            if (PlaylistManager.getAll(args[2]) != null) {
              for (Player p : Selector.playerSelector(sender, args[3])) {
                Command.playList(p.getName(), PlaylistManager.getAll(args[2]));
              }
              sender.sendMessage(Main.PREFIX + "Started playlist for " + args[3]);
            } else {
              sender.sendMessage(Main.PREFIX + "Invalid playlist :(");
            }
          } else {
            sender.sendMessage(Main.PREFIX
                + "Invalid command, please use /openaudio playlist <sub command> [values]");
          }
        } else {
          sender.sendMessage(Main.PREFIX
              + "Invalid command, please use /openaudio playlist <sub command> [values]");
        }
      } else if (args[0].equalsIgnoreCase("playregion") && sender.hasPermission(
          "openaudio.admin.playregion")) {
        if (GetDep.getStatus()) {
          if (args.length == 3) {
            for (Player p : Selector.playerSelector(sender, "region:" + args[1])) {
              Command.playNormalSound(p.getName(), args[2]);
            }
            sender.sendMessage(Main.PREFIX + "Started a sound for players in region " + args[1]);
          } else {
            sender.sendMessage(Main.PREFIX
                + "Invalid command, please use /openaudio playregion <region name> <url>");
          }
        } else {
          sender.sendMessage(Main.PREFIX + "Whoops, you don't have worldguard installed!");
        }
      } else if (args[0].equalsIgnoreCase("debug")) {
        sender.sendMessage("Thisversion:"
            + Main.getPL().getDescription().getVersion()
            + " connected:"
            + TimeoutManager.ioconnected
            + " bukkitver:"
            + Bukkit.getBukkitVersion()
            + " st:"
            + cm_callback.speakerTick
            + " CC:"
            + cm_callback.connections_closed
            + " CM:"
            + cm_callback.connections_made
            + " cbs"
            + cm_callback.callbacks);
      } else if (args[0].equalsIgnoreCase("stop") && sender.hasPermission("openaudio.admin.stop")) {
        if (args.length >= 2) {
          if (args.length == 3) {
            for (Player p : Selector.playerSelector(sender, args[1])) {
              Command.StopID(p.getName(), args[2]);
              try {
                UserManager.getPlayer(Bukkit.getPlayer(p.getName()))
                    .removeSyncedSound(SyncedSoundManager.getBySoundId(args[2]).getId());
              } catch (NullPointerException e) {
              }
            }
            sender.sendMessage(Main.PREFIX + "Stopped sound id " + args[2] + " of " + args[1]);
          } else {
            for (Player p : Selector.playerSelector(sender, args[1])) {
              try {
                UserManager.getPlayer(Bukkit.getPlayer(p.getName())).removeAllSyncedSounds();
              } catch (NullPointerException e) {
              }
              Command.stop(p.getName());
            }
            sender.sendMessage(Main.PREFIX + "Stopped sound of " + args[1]);
          }
        } else {
          sender.sendMessage(Main.PREFIX + "Invalid command, please use /openaudio stop <mc name>");
        }
      } else if (args[0].equalsIgnoreCase("skipto") && sender.hasPermission(
          "openaudio.admin.skipto")) {
        if (args.length == 4) {
          sender.sendMessage(
              Main.PREFIX + "Skipped " + args[2] + " to " + args[3] + "seconds for " + args[1]);
          for (Player p : Selector.playerSelector(sender, args[1])) {
            Command.skipTo(p.getName(), args[2], args[3]);
          }
        } else {
          sender.sendMessage(Main.PREFIX
              + "Invalid command, please use /openaudio skipto <mc name> <id> <time in seconds>");
        }
      } else if (args[0].equalsIgnoreCase("toggle") && sender.hasPermission(
          "openaudio.admin.toggle")) {
        if (args.length == 3) {
          for (Player p : Selector.playerSelector(sender, args[1])) {
            Command.ToggleID(p.getName(), args[2]);
          }
          sender.sendMessage(Main.PREFIX + "Toggled sound for " + args[1]);
        } else {
          sender.sendMessage(
              Main.PREFIX + "Invalid command, please use /openaudio toggle <mc name> <id>");
        }
      } else if (args[0].equalsIgnoreCase("setvolume") && sender.hasPermission(
          "openaudio.admin.setvolume")) {
        if (args.length >= 3) {
          if (args.length == 4) {
            for (Player p : Selector.playerSelector(sender, args[1])) {
              Command.setVolumeID(p.getName(), args[2], args[3]);
            }
            sender.sendMessage(Main.PREFIX
                + "Volume for sound with id:"
                + args[3]
                + " for:"
                + args[1]
                + " is now set.");
          } else {
            for (Player p : Selector.playerSelector(sender, args[1])) {
              Command.setVolume(p.getName(), args[2]);
            }
            sender.sendMessage(Main.PREFIX + "volume of " + args[1] + " is now set to " + args[2]);
          }
        } else {
          sender.sendMessage(
              Main.PREFIX + "Invalid command, please use /openaudio setvolume <mc name> <volume>");
        }
      } else if (args[0].equalsIgnoreCase("buffer") && sender.hasPermission(
          "openaudio.admin.buffer")) {
        if (args.length == 4 || args.length > 4) {
          if (args[1].equalsIgnoreCase("create")) {
            for (Player p : Selector.playerSelector(sender, args[2])) {
              Command.createBuffer(p.getName(), args[3]);
            }
            sender.sendMessage(Main.PREFIX + "Buffering " + args[3] + " for " + args[2]);
          } else {
            sender.sendMessage(Main.PREFIX
                + "Invalid command, please use /openaudio buffer <sub command> [values]");
          }
        } else if (args.length == 3 || args.length > 3) {
          if (args[1].equalsIgnoreCase("play")) {
            for (Player p : Selector.playerSelector(sender, args[2])) {
              Command.playBuffer(p.getName());
            }
            sender.sendMessage(Main.PREFIX + "Started buffer for " + args[2]);
          } else {
            sender.sendMessage(Main.PREFIX
                + "Invalid command, please use /openaudio buffer <sub command> [values]");
          }
        } else {
          sender.sendMessage(Main.PREFIX
              + "Invalid command, please use /openaudio buffer <sub command> <player> [url]");
        }
      } else if (args[0].equalsIgnoreCase("send") && sender.hasPermission("openaudio.admin.send")) {
        if (args.length == 3 || args.length > 3) {
          String myString = "";
          for (int i = 2; i < args.length; i++) {
            String arg = args[i] + " ";
            myString = myString + arg;
          }
          for (Player p : Selector.playerSelector(sender, args[1])) {
            Command.sendMessage(p.getName(), myString);
          }
          sender.sendMessage(Main.PREFIX + "Message send to " + args[1]);
        } else {
          sender.sendMessage(Main.PREFIX
              + "Invalid command, please use /openaudio send <mc name> <awesome text message>");
        }
      } else if (args[0].equalsIgnoreCase("json") && sender.hasPermission("openaudio.admin.json")) {
        if (args.length == 3 || args.length > 3) {
          String myString = "";
          for (int i = 2; i < args.length; i++) {
            String arg = args[i] + " ";
            myString = myString + arg;
          }
          for (Player p : Selector.playerSelector(sender, args[1])) {
            Command.sendJSON(p.getName(), myString);
          }
          sender.sendMessage(Main.PREFIX + "Json send to " + args[1]);
        } else {
          sender.sendMessage(
              Main.PREFIX + "Invalid command, please use /openaudio json <mc name> <json>");
        }
      } else if (args[0].equalsIgnoreCase("setbg") && sender.hasPermission(
          "openaudio.admin.setbg")) {
        if (args.length == 3 || args.length > 3) {
          if (args[2].equalsIgnoreCase("reset")) {
            for (Player p : Selector.playerSelector(sender, args[1])) {
              Command.resetBg(p.getName());
            }
          } else {
            for (Player p : Selector.playerSelector(sender, args[1])) {
              Command.setBg(p.getName(), args[2]);
            }
          }
          sender.sendMessage(Main.PREFIX + "Changed background of " + args[1]);
        } else {
          sender.sendMessage(Main.PREFIX
              + "Invalid command, please use /openaudio setbg <selector/player> <url to image>");
        }
      } else if (args[0].equalsIgnoreCase("group") && sender.hasPermission(
          "openaudio.admin.group")) {
        if (args.length == 3 || args.length > 3) {
          if (args[1].equalsIgnoreCase("set")) {
            for (Player p : Selector.playerSelector(sender, args[3])) {
              GroupManager.get().addToGroup(args[2], p);
            }
            sender.sendMessage(Main.PREFIX + "Added " + args[3] + " to the group " + args[2]);
          } else if (args[1].equalsIgnoreCase("remove")) {
            for (Player p : Selector.playerSelector(sender, args[2])) {
              GroupManager.get().removeFromGroup(p);
            }
            sender.sendMessage(Main.PREFIX + "Removed " + args[2] + " from all groups");
          } else if (args[1].equalsIgnoreCase("list")) {

            sender.sendMessage(Main.PREFIX + "Players in group " + args[2] + ":");
            for (Player p : Selector.playerSelector(sender, "group:" + args[2])) {
              sender.sendMessage(" " + ChatColor.RED + "- " + ChatColor.YELLOW + p.getName());
            }
          } else {
            sender.sendMessage(Main.PREFIX + "Invalid command, please use /openaudio help");
          }
        }
      } else if (args[0].equalsIgnoreCase("hue") && sender.hasPermission("openaudio.admin.hue")) {
        if (args.length == 4 || args.length > 4) {
          //set and effect
          if (args[1].equalsIgnoreCase("set")) {

            if (args.length > 4) {
              String color = args[3] + ":" + args[4];
              for (Player p : Selector.playerSelector(sender, args[2])) {
                Command.hueSet(p.getName(), color);
              }
              sender.sendMessage(Main.PREFIX + "Changed room color of " + args[2]);
            } else {
              String color = args[3];
              for (Player p : Selector.playerSelector(sender, args[2])) {
                Command.hueSet(p.getName(), color);
              }
              sender.sendMessage(Main.PREFIX + "Changed room color of " + args[2]);
            }
          } else if (args[1].equalsIgnoreCase("effect")) {
            if (args[2].equalsIgnoreCase("blink")) {
              for (Player p : Selector.playerSelector(sender, args[3])) {
                Command.hueBlink(p.getName());
              }
              sender.sendMessage(Main.PREFIX + "Enabled hue blink effect for " + args[3]);
            } else if (args[2].equalsIgnoreCase("cycle")) {
              for (Player p : Selector.playerSelector(sender, args[3])) {
                Command.hueCycle(p.getName());
              }
              sender.sendMessage(Main.PREFIX + "Enabled hue cycle effect for " + args[3]);
            } else if (args[2].equalsIgnoreCase("stop")) {
              for (Player p : Selector.playerSelector(sender, args[3])) {
                Command.hueStopEffect(p.getName());
              }
              sender.sendMessage(Main.PREFIX + "Stopped all hue effects for " + args[3]);
            } else {
              sender.sendMessage(
                  Main.PREFIX + "Sorry, that's an invalid command :( (unknown effect)");
            }
          }
        } else {
          if (args.length == 3) {
            if (args[1].equalsIgnoreCase("reset")) {
              for (Player p : Selector.playerSelector(sender, args[2])) {
                Command.hueReset(p.getName());
              }
            } else {
              sender.sendMessage(
                  Main.PREFIX + "Sorry, that's an invalid command :( (unknown command)");
            }
          } else {
            sender.sendMessage(
                Main.PREFIX + "Sorry, that's an invalid command :( (command is to short)");
          }
        }
      }
    } else {
      sender.sendMessage(Main.PREFIX
          + "OpenAudio made with <3 by Mindgamesnl (you can use '/openaudio help' for help :P) need more help? Contact me!");
    }

    return true;
  }
}