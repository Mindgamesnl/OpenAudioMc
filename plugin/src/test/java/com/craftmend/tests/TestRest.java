package com.craftmend.tests;

import com.craftmend.openaudiomc.generic.rest.RestRequest;
import com.craftmend.openaudiomc.generic.rest.response.AbstractRestResponse;
import com.craftmend.openaudiomc.generic.rest.response.SectionError;
import com.craftmend.openaudiomc.generic.rest.routes.Endpoint;
import lombok.Getter;
import org.junit.Assert;
import org.junit.Test;

public class TestRest {

    @Getter
    public static class GatewayStatus extends AbstractRestResponse {
        private String motd;
        private String[] enabledFeatureFlags;
        private String env;
    }

    @Test
    public void testHtml() {
        RestRequest<GatewayStatus> restRequest = new RestRequest<>(GatewayStatus.class, Endpoint.ACCESS_TEST);
        restRequest.run();
        Assert.assertSame(restRequest.getError(), SectionError.NONE);

        GatewayStatus status = restRequest.getResponse();

        Assert.assertNotNull(status);
        Assert.assertEquals("production", status.getEnv());
    }

}
