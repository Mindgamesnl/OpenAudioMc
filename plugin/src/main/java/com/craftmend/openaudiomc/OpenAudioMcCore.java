package com.craftmend.openaudiomc;

import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.commands.CommandModule;
import com.craftmend.openaudiomc.generic.interfaces.ConfigurationInterface;
import com.craftmend.openaudiomc.generic.media.MediaModule;
import com.craftmend.openaudiomc.generic.media.time.TimeService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.objects.OpenAudioApi;
import com.craftmend.openaudiomc.generic.networking.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.networking.addapter.AbstractPacketAdapter;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.configuration.SpigotConfigurationModule;
import com.craftmend.openaudiomc.spigot.services.server.ServerService;
import com.craftmend.openaudiomc.generic.state.StateService;

import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.bungee.modules.configuration.BungeeConfigurationModule;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.Getter;

@Getter
public class OpenAudioMcCore {

    private StateService stateService;
    private ServerService serverService;
    private TimeService timeService;
    private CommandModule commandModule;
    private NetworkingService networkingService;


    private MediaModule mediaModule;
    private ConfigurationInterface configurationInterface;
    private AuthenticationService authenticationService;

    @Getter private static OpenAudioMcCore instance;

    @Getter private static final OpenAudioApi api = new OpenAudioApi();
    @Getter private static final String LOG_PREFIX = "[OpenAudioMc-Log] ";
    @Getter private static final String server = "http://craftmendserver.eu";
    @Getter private static final Gson gson = new GsonBuilder()
            .registerTypeAdapter(AbstractPacketPayload.class, new AbstractPacketAdapter())
            .create();

    // The platform, easy for detecting what should be enabled and what not ya know
    private Platform platform;

    public OpenAudioMcCore(Platform platform) {
        instance = this;
        this.platform = platform;

        // if spigot, load the spigot configuration system and the bungee one for bungee
        if (platform == Platform.SPIGOT) {
            this.serverService = new ServerService();
            this.configurationInterface = new SpigotConfigurationModule(OpenAudioMcSpigot.getInstance());
        } else {
            this.configurationInterface = new BungeeConfigurationModule((OpenAudioMcBungee.getInstance()));
        }

        // enable stuff
        this.authenticationService = new AuthenticationService();
        this.stateService = new StateService();
        this.timeService = new TimeService();
        this.mediaModule = new MediaModule();
        this.networkingService = new NetworkingService();
        this.commandModule = new CommandModule();
    }

}
