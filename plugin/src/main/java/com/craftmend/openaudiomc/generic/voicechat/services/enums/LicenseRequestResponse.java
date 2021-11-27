package com.craftmend.openaudiomc.generic.voicechat.services.enums;

import com.craftmend.openaudiomc.generic.networking.rest.data.ErrorCode;
import com.craftmend.openaudiomc.generic.networking.rest.data.RestErrorResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Getter
public class LicenseRequestResponse {

    private List<RestErrorResponse> errors;
    private Code code;

    public enum Code {
        ALREADY_RUNNING,
        GRANTED,
        OUT_OF_STOCK,
        DENIED
    }

    public static LicenseRequestResponse onlyCode(Code code) {
        return new LicenseRequestResponse(new ArrayList<>(), code);
    }

    public static LicenseRequestResponse message(String message, Code code) {
        List<RestErrorResponse> errors = new ArrayList<>();
        errors.add(new RestErrorResponse(message, ErrorCode.PLACEHOLDER));
        return new LicenseRequestResponse(errors, code);
    }

}
