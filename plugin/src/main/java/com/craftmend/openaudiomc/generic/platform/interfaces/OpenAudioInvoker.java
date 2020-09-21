package com.craftmend.openaudiomc.generic.platform.interfaces;

import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.storage.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.voicechat.interfaces.VoiceManagerImplementation;

public interface OpenAudioInvoker {

    boolean hasPlayersOnline();
    boolean isNodeServer();
    Platform getPlatform();
    Class<? extends NetworkingService> getServiceClass();
    TaskProvider getTaskProvider();
    ConfigurationImplementation getConfigurationProvider();
    String getPluginVersion();
    VoiceManagerImplementation getVoiceImplementation();
    int getServerPort();

}
