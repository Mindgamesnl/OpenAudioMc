package com.craftmend.openaudiomc.generic.resources.storage;

import com.craftmend.openaudiomc.OpenAudioMc;
import lombok.Getter;
import lombok.Setter;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

@Getter
@Setter
public class SavedRoot {

    // cached version of the latest config, used to store bungee cache or restore in case of a corrupted file
    private String lastConfigContent;
    // if the config file should even be used
    private boolean useConfigFile = true;

    public void seed() {
        // load config
        try (InputStream inputStream = OpenAudioMc.class.getResourceAsStream("/config.yml")) {
            lastConfigContent = new BufferedReader(
                    new InputStreamReader(inputStream, StandardCharsets.UTF_8))
                    .lines()
                    .collect(Collectors.joining("\n"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        useConfigFile = true;
    }

}
