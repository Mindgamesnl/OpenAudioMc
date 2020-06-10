package com.craftmend.openaudiomc.generic.voicechat;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.core.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.data.RestErrorResponse;
import com.craftmend.openaudiomc.generic.networking.rest.data.RestErrorType;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.ApiResponse;
import com.craftmend.openaudiomc.generic.voicechat.api.body.VoiceRoomCreatedBody;
import com.craftmend.openaudiomc.generic.voicechat.api.body.VoiceRoomRequestBody;
import com.craftmend.openaudiomc.generic.voicechat.api.drivers.VoiceRoomDriver;
import com.craftmend.openaudiomc.generic.voicechat.api.models.MinecraftAccount;
import com.craftmend.openaudiomc.generic.voicechat.api.util.Task;
import com.craftmend.openaudiomc.generic.voicechat.room.objects.VoiceRoom;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class VoiceChatManager {

    private Map<UUID, VoiceRoom> rooms = new HashMap<>();

    public Task<VoiceRoom> requestVoiceRoomAsync(List<MinecraftAccount> members) {
        Task<VoiceRoom> task = new Task<>();

        if (members.isEmpty()) {
            task.fail(RestErrorType.BAD_REQUEST);
            return task;
        }

        OpenAudioMc.getInstance().getTaskProvider().runAsync(() -> {
            // try to make a request
            ApiResponse response = new RestRequest(RestEndpoint.ENDPOINT_VOICE_CREATE)
                    .setBody(new VoiceRoomRequestBody(members))
                    .executeSync();

            // check if response was ok
            if (!response.getErrors().isEmpty()) {
                RestErrorResponse error = response.getErrors().get(0);
                task.fail(error.getCode());
                OpenAudioLogger.toConsole("Error whilst making request: " + error.getMessage());
                return;
            }

            VoiceRoomCreatedBody resultingVoiceRoom = response.getResponse(VoiceRoomCreatedBody.class);
            VoiceRoomDriver driver = new VoiceRoomDriver(resultingVoiceRoom);

            task.success(new VoiceRoom(resultingVoiceRoom.getRoomId(), driver, members));
        });

        return task;
    }

}
