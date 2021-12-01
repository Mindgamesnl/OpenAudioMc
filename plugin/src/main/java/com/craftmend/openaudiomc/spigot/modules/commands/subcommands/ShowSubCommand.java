package com.craftmend.openaudiomc.spigot.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.commands.subcommands.show.*;
import com.craftmend.openaudiomc.spigot.modules.show.ShowService;
import com.craftmend.openaudiomc.spigot.modules.show.interfaces.ShowRunnable;
import com.craftmend.openaudiomc.spigot.modules.show.menu.ShowHomeMenu;
import com.craftmend.openaudiomc.spigot.modules.show.objects.Show;
import com.craftmend.openaudiomc.spigot.modules.show.util.TimeParser;

import org.apache.logging.log4j.util.Strings;
import org.bukkit.ChatColor;
import org.bukkit.World;
import org.bukkit.command.BlockCommandSender;
import org.bukkit.entity.Player;

public class ShowSubCommand extends SubCommand {

    private OpenAudioMcSpigot openAudioMcSpigot;

    public ShowSubCommand(OpenAudioMcSpigot openAudioMcSpigot) {
        super("show");

        registerSubCommands(
                new ShowAddSubCommand(),
                new ShowCancelSubCommand(),
                new ShowCreateSubCommand(),
                new ShowInfoSubCommand(),
                new ShowLoopSubCommand(),
                new ShowStartSubCommand()
        );

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
    public void onExecute(User sender, String[] args) {
        if (args.length == 0) {
            sender.makeExecuteCommand("oa help " + getCommand());
            return;
        }

        if (args[0].equalsIgnoreCase("create") && args.length == 2) {
            delegateTo("create", sender, args);
            return;
        }

        if (args[0].equalsIgnoreCase("add") && args.length >= 4) {
            delegateTo("add", sender, args);
            return;
        }

        if (args[0].equalsIgnoreCase("info") && args.length == 2) {
            delegateTo("info", sender, args);
            return;
        }


        if (args[0].equalsIgnoreCase("start") && args.length == 2) {
            delegateTo("start", sender, args);
            return;
        }

        if (args[0].equalsIgnoreCase("loop") && args.length == 2) {
            delegateTo("loop", sender, args);
            return;
        }

        if (args[0].equalsIgnoreCase("cancel") && args.length == 2) {
            delegateTo("cancel", sender, args);
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

        sender.makeExecuteCommand("oa help " + getCommand());
    }

}
