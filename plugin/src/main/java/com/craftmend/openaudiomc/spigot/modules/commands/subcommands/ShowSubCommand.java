package com.craftmend.openaudiomc.spigot.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.show.ShowService;
import com.craftmend.openaudiomc.spigot.modules.show.interfaces.ShowRunnable;
import com.craftmend.openaudiomc.spigot.modules.show.menu.ShowHomeMenu;
import com.craftmend.openaudiomc.spigot.modules.show.objects.Show;
import com.craftmend.openaudiomc.spigot.modules.show.util.TimeParser;

import org.apache.logging.log4j.util.Strings;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.World;
import org.bukkit.command.BlockCommandSender;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class ShowSubCommand extends SubCommand {

    private OpenAudioMcSpigot openAudioMcSpigot;

    public ShowSubCommand(OpenAudioMcSpigot openAudioMcSpigot) {
        super("show");
        registerArguments(

                new Argument("create <show name>",
                        "Create a new show"),

                new Argument("gui <show name>",
                        "Open the show editor"),

                new Argument("start <show name>",
                        "Start a show"),

                new Argument("loop <show name>",
                        "Start to loop a show until the server stops or the show is cancelled"),

                new Argument("cancel <show name>",
                        "Cancel a running show"),

                new Argument("add <show name> <time in MS> <type> <data...>",
                        "Add a task/cue to a show"),

                new Argument("info <show name>",
                        "Display info about a show"),

                new Argument("list",
                        "List all shows")
        );
        this.openAudioMcSpigot = openAudioMcSpigot;
    }

    @Override
    public void onExecute(GenericExecutor sender, String[] args) {
        if (args.length == 0) {
            Bukkit.getServer().dispatchCommand((CommandSender) sender.getOriginal(), "oa help " + getCommand());
            return;
        }

        if (args[0].equalsIgnoreCase("create") && args.length == 2) {
            if (OpenAudioMc.getService(ShowService.class).createShow(args[1]) == null) {
                sender.sendMessage(ChatColor.RED + "Show can't be created. Is that name already in use?");
            } else {
                sender.sendMessage(ChatColor.GOLD + "Show created!");
            }
            return;
        }

        if (args[0].equalsIgnoreCase("add") && args.length >= 4) {
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

            if (sender.getOriginal() instanceof  Player) {
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
            return;
        }

        if (args[0].equalsIgnoreCase("info") && args.length == 2) {
            Show show = OpenAudioMc.getService(ShowService.class).getShow(args[1]);
            if (show == null) {
                sender.sendMessage(ChatColor.RED + "There is no show called " + args[1]);
                return;
            }
            show.updateLastTime();
            message(sender, "About show " + show.getShowName());
            message(sender, "Is running: " + show.isRunning());
            message(sender, "Length: " + show.getLastTaskTime() + "MS" + " (" + (Math.round(show.getLastTaskTime()/1000)) + " seconds)");
            message(sender, "Event count: " + show.getCueList().size());
            return;
        }

        if (args[0].equalsIgnoreCase("gui") && args.length == 2) {
            Show show = OpenAudioMc.getService(ShowService.class).getShow(args[1]);
            if (show == null) {
                sender.sendMessage(ChatColor.RED + "There is no show called " + args[1]);
                return;
            }
            new ShowHomeMenu(show, (Player) sender.getOriginal());
            return;
        }

        if (args[0].equalsIgnoreCase("list")) {
            String names = Strings.join(OpenAudioMc.getService(ShowService.class).getAllShows(), ',');
            names = ChatColor.AQUA + names.replaceAll(",", ChatColor.GRAY + ", " + ChatColor.AQUA + "");
            message(sender, "All local shows: " + names);
            return;
        }

        if (args[0].equalsIgnoreCase("start") && args.length == 2) {
            Show show = OpenAudioMc.getService(ShowService.class).getShow(args[1]);
            if (show == null) {
                sender.sendMessage(ChatColor.RED + "There is no show called " + args[1]);
                return;
            }
            if (show.isRunning()) {
                sender.sendMessage(ChatColor.RED + "This show is already running. You should cancel it or wait until it is over.");
                return;
            }
            show.start();
            sender.sendMessage(ChatColor.GOLD + "Show started!");
            return;
        }

        if (args[0].equalsIgnoreCase("loop") && args.length == 2) {
            Show show = OpenAudioMc.getService(ShowService.class).getShow(args[1]);
            if (show == null) {
                sender.sendMessage(ChatColor.RED + "There is no show called " + args[1]);
                return;
            }
            if (show.isRunning()) {
                sender.sendMessage(ChatColor.RED + "This show is already running. You should cancel it or wait until it is over.");
                return;
            }
            show.startLooping();
            sender.sendMessage(ChatColor.GOLD + "Show started looping!");
            return;
        }

        if (args[0].equalsIgnoreCase("cancel") && args.length == 2) {
            Show show = OpenAudioMc.getService(ShowService.class).getShow(args[1]);

            if (show == null) {
                sender.sendMessage(ChatColor.RED + "There is no show called " + args[1]);
                return;
            }

            if (!show.isRunning()) {
                sender.sendMessage(ChatColor.RED + "This show isn't running.");
                return;
            }

            show.cancelLooping();
            show.stop();
            sender.sendMessage(ChatColor.GOLD + "Show cancelled!");
            return;
        }

        Bukkit.getServer().dispatchCommand((CommandSender) sender.getOriginal(), "oa help " + getCommand());
    }

}
