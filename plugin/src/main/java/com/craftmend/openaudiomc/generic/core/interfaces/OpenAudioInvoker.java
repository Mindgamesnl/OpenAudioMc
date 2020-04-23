package com.craftmend.openaudiomc.generic.core.interfaces;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingService;
import com.craftmend.openaudiomc.generic.platform.Platform;

public interface OpenAudioInvoker {

    boolean hasPlayersOnline();
    boolean isSlave();
    Platform getPlatform();
    Class<? extends INetworkingService> getServiceClass();
    ITaskProvider getTaskProvider();
    ConfigurationImplementation getConfigurationProvider();
    void onPreBoot(OpenAudioMc openAudioMc);

}
