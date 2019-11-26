package com.craftmend.openaudiomc.spigot.modules.show.menu;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.show.objects.Show;
import com.craftmend.openaudiomc.spigot.services.clicklib.Item;
import com.craftmend.openaudiomc.spigot.services.clicklib.menu.Menu;
import org.bukkit.ChatColor;
import org.bukkit.Material;

public class ShowHomeMenu extends Menu {

    public ShowHomeMenu(Show show) {
        super(OpenAudioMcSpigot.getInstance(), ChatColor.BLUE + "Editing show: " + ChatColor.BLACK + show.getShowName(), 9);

        setItem(2,
                new Item(Material.REDSTONE)
                        .setName(ChatColor.GREEN + "Edit cue's")
                        .onClick((player, item) -> {
                            new ShowCueMenu(show, 1).openFor(player);
                        })
        );

        setItem(4, new Item(Material.LEVER).setName(
                (show.isRunning() ? (
                        ChatColor.RED + "Show is running"
                ) : (
                        ChatColor.GREEN + "Show is not running"
                ))
        ));

        if (show.isRunning()) {
            setItem(6, new Item(Material.LEVER).setName(ChatColor.RED + "Cancel show").onClick((clickingPlayer, item) -> {
                        if (!show.isRunning()) {
                            new ShowHomeMenu(show).openFor(clickingPlayer);
                            return;
                        }
                        show.stop();
                        new ShowHomeMenu(show).openFor(clickingPlayer);
                    }
            ));
        } else {
            setItem(6, new Item(Material.LEVER).setName(ChatColor.GREEN + "Start show").onClick((clickingPlayer, item) -> {
                        if (show.isRunning()) {
                            new ShowHomeMenu(show).openFor(clickingPlayer);
                            return;
                        }

                        show.start();
                        new ShowHomeMenu(show).openFor(clickingPlayer);
                    }
            ));
        }
    }

}
