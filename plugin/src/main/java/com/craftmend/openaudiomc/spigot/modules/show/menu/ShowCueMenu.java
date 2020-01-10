package com.craftmend.openaudiomc.spigot.modules.show.menu;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.show.objects.Show;
import com.craftmend.openaudiomc.spigot.modules.show.objects.ShowCue;
import com.craftmend.openaudiomc.spigot.services.clicklib.Item;
import com.craftmend.openaudiomc.spigot.services.clicklib.menu.Menu;
import org.bukkit.ChatColor;
import org.bukkit.Material;

import java.util.concurrent.TimeUnit;

public class ShowCueMenu extends Menu {

    public ShowCueMenu(Show show, int page) {
        super(OpenAudioMcSpigot.getInstance(), ChatColor.BLUE + show.getShowName() + ChatColor.RESET + " - page " + page + " / " +  ((int) Math.ceil(show.getCueList().size() / 45) + 1), 6 * 9);;
        int pages = (int) Math.ceil(show.getCueList().size() / 45) + 1;

        // get 45 items
        ShowCue[] cues = new ShowCue[45];

        // amount on this page
        int count;
        if (pages == page) {
            count = show.getCueList().size() - ((page - 1) * 45);
        } else {
            count = 45;
        }
        // copy
        System.arraycopy(show.getCueList().toArray(), ((page - 1) * 45), cues, 0, count);

        int slot = 0;
        for (ShowCue cue : cues) {
            if (cue != null) {
                Item item = new Item(Material.NOTE_BLOCK);
                Long millis = cue.getTimestamp();

                String hms = String.format("%02d:%02d:%02d", TimeUnit.MILLISECONDS.toHours(millis),
                        TimeUnit.MILLISECONDS.toMinutes(millis) - TimeUnit.HOURS.toMinutes(TimeUnit.MILLISECONDS.toHours(millis)),
                        TimeUnit.MILLISECONDS.toSeconds(millis) - TimeUnit.MINUTES.toSeconds(TimeUnit.MILLISECONDS.toMinutes(millis)));
                item.setName("TimeCode: " + hms);

                item.setLore(new String[]{
                        ChatColor.GREEN + "Type: " + ChatColor.AQUA + cue.getTask().getClass().getSimpleName(),
                        ChatColor.GREEN + "Data: " + ChatColor.AQUA + cue.getTask().serialize(),
                        "",
                        ChatColor.RED + "CLICK TO REMOVE!"
                });

                item.onClick((player, clicked) -> {
                    show.getCueList().remove(cue);
                    show.save();
                    new ShowCueMenu(show, page).openFor(player);
                });

                setItem(slot, item);
                slot++;
            }
        }

        // buttons
        if (pages > page) {
            setItem(53, new Item(Material.LEVER).setName("Next page").onClick((player, item) -> new ShowCueMenu(show, page + 1).openFor(player)));
        } else {
            setItem(53, new Item(Material.BARRIER).setName(ChatColor.RED + "No next page"));
        }

        // page back
        if ((page - 1) != 0) {
            setItem(45, new Item(Material.ARROW).setName("Previous page").onClick((player, item) -> new ShowCueMenu(show, page - 1).openFor(player)));
        } else {
            setItem(45, new Item(Material.BARRIER).setName(ChatColor.RED + "Not available"));
        }

        setItem(49, new Item(Material.CHEST).setName("Back to home").onClick((player, item) -> new ShowHomeMenu(show, player)));
    }

}
