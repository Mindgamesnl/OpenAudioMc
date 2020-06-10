package com.craftmend.openaudiomc.generic.enviroment.models;

import com.google.gson.annotations.SerializedName;
import lombok.Getter;

@Getter
public class ProjectConfiguration {

    @SerializedName("max_voice_room_size")
    private int maxVoiceRoomSize;

}
