package com.craftmend.openaudiomc.modules.players.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import lombok.AllArgsConstructor;
import org.bukkit.Bukkit;
import org.bukkit.block.Block;
import org.bukkit.command.BlockCommandSender;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@AllArgsConstructor
public class PlayerSelector {

    private String selector;

    public List<Player> getPlayers(CommandSender commandSender) {
        List<Player> players = new ArrayList<>();
        if (selector.startsWith("@p")) {
            if (commandSender instanceof Player) {
                //player
                players.add((Player) commandSender);
            } else if (commandSender instanceof BlockCommandSender) {
                //command block
                Block block = ((BlockCommandSender) commandSender).getBlock();
                block.getLocation().getWorld().getPlayers().stream().min(Comparator.comparingDouble(o -> o.getLocation().distanceSquared(block.getLocation()))).ifPresent(players::add);
            }
        } else if (selector.startsWith("@a")) {
            //everyone
            players.addAll(Bukkit.getOnlinePlayers());
        } else if (selector.length() <= 16) {
            //player
            Player player = Bukkit.getPlayer(selector);
            if (player != null) players.add(player);
        } else {
            //you fucked it
            commandSender.sendMessage(OpenAudioMc.getInstance() + "Invalid player query. Try something like @a, @p, uuid, username or other arguments.");
        }
        return players;
    }

}
