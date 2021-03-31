package com.craftmend.openaudiomc.api.interfaces;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.media.interfaces.UrlMutation;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.utils.data.Filter;
import org.bukkit.entity.Player;

public interface RegistryApi {

    /**
     * Register a sub command for a addon
     * @param subCommand Sub command
     */
    void registerSubCommand(SubCommand subCommand);

    /**
     * Register a url mutation to translate certain url's to another format before being send to the client.
     * Can be used to rewrite old domains to new ones, etc etc
     * @param pattern Pattern for a url to be processed, like "https://myolddomain.com"
     * @param urlMutation Mutation handler
     */
    void registerMutation(String pattern, UrlMutation urlMutation);

    /**
     * Allows you to overwrite the default filtering behaviour, which is used to decide which players group
     * up in proximity voice chat session. Can be used to implement Team/Party/Friend systems or to customize
     * moderation rules
     *
     * @param filter Filter implementation
     */
    void setProximityFilter(Filter<ClientConnection, Player> filter);

}
