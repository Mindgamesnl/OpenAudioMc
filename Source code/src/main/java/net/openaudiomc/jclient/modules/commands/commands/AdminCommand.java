package net.openaudiomc.jclient.modules.commands.commands;

import net.openaudiomc.jclient.OpenAudioApi;
import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.media.exceptions.InvalidColorCodeException;
import net.openaudiomc.jclient.modules.media.objects.Media;

import net.openaudiomc.jclient.modules.player.objects.AudioListener;
import net.openaudiomc.jclient.utils.config.ConfigStorageRegion;
import org.bukkit.ChatColor;
import org.bukkit.Material;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import org.bukkit.inventory.ItemStack;
import org.bukkit.inventory.meta.SkullMeta;

public class AdminCommand implements CommandExecutor {

    private String prefix = ChatColor.DARK_GRAY + "[" + ChatColor.AQUA + "OpenAudioMc" + ChatColor.DARK_GRAY + "] " + ChatColor.GRAY;
    private OpenAudioApi api = new OpenAudioApi();

    @Override
    public boolean onCommand(CommandSender s, Command command, String label, String[] args) {

        if (args.length == 0) {help(s); return true;}

        if (args[0].equalsIgnoreCase("debug")) {
            s.sendMessage("OpenAudioMc debug:");
            s.sendMessage("Connected: " + OpenAudioMc.getInstance().getSocketModule().getConnected());
            s.sendMessage("Version: " + OpenAudioMc.getInstance().getDescription().getVersion());
        }

        if(args[0].equalsIgnoreCase("reload") && allowed(s, "reload")) {
            OpenAudioMc.getInstance().getConf().load();
            return true;
        }

        if (args[0].equalsIgnoreCase("play") && allowed(s, "play")) {
            if (args.length == 3) {
                api.play(new Media(args[2]), args[1]);
                s.sendMessage(prefix + "Successfully executed command.");
                return true;
            }

            if (args.length == 4) {
                api.play(new Media(args[2]).setArgs(args[3]), args[1]);
                s.sendMessage(prefix + "Successfully executed command.");
                return true;
            }
            s.sendMessage(prefix + ChatColor.RED + "Correct ussage: /oa play <name> <url> [JSON arguments]");
            return true;
        }

        if ((args[0].equalsIgnoreCase("speaker") ||args[0].equalsIgnoreCase("speakers")) && allowed(s, "speakers")) {
            if (args.length == 3) {
                if (args[1].equalsIgnoreCase("create")) {
                    if (!(s instanceof Player)) {
                        s.sendMessage(prefix + ChatColor.RED + "Only players can execute this command.");
                        return true;
                    }
                    s.sendMessage(prefix + "Generating skull.");
                    AudioListener l = OpenAudioMc.getInstance().getPlayerModule().getListeners().get(s.getName());
                    l.setPlacingSpeaker(args[2]);
                    ItemStack skull = new ItemStack(Material.SKULL_ITEM);
                    skull.setDurability((short) 3);
                    SkullMeta sm = (SkullMeta) skull.getItemMeta();
                    sm.setOwner("OpenAudioMc");
                    sm.setDisplayName(ChatColor.AQUA + "OpenAudioMc Speaker");
                    skull.setItemMeta(sm);
                    ((Player) s).getInventory().addItem(skull);
                    s.sendMessage(prefix + "Place this skull anywhere in the world to place a speaker.");
                    s.sendMessage(prefix + "WARNING! when generating a speaker for the first time it may lagg out the server for a few seconds!");
                    return true;
                }
            }
            s.sendMessage(prefix + ChatColor.RED + "Correct ussage: /oa speakers create <url>");
            return true;
        }

        if (args[0].equalsIgnoreCase("region") && allowed(s, "region")) {
            if (args.length == 3) {
                if (args[1].equalsIgnoreCase("delete")) {

                    if(OpenAudioMc.getInstance().getConf().getStorage().getRegion(args[2]) != null) {
                        OpenAudioMc.getInstance().getConf().getStorage().deleteRegion(OpenAudioMc.getInstance().getConf().getStorage().getRegion(args[2]));
                    }
                    OpenAudioMc.getInstance().getMediaModule().getRegions().remove(args[2]);
                    OpenAudioMc.getInstance().getConf().save();
                    s.sendMessage(prefix + args[2] + " is now set to play nothing");
                    return true;
                }
            }
            if (args.length == 4) {
                if (args[1].equalsIgnoreCase("create")) {
                    ConfigStorageRegion region = new ConfigStorageRegion();
                    region.setName(args[2]);
                    region.setSource(args[3]);
                    OpenAudioMc.getInstance().getConf().getStorage().addRegion(region);
                    OpenAudioMc.getInstance().getConf().save();
                    OpenAudioMc.getInstance().getMediaModule().loadRegions();
                    s.sendMessage(prefix + "Music for " + args[2] + " is now set to play " + args[3]);
                    return true;
                }
            }
            s.sendMessage(prefix + ChatColor.RED + "Correct ussage: /oa region crate <region> <source>");
            s.sendMessage(prefix + ChatColor.RED + "Correct ussage: /oa region delete <region>");
            return true;
        }

        if (args[0].equalsIgnoreCase("stop") && allowed(s, "stop")) {
            if (args.length == 2) {
                api.stop(args[1]);
                s.sendMessage(prefix + "Successfully executed command.");
                return true;
            }
            if (args.length == 3) {
                api.stopId(args[1], args[2]);
                s.sendMessage(prefix + "Successfully executed command.");
                return true;
            }
            s.sendMessage(prefix + ChatColor.RED + "Correct ussage: /oa stop <name> [id]");
            return true;
        }

        if(args[0].equalsIgnoreCase("hue")) {
            if(args.length == 3) {
                try {
                    api.hueColor(args[1], args[2]);
                    s.sendMessage(prefix + "Successfully executed command.");
                    return true;
                } catch (InvalidColorCodeException e) {
                    s.sendMessage(prefix + ChatColor.RED + "Invalid rgba color.");
                    return true;
                }
            } else if(args.length == 6) {
                Integer red, green, blue, brightness;
                try {
                    red = Integer.parseInt(args[2]);
                    green = Integer.parseInt(args[3]);
                    blue = Integer.parseInt(args[4]);
                    brightness = Integer.parseInt(args[5]);
                } catch (NumberFormatException e) {
                    s.sendMessage(prefix + ChatColor.RED + "You included non-number characters for the colors.");
                    return true;
                }

                s.sendMessage(prefix + "Successfully executed command.");
                api.hueColor(args[1], red, green, blue, brightness);
                return true;
            } else {
                s.sendMessage(prefix + ChatColor.RED + "Correct ussage: /oa hue <name> <rgba string> or /oa hue <name> <red> <green> <blue> <brightness>");
            }
        }

        help(s);

        return false;
    }

    private void help(CommandSender s) {
        s.sendMessage(ChatColor.RED + "A list of all commands can be found here: https://help.openaudiomc.net/");
        s.sendMessage(ChatColor.RED + "If you still have problems then join our discord and we will help (discord invite can be found on the spigot page)");
    }

    private Boolean allowed(CommandSender s, String c) {
        return s.hasPermission("oa.*") || s.hasPermission("oa.admin."+c) || s.hasPermission("oa.admin.*");
    }
}
