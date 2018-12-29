package com.craftmend.openaudiomc.modules.configuration;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.authentication.objects.Key;
import org.bukkit.Bukkit;

public class ConfigurationModule {

    public ConfigurationModule(OpenAudioMc openAudioMc) {
        //save default
        openAudioMc.saveConfig();

        System.out.println(OpenAudioMc.getLOG_PREFIX() + "Starting configurateion module");

    }

}
