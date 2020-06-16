package com.craftmend.openaudiomc.generic.voicechat.api.models;

import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class MinecraftAccount {

    // Why is the casing so retarded? Golang, thats why.

    @SerializedName("Name")
    private String name;
    @SerializedName("UUID")
    private UUID uuid;
    @SerializedName("Pin")
    private String pin;

}
