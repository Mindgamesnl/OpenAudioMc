package com.craftmend.openaudiomc.generic.voicechat.api.body;

import com.craftmend.openaudiomc.generic.networking.rest.interfaces.AbstractRestResponse;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class VoiceServerAllocationBody extends AbstractRestResponse {

    private String assignedVoiceServer;

}
