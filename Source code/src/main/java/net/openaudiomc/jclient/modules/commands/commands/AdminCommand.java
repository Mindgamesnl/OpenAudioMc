package net.openaudiomc.jclient.modules.commands.commands;

import net.openaudiomc.jclient.helpers.OperatorHelper;
import net.openaudiomc.jclient.modules.socket.enums.PacketCommand;
import net.openaudiomc.jclient.modules.socket.objects.OaPacket;
import org.bukkit.ChatColor;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;

public class AdminCommand implements CommandExecutor {

    private String prefix = ChatColor.DARK_GRAY + "[" + ChatColor.AQUA + "OpenAudioMc" + ChatColor.DARK_GRAY + "] " + ChatColor.GRAY;

    @Override
    public boolean onCommand(CommandSender s, Command command, String label, String[] args) {

        if (args.length == 0) {help(s); return true;}

        if (args[0].equalsIgnoreCase("play") && allowed(s, "play")) {
            if (args.length == 3) {
                OperatorHelper.send(args[1], new OaPacket()
                        .setCommand(PacketCommand.PLAY)
                        .setValue(args[2]));
                s.sendMessage(prefix + "Successfully executed command.");
                return true;
            }
            if (args.length == 4) {
                OperatorHelper.send(args[1], new OaPacket()
                        .setCommand(PacketCommand.PLAY_SPECIAL)
                        .setValue(args[2] + "--==--" + args[3]));
                s.sendMessage(prefix + "Successfully executed command.");
                return true;
            }
            s.sendMessage(prefix + ChatColor.RED + "Correct ussage: /oa play <name> <url> [JSON arguments]");
            return true;
        }

        if (args[0].equalsIgnoreCase("stop") && allowed(s, "stop")) {
            if (args.length == 2) {
                OperatorHelper.send(args[1], new OaPacket()
                        .setCommand(PacketCommand.STOP));
                s.sendMessage(prefix + "Successfully executed command.");
                return true;
            }
            if (args.length == 3) {
                OperatorHelper.send(args[1], new OaPacket()
                        .setCommand(PacketCommand.STOP_SPECIAL)
                        .setValue(args[2]));
                s.sendMessage(prefix + "Successfully executed command.");
                return true;
            }
            s.sendMessage(prefix + ChatColor.RED + "Correct ussage: /oa stop <name> [id]");
            return true;
        }

        return false;
    }

    private void help(CommandSender s) {
        s.sendMessage("help is comming soon");
    }

    private Boolean allowed(CommandSender s, String c) {
        return s.hasPermission("oa.*") || s.hasPermission("oa.admin."+c) || s.hasPermission("oa.admin.*");
    }
}
