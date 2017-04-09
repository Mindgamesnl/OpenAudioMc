package net.openaudiomc.commands;

import org.bukkit.Bukkit;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.command.ConsoleCommandSender;

import net.openaudiomc.files.Messages;
import net.openaudiomc.minecraft.Main;
import net.openaudiomc.players.Sessions;
import net.openaudiomc.socket.timeoutManager;

public class AudioCommands implements CommandExecutor {
	public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
		if (cmd.getName().equalsIgnoreCase("audio") || cmd.getName().equalsIgnoreCase("connect") || cmd.getName().equalsIgnoreCase("sound") || cmd.getName().equalsIgnoreCase("music") || cmd.getName().equalsIgnoreCase("muziek") || cmd.getName().equalsIgnoreCase("audioclient") || cmd.getName().equalsIgnoreCase("audioserver")) {
			if (timeoutManager.ioready) {
				String url = Messages.getColor("website-url");	
				url = url.replace("%name%", sender.getName());
				url = url.replace("%session%", Sessions.get(sender.getName()));
				
				String message = Messages.getColor("connect-message");
				
				ConsoleCommandSender console = Bukkit.getServer().getConsoleSender();
				String command = "tellraw " + sender.getName() + " " + "[\"\",{\"text\":\"" + message + "\",\"clickEvent\":{\"action\":\"open_url\",\"value\":\"" + url +"\"}}]" + "";
				Bukkit.dispatchCommand(console, command);
			} else {
				sender.sendMessage(Main.prefix + "OpenAudio is starting up, please wait.");
			}
			return true;
		}
		return false;
	}
}
