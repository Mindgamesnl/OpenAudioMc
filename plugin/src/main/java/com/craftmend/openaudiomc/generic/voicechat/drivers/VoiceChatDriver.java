package com.craftmend.openaudiomc.generic.voicechat.drivers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.interfaces.SocketDriver;
import com.craftmend.openaudiomc.generic.networking.payloads.AcknowledgeClientPayload;
import com.craftmend.openaudiomc.generic.networking.payloads.voice.PlainUuidPayload;
import com.craftmend.openaudiomc.generic.networking.rest.data.ErrorCode;
import com.craftmend.openaudiomc.generic.networking.rest.data.RestErrorResponse;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.ApiResponse;
import com.craftmend.openaudiomc.generic.voicechat.api.util.Task;
import io.socket.client.Ack;
import io.socket.client.Socket;
import lombok.Getter;

import java.util.UUID;

public class VoiceChatDriver implements SocketDriver {

    private final OpenAudioMc openAudioMc = OpenAudioMc.getInstance();
    @Getter private final VoiceChatDriver driverInstance;
    private Socket socket;

    public VoiceChatDriver() {
        driverInstance = this;
    }

    @Override
    public void boot(Socket socket) {
        this.socket = socket;
    }

    public Task<UUID> createRoom() {
        Task<UUID> task = new Task<>();
        if (!openAudioMc.getStateService().getCurrentState().isConnected()) {
            task.fail(ErrorCode.SYS_IDLE, "this action cannot be fulfilled when openaudiomc is in its idle state");
        } else {
            socket.emit("create-room", "", (Ack) args -> {
                ApiResponse apiResponse = OpenAudioMc.getGson().fromJson(
                        args[0].toString(),
                        ApiResponse.class
                );

                // check errors
                if (apiResponse.getErrors().size() > 0) {
                    RestErrorResponse error = apiResponse.getErrors().get(0);
                    task.fail(error.getCode(), error.getMessage());
                    return;
                }

                task.success(apiResponse.getResponse(PlainUuidPayload.class).getUuid());
            });
        }
        return task;
    }

}
