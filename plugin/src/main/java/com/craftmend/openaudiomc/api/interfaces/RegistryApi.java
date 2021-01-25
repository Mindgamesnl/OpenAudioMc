package com.craftmend.openaudiomc.api.interfaces;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.media.interfaces.UrlMutation;

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

}
