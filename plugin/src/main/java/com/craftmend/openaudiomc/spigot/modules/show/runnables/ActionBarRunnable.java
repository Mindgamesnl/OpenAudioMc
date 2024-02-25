package com.craftmend.openaudiomc.spigot.modules.show.runnables;

import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.users.adapters.SpigotUserAdapter;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotPlayerSelector;
import com.craftmend.openaudiomc.spigot.modules.show.interfaces.FakeCommandSender;
import com.craftmend.openaudiomc.spigot.modules.show.interfaces.ShowRunnable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import net.md_5.bungee.api.ChatMessageType;
import net.md_5.bungee.api.chat.TextComponent;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.World;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

@AllArgsConstructor
@NoArgsConstructor
@Deprecated
public class ActionBarRunnable extends ShowRunnable {

    private String message;
    private String worldName;

    @Override
    public void prepare(String serialized, World world) {
        this.message = serialized;
        this.worldName = world.getName();
    }

    @Override
    public String serialize() {
        return message;
    }

    @Override
    public void run() {
        String[] args = message.split(" ");
        if (args.length < 1) return;

        SpigotPlayerSelector spigotPlayerSelector = new SpigotPlayerSelector();
        spigotPlayerSelector.setSender(new SpigotUserAdapter(new FakeCommandSender(Bukkit.getWorld(worldName))));
        spigotPlayerSelector.setString(args[0]);


        String[] subArgs = new String[args.length - 1];
        System.arraycopy(args, 1, subArgs, 0, args.length - 1);
        String fullMessage = ChatColor.translateAlternateColorCodes('&', String.join(" ", subArgs));
        for (User<CommandSender> user : spigotPlayerSelector.getResults()) {
            if (user.getOriginal() instanceof Player) {
                Player player = (Player) user.getOriginal();
                player.spigot().sendMessage(ChatMessageType.ACTION_BAR, new TextComponent(fullMessage));
            }
        }
    }
}
