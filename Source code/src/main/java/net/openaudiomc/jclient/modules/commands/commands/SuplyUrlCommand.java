package net.openaudiomc.jclient.modules.commands.commands;

import net.openaudiomc.jclient.OpenAudioMc;
import org.bukkit.ChatColor;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class SuplyUrlCommand implements CommandExecutor {


    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {

        if (sender instanceof Player) {
            OpenAudioMc.getInstance().getPlayerModule().getListeners().get(sender.getName()).sendLink();
            return true;
        }

        sender.sendMessage(ChatColor.RED + "Only players can run this command.");

        return true;
    }
}
