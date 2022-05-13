package com.craftmend.tests.connection;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.craftmend.CraftmendService;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.mojang.MojangLookupService;
import com.craftmend.openaudiomc.generic.mojang.store.MojangProfile;
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
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;
import com.craftmend.openaudiomc.spigot.modules.shortner.data.Alias;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import com.craftmend.tests.connection.impl.StandAloneTaskService;
import com.craftmend.tests.connection.impl.SystemConfiguration;
import com.craftmend.tests.connection.impl.TestUserHooks;
import com.craftmend.utils.AssertionGroup;
import com.craftmend.utils.Waiter;
import lombok.SneakyThrows;
import org.junit.Assert;
import org.junit.Test;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Collection;
import java.util.UUID;

/**
 * This unit test serves as the main "catch all giant fuckups" solution for the OpenAudioMc project.
 *
 * It does some main and common computations with the generic OpenAudioMc platform against the production backend
 * It currently covers the following mechanisms:
 *      - Plugin init from scratch and previous installations
 *      - Migrations
 *      - Database handling
 *      - Account and license management
 *      - (fake) Player registration and memory leaks
 *      - Player token generation
 *      - Socket connections and connection state
 *      - Voicechat transactions
 *      - Basic player messages
 *      - Mojang UUID caching
 *      - Plugin restarting
 *      - Core file interactions
 *      - Basic spamming/concurrency
 *
 * This class also serves as the main invoker, and is technically re-used between plugin inits;
 * just mentioning that because I know that future me *will* fuck up at some point because of it.
 * So, dear future Mats, **I TOLD YOU SO, FUCKER**
 */
public class ConnectionTest implements OpenAudioInvoker {

    public static AssertionGroup assertionGroup = new AssertionGroup();
    private boolean canShutdown = false;

