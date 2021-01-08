package com.craftmend.openaudiomc.spigot.modules.show.runnables;

import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotPlayerSelector;
import com.craftmend.openaudiomc.spigot.modules.show.interfaces.FakeCommandSender;
import com.craftmend.openaudiomc.spigot.modules.show.interfaces.ShowRunnable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.bukkit.ChatColor;
import org.bukkit.World;
import org.bukkit.entity.Player;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
public class ChatRunnable extends ShowRunnable {

    private String message;


    @Override
    public void prepare(String serialized, World world) {
        this.message = serialized;
    }

    @Override
    public String serialize() {
        return message;
    }

    @Override
    public void run() {
        String[] args = message.split(" ");
        if (args.length < 1) return;
        List<Player> players = new SpigotPlayerSelector(args[0]).getPlayers(new FakeCommandSender());
        String[] subArgs = new String[args.length - 1];
        System.arraycopy(args, 1, subArgs, 0, args.length - 1);
        String fullMessage = ChatColor.translateAlternateColorCodes('&', String.join(" ", subArgs));
        for (Player player : players) {
            player.sendMessage(fullMessage);
        }
    }
}
