package com.craftmend.tests.helpers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.OpenAudioMcBuild;
import com.craftmend.openaudiomc.generic.oac.OpenaudioAccountService;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.DefaultNetworkingService;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.platform.interfaces.OpenAudioInvoker;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.state.StateService;
import com.craftmend.openaudiomc.generic.state.states.IdleState;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.tests.connection.impl.StandAloneTaskService;
import com.craftmend.tests.connection.impl.SystemConfiguration;
import com.craftmend.tests.connection.impl.TestUserHooks;
import com.craftmend.utils.Waiter;
import lombok.SneakyThrows;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import static com.craftmend.openaudiomc.OpenAudioMc.BUILD;

public class TestHelper implements OpenAudioInvoker {

    protected static OpenAudioMc openAudioMc;

    @SneakyThrows
    public static void prepTests(boolean start) {
        // setup the testing utils
        SystemConfiguration.BASE_PATH = SystemConfiguration.BASE_PATH + "/../test-storage";
        MagicValue.overWrite(MagicValue.STORAGE_DIRECTORY, new File(SystemConfiguration.BASE_PATH));

        // delete data
        new File(SystemConfiguration.BASE_PATH, "storm.db").delete();
        new File(SystemConfiguration.BASE_PATH, "database.db").delete();

        // ensure that the folder exists
        File temp = new File(SystemConfiguration.BASE_PATH);
        if (!temp.exists()) {
            testLog("Creating base path");
            temp.mkdir();
        }

        // seed old data to test migrations
        Path copied = new File(SystemConfiguration.BASE_PATH, "database.db").toPath();
        Path originalPath = Paths.get(new File(SystemConfiguration.BASE_PATH, "/../test-resources/database.db").getPath());
        Files.copy(originalPath, copied, StandardCopyOption.REPLACE_EXISTING);

        if (start) {
            openAudioMc = new OpenAudioMc(new TestHelper());
        }
    }

    protected static void setOaTestMode(boolean testMode) {
        OpenAudioMcBuild.IS_TESTING = testMode;
    }

    @SneakyThrows
    public void startQuietly() {
        openAudioMc = new OpenAudioMc(new TestHelper());
    }

    protected void shutdown() {
        openAudioMc.disable();
    }

    public static void testLog(String... messages) {
        System.out.println("TESTLOG: " + String.join(" ", messages));
    }

    @SneakyThrows
    protected OpenAudioMc createTestInstance() {
        OpenAudioMc openAudioMc = new OpenAudioMc(this);
        openAudioMc.postBoot();
        OpenAudioMc.getService(StateService.class).setState(new IdleState("OpenAudioMc started and awaiting command"));

        // openaudiomc is starting.. now wait for a predicate
        testLog("Waiting for boot...");
        Waiter.waitUntil(unused -> OpenAudioMc.getService(OpenaudioAccountService.class).isInitialized(), 20);
        return openAudioMc;
    }

    @Override
    public boolean hasPlayersOnline() {
        return false;
    }

    @Override
    public boolean isNodeServer() {
        return false;
    }

    @Override
    public Platform getPlatform() {
        return Platform.STANDALONE;
    }

    @Override
    public Class<? extends NetworkingService> getServiceClass() {
        return DefaultNetworkingService.class;
    }

    @Override
    public TaskService getTaskProvider() {
        return new StandAloneTaskService();
    }

    @Override
    public Configuration getConfigurationProvider() {
        Configuration configuration = new SystemConfiguration();
        configuration.setBoolean(StorageKey.LEGAL_ACCEPTED_TOS_AND_PRIVACY, true);
        configuration.setBoolean(StorageKey.DEBUG_LOG_STATE_CHANGES, true);
        return configuration;
    }

    @Override
    public String getPluginVersion() {
        return "test";
    }

    @Override
    public int getServerPort() {
        return 25565;
    }

    @Override
    public UserHooks getUserHooks() {
        return new TestUserHooks();
    }

}
