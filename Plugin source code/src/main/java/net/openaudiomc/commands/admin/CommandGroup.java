package net.openaudiomc.commands.admin;

import net.openaudiomc.commands.OpenAudioCommand;
import net.openaudiomc.core.Main;
import net.openaudiomc.groups.Group;
import net.openaudiomc.utils.Selector;
import org.bukkit.ChatColor;
import org.bukkit.command.CommandSender;

public class CommandGroup implements OpenAudioCommand {

    @Override
    public String getSubCommand() {
        return "group";
    }

    @Override
    public boolean isPlayerCommand() {
        return false;
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        if (args.length == 2 || args.length > 2) {
            if (args[0].equalsIgnoreCase("set")) {
                Selector.playerSelector(sender, args[2]).forEach(player -> {
                    if (Main.get().getGroupManager().getGroup(args[1]).isPresent()) {
                        Main.get().getGroupManager().getGroup(args[1]).get().addMember(player.getUniqueId());
                    } else {
                        Main.get().getGroupManager().getGroups().put(args[1], new Group(args[1]));
                        Main.get().getGroupManager().getGroup(args[1]).get().addMember(player.getUniqueId());
                    }
                });
                sender.sendMessage(Main.PREFIX + "Added " + args[2] + " to the group " + args[1]);
            } else if (args[0].equalsIgnoreCase("remove")) {
                Selector.playerSelector(sender, args[1])
                        .forEach(player -> Main.get().getGroupManager().getGroups().keySet().forEach(s -> {
                            if (Main.get().getGroupManager().getGroup(s).isPresent()) {
                                if (Main.get().getGroupManager().getGroup(s).get().getMembers().contains(player.getUniqueId())) {
                                    Main.get().getGroupManager().getGroup(s).get().removeMember(player.getUniqueId());
                                }
                            }
                        }));
                sender.sendMessage(Main.PREFIX + "Removed " + args[1] + " from all groups");
            } else if (args[0].equalsIgnoreCase("list")) {
                sender.sendMessage(Main.PREFIX + "Players in group " + args[2] + ":");
                Selector.playerSelector(sender, "group:" + args[1]).forEach(player -> sender.sendMessage(" " + ChatColor.RED + "- " + ChatColor.YELLOW + player.getName()));
            } else {
                sender.sendMessage(Main.PREFIX + "Invalid command, please use /openaudio help");
            }
        }
    }
}
