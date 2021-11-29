package com.craftmend.openaudiomc.generic.rd;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.rd.http.RestDirectServer;
import com.craftmend.openaudiomc.generic.rd.ports.PortCheckResponse;
import com.craftmend.openaudiomc.generic.rd.ports.PortChecker;
import com.craftmend.openaudiomc.generic.rd.protocol.RegisterBody;
import com.craftmend.openaudiomc.generic.enviroment.MagicValue;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.ServerEnvironment;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.ApiResponse;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.utils.data.RandomString;
import lombok.Getter;

import java.io.File;
import java.io.IOException;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

public class RestDirectService extends Service {

    @Getter
    private AuthenticationService authenticationService;
    @Getter private File audioDirectory;
    @Getter private String password = new RandomString(20).nextString();
    private String baseUrl = "";
    @Getter private boolean isRunning = false;

    private int[] checkable_ports = new int[]{
            StorageKey.CDN_PREFERRED_PORT.getInt(),
            80,
            8080,
            ThreadLocalRandom.current().nextInt(5050, 9090),
            ThreadLocalRandom.current().nextInt(5050, 9090),
            ThreadLocalRandom.current().nextInt(5050, 9090)
    };

    @Inject
    public RestDirectService(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    public void boot() {
        // fix directory
        audioDirectory = new File(MagicValue.STORAGE_DIRECTORY.get(File.class), "/audio");
        if (!audioDirectory.exists()) {
            audioDirectory.mkdir();
        }

        attemptServerBoot();
    }

    public RestDirectServer attemptServerBoot() {
        String ip = authenticationService.getDriver().getHost().getIpAddress();
        if (OpenAudioMc.SERVER_ENVIRONMENT == ServerEnvironment.DEVELOPMENT) {
            ip = "localhost";
        }

        for (int port : checkable_ports) {
            // try to open a server
            String verificationString = UUID.randomUUID().toString();
            try {
                OpenAudioLogger.toConsole("Attempting to start a cdn injector at port " + port);
                RestDirectServer restDirectServer = new RestDirectServer(port, verificationString, this);
                // it booted! wow, that's, surprising actually
                // now verify it
                PortChecker portChecker = new PortChecker(ip, port);
                if (portChecker.test(verificationString) == PortCheckResponse.MATCH) {
                    // we have a winner!!
                    this.baseUrl = portChecker.url();
                    // register self
                    RegisterBody registerBody = new RegisterBody(
                            this.password,
                            this.baseUrl,
                            authenticationService.getServerKeySet().getPublicKey().getValue(),
                            authenticationService.getServerKeySet().getPrivateKey().getValue()
                    );

                    ApiResponse request = new RestRequest(RestEndpoint.DIRECT_REST)
                            .setBody(registerBody)
                            .executeInThread();

                    if (!request.getErrors().isEmpty()) {
                        restDirectServer.stop();
                        OpenAudioLogger.toConsole("The direct rest registration failed");
                        return null;
                    }

                    isRunning = true;
                    return restDirectServer;
                }
            } catch (IOException e) {
                // next attempt
            }
            OpenAudioLogger.toConsole("Failed to hook a cdn listener to " + port);
        }
        OpenAudioLogger.toConsole("None of the listed ports were accessible or available. Please contact support, your server/host might not be compatible!");
        return null;
    }

}
