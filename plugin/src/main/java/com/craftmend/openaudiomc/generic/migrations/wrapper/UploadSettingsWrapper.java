package com.craftmend.openaudiomc.generic.migrations.wrapper;

import com.craftmend.openaudiomc.generic.craftmend.response.ClientSettingsResponse;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UploadSettingsWrapper {

    private String privateKey;
    private ClientSettingsResponse fields;

}
