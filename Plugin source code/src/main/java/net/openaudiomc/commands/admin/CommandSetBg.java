package net.openaudiomc.commands.admin;

import net.openaudiomc.actions.Command;
import net.openaudiomc.commands.OpenAudioCommand;
import net.openaudiomc.core.Main;
import net.openaudiomc.utils.Selector;
import org.bukkit.command.CommandSender;

public class CommandSetBg implements OpenAudioCommand {

    @Override
    public String getSubCommand() {
        return "setbg";
    }

    @Override
    public boolean isPlayerCommand() {
        return false;
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        if (args.length == 2 || args.length > 2) {
            if (args[1].equalsIgnoreCase("reset")) {
                Selector.playerSelector(sender, args[0]).forEach(player -> Command.resetBg(player.getName()));
            } else {
                Selector.playerSelector(sender, args[0]).forEach(player -> Command.setBg(player.getName(), args[1]));
            }
            sender.sendMessage(Main.PREFIX + "Changed background of " + args[0]);
        } else {
            sender.sendMessage(Main.PREFIX + "Invalid command, please use /openaudio setbg <selector/player> <url to image>");
        }
    }
}
