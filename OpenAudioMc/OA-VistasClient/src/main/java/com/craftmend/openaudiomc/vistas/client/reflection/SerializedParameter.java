package com.craftmend.openaudiomc.vistas.client.reflection;

import com.craftmend.openaudiomc.OpenAudioMc;
import lombok.Getter;

@Getter
public class SerializedParameter {

    private String className;
    private String value;

    public static SerializedParameter toParam(Class type, Object value) {
        SerializedParameter sp = new SerializedParameter();
        sp.className = type.getName();
        sp.value = OpenAudioMc.getGson().toJson(value);
        return sp;
    }

}
