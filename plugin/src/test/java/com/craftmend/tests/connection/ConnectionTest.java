package com.craftmend.tests.connection;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.mojang.MojangLookupService;
import com.craftmend.openaudiomc.generic.mojang.store.MojangProfile;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.state.StateService;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.regions.RegionModule;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;
import com.craftmend.openaudiomc.spigot.modules.shortner.AliasService;
import com.craftmend.openaudiomc.spigot.modules.shortner.data.Alias;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import com.craftmend.tests.connection.impl.TestRegionProvider;
import com.craftmend.tests.connection.impl.TestUserHooks;
import com.craftmend.tests.helpers.TestHelper;
import com.craftmend.utils.AssertionGroup;
import com.craftmend.utils.Waiter;
import lombok.SneakyThrows;
import org.apache.commons.lang.SystemUtils;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.Collection;
import java.util.UUID;

/**
 * This unit test serves as the main "catch all giant fuckups" solution for the OpenAudioMc project.
 * <p>
 * It does some main and common computations with the generic OpenAudioMc platform against the production backend
 * It currently covers the following mechanisms:
 * - Plugin init from scratch and previous installations
 * - Migrations
 * - Database handling
 * - Account and license management
 * - (fake) Player registration and memory leaks
 * - Player token generation
 * - Socket connections and connection state
 * - Voicechat transactions
 * - Basic player messages
 * - Mojang UUID caching
 * - Plugin restarting
 * - Core file interactions
 * - Basic spamming/concurrency
 * <p>
 * <p>
 * This class also serves as the main invoker, and is technically re-used between plugin inits;
 * just mentioning that because I know that future me *will* fuck up at some point because of it.
 * So, dear future Mats, **I TOLD YOU SO, FUCKER**
 */
public class ConnectionTest extends TestHelper {

    public static AssertionGroup assertionGroup = new AssertionGroup();
    private boolean canShutdown = false;

    @SneakyThrows
    @BeforeClass
    public static void doYourOneTimeSetup() {
        prepTests(false);
        setOaTestMode(true);
    }

    @AfterClass
    public static void testRegionCleaning() {

    }

    @Test
    public void testAliasregistry() {
        final OpenAudioMc openAudioMc = createTestInstance();

        // dump all regions from the current store
        for (Alias value : OpenAudioMc.getService(DatabaseService.class).getRepository(Alias.class).values()) {
            OpenAudioMc.getService(DatabaseService.class).getRepository(Alias.class).delete(value);
        }


        String[] names = new String[]{"imreal", "alsoreal", "cute", "superreal", "supercute"};

        // seed a few times
        for (int i = 0; i < 5; i++) {
            for (String name : names) {
                OpenAudioMc.getService(DatabaseService.class).getRepository(Alias.class)
                        .save(new Alias(name, UUID.randomUUID().toString()));
            }
        }

        Assert.assertEquals(5 * names.length, OpenAudioMc.getService(DatabaseService.class).getRepository(Alias.class).values().size());

        // start module
        OpenAudioMc.getService(AliasService.class).onEnable();

        // they should now have been cleared, with only a few more in the database
        Assert.assertEquals(names.length, OpenAudioMc.getService(DatabaseService.class).getRepository(Alias.class).values().size());

        openAudioMc.disable();
    }

