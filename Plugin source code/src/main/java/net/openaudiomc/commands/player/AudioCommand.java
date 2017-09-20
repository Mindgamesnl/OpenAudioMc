package net.openaudiomc.commands.player;

import net.openaudiomc.core.Main;
import net.openaudiomc.players.Sessions;
import net.openaudiomc.socket.Authenticator;
import net.openaudiomc.socket.TimeoutManager;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class AudioCommand implements CommandExecutor {

    @Override
    public boolean onCommand(CommandSender sender, Command cmd, String string, String[] args) {
        if(sender instanceof Player) {
            TimeoutManager.requestConnect();
            if (TimeoutManager.isConnected()) {
                if (args.length > 2) {
                    if (args[0].equalsIgnoreCase("volume") || args[0].equalsIgnoreCase("v") || args[0].equalsIgnoreCase("-v")) {
                        ((Player) sender).chat("/volume " + args[1]);
                    } else {
                        sender.sendMessage(Main.PREFIX + "Usage: /" + cmd.getName() + " volume <0-100>");
                    }
                } else {
                    String url = Main.get().getWebConfig().getWebsiteUrl().replace("%name%", sender.getName()).replace("%session%", Authenticator.getClientID() + ":" + Sessions.getSession(sender.getName()));
                    String message = "[\"\",{\"text\":\"" + Main.getFormattedMessage(Main.get().getWebConfig().getConnectMessage()) + "\",\"clickEvent\":{\"action\":\"open_url\",\"value\":\"" + url + "\"}}]";
                    Main.get().getReflection().sendChatPacket((Player) sender, message);
                }
            } else {
                sender.sendMessage(Main.getFormattedMessage(Main.get().getWebConfig().getSocketioLoading()));
            }
        } else {
            sender.sendMessage(Main.PREFIX + "This command can only be used as a player!");
        }
        return false;
    }
}
