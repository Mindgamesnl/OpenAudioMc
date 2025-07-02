package com.craftmend.openaudiomc.api.interfaces;

import com.craftmend.openaudiomc.api.exceptions.RegionException;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.api.media.UrlMutation;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.utils.data.Filter;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.TimedRegionProperties;
import org.bukkit.entity.Player;

@Deprecated
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
     * Register an alias through code
     * @param aliasName The alias key, with out a:
     * @param value The alias value
     */
    void registerAlias(String aliasName, String value);

    /**
     * Allows you to overwrite the default filtering behaviour, which is used to decide which players group
     * up in proximity voice chat session. Can be used to implement Team/Party/Friend systems or to customize
     * moderation rules
     *
     * @param filter Filter implementation
     */
    void setProximityFilter(Filter<ClientConnection, Player> filter);

    /**
     * Similar behaviour to the setProximityFilter method, but this one adds another filter instead of
     * replacing the current one
     *
     * @param filter filter
     */
    void addProximityFilter(Filter<ClientConnection, Player> filter);

    /**
     * Force preselect a networking interface
     * @param service Class
     */
    void forceNetworkingInterface(Class<? extends NetworkingService> service);


    /**
     * Register a new default account provider
     * @param provider Provider
     */
    void registerTokenProvider(ITokenProvider provider);

    /**
     * Unregister region media
     *
     * @param wolrdName Name of the world
     * @param regionName Name of the region
     * @throws RegionException Thrown if the region doesn't exist (in worldguard) or if there is no registered region provider
     */
    void removeRegion(String wolrdName, String regionName) throws RegionException;

    /**
     * Register a temp region, like it's done with /oa region temp
     *
     * @param worldName Name of the world
     * @param regionProperties Region properties with timing metadata
     * @throws RegionException Thrown if the region doesn't exist (in worldguard) or if there is no registered region provider
     */
    void registerTempRegion(String worldName, TimedRegionProperties regionProperties) throws RegionException;

    /**
     * Register a region, like it's done with /oa region create
     *
     * @param worldName Name of the world
     * @param regionProperties Region metadata
     * @throws RegionException Thrown if the region doesn't exist (in worldguard) or if there is no registered region provider
     */
    void registerRegion(String worldName, RegionProperties regionProperties) throws RegionException;

}
