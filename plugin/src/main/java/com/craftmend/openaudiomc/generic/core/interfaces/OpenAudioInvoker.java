package com.craftmend.openaudiomc.generic.core.interfaces;

import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.Platform;

public interface OpenAudioInvoker {

    boolean hasPlayersOnline();
    boolean isSlave();
    Platform getPlatform();
    Class<? extends NetworkingService> getServiceClass();
    TaskProvider getTaskProvider();
    ConfigurationImplementation getConfigurationProvider();

}
