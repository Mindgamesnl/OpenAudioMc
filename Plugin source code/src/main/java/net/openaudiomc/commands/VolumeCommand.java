package net.openaudiomc.commands;

import me.mindgamesnl.openaudiomc.publicApi.OpenAudioApi;
import net.openaudiomc.files.Messages;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;

import org.bukkit.entity.Player;

public class VolumeCommand implements CommandExecutor {

  @Override
  public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
    if (OpenAudioApi.isConnected((Player) sender)) {
      if (args.length > 0) {
        if (isInt(args[0])) {
          if (Integer.parseInt(args[0]) > 100 || Integer.parseInt(args[0]) < -1) {
            sender.sendMessage(Messages.getColor("volume-error"));
            return false;
          } else {
            String bericht = Messages.getColor("volume-set");
            bericht = bericht.replace("%volume%", args[0]);
            sender.sendMessage(bericht);
            net.openaudiomc.actions.Command.setVolume(sender.getName(), args[0]);
            return true;
          }
        } else {
          sender.sendMessage(Messages.getColor("volume-error"));
          return false;
        }
      } else {
        return false;
      }
    } else {
      sender.sendMessage(Messages.getColor("need-connected"));
      return false;
    }
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
