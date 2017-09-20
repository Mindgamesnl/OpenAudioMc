package net.openaudiomc.commands.admin;

import net.openaudiomc.commands.OpenAudioCommand;
import net.openaudiomc.core.Main;
import net.openaudiomc.socket.Authenticator;
import org.bukkit.ChatColor;
import org.bukkit.command.CommandSender;

public class CommandOauth implements OpenAudioCommand {

    @Override
    public String getSubCommand() {
        return "oauth";
    }

    @Override
    public boolean isPlayerCommand() {
        return false;
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        sender.sendMessage(Main.PREFIX + "Generating url.");
        sender.sendMessage(Main.PREFIX + ChatColor.RED + "Please note! this key can only be used ONCE and should only be used on a site that starts with oauth.openaudiomc.net!");
        sender.sendMessage(Main.PREFIX + ChatColor.RED + "This code will only be valid for 5 minutes:");
        sender.sendMessage(ChatColor.AQUA + "Your key: " + ChatColor.YELLOW + Authenticator.getOauthId());
    }
}
