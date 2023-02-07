package com.craftmend.tests;

import com.craftmend.openaudiomc.generic.environment.models.ProjectStatus;
import com.craftmend.openaudiomc.generic.rest.RestRequest;
import com.craftmend.openaudiomc.generic.rest.response.SectionError;
import com.craftmend.openaudiomc.generic.rest.target.Endpoint;
import org.junit.Assert;
import org.junit.Test;

public class TestRest {

    @Test
    public void testHtml() {
        RestRequest<ProjectStatus> restRequest = new RestRequest<>(ProjectStatus.class, Endpoint.GITHUB_VERSION_CHECK);
        restRequest.run();
        Assert.assertTrue(restRequest.getError() == SectionError.NONE);

        ProjectStatus status = restRequest.getResponse();

        Assert.assertNotNull(status);
        Assert.assertTrue(status.isLocalLatest());
    }

}
