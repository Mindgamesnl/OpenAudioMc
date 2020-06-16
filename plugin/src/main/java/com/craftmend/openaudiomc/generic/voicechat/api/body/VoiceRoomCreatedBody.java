package com.craftmend.openaudiomc.generic.voicechat.api.body;

import com.craftmend.openaudiomc.generic.networking.rest.interfaces.AbstractRestResponse;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * Basically
 *
 * type RoomCreatedBody struct {
 * 	VoiceServerId string `json:"voiceServerId"`
 * 	CreatedRoomId string `json:"roomId"`
 * 	CreatedRoomPassword string `json:"roomApiKey"`
 * 	VoiceSocket string `json:"voiceSocket"`
 * }
 *
 * from the backend
 */
@Getter
@NoArgsConstructor
public class VoiceRoomCreatedBody extends AbstractRestResponse {

    private UUID voiceServerId;
    private String roomId;
    private String roomApiKey;
    private String voiceSocket; // endpoint

}
