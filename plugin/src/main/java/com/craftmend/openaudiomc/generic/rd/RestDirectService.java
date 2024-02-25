package com.craftmend.openaudiomc.generic.rd;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.rd.http.RestDirectServer;
import com.craftmend.openaudiomc.generic.rd.ports.PortCheckResponse;
import com.craftmend.openaudiomc.generic.rd.ports.PortChecker;
import com.craftmend.openaudiomc.generic.rd.protocol.RegisterBody;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.rest.RestRequest;
import com.craftmend.openaudiomc.generic.rest.ServerEnvironment;
import com.craftmend.openaudiomc.generic.rest.response.NoResponse;
import com.craftmend.openaudiomc.generic.rest.routes.Endpoint;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.utils.data.RandomString;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.SneakyThrows;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

@NoArgsConstructor
public class RestDirectService extends Service {

    @Getter
    private AuthenticationService authenticationService;
    @Getter private File audioDirectory;
    @Getter private final String password = new RandomString(20).nextString();
    private String baseUrl = "";
    @Getter private boolean isRunning = false;

    private final int[] checkable_ports = new int[]{
            StorageKey.CDN_PREFERRED_PORT.getInt(),
            ThreadLocalRandom.current().nextInt(5050, 9090),
    };

    @Inject
    public RestDirectService(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    public void boot() {
        // is it enabled?
        if (!StorageKey.CDN_ENABLED.getBoolean()) {
            OpenAudioLogger.info("The legacy cdn exporter is disabled, skipping boot.");
            return;
        }

        // fix directory
        audioDirectory = new File(MagicValue.STORAGE_DIRECTORY.get(File.class), "/audio");
        if (!audioDirectory.exists()) {
            audioDirectory.mkdir();
        }

        try {
            attemptServerBoot();
        } catch (Exception e) {
            OpenAudioLogger.error(e, "Failed to start a cdn injector.");
        }
    }

    public RestDirectServer attemptServerBoot() {
        String ip = guessIp();
        if (OpenAudioMc.SERVER_ENVIRONMENT == ServerEnvironment.DEVELOPMENT) {
            ip = "localhost";
        }

        if (StorageKey.CDN_IP_OVERWRITE.getString() != null && !StorageKey.CDN_IP_OVERWRITE.getString().equals("none")) {
            OpenAudioLogger.info("Attempting to use IP overwrite with " + StorageKey.CDN_IP_OVERWRITE.getString());
            ip = StorageKey.CDN_IP_OVERWRITE.getString();
        }

        for (int port : checkable_ports) {
            // try to open a server
            String verificationString = UUID.randomUUID().toString();
            try {
                int timeout = StorageKey.CDN_TIMEOUT.getInt();
                OpenAudioLogger.info("Attempting to start a cdn injector at port " + port + ". Timeout=" + timeout+"-seconds");
                RestDirectServer restDirectServer = new RestDirectServer(port, verificationString, this);
                // it booted! wow, that's, surprising actually
                // now verify it
                PortChecker portChecker = new PortChecker(ip, port, timeout);
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

                    RestRequest request = new RestRequest(NoResponse.class, Endpoint.DIRECT_REST);
                    request.withPostJsonObject(registerBody);
                    request.run();

                    if (request.hasError()) {
                        restDirectServer.stop();
                        OpenAudioLogger.warn("The direct rest registration failed");
                        return null;
                    }

                    isRunning = true;
                    return restDirectServer;
                }
            } catch (IOException e) {
                // next attempt
                e.printStackTrace();
            }
        }
        OpenAudioLogger.info("Continuing without the RestDirect feature! None of the listed ports were accessible or available. Please contact support, your server/host might not be compatible!");
        return null;
    }

    @SneakyThrows
    private String guessIp() {
        URL whatismyip = new URL("http://checkip.amazonaws.com");
        BufferedReader in = new BufferedReader(new InputStreamReader(
                whatismyip.openStream()));

        String ip = in.readLine(); //you get the IP as a String
        return ip;
    }

}
