package com.craftmend.openaudiomc.spigot.modules.users.interfaces;

import com.craftmend.openaudiomc.generic.user.User;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

@FunctionalInterface
/**
 * This interface is used to create a user object for a spigot player,
 * used to implement different major API versions
 */
public interface SpigotUserProvider {

    /**
     * Create a user object for a player
     * @param player The player to create a user for
     * @return A user object
     */
    User<CommandSender> buildFor(Player player);

}
