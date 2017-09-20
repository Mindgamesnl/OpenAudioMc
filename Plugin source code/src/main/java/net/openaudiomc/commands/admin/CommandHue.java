package net.openaudiomc.commands.admin;

import net.openaudiomc.actions.Command;
import net.openaudiomc.commands.OpenAudioCommand;
import net.openaudiomc.core.Main;
import net.openaudiomc.utils.Selector;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class CommandHue implements OpenAudioCommand {

    @Override
    public String getSubCommand() {
        return "hue";
    }

    @Override
    public boolean isPlayerCommand() {
        return false;
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        if (args.length == 3 || args.length > 3) {
            if (args[0].equalsIgnoreCase("set")) {
                if (args.length > 3) {
                    String color = args[2] + ":" + args[3];
                    Selector.playerSelector(sender, args[1]).forEach(player -> Command.hueSet(player.getName(), color));
                    sender.sendMessage(Main.PREFIX + "Changed room color of " + args[1]);
                } else {
                    String color = args[2];
                    Selector.playerSelector(sender, args[1]).forEach(player -> Command.hueSet(player.getName(), color));
                    sender.sendMessage(Main.PREFIX + "Changed room color of " + args[1]);
                }
            } else if (args[0].equalsIgnoreCase("effect")) {
                if (args[1].equalsIgnoreCase("blink")) {
                    Selector.playerSelector(sender, args[2]).forEach(player -> Command.hueBlink(player.getName()));
                    sender.sendMessage(Main.PREFIX + "Enabled hue blink effect for " + args[2]);
                } else if (args[1].equalsIgnoreCase("cycle")) {
                    Selector.playerSelector(sender, args[2]).forEach(player -> Command.hueCycle(player.getName()));
                    sender.sendMessage(Main.PREFIX + "Enabled hue cycle effect for " + args[2]);
                } else if (args[1].equalsIgnoreCase("stop")) {
                    for (Player p : Selector.playerSelector(sender, args[2])) {
                        Command.hueStopEffect(p.getName());
                    }
                    sender.sendMessage(Main.PREFIX + "Stopped all hue effects for " + args[2]);
                } else {
                    sender.sendMessage(Main.PREFIX + "Sorry, that's an invalid command :( (unknown effect)");
                }
            }
        } else {
            if (args.length == 2) {
                if (args[0].equalsIgnoreCase("reset")) {
                    for (Player p : Selector.playerSelector(sender, args[1])) {
                        Command.hueReset(p.getName());
                    }
                } else {
                    sender.sendMessage(Main.PREFIX + "Sorry, that's an invalid command :( (unknown command)");
                }
            } else {
                sender.sendMessage(Main.PREFIX + "Sorry, that's an invalid command :( (command is to short)");
            }
        }
    }
}
