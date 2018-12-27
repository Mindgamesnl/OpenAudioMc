package com.craftmend.openaudiomc.modules.configuration;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.authentication.objects.Key;
import org.bukkit.Bukkit;

public class ConfigurationModule {

    public ConfigurationModule(OpenAudioMc openAudioMc) {
        //save default
        openAudioMc.saveConfig();

        System.out.println(OpenAudioMc.getLOG_PREFIX() + "Starting configurateion module");

        //check if config is empty
        if (openAudioMc.getConfig().getString("keyset.private") == null || openAudioMc.getConfig().getString("keyset.private").equals("not-set")) {
            //generate token
            Key privateKey = openAudioMc.getAuthenticationModule().requestServerIdentifier();
            if (privateKey == null) {
                Bukkit.getPluginManager().disablePlugin(openAudioMc);
                System.out.println(OpenAudioMc.getLOG_PREFIX() + "The plugin could not start because of a connection problem when requesting the initial private key. Please contact the developers of this plugin.");
            } else {
                openAudioMc.getConfig().set("keyset.private", privateKey.getValue());
            }
        }
    }

}
