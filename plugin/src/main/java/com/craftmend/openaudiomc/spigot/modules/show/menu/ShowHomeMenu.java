package com.craftmend.openaudiomc.spigot.modules.show.menu;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.show.objects.Show;
import com.craftmend.openaudiomc.spigot.services.clicklib.Item;
import com.craftmend.openaudiomc.spigot.services.clicklib.menu.Menu;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.Material;
import org.bukkit.entity.Player;

public class ShowHomeMenu extends Menu {

    private int scheduler = 0;
    private boolean canceled = false;

    public ShowHomeMenu(Show show, Player player) {
        super(OpenAudioMcSpigot.getInstance(), ChatColor.BLUE + "Editing show: " + ChatColor.BLACK + show.getShowName(), 9);

        fillout(show, player);

        scheduler = Bukkit.getServer().getScheduler().scheduleSyncRepeatingTask(OpenAudioMcSpigot.getInstance(), () -> {
            if  (!player.isOnline() || canceled) {
                onClose(player);
                return;
            }
            fillout(show, player);
            player.updateInventory();
        }, 2, 2);

        openFor(player);
    }

    @Override
    public void onClose(Player player) {
        canceled = true;
        Bukkit.getScheduler().cancelTask(scheduler);
    }

    private void fillout(Show show, Player player) {
        setItem(2,
                new Item(Material.REDSTONE)
                        .setName(ChatColor.GREEN + "Edit Cues")
                        .onClick((clickingPlayer, item) -> {
                            onClose(player);
                            new ShowCueMenu(show, 1).openFor(clickingPlayer);
                        })
        );

        if (show.isRunning()) {

            setItem(4, new Item(Material.LEVER)
                    .setLore(new String[] {
                            ChatColor.AQUA + "Current time: " + ChatColor.RESET + show.currentFrameAsString(),
                            ChatColor.AQUA + "Remaining time: " + ChatColor.RESET + show.getTimeRemainingAsString(),
                            ChatColor.AQUA + "Events ran: " + ChatColor.RESET + show.getEventsProcessed(),
                            ChatColor.AQUA + "Remaining events: " + ChatColor.RESET + (show.getCueList().size() - show.getEventsProcessed()),
                    })
                    .setName(ChatColor.GREEN + "Show is running"));

            setItem(6, new Item(Material.LEVER).setName(ChatColor.RED + "Cancel show").onClick((clickingPlayer, item) -> {
                        if (!show.isRunning()) {
                            return;
                        }
                        show.stop();
                    }
            ));
        } else {
            setItem(4, new Item(Material.LEVER).setName(ChatColor.GREEN + "Show is not running"));

            setItem(6, new Item(Material.LEVER).setName(ChatColor.GREEN + "Start show").onClick((clickingPlayer, item) -> {
                        if (show.isRunning()) {
                            return;
                        }
                        show.start();
                    }
            ));
        }
    }

}
