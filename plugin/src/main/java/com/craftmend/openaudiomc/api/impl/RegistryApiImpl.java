package com.craftmend.openaudiomc.api.impl;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.interfaces.RegistryApi;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.media.interfaces.UrlMutation;

public class RegistryApiImpl implements RegistryApi {
    @Override
    public void registerSubCommand(SubCommand subCommand) {
        OpenAudioMc.getInstance().getCommandModule().registerSubCommand(subCommand);
    }

    @Override
    public void registerMutation(String pattern, UrlMutation urlMutation) {
        OpenAudioMc.getInstance().getMediaModule().registerMutation(pattern, urlMutation);
    }
}
