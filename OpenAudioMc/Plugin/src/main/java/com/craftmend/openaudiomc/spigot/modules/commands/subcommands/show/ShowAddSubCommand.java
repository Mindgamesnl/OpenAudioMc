package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.show;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.show.ShowService;
import com.craftmend.openaudiomc.spigot.modules.show.interfaces.ShowRunnable;
import com.craftmend.openaudiomc.spigot.modules.show.objects.Show;
import com.craftmend.openaudiomc.spigot.modules.show.util.TimeParser;
import org.bukkit.ChatColor;
import org.bukkit.World;
import org.bukkit.command.BlockCommandSender;
import org.bukkit.entity.Player;

public class ShowAddSubCommand extends SubCommand {

    public ShowAddSubCommand() {
        super("add");
    }

    @Override
    public void onExecute(User sender, String[] args) {
        Show show = OpenAudioMc.getService(ShowService.class).getShow(args[1]);
        if (show == null) {
            sender.sendMessage(ChatColor.RED + "There is no show called " + args[1]);
            return;
        }

        if (show.isRunning()) {
            sender.sendMessage(ChatColor.RED + "This show is already running. You should cancel it or wait until it is over.");
            return;
        }

        String[] subArgs = new String[args.length - 4];
        System.arraycopy(args, 4, subArgs, 0, args.length - 4);
        StringBuilder data = new StringBuilder();
        for (String subArg : subArgs) {
            data.append(subArg).append(" ");
        }

        Long time;
        try {
            time = TimeParser.toMilis(args[2]);
        } catch (Exception e) {
            e.printStackTrace();
            sender.sendMessage(ChatColor.RED + "Time must be valid format, like 1.5S or 5M or HH:mm:ss.");
            return;
        }

        World world = null;

        if (sender.getOriginal() instanceof Player) {
            world = ((Player) sender.getOriginal()).getWorld();
        } else if (sender.getOriginal() instanceof BlockCommandSender) {
            world = ((BlockCommandSender) sender.getOriginal()).getBlock().getWorld();
        } else {
            sender.sendMessage(ChatColor.RED + "This command can only be executed by players");
            return;
        }

        ShowRunnable task = OpenAudioMc.getService(ShowService.class).createRunnable(args[3], data.toString(), world);

        if (task == null) {
            sender.sendMessage(ChatColor.RED + "Could not create task. Available types are:");
            for (String taskType : OpenAudioMc.getService(ShowService.class).getTaskTypes()) {
                sender.sendMessage(ChatColor.RED + " - " + ChatColor.BOLD + taskType);
            }
            sender.sendMessage(ChatColor.RED + "You can download extra types via addons or create your own using the API.");
            return;
        }
        show.addCue(task, time);
        show.save();
        sender.sendMessage(ChatColor.GOLD + "Show updated!");
    }
}
