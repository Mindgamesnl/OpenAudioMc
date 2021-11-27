package com.craftmend.openaudiomc.generic.voicechat.services;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.craftmend.CraftmendService;
import com.craftmend.openaudiomc.generic.craftmend.enums.CraftmendTag;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.Task;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.ApiResponse;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.voicechat.services.enums.LicenseRequestResponse;

public class VoiceLicenseService extends Service {

    @Inject private CraftmendService craftmendService;
    @Inject private TaskService taskService;

    private boolean isRunning = false;

    public Task<LicenseRequestResponse> requestLicense() {
        Task<LicenseRequestResponse> t = new Task<>();

        taskService.runAsync(() -> {
            if (this.craftmendService.is(CraftmendTag.VOICECHAT)) {
                // we already have a license
                t.finish(LicenseRequestResponse.onlyCode(LicenseRequestResponse.Code.GRANTED));
                return;
            }

            if (this.craftmendService.is(CraftmendTag.CLAIMED)) {
                // can't get a license because I'm already linked
                t.finish(LicenseRequestResponse.message(
                        "Your account is already linked. Please use the web interface (account.craftmend.com) to activate voicechat.",
                        LicenseRequestResponse.Code.DENIED
                ));
                return;
            }

            if (isRunning) {
                // now calm the fuck down will ya
                t.finish(LicenseRequestResponse.onlyCode(LicenseRequestResponse.Code.ALREADY_RUNNING));
                return;
            }
            isRunning = true;

            // forge request
            RestRequest linkRequest = new RestRequest(RestEndpoint.ACCOUNT_REQUEST_TEMP_VOICE);
            ApiResponse response = linkRequest.executeInThread();
            if (response.getErrors().isEmpty()) {
                // WE GOT THE LICENSE! hurray
                OpenAudioMc.getService(CraftmendService.class).syncAccount();
                t.finish(LicenseRequestResponse.onlyCode(LicenseRequestResponse.Code.GRANTED));
            } else {
                // are we claimed?
                t.finish(new LicenseRequestResponse(response.getErrors(), LicenseRequestResponse.Code.DENIED));
            }

            isRunning = false;
        });

        return t;
    }

}
