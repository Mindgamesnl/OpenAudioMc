package net.openaudiomc.commands.admin;

import net.openaudiomc.commands.OpenAudioCommand;
import net.openaudiomc.core.Main;
import net.openaudiomc.speakersystem.SpeakerMain;
import net.openaudiomc.speakersystem.managers.AudioSpeakerManager;
import net.openaudiomc.speakersystem.objects.AudioSpeaker;
import net.openaudiomc.speakersystem.objects.AudioSpeakerSound;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.Location;
import org.bukkit.Material;
import org.bukkit.block.Block;
import org.bukkit.command.CommandSender;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.entity.Player;

import java.io.IOException;

public class CommandSpeaker implements OpenAudioCommand {

    @Override
    public String getSubCommand() {
        return "speaker";
    }

    @Override
    public boolean isPlayerCommand() {
        return true;
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        if (args.length == 2) {
            if (args[0].equalsIgnoreCase("add")) {
                sender.sendMessage(Main.PREFIX + "You received a speaker! place it anywhere you'd like (you can remove it at any time)");
                SpeakerMain.giveSpeaker((Player) sender, args[1]);
            }
        } else if (args.length == 6) {
            if (args[0].equalsIgnoreCase("set")) {
                Location target = new Location(Bukkit.getWorld(args[1]), Integer.parseInt(args[2]), Integer.parseInt(args[3]), Integer.parseInt(args[4]));
                if (AudioSpeakerManager.get().getSpeakers().get(target) != null) {
                    sender.sendMessage(Main.PREFIX + "This is already a speaker. Remove the old first before creating a new one");
                } else {
                    if (AudioSpeakerManager.get().getSounds().get(args[5]) == null) {
                        SpeakerMain.saveSound(args[5]);
                        AudioSpeakerManager.get().createSound(args[5] + "_sound", args[5], null, null, null);
                    }

                    SpeakerMain.saveSpeaker(args[6], target.getWorld().getName(), target.getX(), target.getY(), target.getZ());
                    sender.sendMessage(Main.PREFIX + ChatColor.GREEN + "Created speaker on X:" + target.getBlockX() + " Y:" + target.getBlockY() + " Z:" + target.getBlockZ() + ".");
                    AudioSpeakerManager.get().createSpeaker(args[5] + "_speaker", args[5] + "_sound", target);

                    Block b = Bukkit.getWorld(args[1]).getBlockAt(target);
                    b.setType(Material.NOTE_BLOCK);
                }
            }
        } else if (args.length == 3) {
            if (args[0].equalsIgnoreCase("selection")) {
                if (SpeakerMain.getSelection().get(sender) != null && SpeakerMain.getSelection().get(sender).size() != 0) {
                    if (args[1].equalsIgnoreCase("setvolume")) {
                        if (args[2].chars().allMatch(Character::isDigit)) {
                            Boolean suc6 = true;
                            for (AudioSpeaker speaker : SpeakerMain.getSelection().get(sender)) {
                                AudioSpeakerSound sound = AudioSpeakerManager.get().getSounds().get(speaker.getSoundid());
                                if (sound.hasFile()) {
                                    sound.setVolume(Integer.parseInt(args[2]));
                                    FileConfiguration config =
                                            YamlConfiguration.loadConfiguration(sound.getConfig());
                                    config.set("volume", Integer.parseInt(args[2]));
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
                                sender.sendMessage(Main.PREFIX + "Whoops! Failed to execute goal, please restart the server before commiting changes to this speaker.");
                            }
                        } else {
                            sender.sendMessage(Main.PREFIX + "Whoops! volume needs to be a number from 0 to 100");
                        }
                    }
                } else {
                    sender.sendMessage(Main.PREFIX + "Oh no! You don't have any speakers selected, right click one to get started.");
                }
            } else if (args[0].equalsIgnoreCase("set")) {
                if (args[1].equalsIgnoreCase("on")) {
                    sender.sendMessage(Main.PREFIX + "Unmuted speakers with that url.");
                    AudioSpeakerManager.get().getSounds().get(args[1] + "_sound").setEnabled(true);
                } else {
                    sender.sendMessage(Main.PREFIX + "Muted speakers with that url.");
                    AudioSpeakerManager.get().getSounds().get(args[1] + "_sound").setEnabled(false);
                }
            }
        } else if (args.length == 1) {
            if (args[0].equalsIgnoreCase("stop")) {
                if (AudioSpeakerManager.get().isRunning()) {
                    AudioSpeakerManager.get().stop();
                    for (Player lp : Bukkit.getOnlinePlayers()) {
                        AudioSpeakerManager.get().stopForPlayer(lp.getName());
                    }
                    sender.sendMessage(Main.PREFIX + "Stopped all speakers");
                } else {
                    sender.sendMessage(Main.PREFIX + "Speakers are allready disabled.");
                }
            } else if (args[0].equalsIgnoreCase("start")) {
                if (!AudioSpeakerManager.get().isRunning()) {
                    AudioSpeakerManager.get().init();
                    sender.sendMessage(Main.PREFIX + "Restarting all speakers...");
                } else {
                    sender.sendMessage(Main.PREFIX + "Speakers are allready started.");
                }
            } else if (args[0].equalsIgnoreCase("select")) {
                SpeakerMain.selectPlayer((Player) sender);
            } else {
                sender.sendMessage(Main.PREFIX + "Invalid command, please read /openaudio help");
            }
        } else {
            sender.sendMessage(Main.PREFIX + "Invalid command, please read /openaudio help");
        }
    }
}
