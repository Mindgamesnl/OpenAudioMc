package com.craftmend.vistas.client.reflection;

import com.craftmend.openaudiomc.OpenAudioMc;
import lombok.Setter;
import lombok.SneakyThrows;

import java.lang.reflect.Method;
import java.util.LinkedList;

public class SerializedCall {

    private String methodName;
    @Setter
    private transient Object target;
    private LinkedList<SerializedParameter> parameters = new LinkedList<>();

    public SerializedCall(String methodName) {
        this.methodName = methodName;
    }

    public SerializedCall addParam(SerializedParameter param) {
        this.parameters.add(param);
        return this;
    }

    @SneakyThrows
    public Object invokeOn(Object target) {

        LinkedList<Object> out = new LinkedList<>();
        LinkedList<Class<?>> paramTypes = new LinkedList<>();

        // extract
        for (SerializedParameter param : parameters) {
            Class t = Class.forName(param.getClassName());
            Object o = OpenAudioMc.getGson().fromJson(param.getValue(), t);
            out.push(o);
            paramTypes.push(t);
        }
        Method i = target.getClass().getDeclaredMethod(methodName, paramTypes.toArray(new Class[paramTypes.size()]));
        i.setAccessible(true);
        return i.invoke(target, out.stream().toArray());
    }

}