    @SneakyThrows
    @Test
    public void testPluginCore() {
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

        // setup fake users, UUID's need to be valid every time to test for memory leaks, they should
        // never be allowed to duplicate
        TestUserHooks.createFakeUser(UUID.fromString("6cd694fc-3ca0-4255-a751-b638a47dfb0b"), "ToetMats");
        TestUserHooks.createFakeUser(UUID.fromString("90b13565-51ab-425d-9736-3bb4586c1fe8"), "Mindgamesnl");
        TestUserHooks.createFakeUser(UUID.fromString("f89ede3c-fc42-45d3-a283-e98780d23b4f"), "Nouxy");
        TestUserHooks.createFakeUser(UUID.fromString("903fb2da-808c-4284-9d11-cf1a4fce99b8"), "Nika");
        TestUserHooks.createFakeUser(UUID.fromString("0ff00a8a-2293-48f7-bbf5-5e290733fb85"), "henRYANand");
        TestUserHooks.createFakeUser(UUID.fromString("5dad222a-68b0-4eae-89f4-d351ed1cfe74"), "Cam");
        TestUserHooks.createFakeUser(UUID.fromString("4db081f0-61e5-440c-8db1-c3459023c60b"), "BumbleTree");
        TestUserHooks.createFakeUser(UUID.fromString("0fb0c3b2-9971-454c-8097-74d7c39db677"), "DeEktePudding");
        TestUserHooks.createFakeUser(UUID.fromString("1cbd98c4-d3f9-4345-abdb-c1fb3be71d77"), "Floor");
        TestUserHooks.createFakeUser(UUID.fromString("ed9bd068-9948-4176-a95f-a93e5a30826a"), "_ben1098_");
        TestUserHooks.createFakeUser(UUID.fromString("d9730e0f-40df-4272-a0bd-e1508de9e82d"), "alexmi94");
        TestUserHooks.createFakeUser(UUID.fromString("20dd1cca-f052-4a35-b919-4eea0bce6bd1"), "ApocalypsjeNL");
        TestUserHooks.createFakeUser(UUID.fromString("a1897ee4-5b32-41e0-a849-b803ba7740bd"), "Davadro");

        // register fake OpenAudioMc
        final OpenAudioMc firstInstance = createTestInstance();

        // attempt to connect
        Waiter.waitSeconds(5);
        OpenAudioMc.getService(NetworkingService.class).connectIfDown();
        testLog("Waiting for connection...");
        Waiter.waitUntil(unused -> OpenAudioMc.getService(StateService.class).getCurrentState().isConnected(), 20);

        testLog("Connected! Preforming tests with fake users...");
        whenConnected(firstInstance);

        testLog("Waiting for stuff to finish and to allow shutdowns");
        Waiter.waitUntil(unused -> canShutdown, 9999999);
        firstInstance.disable();
        Waiter.waitUntil(unused -> firstInstance.isDisabled(), 5);
        testLog("Waiting 2 seconds before starting a new instance");
        Waiter.waitSeconds(2);

        // =============================
        // SECOND BOOT
        // =============================

        testLog("OpenAudioMc shut down normally! now I'm gonna start it AGAIN to see if all transactions were saved");
        final OpenAudioMc secondInstance = createTestInstance();
        testLog("Testing UUID cache");
        Collection<MojangProfile> mojangProfiles = OpenAudioMc.getService(MojangLookupService.class).getProfileRepository().values();
        Assert.assertEquals("All UUID's are cached", TestUserHooks.fakeUsers.size(), mojangProfiles.size());
        testLog("Checking if the recent data was valid");
        for (MojangProfile mojangProfile : mojangProfiles) {
            testLog("Comparing", mojangProfile.getName(), "to", TestUserHooks.fakeUsers.get(mojangProfile.getUuid()).getName());
            Assert.assertEquals("UUID's match", mojangProfile.getUuid(), TestUserHooks.fakeUsers.get(mojangProfile.getUuid()).getUniqueId());
        }

        testLog("Counting data to make sure that migrations didn't trigger twice");
        Assert.assertEquals(
                1840,
                secondInstance.getServiceManager().getService(DatabaseService.class).getRepository(Speaker.class)
                        .values().size()
        );

        Assert.assertEquals(
                232,
                secondInstance.getServiceManager().getService(DatabaseService.class).getRepository(RegionProperties.class)
                        .values().size()
        );

        Assert.assertEquals(
                138,
                secondInstance.getServiceManager().getService(DatabaseService.class).getRepository(Alias.class)
                        .values().size()
        );

        testLog("Shutting down, again!");
        secondInstance.disable();
    }

    public static void testLog(String... messages) {
        System.out.println("TESTLOG: " + String.join(" ", messages));
    }

    private void whenConnected(OpenAudioMc openAudioMc) {
        // trigger fake player joins
        for (User onlineUser : getUserHooks().getOnlineUsers()) {
            testLog("Handling fake user join", onlineUser.getName());
            OpenAudioMc.getService(NetworkingService.class).register(onlineUser, null);
        }

        testLog("Waiting untill all players are registered");
        Waiter.waitUntil(f -> OpenAudioMc.getService(NetworkingService.class).getClients().size() == TestUserHooks.fakeUsers.size(), 5);

        // give it another few seconds to do its things, then test everything
        Waiter.waitSeconds(3);
        assertionGroup.runAll();

        // simulate players leaving
        for (User onlineUser : getUserHooks().getOnlineUsers()) {
            testLog("Handling fake user leave", onlineUser.getName());
            OpenAudioMc.getService(NetworkingService.class).remove(onlineUser.getUniqueId());
        }

        Waiter.waitSeconds(2);

        // there shouldn't be any online players now
        Assert.assertEquals("All players are removed", 0, OpenAudioMc.getService(NetworkingService.class).getClients().size());
        canShutdown = true;
    }

    @SneakyThrows
    private OpenAudioMc createTestInstance() {
        OpenAudioMc openAudioMc = new OpenAudioMc(this);
        openAudioMc.postBoot();
        OpenAudioMc.getService(StateService.class).setState(new IdleState("OpenAudioMc started and awaiting command"));

        // openaudiomc is starting.. now wait for a predicate
        testLog("Waiting for boot...");
        Waiter.waitUntil(unused -> OpenAudioMc.getService(CraftmendService.class).isInitialized(), 20);
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
