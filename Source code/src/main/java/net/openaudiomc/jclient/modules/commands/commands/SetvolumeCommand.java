package net.openaudiomc.jclient.modules.commands.commands;

import net.openaudiomc.jclient.OpenAudioApi;
import net.openaudiomc.jclient.OpenAudioMc;
import org.bukkit.ChatColor;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class SetvolumeCommand implements CommandExecutor {

    private OpenAudioApi api = new OpenAudioApi();

    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {

        if (!(sender instanceof Player)) {
            sender.sendMessage(ChatColor.RED + "This command can only be used by players.");
            return true;
        }

        if (!(args.length > 0 && isInt(args[0]))) {
            sender.sendMessage(ChatColor.translateAlternateColorCodes('&', OpenAudioMc.getInstance().getConf().getMessages().getSetvolumefail()));
            return true;
        }

        int volume = Integer.parseInt(args[0]);

        if (volume > 100 || volume < 0) {
            sender.sendMessage(ChatColor.translateAlternateColorCodes('&', OpenAudioMc.getInstance().getConf().getMessages().getSetvolumefail()));
            return true;
        }

        sender.sendMessage(ChatColor.translateAlternateColorCodes('&', OpenAudioMc.getInstance().getConf().getMessages().getSetvolume().replaceAll("%volume%", volume + "")));
        api.setVolume(((Player) sender), volume);

        return true;
    }

    public Boolean isInt(String s) {
        try {
            Integer.parseInt(s);
        } catch(NumberFormatException e) {
            return false;
        } catch(NullPointerException e) {
            return false;
        }
        return true;
    }
}
