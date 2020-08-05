package com.craftmend.openaudiomc.api.interfaces;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.DefaultApi;
import lombok.Getter;

public class AudioApi {

    @Getter private static OpenAudioMcApi instance;

    public static void boot(OpenAudioMc booted) {
        if (instance != null) throw new IllegalStateException("AudioAPI already initialized");
        instance = new DefaultApi(booted);
    }

}
