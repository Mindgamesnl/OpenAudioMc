package net.openaudiomc.commands.admin;

import net.openaudiomc.actions.Command;
import net.openaudiomc.commands.OpenAudioCommand;
import net.openaudiomc.core.Main;
import net.openaudiomc.utils.Selector;
import org.bukkit.command.CommandSender;

public class CommandSend implements OpenAudioCommand {

    @Override
    public String getSubCommand() {
        return "send";
    }

    @Override
    public boolean isPlayerCommand() {
        return false;
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        if (args.length == 2 || args.length > 2) {
            StringBuilder builder = new StringBuilder();
            for (int i = 1; i < args.length; i++) {
                builder.append(args[i]);
                builder.append(" ");
            }
            Selector.playerSelector(sender, args[0]).forEach(player -> Command.sendMessage(player.getName(), builder.toString()));
            sender.sendMessage(Main.PREFIX + "Message send to " + args[0]);
        } else {
            sender.sendMessage(Main.PREFIX + "Invalid command, please use /openaudio send <mc name> <awesome text message>");
        }
    }
}
