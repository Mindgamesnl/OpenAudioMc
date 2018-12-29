package com.craftmend.openaudiomc.modules.configuration;

import com.craftmend.openaudiomc.OpenAudioMc;
import lombok.Getter;

public class ConfigurationModule {

    @Getter private String server = "http://192.168.2.19";

    public ConfigurationModule(OpenAudioMc openAudioMc) {
        //save default
        openAudioMc.saveConfig();

        System.out.println(OpenAudioMc.getLOG_PREFIX() + "Starting configurateion module");
    }

}
