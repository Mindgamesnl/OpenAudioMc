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

public class ShowInfoSubCommand extends SubCommand {

    public ShowInfoSubCommand() {
        super("info");
    }

    @Override
    public void onExecute(User sender, String[] args) {
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
    }
}
