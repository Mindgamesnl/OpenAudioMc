package com.craftmend.openaudiomc.generic.voicechat;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.rest.data.ErrorCode;
import com.craftmend.openaudiomc.generic.voicechat.api.models.MinecraftAccount;
import com.craftmend.openaudiomc.generic.networking.rest.Task;
import com.craftmend.openaudiomc.generic.voicechat.interfaces.VoiceManagerImplementation;
import com.craftmend.openaudiomc.generic.voicechat.room.objects.VoiceRoom;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@NoArgsConstructor
public class  VoiceChatManager implements VoiceManagerImplementation {

    private final Map<String, VoiceRoom> rooms = new HashMap<>();

    /**
     * Validate a request to make a room, execute the request and finish the task
     * @param members Call members
     * @return task promise
     */
    @Override
    public Task<VoiceRoom> requestVoiceRoomAsync(List<MinecraftAccount> members) {
        Task<VoiceRoom> task = new Task<>();

        // filter all members that already have a call
        members.removeIf(member -> findRoomByPlayer(member.getUuid()) != null);

        // validate room size
        int size = members.size();
        if (size <2 || size > OpenAudioMc.getInstance().getGlobalConstantService().getProjectStatus().getConfiguration().getMaxVoiceRoomSize()) {
            task.fail(ErrorCode.BAD_REQUEST);
            return task;
        }

        // TODO: socket api
        /*
        OpenAudioMc.getInstance().getTaskProvider().runAsync(() -> {
            // try to make a request
            ApiResponse response = new RestRequest(RestEndpoint.VOICE_CREATE_ROOM)
                    .setBody(new VoiceRoomRequestBody(members))
                    .executeInThread();

            // check if response was ok
            if (!response.getErrors().isEmpty()) {
                RestErrorResponse error = response.getErrors().get(0);
                task.fail(error.getCode());
                OpenAudioLogger.toConsole("Error whilst making request: " + error.getMessage());
                return;
            }

            VoiceRoomCreatedBody resultingVoiceRoom = response.getResponse(VoiceRoomCreatedBody.class);
            VoiceRoomDriver driver = new VoiceRoomDriver(resultingVoiceRoom);

            String roomId = resultingVoiceRoom.getRoomId();
            VoiceRoom room = new VoiceRoom(roomId, driver, members);
            rooms.put(roomId, room);
            task.success(room);
        });
        */

        return task;
    }

    /**
     * Tries to find a room that contains a mamber
     * @param playerUuid player
     * @return room
     */
    @Override
    public VoiceRoom findRoomByPlayer(UUID playerUuid) {
        return rooms.values()
                .stream()
                .filter(room -> room.getMembers().
                        stream()
                        .anyMatch(member -> member.getUuid() == playerUuid))
                .findFirst().orElse(null);

    }

}