    @Test
    public void testRegionRegistry() {
        final OpenAudioMc openAudioMc = createTestInstance();

        // dump all regions from the current store
        for (RegionProperties value : OpenAudioMc.getService(DatabaseService.class).getRepository(RegionProperties.class).values()) {
            OpenAudioMc.getService(DatabaseService.class).getRepository(RegionProperties.class).delete(value);
        }


        String[] names = new String[]{"imreal", "alsoreal", "cute"};

        // seed a few times
        for (int i = 0; i < 5; i++) {
            for (String name : names) {
                RegionProperties regionProperties = new RegionProperties(UUID.randomUUID().toString(), 100, 200, true, name, "world");
                OpenAudioMc.getService(DatabaseService.class).getRepository(RegionProperties.class)
                        .save(regionProperties);
            }
        }

        // intentionally add a broken one
        RegionProperties regionProperties = new RegionProperties("ikea.com", 200, 200, true, "fakearea", "world");
        OpenAudioMc.getService(DatabaseService.class).getRepository(RegionProperties.class)
                .save(regionProperties);

        // they should all be saved
        Assert.assertEquals(5 * names.length + 1, OpenAudioMc.getService(DatabaseService.class).getRepository(RegionProperties.class).values().size());

        RegionModule fakeRegionModule = new RegionModule(new TestRegionProvider(names));

        // they should now have been cleared, with only a few more in the database
        Assert.assertEquals(names.length + 1, (fakeRegionModule.getRegionCount() / fakeRegionModule.getWorldCount()));
        openAudioMc.disable();
    }

    @SneakyThrows
    @Test
    public void testPluginCore() {
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
        Waiter.waitUntil(unused -> OpenAudioMc.getService(StateService.class).getCurrentState().isConnected(), 20);

        whenConnected(firstInstance);

        Waiter.waitUntil(unused -> canShutdown, 9999999);
        firstInstance.disable();
        Waiter.waitUntil(unused -> firstInstance.isDisabled(), 5);
        Waiter.waitSeconds(2);

        // =============================
        // SECOND BOOT
        // =============================

        final OpenAudioMc secondInstance = createTestInstance();
        Collection<MojangProfile> mojangProfiles = OpenAudioMc.getService(MojangLookupService.class).getProfileRepository().values();
        Assert.assertEquals("All UUID's are cached", TestUserHooks.fakeUsers.size(), mojangProfiles.size());
        for (MojangProfile mojangProfile : mojangProfiles) {
            Assert.assertEquals("UUID's match", mojangProfile.getUuid(), TestUserHooks.fakeUsers.get(mojangProfile.getUuid()).getUniqueId());
        }

        Waiter.waitSeconds(5);

        if (!SystemUtils.IS_OS_LINUX || !SystemUtils.IS_OS_MAC) {
            Assert.assertEquals(
                    920,
                    secondInstance.getServiceManager().getService(DatabaseService.class).getRepository(Speaker.class)
                            .values().size()
            );

            Assert.assertEquals(
                    232,
                    secondInstance.getServiceManager().getService(DatabaseService.class).getRepository(RegionProperties.class)
                            .values().size()
            );

            Assert.assertEquals(
                    69,
                    secondInstance.getServiceManager().getService(DatabaseService.class).getRepository(Alias.class)
                            .values().size()
            );

        } else {
            System.out.println("WARNING!!!! SKIPPING DATABASE CHECKS BECAUSE THEY CAN'T BE DONE RELIABLY ON WINDOWS!!!");
        }

        secondInstance.disable();
    }

    private void whenConnected(OpenAudioMc openAudioMc) {
        // trigger fake player joins
        for (User onlineUser : getUserHooks().getOnlineUsers()) {
            OpenAudioMc.getService(NetworkingService.class).register(onlineUser, null);
        }

        Waiter.waitUntil(f -> OpenAudioMc.getService(NetworkingService.class).getClients().size() == TestUserHooks.fakeUsers.size(), 5);

        // give it another few seconds to do its things, then test everything
        Waiter.waitSeconds(3);
        assertionGroup.runAll();

        // simulate players leaving
        for (User onlineUser : getUserHooks().getOnlineUsers()) {
            OpenAudioMc.getService(NetworkingService.class).remove(onlineUser.getUniqueId());
        }

        Waiter.waitSeconds(2);

        // there shouldn't be any online players now
        Assert.assertEquals("All players are removed", 0, OpenAudioMc.getService(NetworkingService.class).getClients().size());
        canShutdown = true;
    }
}
