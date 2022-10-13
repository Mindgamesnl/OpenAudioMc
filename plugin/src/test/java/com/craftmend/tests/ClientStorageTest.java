package com.craftmend.tests;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.client.ClientDataService;
import com.craftmend.openaudiomc.generic.client.enums.DataStoreVersion;
import com.craftmend.openaudiomc.generic.client.store.ClientDataStore;
import com.craftmend.openaudiomc.generic.environment.models.ProjectStatus;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.ApiResponse;
import com.craftmend.tests.helpers.TestHelper;
import lombok.SneakyThrows;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.UUID;

public class ClientStorageTest extends TestHelper {

    @SneakyThrows
    @BeforeClass
    public static void doYourOneTimeSetup() {
        prepTests(true);
    }

    @Test
    public void testClientStorage() {
        UUID myId = UUID.randomUUID();

        // get the client, and we're allowed to make it
        ClientDataStore cds = OpenAudioMc.getService(ClientDataService.class).getClientData(myId, true, true)
                .waitUntil(10);

        // make sure it's not null
        Assert.assertNotNull(cds);

        // check some default data
        Assert.assertFalse(cds.getIsVoiceBlocked());
        Assert.assertEquals(0, cds.getRecentVoicechatPeers().size());
        Assert.assertEquals(DataStoreVersion.WINTER_UPDATE, cds.getDataStoreVersion());

        // okay, now force purge the cache
        OpenAudioMc.getService(ClientDataService.class).dropFromCache(myId);

        // update shit
        cds.setIsVoiceBlocked(true);
        cds.pushPeerName("joost");
        OpenAudioMc.getService(ClientDataService.class).save(cds, myId);

        // clear again
        OpenAudioMc.getService(ClientDataService.class).dropFromCache(myId);

        // fetch latest, and compare it with cds
        ClientDataStore latest = OpenAudioMc.getService(ClientDataService.class).getClientData(myId, true, false)
                .waitUntil(10);

        // make sure it's not null
        Assert.assertNotNull(latest);

        // compare
        Assert.assertEquals(cds.getIsVoiceBlocked(), latest.getIsVoiceBlocked());
        Assert.assertEquals(cds.getRecentVoicechatPeers(), latest.getRecentVoicechatPeers());

        // finally, shut down
        shutdown();
    }

}
