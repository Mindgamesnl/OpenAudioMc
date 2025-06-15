package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.show;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.show.ShowService;
import com.craftmend.openaudiomc.spigot.modules.show.objects.Show;
import org.bukkit.ChatColor;

public class ShowStartSubCommand extends SubCommand {

    public ShowStartSubCommand() {
        super("start");
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
        show.start();
        sender.sendMessage(ChatColor.GOLD + "Show started!");
    }
}
