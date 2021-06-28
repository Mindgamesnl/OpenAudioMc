package com.craftmend.tests;

import com.craftmend.openaudiomc.generic.enviroment.models.ProjectStatus;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.ApiResponse;
import org.junit.Assert;
import org.junit.Test;

public class TestRest {

    @Test
    public void testHtml() {
        RestRequest restRequest = new RestRequest(RestEndpoint.GITHUB_VERSION_CHECK);
        ApiResponse response = restRequest.executeInThread();
        Assert.assertTrue(response.getErrors().isEmpty());

        ProjectStatus status = response.getResponse(ProjectStatus.class);

        Assert.assertNotNull(status);
        Assert.assertTrue(status.isLocalLatest());
    }

}
